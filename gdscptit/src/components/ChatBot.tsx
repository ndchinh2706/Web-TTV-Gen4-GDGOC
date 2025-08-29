import { useState, useRef, useEffect } from 'react';
import { FaUser, FaTrash, FaPaperPlane } from 'react-icons/fa';
import GDSCLogo from '@/assets/chatbot/gdsc-logo.png';
import { askChat } from '@/services/chatService';

export type Message = {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: string;
};

type ChatBotProps = {
    title?: string;
    initMessages?: Message[];
    initQuickActions?: string[];
    placeholder?: string;
    showInit?: boolean;
    height?: string;
};

function MessageBubble({ message, isUser }: { message: Message; isUser: boolean }) {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-blue-500' : ''}`}>
                    {isUser ? <FaUser className="w-4 h-4 text-white" /> : <img draggable="false" src={GDSCLogo} alt="Logo" className="w-8 h-8 object-contain" />}
                </div>

                <div className={`px-4 py-2 rounded-2xl ${isUser ? 'bg-blue-400 text-white rounded-br-sm' : 'bg-blue-100 text-gray-800 rounded-bl-sm'}`}>
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                </div>
            </div>
        </div>
    );
}

export default function ChatBot({
    title = 'Chat Bot',
    initMessages = [{
        id: 1,
        text: "Xin chào! Tôi là GDG on Campus: PTIT chat bot. Tôi có thể giúp gì cho bạn?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }],
    showInit = true,
    initQuickActions = ['Ai có thể tham gia GDG on Campus: PTIT?', 'GDG on Campus: PTIT có yêu cầu gì về trình độ lập trình trước khi tham gia?', 'Thành viên GDG on Campus: PTIT sẽ tham gia vào những hoạt động nào?', 'Nếu mình không phải là sinh viên của PTIT, mình có thể tham gia GDG on Campus: PTIT không?'],
    placeholder = 'Nhập tin nhắn của bạn...',
    height = '400px'
}: ChatBotProps) {
    const STORAGE_KEY = "gdsc-chat-messages";

    // Load từ localStorage trước
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : initMessages;
    });

    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => scrollToBottom(), 100);
        return () => clearTimeout(timer);
    }, [messages, isTyping]);

    // Cứ khi messages thay đổi thì lưu vào localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputText,
            isUser: true,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        try {
            const botResponse = await askChat({ message: userMessage.text });

            const botMessage: Message = {
                id: Date.now() + 1,
                text: typeof botResponse === 'string' ? botResponse : botResponse.response || 'Có lỗi xảy ra',
                isUser: false,
                timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
            };


            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            console.error(err);

            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "Xin lỗi, đã có lỗi xảy ra. Bạn thử lại sau nhé.",
                isUser: false,
                timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearMessages = () => {
        setMessages(initMessages);
        localStorage.removeItem(STORAGE_KEY); // xoá cả localStorage
    };

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg" style={{ height }}>
            {/* Header */}
            <div className="text-gdsc-primary-blue border-b-2 p-2 rounded-t-lg flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-sm opacity-80">{isTyping ? 'Đang trả lời...' : 'Trực tuyến'}</p>
                </div>
                <button onClick={clearMessages} className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Xóa chat">
                    <FaTrash className="w-5 h-5 cursor-pointer text-gdsc-primary-red" />
                </button>
            </div>

            {/* Messages */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 scroll-smooth"
                style={{ scrollBehavior: 'smooth' }}
            >
                <div className="space-y-4">
                    {messages.map(msg => <MessageBubble key={msg.id} message={msg} isUser={msg.isUser} />)}

                    {isTyping && (
                        <div className="flex justify-start mb-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                                    <img draggable="false" src={GDSCLogo} alt="Logo" className="w-8 h-8" />
                                </div>
                                <div className="bg-gray-200 px-4 py-2 rounded-2xl rounded-bl-sm">
                                    <div className="flex space-x-1">
                                        {[0, 1, 2].map(i => (
                                            <div key={i} className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div ref={messagesEndRef} className="h-0" />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
                <div className="flex space-x-2">
                    <textarea
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder={placeholder}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={1}
                        style={{ maxHeight: '100px' }}
                        disabled={isTyping}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim() || isTyping}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-lg flex items-center justify-center transition-colors"
                    >
                        <FaPaperPlane className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Nhấn Enter để gửi tin nhắn</p>
            </div>

            {/* Quick Actions */}
            {showInit && initQuickActions.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 mb-2">
                    {initQuickActions.map(text => (
                        <button
                            key={text}
                            onClick={() => setInputText(text)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                        >
                            {text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

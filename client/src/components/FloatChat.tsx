import { useState, useEffect } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ChatBot from '@/components/ChatBot';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

interface FloatChatProps {
  open?: boolean;
}

export default function FloatChat({ open = false }: FloatChatProps) {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('floatChatOpen');
      if (saved !== null) {
        return saved === 'true';
      } else {
        localStorage.setItem('floatChatOpen', String(open || true));
        return open || true;
      }
    }
    return false;
  });

  const navigate = useNavigate();  // Initialize useNavigate hook

  useEffect(() => {
    // Check screen width on mount
    if (window.innerWidth < 768) {
      setIsOpen(false); // Close chat on mobile
      localStorage.setItem('floatChatOpen', 'false'); // Persist the state in localStorage
    }
  }, []);

  // Update localStorage every time `isOpen` changes
  useEffect(() => {
    localStorage.setItem('floatChatOpen', String(isOpen));
  }, [isOpen]);

  const chatVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 50 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  // Handle button click for mobile
  const handleChatButtonClick = () => {
    if (window.innerWidth < 768) {
      // If on mobile, navigate to the /chat page
      navigate('/chatbot');
    } else {
      // If on larger screens, open the chat
      setIsOpen(true);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-[4500]">
      {isOpen && (
        <motion.div
          className="mb-2 w-90 shadow-lg"
          variants={chatVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center bg-blue-500 text-white p-2 rounded-t-lg">
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <ChatBot
            title="GDG Float Chat"
            height="500px"
            initQuickActions={['Bạn có thể giúp tôi gì?', 'Hướng dẫn sử dụng', 'Cảm ơn!']}
            showInit={false}
          />
        </motion.div>
      )}

      {!isOpen && (
        <motion.button
          onClick={handleChatButtonClick}  // Use the updated handler
          className="bg-blue-500 text-white p-3 rounded-full shadow-xl hover:bg-blue-600 transition-colors border-2 border-white"
          title="Mở chat"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
        >
          <FaComments className="w-8 h-8" />
        </motion.button>
      )}
    </div>
  );
}

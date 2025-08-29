import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { ScrollToTop } from "@/components/ScrollToTop";

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="relative flex-1 max-w-7xl mx-auto w-full py-6 px-4">
        <ChatBot 
          title="GDG on Campus Chat Bot"
          height="750px"
          initQuickActions={['Bạn có thể giúp tôi gì?', 'Hướng dẫn sử dụng', 'Cảm ơn!']}
        />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

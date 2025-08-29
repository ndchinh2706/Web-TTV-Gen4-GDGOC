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
          initQuickActions={['Ai có thể tham gia GDG on Campus: PTIT?', 'GDG on Campus: PTIT có yêu cầu gì về trình độ lập trình trước khi tham gia?', 'Thành viên GDG on Campus: PTIT sẽ tham gia vào những hoạt động nào?', 'Nếu mình không phải là sinh viên của PTIT, mình có thể tham gia GDG on Campus: PTIT không?']}
        />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

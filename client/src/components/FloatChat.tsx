import { useState, useEffect } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ChatBot from '@/components/ChatBot';

interface FloatChatProps {
  open?: boolean; // nếu không truyền thì mặc định false
}

export default function FloatChat({ open = false }: FloatChatProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open); // đồng bộ khi prop thay đổi
  }, [open]);

  const chatVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 50 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
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
          onClick={() => setIsOpen(true)}
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

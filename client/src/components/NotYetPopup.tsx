import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa6";

interface NotYetPopupProps {
    isOpen: boolean;
}

const NotYetPopup: React.FC<NotYetPopupProps> = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[4800] flex items-center justify-center bg-black/30"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-lg text-center"
            >
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-yellow-500">
                        <FaClock className="text-yellow-500 text-2xl" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                    Đã hết thời gian đăng ký
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                    Rất tiếc, hiện tại form đăng ký đã đóng.
                    <br />
                    Theo dõi fanpage để nhận thông tin mới nhất.
                </p>

                <a
                    href="https://www.facebook.com/gdsc.ptit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block w-full bg-yellow-500 text-white font-semibold py-3 rounded-xl shadow hover:bg-yellow-600 transition text-center"
                >
                    Theo dõi fanpage
                </a>
            </motion.div>
        </div>
    );
};

export default NotYetPopup;

import { motion } from "framer-motion";

interface SuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30"
            onClick={onClose} // click ra ngoài
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-lg text-center"
                onClick={(e) => e.stopPropagation()} // chặn đóng khi click trong popup
            >
                {/* nút đóng X */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                >
                    ×
                </button>

                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-500">
                        <span className="text-blue-500 text-2xl">✔</span>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                    Đăng ký thành công!
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                    Cảm ơn bạn đã ứng tuyển vào <span className="font-semibold">GDG on Campus: PTIT</span>.
                    <br />
                    Đừng quên theo dõi fanpage để luôn cập nhật những thông tin mới nhất.
                    <br />
                    Hãy kiên nhẫn chờ kết quả từ chúng mình nhé!
                </p>

                <a
                    href="https://www.facebook.com/gdsc.ptit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block w-full bg-blue-500 text-white font-semibold py-3 rounded-xl shadow hover:bg-blue-600 transition text-center"
                >
                    Truy cập page
                </a>

            </motion.div>
        </div>
    );
};

export default SuccessPopup;

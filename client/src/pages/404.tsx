import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import GDSCIcon from "@/assets/logoCenter.png"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden p-6">
      {/* Background blobs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-red-100 rounded-full blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-72 h-72 bg-green-100 rounded-full blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <section className="relative z-10 w-full max-w-xl text-center space-y-6">
        {/* Icon */}
        <motion.img
          src={GDSCIcon}
          alt="GDSC Logo"
          className="w-70 md:w-120 h-auto mx-auto drop-shadow-lg"
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        />

        {/* Big 404 */}
        <motion.h1
          className="font-extrabold tracking-tight text-9xl flex justify-center gap-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-gdsc-primary-yellow drop-shadow-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            4
          </motion.span>
          <motion.span
            className="text-gdsc-primary-red drop-shadow-md"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
          >
            0
          </motion.span>
          <motion.span
            className="text-gdsc-primary-green drop-shadow-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
          >
            4
          </motion.span>
        </motion.h1>

        {/* Message */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="text-lg sm:text-xl text-gray-700">
            Trang bạn tìm không tồn tại hoặc đã bị chuyển đi.
          </p>
          <p className="text-sm text-gray-500">
            Kiểm tra lại đường dẫn hoặc quay về trang chủ.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="mt-8 flex flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-xl border border-gdsc-primary-blue px-4 py-2 font-medium hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] transition focus:outline-none shadow-sm cursor-pointer"
          >
            Quay lại
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-gdsc-primary-blue px-4 py-2 font-semibold text-white shadow-sm hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] transition cursor-pointer"
          >
            Về trang chủ
          </Link>
        </motion.div>
      </section>
    </main>
  )
}

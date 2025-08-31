import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import cover from "@/assets/home/section1/cover.png";
import gdgocLogo from "@/assets/home/section1/16.png";

import flagRed from "@/assets/sticker/flag-red.svg"
import flagBlue from "@/assets/sticker/flag-blue.svg"
import flagGreen from "@/assets/sticker/flag-green.svg"

import circleBlue from '@/assets/sticker/circle-blue.svg'
import circleRed from '@/assets/sticker/circle-red.svg'
import circleGreen from '@/assets/sticker/circle-green.svg'

export function Section1() {
    const navigate = useNavigate();
    type Color = "green" | "red" | "blue";

    const colorClasses: Record<Color, { text: string; border: string }> = {
        green: { text: "text-gdsc-primary-green", border: "border-3 border-gdsc-primary-green" },
        red: { text: "text-gdsc-primary-red", border: "border-3 border-gdsc-primary-red" },
        blue: { text: "text-gdsc-primary-blue", border: "border-3 border-gdsc-primary-blue" },
    };

    const letters = [
        { char: "G", color: "text-blue-500" },
        { char: "o", color: "text-red-500" },
        { char: "o", color: "text-yellow-500" },
        { char: "g", color: "text-blue-500" },
        { char: "l", color: "text-green-500" },
        { char: "e", color: "text-red-500" },
    ];

    const timelineData = [
        {
            img: flagGreen,
            date: "01/09 - 11/09",
            text: "Vòng Đơn",
            color: "green" as Color,
            rotation: 10
        },
        {
            img: flagRed,
            date: "13/09 - 14/09",
            text: "Phỏng vấn",
            color: "red" as Color,
            rotation: -10
        },
        {
            img: flagBlue,
            date: "20/09 - 05/11",
            text: "Thử việc",
            color: "blue" as Color,
            rotation: 10
        },
    ];

    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative flex items-center justify-center h-auto md:min-h-screen mb-4 md:mb-12"
            >
                {/* Ảnh nền */}
                <img
                    src={cover}
                    alt="Cover"
                    className="absolute inset-0 object-cover w-full h-full"
                    draggable="false"
                    fetchPriority="high"
                    decoding="async"
                />

                {/* Overlay trắng gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/60 to-transparent"></div>

                {/* Nội dung */}
                <div className="relative z-10 flex flex-col items-center md:items-start p-8 bg-gradient-to-r from-white via-white/60 to-transparent w-full">

                    {/* Căn giữa các phần tử trong khối */}
                    <div className="flex flex-col items-center text-center">
                        <motion.img
                            fetchPriority="high"
                            decoding="async"
                            src={gdgocLogo}
                            loading="lazy"
                            alt="GDG OC Logo"
                            className="max-w-[350px] md:max-w-[600px] w-full h-auto"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        <div className="flex items-center justify-center gap-2 mt-8">
                            <span className="text-gray-700 text-lg md:text-2xl font-bold">
                                Powered by
                            </span>
                            <div className="flex items-center">
                                {letters.map((l, i) => (
                                    <motion.span
                                        key={i}
                                        className={`${l.color} text-lg md:text-2xl font-bold inline-block`}
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            delay: i * 0.15,
                                        }}
                                    >
                                        {l.char}
                                    </motion.span>
                                ))}
                            </div>
                            <span className="text-gray-700 text-lg md:text-2xl font-bold">
                                for Developers
                            </span>
                        </div>

                        {/* Button */}
                        <button
                            className="flex text-lg items-center font-bold gap-2 px-8 py-3 mt-6 text-gdsc-primary-blue bg-white rounded-full border-2 cursor-pointer border-gdsc-primary-blue hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]"
                            onClick={() => navigate("/form")}
                        >
                            ĐĂNG KÝ NGAY <FaArrowRight />
                        </button>
                    </div>
                </div>

                {/* Desktop Timeline - Horizontal (absolute positioning) */}
                <div className="hidden md:block absolute -bottom-16 left-0 right-0 z-20 w-full pb-6">
                    <div className="flex flex-row justify-center items-center gap-6">
                        {timelineData.map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="flex-1 flex flex-col items-center justify-center group cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center justify-center gap-4">
                                    <img
                                        draggable="false"
                                        src={item.img}
                                        alt={`Flag ${item.color}`}
                                        className="w-24 object-cover"
                                    />
                                    <div className="flex flex-col items-center justify-center">
                                        <p className={`${colorClasses[item.color].text} font-bold text-xl my-2`}>
                                            {item.date}
                                        </p>
                                        <motion.p
                                            className={`text-xl font-bold px-12 py-3 bg-white 
                                            ${colorClasses[item.color].text} ${colorClasses[item.color].border} 
                                            rounded-3xl shadow-md`}
                                            whileHover={{ rotate: item.rotation }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                        >
                                            {item.text}
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
            {/* Mobile Timeline - Vertical */}
            <div className="md:hidden w-full py-12 relative">
                <motion.img
                    src={circleGreen}
                    alt="green circle"
                    className="absolute top-16 left-8 w-38 h-38 opacity-70"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.img
                    src={circleRed}
                    alt="red circle"
                    className="absolute top-82 right-12 w-24 h-24 opacity-60"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />

                <motion.img
                    src={circleBlue}
                    alt="blue circle"
                    className="absolute bottom-0 left-0 w-30 h-30 opacity-70"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                {/* Vertical Line */}
                <div className="absolute top-30 left-1/2 transform -translate-x-1/2 h-100 w-1 bg-gray-200"></div>

                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-10 text-gdsc-primary-red text-center">
                        Timeline
                    </h1>

                    <div className="flex flex-col space-y-10 max-w-md mx-auto">
                        {timelineData.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                whileHover={{ scale: 1.03 }}
                                className={`relative flex items-center ${idx % 2 === 0 ? "justify-start" : "justify-end"
                                    }`}
                            >
                                {/* Connector dot */}
                                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-gdsc-primary-red z-10"></div>

                                <div
                                    className={`bg-white shadow-lg rounded-2xl p-5 w-5/6 flex items-center gap-4 ${idx % 2 === 0 ? "ml-6" : "mr-6 flex-row-reverse"
                                        }`}
                                >
                                    {/* Image Circle */}
                                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                        <img
                                            draggable="false"
                                            src={item.img}
                                            alt={`Flag ${item.color}`}
                                            className="w-10 h-10 object-contain"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1">
                                        <span
                                            className={`text-sm font-semibold mb-2 px-2 py-1 rounded-full inline-block ${colorClasses[item.color].text}`}
                                        >
                                            {item.date}
                                        </span>
                                        <motion.p
                                            className={`text-base font-bold text-center border rounded-3xl py-2 bg-${item.color}-100 ${colorClasses[item.color].text} ${colorClasses[item.color].border}`}
                                            whileHover={{ rotate: item.rotation / 5 }}
                                        >
                                            {item.text}
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
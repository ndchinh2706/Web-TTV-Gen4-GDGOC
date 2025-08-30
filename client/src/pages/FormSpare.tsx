import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ScrollToTop } from "@/components/ScrollToTop";
import FloatChat from '@/components/FloatChat';
import {motion} from "framer-motion"

import circleBlue from '@/assets/sticker/circle-blue.svg'
import circleRed from '@/assets/sticker/circle-red.svg'
import circleYellow from '@/assets/sticker/circle-yellow.svg'
import circleGreen from '@/assets/sticker/circle-green.svg'

export default function Home() {
    return (
        <>
            <Header />
            <section className="relative flex items-center justify-center">
                {/* Background decorative circles */}
                <div className="hidden md:block absolute inset-0 -z-10 overflow-hidden">
                    <motion.img
                        src={circleBlue}
                        alt="blue circle"
                        className="absolute top-16 left-8 w-40 h-40 opacity-70"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.img
                        src={circleRed}
                        alt="red circle"
                        className="absolute top-80 right-12 w-24 h-24 opacity-60"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.img
                        src={circleGreen}
                        alt="green circle"
                        className="absolute top-[44rem] left-40 w-20 h-20 opacity-70"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.img
                        src={circleYellow}
                        alt="yellow circle"
                        className="absolute bottom-96 left-28 w-16 h-16 opacity-50"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.img
                        src={circleGreen}
                        alt="green circle"
                        className="absolute bottom-16 right-40 w-32 h-32 opacity-65"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc3yDF4-6rLPOXRtygafG28nkfndva8NVE4PQeCrct0ArbsiA/viewform?embedded=true" className="w-full h-screen mt-4 mb-4 z-200" title="Form"></iframe>
            </section>
            <Footer />
            <ScrollToTop />
            <FloatChat />
        </>
    )
}

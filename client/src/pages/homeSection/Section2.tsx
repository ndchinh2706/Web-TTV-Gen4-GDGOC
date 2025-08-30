import com1 from "@/assets/home/section2/13.png"
import com2 from "@/assets/home/section2/14.png"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import img1 from "@/assets/home/section2/1.webp"
import img2 from "@/assets/home/section2/2.webp"
import img3 from "@/assets/home/section2/3.webp"

export function Section2() {
  return (
    <section className="relative flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10 mt-6 md:mt-24 p-2">
        <div className="flex flex-col lg:flex-row items-center justify-start gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Text bên trái */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-5xl text-gdsc-primary-blue font-extrabold mb-4 lg:mb-6">
              Together
            </h2>
            <div className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-gray-700">
            <motion.span
              className="mr-1 sm:mr-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              We
            </motion.span>
            <motion.span
              className="text-blue-500 mr-1 sm:mr-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Learn
            </motion.span>
            ,
            <motion.span
              className="text-red-500 ml-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Share
            </motion.span>

            {/* Xuống dòng thật sự */}
            <br />

            <motion.span
              className="text-yellow-500 mr-1 sm:mr-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Connect
            </motion.span>
            and
            <motion.span
              className="text-green-500 ml-1 sm:ml-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Grow
            </motion.span>
            !
            </div>
          </motion.div>

          {/* Slider bên phải */}
          <motion.div
            className="flex-1 w-full max-w-sm md:max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full h-56 sm:h-60 md:h-72 relative rounded-xl overflow-hidden">
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="w-full h-full"
              >
                {[img1, img2, img3].map((src, idx) => (
                  <SwiperSlide key={idx} className="flex items-center justify-center">
                    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={src}
                        alt={`GDSC PTIT Team Photo ${idx + 1}`}
                        className="w-full h-full object-cover"
                        draggable="false"
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        </div>

        {/* Info box */}
        <motion.div
          className="border-2 border-gdsc-primary-blue p-4 sm:p-6 rounded-3xl bg-blue-50 shadow-lg mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-12 px-2 md:px-8">
            <div className="flex-8/12">
              <h2 className="font-bold text-xl sm:text-2xl mb-2 text-gdsc-primary-blue">
                Về Google Developer Groups
              </h2>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed text-justify">
                Google Developer Student Clubs (GDSC viết tắt) là chương trình được Google cấp quyền tổ chức và hỗ trợ, dành cho sinh viên đam mê CNTT và công nghệ Google. Năm 2024, đã có hơn 2000 chi nhánh tại hơn 100 quốc gia.
              </p>
            </div>
            <div className="flex-10/12">
              <h2 className="font-bold text-xl sm:text-2xl mb-2 text-gdsc-primary-blue">
                Về GDG on Campus PTIT
              </h2>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed text-justify">
                Tháng 9/2022, GDSC-PTIT chính thức ra đời, là một chapter của GDSC tại Học viện Công nghệ Bưu chính Viễn thông. Đây là môi trường lý tưởng để sinh viên tiếp cận tài nguyên Google, học hỏi và phát triển bản thân, cùng nhau tạo ra những giải pháp công nghệ mang lại giá trị tích cực cho cộng đồng.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background floating images */}
      <motion.img
        src={com1}
        alt="Community 1"
        className="absolute bottom-0 right-0 md:right-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rotate-12"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.img
        src={com2}
        alt="Community 2"
        className="absolute top-20 -left-10 md:left-20 w-32 h-32 sm:w-56 sm:h-56 lg:w-62 lg:h-62 -rotate-12"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  )
}

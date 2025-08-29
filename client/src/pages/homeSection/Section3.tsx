import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import circleBlue from '@/assets/sticker/circle-blue.svg'
import circleRed from '@/assets/sticker/circle-red.svg'
import circleYellow from '@/assets/sticker/circle-yellow.svg'
import circleGreen from '@/assets/sticker/circle-green.svg'

// learn img
import learn1 from '@/assets/home/section3/learn/1.webp'
import learn2 from '@/assets/home/section3/learn/2.webp'
// share img
import share1 from '@/assets/home/section3/share/1.webp'
import share2 from '@/assets/home/section3/share/2.webp'
// connect img
import connect1 from '@/assets/home/section3/connect/1.webp'
import connect2 from '@/assets/home/section3/connect/2.webp'
import connect3 from '@/assets/home/section3/connect/3.webp'
// grow img
import grow1 from '@/assets/home/section3/grow/1.webp'
import grow2 from '@/assets/home/section3/grow/2.webp'
import grow3 from '@/assets/home/section3/grow/3.webp'

export function Section3() {
  const contentItems = [
    {
      id: 1,
      title: "We Learn",
      description:
        "Ở GDG on Campus: PTIT, học tập là hành động. Thay vì chỉ lắng nghe, bạn sẽ được bắt tay vào làm, được thử nghiệm và sai sót trong một môi trường an toàn. Nắm vững công nghệ mới qua các dự án chuyên sâu, biến ý tưởng thành sản phẩm và học hỏi từ chính những thử thách thực tế là cách bạn sẽ tiến bộ tại đây.",
      color: "text-blue-500",
      gallery: [learn1, learn2],
    },
    {
      id: 2,
      title: "We Share",
      description:
        "GDG on Campus: PTIT tin rằng giá trị của kiến thức nằm ở sự lan tỏa. Một văn hóa cởi mở được xây dựng, nơi mọi góc nhìn đều được tôn trọng và bất kỳ ai cũng có thể là người chia sẻ. Qua việc chia sẻ, bạn không chỉ giúp cộng đồng cùng phát triển mà còn củng cố kiến thức và xây dựng sự tự tin.",
      color: "text-red-500",
      gallery: [share1, share2],
    },
    {
      id: 3,
      title: "We Connect",
      description:
        "GDG on Campus: PTIT mở ra cánh cửa đến với một mạng lưới kết nối rộng lớn và giá trị. Đây không chỉ là nơi bạn tìm thấy những người bạn cùng chung đam mê, mà còn là cơ hội gặp gỡ các chuyên gia, diễn giả và tiếp cận cộng đồng Google Developer toàn cầu.",
      color: "text-yellow-500",
      gallery: [connect1, connect2, connect3],
    },
    {
      id: 4,
      title: "We Grow",
      description:
        "Learn, Share, và Connect chính là ba mảnh ghép tạo nên sự trưởng thành toàn diện tại GDG on Campus: PTIT. GDG on Campus: PTIT sẽ là bệ phóng để biến tiềm năng của bạn thành những thành tựu thực sự, ghi dấu ấn trong hành trình sinh viên của mình.",
      color: "text-green-500",
      gallery: [grow1, grow2, grow3],
    },
  ]

  return (
    <section className="relative flex items-center justify-center px-4 sm:px-6 md:px-8 py-12">
      {/* Background decorative circles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
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

      <div className="max-w-7xl mx-auto text-center space-y-12 md:space-y-20 w-full">
        {contentItems.map((item, index) => {
          const isEven = index % 2 === 0
          return (
            <motion.div
              key={item.id}
              className="flex flex-col lg:flex-row items-center gap-8 px-2 sm:px-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {isEven ? (
                <>
                  {/* Text */}
                  <div className="flex-1 flex flex-col items-center lg:items-start order-2 lg:order-1">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                      {item.title.split(" ")[0]}{" "}
                      <span className={item.color}>{item.title.split(" ")[1]}</span>
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-base md:text-xl text-justify md:text-left">
                      {item.description}
                    </p>
                  </div>
                  {/* Swiper */}
                  <motion.div
                    className="flex-1 order-1 lg:order-2 flex justify-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full max-w-md aspect-video px-2 sm:px-0">
                      <Swiper
                        modules={[Navigation, Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop={true}
                        className="w-full h-full rounded-2xl shadow-lg"
                      >
                        {item.gallery.map((img, idx) => (
                          <SwiperSlide key={idx}>
                            <img
                              src={img}
                              alt={`${item.title} image ${idx + 1}`}
                              className="w-full h-full object-cover rounded-2xl"
                              draggable="false"
                              // loading="lazy"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Swiper first for odd */}
                  <motion.div
                    className="flex-1 order-1 flex justify-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full max-w-lg aspect-video px-2 sm:px-0">
                      <Swiper
                        modules={[Navigation, Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop={true}
                        className="w-full h-full rounded-2xl shadow-lg"
                      >
                        {item.gallery.map((img, idx) => (
                          <SwiperSlide key={idx}>
                            <img
                              src={img}
                              alt={`${item.title} image ${idx + 1}`}
                              className="w-full h-full object-cover rounded-2xl"
                              draggable="false"
                              // loading="lazy"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </motion.div>
                  {/* Text */}
                  <div className="flex-1 flex flex-col items-center lg:items-start order-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                      {item.title.split(" ")[0]}{" "}
                      <span className={item.color}>{item.title.split(" ")[1]}</span>
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-base md:text-xl text-justify md:text-left">
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

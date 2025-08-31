import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import pointer from "@/assets/home/section4/6.png"

import des_NguyenTruongLam from "@/assets/home/section4/Des_NguyenTruongLam.jpg"
import hrlg_NguyenQuangMinh from "@/assets/home/section4/HRLG_NguyenQuangMinh.jpg"
import tech_MinhQuan from "@/assets/home/section4/Tech_MinhQuan.jpg"
import tech_NguyenVanThang from "@/assets/home/section4/Tech_NguyenVanThang.jpg"
import pr_GiaLinh from "@/assets/home/section4/Pr_GiaLinh.jpg"

export function Section4() {
    const testimonials = [
        {
            id: 1,
            name: "Nguyễn Trường Lâm",
            role: "Thành viên NonTech - Design",
            comment: "A cảm thấy rất vui khi được trở thành một mảnh ghép của GDG on Campus: PTIT và cũng rất tự hào với những thành công của CLB. GDG on Campus: PTIT đã giúp mình học hỏi được nhiều điều mới, mở rộng các mối quan hệ, thấy rằng mình thật nhỏ bé những tương lai của mình thật rộng lớn. Cảm ơn GDG on Campus: PTIT đã đồng hành cùng mình trong 2 năm đầu đại học. Sẽ tiếp tục đồng hành cùng nhau. Mình sẽ luôn dõi theo và sẵn sàng khi CLB cần mình. Yêu nhà G.",
            image: des_NguyenTruongLam,
        },
        {
            id: 2,
            name: "Nguyễn Quang Minh",
            role: "Thành viên NonTech - HR-LG",
            comment: "Sau một thời gian không quá dài, nhưng cũng không quá ngắn, đối với mình, mình rất vui và hạnh phúc, vui lắm, hạnh phúc lắm khi được làm việc với các bạn nhà G.",
            image: hrlg_NguyenQuangMinh,
        },
        {
            id: 3,
            name: "Gia Linh",
            role: "Thành viên NonTech - PR",
            comment: "Đầu tiên về GDGoC, môi trường mình siêu nhiều người giỏi và luôn cởi mở sẵn sàng share kinh nghiệm cho tất cả mọi người giống như những gì CLB đã cam kết với em trong slogan 'we learn, share, connect and grow'. Trong công việc thì luôn chuyên nghiệp, chỉn chu và luôn take care được tất cả các thành viên, kể cả là trainee. Một năm vừa qua cùng GDGoC thật sự siêu tuyệt vời. Em rất hạnh phúc vì đã được làm một phần của nhà G.",
            image: pr_GiaLinh,
        },
        {
            id: 4,
            name: "Minh Quân",
            role: "Thành viên Tech",
            comment: "Mình thấy Gen 3 có lẽ hiện đang là hoạt động nhiều nhất từ trước đến giờ. Nhiều sự kiện được đưa về cho CLB cũng như các thành viên đều gặt hái được những thành tựu xịn xò! Mình cũng rất vui khi được đồng hành cùng với các anh em Core team cũng như làm việc với các thành viên mới. Phải nói các bạn giỏi hơn chúng mình xưa nhiều. Kỉ niệm đáng nhớ nhất là đợt đi chạy sự kiện Build With AI phiên bản PTIT, anh em lúc đó đồng tâm hiệp lực hỗ trợ sự kiện chỉn chu luôn!",
            image: tech_MinhQuan,
        },
        {
            id: 5,
            name: "Nguyễn Văn Thắng",
            role: "Thành viên Tech",
            comment: "Anh thấy các bạn năm nay rất năng động, đặc biệt là tham gia nhiều các cuộc thi như startup innovation, bootcamp… nhiều khi anh còn thấy các bạn Gen 3 năm nay còn giỏi hơn cả anh. Anh kỳ vọng vào mọi người rất nhiều và mọi người đã không để anh thất vọng. Anh rất mong chờ sự lãnh đạo mới của các bạn Gen 3 năm nay, cùng với sự nhiệt huyết giỏi giang của mình. Rất mong GDGoC PTIT với sự lãnh đạo của Gen 3 sẽ vươn mình xa hơn nữa.",
            image: tech_NguyenVanThang,
        },
    ];

    return (
        <section className="relative flex items-center justify-center px-4 py-12">
            <div className="w-full mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gdsc-primary-blue">Chia sẻ từ thành viên CLB</h1>
                <img draggable="false" src={pointer} loading="lazy" alt="Pointer" className="absolute z-50 top-20 md:top-10 -right-14 lg:right-52 w-36 h-36" />
                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{ delay: 10000 }}
                    pagination={{ clickable: true }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                    }}
                    className="relative overflow-visible"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id} className="flex">
                            <div className="flex flex-col md:flex-row items-center md:items-start p-6 md:p-12 mb-10 gap-12 max-w-6xl mx-auto border-3 border-gdsc-primary-blue rounded-4xl min-h-[700px] md:min-h-[200px] w-full">
                                {/* Text */}
                                <div className="flex flex-col justify-between text-center md:text-left h-full flex-1">
                                    <p className="text-lg text-gdsc-primary-yellow mb-2">{testimonial.role}</p>
                                    <p className="text-gray-600 italic text-justify flex-1">"{testimonial.comment}"</p>
                                    <h2 className="text-xl font-bold mb-1 text-gdsc-primary-blue mt-4">
                                        {testimonial.name}
                                    </h2>
                                </div>
                                {/* Avatar */}
                                <img
                                    draggable="false"
                                    loading="lazy"
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-[220px] h-[220px] md:w-[250px] md:h-[250px] rounded-full md:mr-4 mb-4 md:mb-0 object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

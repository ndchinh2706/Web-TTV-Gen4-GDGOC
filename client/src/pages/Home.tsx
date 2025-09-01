import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Section1 } from "@/pages/homeSection/Section1"
import { Section2 } from "@/pages/homeSection/Section2"
import { Section3 } from "@/pages/homeSection/Section3"
import { Section4 } from "@/pages/homeSection/Section4"
import { Section5 } from "@/pages/homeSection/Section5"
import { ScrollToTop } from "@/components/ScrollToTop";
import FloatChat from '@/components/FloatChat';


export default function Home() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Footer />
      <ScrollToTop />
      <FloatChat open={true} />

    </div>
  )
}

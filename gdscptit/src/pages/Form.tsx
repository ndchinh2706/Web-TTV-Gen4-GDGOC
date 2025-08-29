import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Section1 } from "./formSection/Section1"
import { ScrollToTop } from "@/components/ScrollToTop";
import FloatChat from '@/components/FloatChat';

export default function Home() {
  return (
    <>
      <Header />
      <Section1 />
      <Footer />
      <ScrollToTop />
      <FloatChat />
    </>
  )
}

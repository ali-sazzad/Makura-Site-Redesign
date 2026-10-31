import Background from "@/components/Background";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import About from "@/components/About";
import Voices from "@/components/Voices";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main>
      <Background />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <About />
      <Voices />
      <Contact />
      <BackToTop />
    </main>
  );
}

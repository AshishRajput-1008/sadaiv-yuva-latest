import Navbar       from '@/components/Navbar/Navbar';
import Hero         from '@/components/Hero/Hero';
import Ticker       from '@/components/Ticker/Ticker';
import About        from '@/components/About/About';
import Impact       from '@/components/Impact/Impact';
import Programs     from '@/components/Programs/Programs';
import Partners     from '@/components/Partners/Partners';
import Journey      from '@/components/Journey/Journey';
import Gallery      from '@/components/Gallery/Gallery';
import Testimonials from '@/components/Testimonials/Testimonials';
import Donate       from '@/components/Donate/Donate';
import Contact      from '@/components/Contact/Contact';
import Footer       from '@/components/Footer/Footer';
import About2 from "@/components/About2/About"

export default function Home() {
  return (
    <>
      <div className="tribar" aria-hidden="true">
        <span /><span /><span />
      </div>
      <main>
        <Hero />
              <Partners />
        <Ticker />
        <About />
        <Impact />
        <Programs />
        <Journey />
        <Gallery />
        <Testimonials />
        <Donate />
        <Contact />
      </main>
    </>
  );
}

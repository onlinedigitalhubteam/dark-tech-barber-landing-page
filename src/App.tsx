import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { SignaturePackage } from "@/components/SignaturePackage";
import { Gallery } from "@/components/Gallery";
import { AboutBarber } from "@/components/AboutBarber";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Booking } from "@/components/Booking";
import { Testimonials } from "@/components/Testimonials";
import { Location } from "@/components/Location";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MobileBookingBar } from "@/components/MobileBookingBar";

export default function App() {
  return (
    <div className="relative min-h-screen bg-canvas pb-[5.6rem] lg:pb-0">
      {/* Page-wide ambient backdrop (fixed = zero layout shift) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_-10%,rgba(255,85,0,0.06),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-[radial-gradient(70%_60%_at_50%_120%,rgba(255,85,0,0.07),transparent_70%)]" />
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded-[10px] focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Marquee />
        <TrustBar />
        <Services />
        <SignaturePackage />
        <Gallery />
        <AboutBarber />
        <WhyChooseUs />
        <Booking />
        <Testimonials />
        <Location />
        <FinalCTA />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileBookingBar />
    </div>
  );
}

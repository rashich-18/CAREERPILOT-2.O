import About from "@/components/About";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";



export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <Features />
    <HowItWorks />
    <About />
    <CTA />
    <Footer />
    
    </>
  );
}
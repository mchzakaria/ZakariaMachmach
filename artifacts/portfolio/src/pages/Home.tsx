import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground cursor-none">
      <ParticleNetwork />
      <div className="pointer-events-none fixed inset-0 z-[1] scanlines opacity-[0.025]" />
      <Navbar />
      <main className="flex-1 flex flex-col relative z-[2]">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

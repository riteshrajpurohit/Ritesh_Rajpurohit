import { useState } from "react";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";

import Contact from "./components/Contact";
import LinkedInModal from "./components/LinkedInModal";

export default function Home() {
  const [isLinkedInOpen, setIsLinkedInOpen] = useState(false);

  return (
    <>
      <main className="bg-[#121212] min-h-screen text-white">
        <NavBar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blogs />
        <Timeline />
        <Contact onOpenLinkedIn={() => setIsLinkedInOpen(true)} />
        <LinkedInModal isOpen={isLinkedInOpen} onClose={() => setIsLinkedInOpen(false)} />
      </main>
    </>
  );
}

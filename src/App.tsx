import { useState, useCallback, useEffect, useRef } from "react";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import LinkedInModal from "./components/LinkedInModal";
import LoadingScreen from "./components/LoadingScreen";
import gsap from "gsap";

const MIN_LOADING_MS = 1800; // Always show loading screen for at least 1.8s

export default function Home() {
  const [isLinkedInOpen, setIsLinkedInOpen] = useState(false);
  // "loading" = screen shown, "exiting" = GSAP sweep-up playing, "done" = unmounted
  const [loadState, setLoadState] = useState<"loading" | "exiting" | "done">("loading");
  const loadingRef = useRef<HTMLDivElement>(null);
  const startTime = useRef(Date.now());

  const beginExit = useCallback(() => {
    if (loadState !== "loading") return;
    setLoadState("exiting");

    // GSAP sweep the loading screen upward off screen
    gsap.to(loadingRef.current, {
      yPercent: -105,
      duration: 0.7,
      ease: "power4.inOut",
      onComplete: () => setLoadState("done"),
    });
  }, [loadState]);

  // Called by Hero → ScrollyVideo when its own first frame "seeked" fires
  const handleVideoReady = useCallback(() => {
    const elapsed = Date.now() - startTime.current;
    const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
    setTimeout(beginExit, remaining);
  }, [beginExit]);

  return (
    <>
      {loadState !== "done" && (
        <div ref={loadingRef} className="fixed inset-0 z-[9999]">
          <LoadingScreen />
        </div>
      )}

      {/* Main content always mounts immediately so video starts loading from frame 1 */}
      <main className="bg-[#121212] min-h-screen text-white">
        <NavBar />
        <Hero onReady={handleVideoReady} />
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

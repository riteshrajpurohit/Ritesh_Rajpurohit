"use client";

import { useScroll, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollyVideoProps {
  src: string;
  onReady?: () => void;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ src, onReady, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const targetProgress = useRef(0);

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(springScroll, "change", (latest) => {
    targetProgress.current = latest;
  });

  // ── Guarantee first frame is painted before revealing hero ───────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const fired = { current: false };

    const fire = () => {
      if (fired.current) return;
      fired.current = true;
      if (onReady) onReady();
    };

    // Safety: always resolve within 5 seconds no matter what
    const safety = setTimeout(fire, 5000);

    const onSeeked = () => {
      // seeked fires AFTER the browser has decoded and painted the new frame ✓
      fire();
    };

    const onLoadedMetadata = () => {
      // Metadata loaded → we know duration → do the priming seek to frame 1
      video.addEventListener("seeked", onSeeked, { once: true });
      video.currentTime = 0.001;
    };

    // If metadata is already there (e.g. local fast load), seek immediately
    if (video.readyState >= 1) {
      video.addEventListener("seeked", onSeeked, { once: true });
      video.currentTime = 0.001;
    } else {
      video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
    }

    return () => {
      clearTimeout(safety);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [onReady]);

  // ── Scrub video on scroll ────────────────────────────────────────────────
  useEffect(() => {
    let rafId: number;

    const updateVideo = () => {
      const video = videoRef.current;
      if (video && !video.seeking && video.duration && video.readyState >= 2) {
        const newTime = targetProgress.current * video.duration;
        if (Math.abs(video.currentTime - newTime) > 0.01) {
          video.currentTime = newTime;
        }
      }
      rafId = requestAnimationFrame(updateVideo);
    };

    rafId = requestAnimationFrame(updateVideo);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] md:h-[600vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
        />
        {children && children(springScroll)}
      </div>
    </div>
  );
}

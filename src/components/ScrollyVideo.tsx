"use client";

import { useScroll, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, ReactNode, useState } from "react";

interface ScrollyVideoProps {
  src: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ src, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Target progress for the video
  const targetProgress = useRef(0);

  // Smooth out the scroll value to prevent sudden jumps
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  // Update target progress on scroll change
  useMotionValueEvent(springScroll, "change", (latest) => {
    targetProgress.current = latest;
  });

  // rAF loop: scrub video to scroll position
  useEffect(() => {
    let rafId: number;

    const updateVideo = () => {
      const video = videoRef.current;

      // Only seek when the browser has finished processing the LAST seek request.
      // Spamming currentTime without this guard queues up decoder work and causes lag.
      if (video && !video.seeking && video.duration && video.readyState >= 2) {
        const currentProgress = video.currentTime / video.duration;
        const diff = targetProgress.current - currentProgress;
        if (Math.abs(diff) > 0.001) {
          video.currentTime = targetProgress.current * video.duration;
        }
      }

      rafId = requestAnimationFrame(updateVideo);
    };

    rafId = requestAnimationFrame(updateVideo);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Mark video as ready once it has at least one decoded frame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If already ready (e.g. from preload by loading screen)
    if (video.readyState >= 2) {
      setVideoReady(true);
      return;
    }

    const onReady = () => setVideoReady(true);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    // Safety net: show video after 3s no matter what
    const fallback = setTimeout(() => setVideoReady(true), 3000);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] md:h-[600vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">

        {/* Solid dark background — always visible, prevents blank white flash */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Video fades in only once it has a decoded frame */}
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: videoReady ? 1 : 0 }}
          muted
          loop={false}
          playsInline
          preload="auto"
        />

        {/* Overlay content */}
        {children && children(springScroll)}
      </div>
    </div>
  );
}

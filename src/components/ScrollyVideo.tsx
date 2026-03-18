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

  // ── Notify parent when FIRST FRAME is decoded and visible ────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReadyFired = { current: false };

    const notify = () => {
      if (onReadyFired.current) return;
      onReadyFired.current = true;

      // Force-seek to first frame so it paints visually
      // (Without this, a video at currentTime=0 that hasn't "started" may stay black)
      try {
        video.currentTime = 0.001;
      } catch (_) { }

      if (onReady) onReady();
    };

    // readyState 4 = HAVE_ENOUGH_DATA (first frame already decoded)
    if (video.readyState >= 4) {
      notify();
      return;
    }

    // 'loadeddata' fires when the FIRST FRAME is fully decoded — exactly what we need
    // to guarantee the video is *visually* ready before revealing the hero
    video.addEventListener("loadeddata", notify, { once: true });

    // Hard safety: never hold the loading screen more than 5s
    const safety = setTimeout(notify, 5000);

    return () => {
      video.removeEventListener("loadeddata", notify);
      clearTimeout(safety);
    };
  }, [onReady]);

  // ── Scrub video on scroll ────────────────────────────────────────────────
  useEffect(() => {
    let rafId: number;

    const updateVideo = () => {
      const video = videoRef.current;
      if (video && !video.seeking && video.duration && video.readyState >= 2) {
        const newTime = targetProgress.current * video.duration;
        // Always push currentTime on load (diff threshold 0 → renders frame 0 immediately)
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
          // autoPlay+pause trick forces browser to decode & paint the first frame
          // on Safari/iOS which otherwise leaves video black until a manual seek
          autoPlay
          onCanPlay={(e) => {
            const v = e.currentTarget;
            v.pause();
            v.currentTime = 0.001;
          }}
        />
        {children && children(springScroll)}
      </div>
    </div>
  );
}

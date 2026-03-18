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

  // ── Notify parent when THIS DOM video element is ready to play ─────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const notify = () => {
      if (onReady) onReady();
    };

    // Already have enough data (readyState >= 3 = HAVE_FUTURE_DATA, can start playing)
    if (video.readyState >= 3) {
      notify();
      return;
    }

    // 'canplay' fires much earlier than 'canplaythrough' and is enough for scrubbing
    video.addEventListener("canplay", notify, { once: true });

    // Safety net: force-complete after 3 seconds regardless
    const safety = setTimeout(notify, 3000);

    return () => {
      video.removeEventListener("canplay", notify);
      clearTimeout(safety);
    };
  }, [onReady]);

  // ── Scrub video on scroll ────────────────────────────────────────────────
  useEffect(() => {
    let rafId: number;

    const updateVideo = () => {
      const video = videoRef.current;
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

  return (
    <div ref={containerRef} className="relative h-[400vh] md:h-[600vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          muted
          loop={false}
          playsInline
          preload="auto"
        />
        {children && children(springScroll)}
      </div>
    </div>
  );
}

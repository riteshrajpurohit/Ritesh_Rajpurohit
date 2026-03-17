"use client";

import { useScroll, useSpring, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollyVideoProps {
  src: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ src, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Target progress for the video
  const targetProgress = useRef(0);

  // Smooth out the scroll value to prevent sudden jumps, but keep it tight
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001
  });

  // Update target progress on scroll change
  useMotionValueEvent(springScroll, "change", (latest) => {
    targetProgress.current = latest;
  });

  useEffect(() => {
    let rafId: number;

    const updateVideo = () => {
      const video = videoRef.current;

      // CRITICAL FIX: Only update currentTime if the browser has finished seeking the LAST requested frame.
      // If we spam video.currentTime 60 times a second without checking !video.seeking,
      // the browser's video decoder gets overwhelmed queueing up I-frames, causing extreme lag/freezing.
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
        {/* Render children (Overlay) passing the springScroll value */}
        {children && children(springScroll)}
      </div>
    </div>
  );
}

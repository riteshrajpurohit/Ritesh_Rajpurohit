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

  // Smooth out the scroll value
  const springScroll = useSpring(scrollYProgress, {
    damping: 100, // Increased damping for smoother transition
    stiffness: 800, // Increased stiffness for better response
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
      if (video && video.duration && video.readyState >= 2) {
        // Simple smoothing to prevent "fighting" between frames
        const currentProgress = video.currentTime / video.duration;
        const diff = targetProgress.current - currentProgress;

        // Only update if there's a significant difference to avoid micro-lag
        if (Math.abs(diff) > 0.002) {
          // Seek directly to the target progress
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

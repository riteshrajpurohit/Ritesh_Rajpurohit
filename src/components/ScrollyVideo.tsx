"use client";

import {
  useScroll,
  useSpring,
  useMotionValueEvent,
  motion,
  MotionValue,
} from "framer-motion";
import { useEffect, useRef, ReactNode, useState } from "react";

interface ScrollyVideoProps {
  src: string;
  poster?: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({
  src,
  poster,
  children,
}: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

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
    restDelta: 0.001,
  });

  // Update target progress on scroll change
  useMotionValueEvent(springScroll, "change", (latest) => {
    targetProgress.current = latest;
  });

  useEffect(() => {
    let rafId: number;

    const updateVideo = () => {
      const video = videoRef.current;

      // Only update video if it's ready and not already seeking
      // This prevents browser lag from queuing up too many I-frames
      if (
        video &&
        !video.seeking &&
        video.duration &&
        video.readyState >= 3 &&
        isReady
      ) {
        const currentProgress = video.currentTime / video.duration;
        const diff = targetProgress.current - currentProgress;

        // Only update if difference is significant enough
        if (Math.abs(diff) > 0.0015) {
          video.currentTime = targetProgress.current * video.duration;
        }
      }

      rafId = requestAnimationFrame(updateVideo);
    };

    rafId = requestAnimationFrame(updateVideo);
    return () => cancelAnimationFrame(rafId);
  }, [isReady]);

  const handleVideoReady = () => {
    setIsReady(true);
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] md:h-[600vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="h-full w-full object-cover"
          muted
          loop={false}
          playsInline
          preload="metadata"
          onLoadedMetadata={handleVideoReady}
          style={{ background: `url(${poster}) center/cover no-repeat` }}
        />
        {/* Render children (Overlay) passing the springScroll value */}
        {children && children(springScroll)}
      </div>
    </div>
  );
}

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
  const [isBuffering, setIsBuffering] = useState(true);

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

      // Only update video if it's ready, loaded enough, and not already seeking
      // This prevents browser lag from queuing up too many I-frames on slow networks
      if (
        video &&
        !video.seeking &&
        video.duration &&
        video.readyState >= 3 &&
        isReady
      ) {
        const currentProgress = video.currentTime / video.duration;
        const diff = targetProgress.current - currentProgress;

        // Only update if difference is significant enough to avoid micro-updates
        // Larger threshold (0.02) = smoother on slow networks, slightly less responsive on fast
        if (Math.abs(diff) > 0.02) {
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
    setIsBuffering(false);
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handleCanPlay = () => {
    setIsBuffering(false);
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] md:h-[600vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">
        <video
          ref={videoRef}
          poster={poster}
          className="h-full w-full object-cover"
          muted
          loop={false}
          playsInline
          preload="metadata"
          onLoadedMetadata={handleVideoReady}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
          onCanPlayThrough={handleCanPlay}
          style={{ background: `url(${poster}) center/cover no-repeat` }}
        >
          <source src="/Ritesh_video_ultra.webm" type="video/webm" />
          <source src={src} type="video/mp4" />
        </video>
        {/* Loading indicator for slow networks */}
        {isBuffering && isReady && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              <p className="text-white text-sm font-medium">Loading video...</p>
            </div>
          </div>
        )}
        {/* Render children (Overlay) passing the springScroll value */}
        {children && children(springScroll)}
      </div>
    </div>
  );
}

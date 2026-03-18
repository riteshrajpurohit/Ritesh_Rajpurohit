"use client";

import ScrollyVideo from "@/components/ScrollyVideo";
import Overlay from "@/components/Overlay";

interface HeroProps {
  onReady?: () => void;
}

export default function Hero({ onReady }: HeroProps) {
  return (
    <div className="relative bg-dot-grid" id="home">
      <ScrollyVideo src="/Ritesh_video_hq.mp4" onReady={onReady}>
        {(progress: any) => <Overlay scrollYProgress={progress} />}
      </ScrollyVideo>
    </div>
  );
}

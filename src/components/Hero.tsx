"use client";

import ScrollyVideo from "@/components/ScrollyVideo";
import Overlay from "@/components/Overlay";

export default function Hero() {
  return (
    <div className="relative bg-dot-grid" id="home">
      <ScrollyVideo src="/Ritesh_video_opt.mp4" poster="/video-poster.jpg">
        {(progress: any) => <Overlay scrollYProgress={progress} />}
      </ScrollyVideo>
    </div>
  );
}

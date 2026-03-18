"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"loading" | "done">("loading");

    const containerRef = useRef<HTMLDivElement>(null);
    const scanLineRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLSpanElement>(null);
    const glitchRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const cornerTLRef = useRef<HTMLDivElement>(null);
    const cornerTRRef = useRef<HTMLDivElement>(null);
    const cornerBLRef = useRef<HTMLDivElement>(null);
    const cornerBRRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        const VIDEO_SRC = "/Ritesh_video_hq.mp4";

        // ── 1. Initial entrance animation ───────────────────────────────────────
        tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        tl.fromTo(
            [cornerTLRef.current, cornerTRRef.current, cornerBLRef.current, cornerBRRef.current],
            { scaleX: 0, scaleY: 0, opacity: 0 },
            { scaleX: 1, scaleY: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
            "-=0.1"
        );
        tl.fromTo(
            glitchRef.current,
            { opacity: 0, y: 20, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power4.out" },
            "-=0.3"
        );

        // ── 2. Scan line animation (looping) ────────────────────────────────────
        gsap.fromTo(
            scanLineRef.current,
            { top: "-2%" },
            { top: "102%", duration: 1.8, ease: "none", repeat: -1 }
        );

        // ── 3. Preload the hero video and track progress ─────────────────────────
        let fake = 0;
        const fakeInterval = setInterval(() => {
            // Fake progress to show the user something is happening, capped at 85%
            if (fake < 85) {
                fake += Math.random() * 4 + 1;
                fake = Math.min(fake, 85);
                setProgress(Math.floor(fake));
            }
        }, 80);

        const video = document.createElement("video");
        video.src = VIDEO_SRC;
        video.preload = "auto";
        video.muted = true;

        const onCanPlayThrough = () => {
            clearInterval(fakeInterval);
            // Animate final progress bar rush to 100
            const start = fake;
            const duration = 600;
            const startTime = performance.now();

            const animate = (now: number) => {
                const elapsed = now - startTime;
                const t = Math.min(elapsed / duration, 1);
                const easedT = 1 - Math.pow(1 - t, 3);
                const current = Math.floor(start + (100 - start) * easedT);
                setProgress(current);
                if (t < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setProgress(100);
                    setPhase("done");
                }
            };
            requestAnimationFrame(animate);
        };

        video.addEventListener("canplaythrough", onCanPlayThrough);

        // Safety net: force complete after max 6 seconds regardless
        const safetyTimer = setTimeout(() => {
            clearInterval(fakeInterval);
            video.removeEventListener("canplaythrough", onCanPlayThrough);
            setProgress(100);
            setPhase("done");
        }, 6000);

        video.load();

        return () => {
            clearInterval(fakeInterval);
            clearTimeout(safetyTimer);
            video.removeEventListener("canplaythrough", onCanPlayThrough);
            tl.kill();
        };
    }, []);

    // ── 4. Exit animation once loading is done ──────────────────────────────
    useEffect(() => {
        if (phase !== "done") return;

        const tl = gsap.timeline({ onComplete });

        // Brief pause at 100%
        tl.to({}, { duration: 0.4 });

        // Glitch out the text
        tl.to(glitchRef.current, {
            filter: "blur(6px)",
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in",
        });

        // Sweep up with a reveal curtain
        tl.to(containerRef.current, {
            yPercent: -105,
            duration: 0.8,
            ease: "power4.inOut",
        }, "-=0.1");
    }, [phase, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#0a0a0a" }}
        >
            {/* Dot grid background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "radial-gradient(circle, #333 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Scan line */}
            <div
                ref={scanLineRef}
                className="absolute left-0 right-0 h-[2px] pointer-events-none"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,68,68,0.4), transparent)",
                    boxShadow: "0 0 20px 4px rgba(255,68,68,0.15)",
                    top: "-2%",
                }}
            />

            {/* Accent ambient glow */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: "600px",
                    height: "600px",
                    background: "radial-gradient(circle, rgba(255,68,68,0.06) 0%, transparent 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Corner brackets */}
            {/* TL */}
            <div ref={cornerTLRef} className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-[#ff4444]/60" style={{ transformOrigin: "top left" }} />
            {/* TR */}
            <div ref={cornerTRRef} className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-[#ff4444]/60" style={{ transformOrigin: "top right" }} />
            {/* BL */}
            <div ref={cornerBLRef} className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-[#ff4444]/60" style={{ transformOrigin: "bottom left" }} />
            {/* BR */}
            <div ref={cornerBRRef} className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-[#ff4444]/60" style={{ transformOrigin: "bottom right" }} />

            {/* Main content */}
            <div ref={glitchRef} className="relative flex flex-col items-center gap-10 px-8 text-center" style={{ opacity: 0 }}>

                {/* Logo / Name */}
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                        <span style={{ color: "#ff4444", fontFamily: "monospace", fontSize: "1.1rem" }}>&lt;</span>
                        <span style={{ fontFamily: "monospace", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#ffffff" }}>
                            RITESH
                        </span>
                        <span style={{ color: "#ff4444", fontFamily: "monospace", fontSize: "1.1rem" }}>/&gt;</span>
                    </div>
                    <p style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#666", textTransform: "uppercase" }}>
                        INITIALIZING_PORTFOLIO_SYSTEM
                    </p>
                </div>

                {/* Percentage display */}
                <div className="flex flex-col items-center gap-3 w-full max-w-xs sm:max-w-sm">
                    <div className="flex items-end justify-between w-full">
                        <span style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#555", textTransform: "uppercase" }}>
                            BOOT_PROGRESS
                        </span>
                        <span
                            ref={percentRef}
                            style={{ fontFamily: "monospace", fontSize: "clamp(2.5rem, 8vw, 4.5rem)", fontWeight: 900, color: "#ff4444", lineHeight: 1, letterSpacing: "-0.03em" }}
                        >
                            {progress}%
                        </span>
                    </div>

                    {/* Progress bar track */}
                    <div className="w-full h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <div
                            ref={progressBarRef}
                            className="h-full rounded-full transition-all duration-100"
                            style={{
                                width: `${progress}%`,
                                background: "linear-gradient(90deg, #ff4444, #ff6b35)",
                                boxShadow: "0 0 12px rgba(255,68,68,0.6)",
                            }}
                        />
                    </div>

                    {/* Status messages */}
                    <div className="w-full text-left" style={{ minHeight: "1.2em" }}>
                        <span style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,68,68,0.7)" }}>
                            {progress < 20 && "// MOUNTING_CORE_SYSTEMS..."}
                            {progress >= 20 && progress < 45 && "// LOADING_HERO_SEQUENCE..."}
                            {progress >= 45 && progress < 70 && "// DECODING_VIDEO_FRAMES..."}
                            {progress >= 70 && progress < 90 && "// WARMING_GPU_PIPELINE..."}
                            {progress >= 90 && progress < 100 && "// READY_TO_LAUNCH..."}
                            {progress === 100 && "// BOOT_COMPLETE ✓"}
                        </span>
                    </div>
                </div>

                {/* Bottom version tag */}
                <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#333" }}>
                    V2.4.0 &nbsp;·&nbsp; STABLE_DEPLOYMENT
                </div>
            </div>
        </div>
    );
}

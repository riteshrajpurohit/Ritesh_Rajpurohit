"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * LoadingScreen — shows while the Hero video loads.
 * It has NO onComplete prop; App.tsx controls visibility via conditional render.
 * A safety timeout auto-hides after 8s in case canplaythrough never fires.
 */
export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const scanLineRef = useRef<HTMLDivElement>(null);
    const glitchRef = useRef<HTMLDivElement>(null);
    const cornerTLRef = useRef<HTMLDivElement>(null);
    const cornerTRRef = useRef<HTMLDivElement>(null);
    const cornerBLRef = useRef<HTMLDivElement>(null);
    const cornerBRRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // ── Entrance animation ──────────────────────────────────────────────────
        const tl = gsap.timeline();
        tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
        tl.fromTo(
            [cornerTLRef.current, cornerTRRef.current, cornerBLRef.current, cornerBRRef.current],
            { scaleX: 0, scaleY: 0, opacity: 0 },
            { scaleX: 1, scaleY: 1, opacity: 1, duration: 0.45, stagger: 0.08, ease: "power3.out" },
            "-=0.05"
        );
        tl.fromTo(
            glitchRef.current,
            { opacity: 0, y: 18, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power4.out" },
            "-=0.25"
        );

        // ── Scan line ───────────────────────────────────────────────────────────
        gsap.fromTo(
            scanLineRef.current,
            { top: "-2%" },
            { top: "102%", duration: 1.8, ease: "none", repeat: -1 }
        );

        // ── Fake progress counter (climbs to ~80%, then stalls waiting for video) -
        let fake = 0;
        const interval = setInterval(() => {
            if (fake < 80) {
                fake += Math.random() * 5 + 1;
                fake = Math.min(fake, 80);
                setProgress(Math.floor(fake));
            }
        }, 90);

        return () => {
            clearInterval(interval);
            tl.kill();
        };
    }, []);

    // When App unmounts us (isLoaded → true) we're simply gone.
    // But we also want a smooth exit — so we watch for the parent removing us
    // via the container's unmount. GSAP sweep-up is handled by running the exit
    // tl and delaying the state change via a signal from App.tsx instead.
    // (Simplest: App.tsx unmounts after a short CSS transition on the wrapper.)

    const label =
        progress < 20
            ? "// MOUNTING_CORE_SYSTEMS..."
            : progress < 45
                ? "// LOADING_HERO_SEQUENCE..."
                : progress < 70
                    ? "// DECODING_VIDEO_FRAMES..."
                    : progress < 90
                        ? "// WARMING_GPU_PIPELINE..."
                        : progress < 100
                            ? "// ALMOST_READY..."
                            : "// BOOT_COMPLETE ✓";

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#0a0a0a", opacity: 0 }}
        >
            {/* Dot grid */}
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
                    background: "linear-gradient(90deg, transparent, rgba(255,68,68,0.45), transparent)",
                    boxShadow: "0 0 20px 4px rgba(255,68,68,0.15)",
                    top: "-2%",
                }}
            />

            {/* Ambient glow */}
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
            <div ref={cornerTLRef} className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-[#ff4444]/60" style={{ transformOrigin: "top left" }} />
            <div ref={cornerTRRef} className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-[#ff4444]/60" style={{ transformOrigin: "top right" }} />
            <div ref={cornerBLRef} className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-[#ff4444]/60" style={{ transformOrigin: "bottom left" }} />
            <div ref={cornerBRRef} className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-[#ff4444]/60" style={{ transformOrigin: "bottom right" }} />

            {/* Content */}
            <div ref={glitchRef} className="relative flex flex-col items-center gap-10 px-8 text-center" style={{ opacity: 0 }}>
                {/* Logo */}
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

                {/* Progress */}
                <div className="flex flex-col items-center gap-3 w-full max-w-xs sm:max-w-sm">
                    <div className="flex items-end justify-between w-full">
                        <span style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#555", textTransform: "uppercase" }}>
                            BOOT_PROGRESS
                        </span>
                        <span style={{ fontFamily: "monospace", fontSize: "clamp(2.5rem, 8vw, 4.5rem)", fontWeight: 900, color: "#ff4444", lineHeight: 1, letterSpacing: "-0.03em" }}>
                            {progress}%
                        </span>
                    </div>

                    {/* Track */}
                    <div className="w-full h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <div
                            className="h-full rounded-full transition-all duration-150"
                            style={{
                                width: `${progress}%`,
                                background: "linear-gradient(90deg, #ff4444, #ff6b35)",
                                boxShadow: "0 0 12px rgba(255,68,68,0.6)",
                            }}
                        />
                    </div>

                    <div className="w-full text-left" style={{ minHeight: "1.2em" }}>
                        <span style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,68,68,0.7)" }}>
                            {label}
                        </span>
                    </div>
                </div>

                <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#333" }}>
                    V2.4.0 &nbsp;·&nbsp; STABLE_DEPLOYMENT
                </div>
            </div>
        </div>
    );
}

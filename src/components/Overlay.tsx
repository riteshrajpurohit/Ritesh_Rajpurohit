"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: any }) {
    // Opacity transforms
    // Opacity transforms - Spanning the full duration more evenly
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.3, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.7, 0.85, 0.95], [0, 1, 1]); // Stays visible at the end

    // Parallax Y movement
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0.3, 0.65], [50, -50]);
    const y3 = useTransform(scrollYProgress, [0.7, 1.0], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center text-[var(--text-primary)]">
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex items-center justify-center p-8"
            >
                <div className="text-center relative">
                    <h1 className="text-6xl md:text-8xl font-bold mb-4 text-[var(--text-primary)]">
                        Ritesh <span className="text-[var(--accent)]">Rajpurohit</span>
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-[var(--border-bright)]" />
                        <p className="mono text-sm tracking-widest text-[var(--text-secondary)]">
                            Full-Stack / AI Engineer
                        </p>
                        <div className="h-[1px] w-12 bg-[var(--border-bright)]" />
                    </div>
                </div>
            </motion.div>

            {/* Section 2: Core Philosophy */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex items-center justify-center md:justify-start p-8 md:p-32"
            >
                <div className="max-w-4xl relative">
                    <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-linear-to-b from-[var(--accent)] to-transparent opacity-40" />
                    <div className="mono text-[var(--text-muted)] mb-4 tracking-widest">01 // THE APPROACH</div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                        Bridging <br />
                        <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-sm decoration-[var(--accent)] underline underline-offset-8">Design Precision</span><br />
                        with <br />
                        <span className="text-[var(--text-secondary)]">Engineering Logic.</span>
                    </h2>
                </div>
            </motion.div>

            {/* Section 3: Value Proposition */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex items-center justify-center md:justify-end p-8 md:p-32 md:text-right"
            >
                <div className="max-w-4xl relative">
                    <div className="absolute -right-8 top-0 bottom-0 w-[2px] bg-linear-to-b from-transparent to-[var(--accent)] opacity-40" />
                    <div className="mono text-[var(--text-muted)] mb-4 tracking-widest">02 // THE OUTPUT</div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
                        Architecting <br />
                        <span className="text-[var(--accent)]">Scalable Products</span><br />
                        & <span className="text-[var(--text-secondary)]">AI Automations.</span>
                    </h2>
                </div>
            </motion.div>
        </div>
    );
}

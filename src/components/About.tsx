"use client";

import { motion, Variants } from "framer-motion";

const STAGGER_CHILD: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Icons = {
    Robot: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
    ),
    Cloud: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>
    ),
    Link: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
    ),
    Monitor: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
    ),
    Network: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" /></svg>
    ),
    Brain: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M19.938 10.5a4 4 0 0 1 .585.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M19.967 17.484A4 4 0 0 1 18 18" /></svg>
    ),
};

const INTERESTS = [
    { title: "Web Development", icon: <Icons.Monitor />, desc: "React, Node, UI/UX" },
    { title: "Cloud Computing", icon: <Icons.Cloud />, desc: "AWS, Architecture" },
    { title: "AI & ML", icon: <Icons.Robot />, desc: "Generative AI, Models" },
    { title: "Web3 & Blockchain", icon: <Icons.Link />, desc: "DApps, Smart Contracts" },
    { title: "Computer Networks", icon: <Icons.Network />, desc: "Protocols, Systems" },
    { title: "Problem Solving", icon: <Icons.Brain />, desc: "Algorithms, Logic" },
];

export default function About() {
    return (
        <section className="relative z-20 bg-[var(--bg-primary)] py-12 md:py-32 px-4 sm:px-6 md:px-12 overflow-hidden bg-dot-grid" id="about">
            <div className="max-w-6xl mx-auto relative z-10 cursor-default">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 md:mb-12"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                        <span className="mono text-[var(--accent)] tracking-[0.2em]">01 // SYSTEM_PROFILE</span>
                    </div>
                </motion.div>

                {/* Main Content Layout */}
                <motion.div
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.1 } }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
                >
                    {/* The Single Big Unified Bio Box */}
                    <motion.div
                        variants={STAGGER_CHILD}
                        className="lg:col-span-8 premium-card p-6 sm:p-10 md:p-12 relative overflow-hidden group bg-[var(--surface)] hover:bg-[var(--surface-hover)] border-t-[3px] border-t-[var(--accent)] flex flex-col justify-center transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-bl-full blur-[40px] -z-10 group-hover:bg-[var(--accent)]/10 transition-colors" />

                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[var(--text-primary)] leading-[1.2] mb-6 tracking-tighter">
                            Hey, I'm <span className="text-[var(--accent)]">Ritesh Rajpurohit</span> — a Full-Stack & AI Engineer who probably spends more time in VS Code than anywhere else.
                        </h2>

                        <div className="space-y-5 text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                            <p>
                                I build things for the web that actually matter. My usual workflow?
                                <br />
                                <span className="inline-flex items-center gap-2 font-mono text-[var(--accent)] text-xs sm:text-sm mt-3 bg-[var(--accent)]/5 px-4 py-2 rounded-lg border border-[var(--accent)]/20 shadow-[0_0_15px_rgba(255,68,68,0.1)]">
                                    <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                                    build &rarr; break &rarr; fix &rarr; improve &rarr; repeat.
                                </span>
                                <br />
                                <span className="text-xs sm:text-sm text-[var(--text-muted)] italic opacity-75 mt-2 inline-block">
                                    (Somehow that counts as productivity.)
                                </span>
                            </p>

                            <p>
                                I get unreasonably excited about <span className="text-[var(--text-primary)] font-medium">clean APIs, smooth UI, and deleting hundreds of lines of useless code</span> — yeah, certified tech nerd. I believe good software should be simple, scalable, and not crash at 3AM just for fun.
                            </p>

                            <p>
                                I work across full-stack development, backend systems, UI/UX, and AI automation — basically turning ideas into real, usable products (and automating the boring stuff). Right now, I’m exploring <span className="text-[var(--text-primary)] font-medium">Web3, cloud systems, and AI workflows</span> — building things that feel a bit like the future.
                            </p>

                            <div className="pt-6 mt-4 border-t border-[var(--border)] group-hover:border-[var(--border-bright)] transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <p className="text-[var(--text-primary)] font-medium leading-relaxed">
                                        I’m an extrovert, love talking ideas, and thrive in that early-stage chaos where things are messy but exciting.
                                        <br />
                                        <span className="text-[var(--accent)] font-bold mt-1 inline-block">If you’re building something cool — I’m already interested.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* The 4 Tech Stack Boxes */}
                    <motion.div variants={STAGGER_CHILD} className="lg:col-span-4 grid grid-cols-2 gap-4">
                        {INTERESTS.map((item, idx) => (
                            <div
                                key={idx}
                                className="premium-card p-5 sm:p-6 group flex flex-col justify-between hover:bg-[var(--surface-hover)] border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-[0_0_15px_rgba(255,68,68,0.15)] transition-all cursor-default relative overflow-hidden h-full min-h-[160px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-start justify-between mb-4 relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white group-hover:scale-110 transition-all shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors shadow-[0_0_10px_rgba(255,68,68,0)] group-hover:shadow-[0_0_10px_rgba(255,68,68,0.8)]" />
                                </div>
                                <div className="relative z-10 mt-auto">
                                    <h3 className="text-[13px] sm:text-[15px] font-bold text-[var(--text-primary)] leading-tight mb-2 group-hover:text-[var(--accent)] transition-colors">{item.title}</h3>
                                    <p className="mono text-[9px] sm:text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}

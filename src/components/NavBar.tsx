"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
    { name: "01 // PROFILE", href: "#about" },
    { name: "02 // STACK", href: "#skills" },
    { name: "03 // PROJECTS", href: "#projects" },
    { name: "04 // BLOGS", href: "#blogs" },
    { name: "05 // TIMELINE", href: "#journey" },
];

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
                const rect = aboutSection.getBoundingClientRect();
                // Show navbar when the top of the About section is nearing the top of the viewport
                // We use 150px so it triggers right before it fully docks
                setScrolled(rect.top <= 150);
            } else {
                setScrolled(window.scrollY > window.innerHeight);
            }
        };

        // Initial check in case page is already scrolled on load
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: scrolled ? 0 : -100, opacity: scrolled ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_4_30px_rgba(0,0,0,0.5)] py-4"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="text-xl md:text-2xl font-black tracking-tighter text-[var(--text-primary)] group flex items-center gap-2 hover:scale-105 transition-transform z-50">
                        <span className="text-[var(--accent)]">{'<'}</span>
                        Ritesh
                        <span className="text-[var(--accent)] group-hover:animate-pulse">{'>'}</span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8 bg-[var(--surface)]/50 px-8 py-3 rounded-full border border-[var(--border)] backdrop-blur-md">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="mono text-[10px] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-3 left-0 w-0 h-[2px] bg-[var(--accent)] shadow-[0_0_10px_rgba(255,68,68,0.8)] group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </div>

                    {/* Right Side Actions & Mobile Toggle */}
                    <div className="flex items-center gap-4 z-50">
                        <a
                            href="#contact"
                            className="hidden md:inline-flex items-center gap-2 btn-secondary hover:text-[var(--accent)] border-[var(--border-bright)] hover:border-[var(--accent)] text-xs transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                            INITIATE_CONTACT
                        </a>

                        <button
                            className="lg:hidden text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors p-2 -mr-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'} absolute`}>
                                <line x1="4" x2="20" y1="12" y2="12" />
                                <line x1="4" x2="20" y1="6" y2="6" />
                                <line x1="4" x2="20" y1="18" y2="18" />
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}>
                                <line x1="18" x2="6" y1="6" y2="18" />
                                <line x1="6" x2="18" y1="6" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Fullscreen Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[90] bg-[var(--bg-primary)]/90 flex items-center justify-center lg:hidden"
                    >
                        <div className="absolute inset-0 bg-dot-grid opacity-20" />

                        <div className="flex flex-col items-center gap-8 relative z-10 w-full px-6">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors flex items-center gap-4 w-full justify-center group"
                                >
                                    <span className="mono text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                                        {link.name.split('//')[0]}
                                    </span>
                                    {link.name.split('//')[1].trim()}
                                </motion.a>
                            ))}

                            <motion.a
                                href="#contact"
                                onClick={() => setMobileMenuOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                                className="mt-8 px-8 py-4 bg-[var(--accent)] text-white rounded-full font-bold shadow-[0_0_20px_rgba(255,68,68,0.4)] flex items-center gap-2"
                            >
                                INITIATE CONTACT
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

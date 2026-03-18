"use client";

import { motion } from "framer-motion";
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


    return (
        <>
            <div className="hidden lg:block">
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
                            <span className="text-[var(--accent)] group-hover:animate-pulse">{'/>'}</span>
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

                        {/* Contact Button */}
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 btn-secondary hover:text-[var(--accent)] border-[var(--border-bright)] hover:border-[var(--accent)] text-xs transition-all"
                        >
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                            INITIATE_CONTACT
                        </a>
                    </div>
                </motion.nav>
            </div>

        </>

    );
}

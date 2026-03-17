"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function LinkedInModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";

            // Load LinkedIn script dynamically
            const script = document.createElement("script");
            script.src = "https://platform.linkedin.com/badges/js/profile.js";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            return () => {
                document.body.style.overflow = "unset";
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="pointer-events-auto bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col items-center"
                        >
                            {/* Header */}
                            <div className="w-full bg-white/5 border-b border-white/5 p-4 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="mono text-[10px] text-gray-400 tracking-widest uppercase">LINKEDIN_CONNECTION_ESTABLISHED</span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 w-full flex flex-col items-center justify-center min-h-[300px] bg-dot-grid relative">
                                <div className="absolute inset-0 bg-blue-500/5 radial-gradient" />

                                {/* LinkedIn Badge Container */}
                                <div className="relative z-10 scale-110 transform transition-transform">
                                    <div
                                        className="badge-base LI-profile-badge"
                                        data-locale="en_US"
                                        data-size="large"
                                        data-theme="dark"
                                        data-type="HORIZONTAL"
                                        data-vanity="ritesh-rajpurohit-8aa27932b"
                                        data-version="v1"
                                    >
                                        <a
                                            className="badge-base__link LI-simple-link opacity-0 absolute"
                                            href="https://www.linkedin.com/in/riteshrajpurohit"
                                        >
                                            Ritesh Rajpurohit
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="w-full bg-white/5 p-4 border-t border-white/5 flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-2.5 rounded-lg border border-white/10 text-xs font-medium hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                                >
                                    CLOSE
                                </button>
                                <a
                                    href="https://www.linkedin.com/in/riteshrajpurohit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-2.5 rounded-lg bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-bold transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2"
                                >
                                    <span>VIEW FULL PROFILE</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

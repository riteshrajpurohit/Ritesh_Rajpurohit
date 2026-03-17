import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface BlogPost {
    id: number;
    title: string;
    description: string;
    url: string;
    cover_image: string | null;
    tag_list: string[];
    readable_publish_date: string;
    public_reactions_count: number;
    reading_time_minutes: number;
}

export default function Blogs() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollPosition = container.scrollLeft;
        const cardWidth = container.children[0]?.clientWidth || 0;
        const gap = 24; // gap-6
        const index = Math.round(scrollPosition / (cardWidth + gap));
        setActiveIndex(index);
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("https://dev.to/api/articles?username=riteshrajpurohit&per_page=15");
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error("Error fetching dev.to blogs:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <section className="relative z-20 bg-[var(--bg-primary)] py-12 md:py-24 px-4 md:px-12 overflow-hidden" id="blogs">
            <div className="max-w-6xl mx-auto relative z-10 cursor-default">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 md:mb-20"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                        <span className="mono text-[var(--accent)] tracking-[0.2em]">04 // KNOWLEDGE_BASE</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-4 tracking-tighter">
                        Technical <span className="text-[var(--accent)]">Writings.</span>
                    </h2>
                    <div className="flex items-end justify-between mb-6">
                        <p className="text-[var(--text-secondary)] text-sm max-w-xl leading-relaxed">
                            Insights, tutorials, and deep dives into modern web development, UI/UX engineering, and software architecture directly from my Dev.to blog.
                        </p>
                        <div className="hidden md:flex gap-4">
                            {/* Buttons moved to carousel wrapper */}
                        </div>
                    </div>
                    <a
                        href="https://dev.to/riteshrajpurohit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 btn-secondary hover:text-[var(--accent)] transition-colors no-underline"
                    >
                        <span>VIEW_ALL_POSTS</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin" />
                    </div>
                ) : error ? (
                    <div className="premium-card p-8 text-center border-[var(--accent)]/30">
                        <p className="text-[var(--text-secondary)]">SYSTEM_ERROR: Unable to retrieve blog feed.</p>
                        <p className="text-sm text-[var(--text-muted)] mt-2">Please visit <a href="https://dev.to/riteshrajpurohit" className="text-[var(--accent)] hover:underline">dev.to/riteshrajpurohit</a> directly.</p>
                    </div>
                ) : (
                    <>
                        <div className="relative group/carousel">
                            {/* Left Scroll Button */}
                            <button
                                onClick={() => scrollContainerRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                                className="hidden md:flex absolute -left-12 xl:-left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[var(--surface)] text-[var(--text-primary)] rounded-full border border-[var(--border)] items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-[var(--accent)] hover:text-[var(--accent)] opacity-0 group-hover/carousel:opacity-100 transition-all duration-300"
                                aria-label="Scroll left"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                            </button>

                            <div
                                ref={scrollContainerRef}
                                onScroll={handleScroll}
                                className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide px-4 md:px-0"
                            >
                                {posts.map((post, index) => (
                                    <motion.a
                                        href={post.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={post.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="w-[85vw] md:w-[340px] shrink-0 snap-center group relative rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/50 hover:shadow-[0_0_30px_rgba(255,68,68,0.15)] transition-all duration-500 flex flex-col h-full"
                                    >
                                        {/* Subtle Glow Overlay on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        {post.cover_image && (
                                            <div className="w-full h-44 md:h-48 overflow-hidden relative border-b border-[var(--border)] group-hover:border-[var(--accent)]/30 transition-colors">
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                                <img
                                                    src={post.cover_image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                                />
                                            </div>
                                        )}

                                        <div className="p-6 md:p-6 flex-1 flex flex-col relative z-20">
                                            {/* Meta Info */}
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="mono text-[10px] font-bold text-[var(--accent)] tracking-wider">
                                                    {post.readable_publish_date.toUpperCase()}
                                                </span>
                                                <span className="mono text-[10px] text-[var(--text-muted)] flex items-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5 group-hover:text-[var(--accent)] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                                    {post.reading_time_minutes} MIN_READ
                                                </span>
                                            </div>

                                            <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] shadow-black/50 transition-colors leading-tight line-clamp-2">
                                                {post.title}
                                            </h3>

                                            <p className="text-sm text-[var(--text-secondary)] mb-8 line-clamp-3 leading-relaxed flex-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                                {post.description}
                                            </p>

                                            {/* Tags & Reactions */}
                                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--border)] group-hover:border-[var(--accent)]/30 transition-colors">
                                                <div className="flex items-center gap-2">
                                                    {post.tag_list.slice(0, 2).map(tag => (
                                                        <span key={tag} className="mono text-[9px] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                {post.public_reactions_count > 0 && (
                                                    <span className="mono text-[10px] font-bold text-[var(--text-primary)] flex items-center gap-1.5 bg-[var(--bg-primary)] px-2.5 py-1 rounded-full group-hover:bg-[var(--accent)]/20 group-hover:text-[var(--accent)] border border-[var(--border)] group-hover:border-[var(--accent)]/50 transition-all">
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        {post.public_reactions_count}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Right Scroll Button */}
                            <button
                                onClick={() => scrollContainerRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                                className="hidden md:flex absolute -right-12 xl:-right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[var(--surface)] text-[var(--text-primary)] rounded-full border border-[var(--border)] items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-[var(--accent)] hover:text-[var(--accent)] opacity-0 group-hover/carousel:opacity-100 transition-all duration-300"
                                aria-label="Scroll right"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>

                        {/* Mobile Scroll Indicators */}
                        <div className="flex justify-center items-center gap-2 mt-4 md:hidden">
                            {posts.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (!scrollContainerRef.current) return;
                                        const container = scrollContainerRef.current;
                                        const cardWidth = container.children[0]?.clientWidth || 0;
                                        const gap = 24;
                                        container.scrollTo({
                                            left: idx * (cardWidth + gap),
                                            behavior: 'smooth'
                                        });
                                    }}
                                    className={`transition-all duration-300 rounded-full ${activeIndex === idx ? 'w-6 h-1.5 bg-[var(--accent)] shadow-[0_0_10px_rgba(255,68,68,0.5)]' : 'w-1.5 h-1.5 bg-[var(--text-muted)] opacity-50'}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

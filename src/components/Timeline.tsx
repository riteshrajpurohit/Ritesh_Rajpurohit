"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TIMELINE_DATA = [
  {
    year: "Dec 2025 - March 2026",
    title: "Full Stack Developer",
    org: "SGCA Technologies Private Limited",
    location: "Noida, India (Hybrid)",
    description: "Architecting and developing scalable full-stack features with a focus on high performance and clean architecture. Ensuring maintainability across core systems.",
    type: "Full-Time",
    tech: ["Web Development", "UI/UX", "Next.js", "Node.js", "Php"]
  },

  {
    year: "Sep 2025 - Jan 2026",
    title: "Software Engineer",
    org: "Hansetu",
    location: "United Kingdom (Remote)",
    description: "Crafting visually refined and user-focused digital interfaces. Leveraging design-first development to build products people genuinely enjoy using.",
    type: "Internship",
    tech: ["Front-End Development", "UI/UX", "Figma", "Design Systems"]
  },
  {
    year: "May 2025 - Jul 2025",
    title: "Frontend Developer",
    org: "Angel Youth Education Pvt. Ltd.",
    location: "Noida, India (On-site)",
    description: "Worked as a Frontend Developer Intern in the Development & Design Dept. Designed user interfaces via Figma and developed responsive web pages using modern frontend tools.",
    type: "Internship",
    tech: ["React.js", "Bootstrap", "Git/GitHub", "HTML/CSS/JS"]
  },
  {
    year: "Apr 2023 - Dec 2024",
    title: "Graphic Designer / Video Editor",
    org: "Freelancing",
    location: "Rajasthan, India (Hybrid)",
    description: "Worked as a freelance Graphics Designer and Video Editor, creating engaging content for personal projects and small clients. Skilled in Graphic Design and Video Editing using modern digital tools.",
    type: "Freelance",
    tech: ["Adobe Photoshop", "Canva", "Adobe Premiere Pro", "Creative Direction"]
  },
];

export default function Timeline() {
  return (
    <section className="relative z-20 bg-[var(--bg-primary)] py-12 md:py-24 px-4 md:px-12 overflow-hidden bg-dot-grid" id="journey">
      <div className="max-w-6xl mx-auto relative z-10 cursor-default">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="mono text-[var(--accent)] tracking-[0.2em]">05 // EXECUTION_LOGS</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-4 tracking-tighter">
            Engineering <span className="text-[var(--accent)]">History.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm max-w-xl leading-relaxed">
            A chronological trace of technical contributions, system architecture
            optimizations, and continuous engineering growth.
          </p>
        </motion.div>

        <div className="relative max-w-4xl">
          {/* Pipeline Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 career-timeline-line opacity-80" />

          <div className="space-y-12">
            {TIMELINE_DATA.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }: { item: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative pl-12 md:pl-20 group"
    >
      {/* Node Point */}
      <div className="absolute left-4 md:left-8 top-3 -translate-x-1/2 z-10 flex items-center justify-center pointer-events-none">
        <div className="career-dot-glow" />
      </div>

      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Compact Date */}
        <div className="md:w-32 pt-1">
          <span className="mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
            {item.year.split(' - ')[0]}
          </span>
        </div>

        {/* Compact Pipeline Card */}
        <div className="flex-1">
          <div className="premium-card p-5 group-hover:bg-[var(--surface-hover)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="mono text-[8px] text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded-sm border border-[var(--accent)]/20 uppercase">
                {item.type || 'EVENT'}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] tracking-wider">
                {item.location}
              </span>
            </div>

            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1 tracking-tight">
              {item.title}
            </h3>
            <p className="text-[13px] font-semibold text-[var(--text-secondary)] mb-4">
              {item.org}
            </p>

            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-6 opacity-80">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {item.tech?.map((t: string) => (
                <span key={t} className="mono text-[8px] text-[var(--text-muted)] bg-white/5 border border-[var(--border)] px-1.5 py-0.5 rounded-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

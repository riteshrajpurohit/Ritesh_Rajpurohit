"use client";

import { motion } from "framer-motion";

const skills = [
  {
    category: "Web Development",
    items: ["React & Next.js", "Node.js & Express", "TypeScript / JavaScript", "Tailwind & UI/UX", "MongoDB & Postgres"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
  },
  {
    category: "Cloud Computing",
    items: ["AWS Ecosystem", "Docker & Kubernetes", "CI/CD Pipelines", "Serverless Architecture", "Nginx & Linux Server"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>
  },
  {
    category: "AI & ML",
    items: ["Generative AI Models", "OpenAI APIs & Prompting", "n8n AI Workflows", "Transformers & LLMs", "Data Engineering Basics"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
  },
  {
    category: "Web3 & Blockchain",
    items: ["Smart Contracts", "DApps Integration", "Ethereum Fundamentals", "Solidity Concepts", "Web3 Content Strategy"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
  },
  {
    category: "Computer Networks",
    items: ["TCP/IP Protocols", "Network Architecture", "REST & GraphQL", "Socket.io / WebSockets", "Systems Security"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" /></svg>
  },
  {
    category: "Logical Problem Solving",
    items: ["Algorithms (C/C++)", "Data Structures", "System Design Thinking", "Code Optimization", "Object Oriented Design"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M19.938 10.5a4 4 0 0 1 .585.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M19.967 17.484A4 4 0 0 1 18 18" /></svg>
  },
];

export default function Skills() {
  return (
    <section className="relative z-20 bg-[var(--bg-primary)] py-12 md:py-24 px-4 md:px-12 overflow-hidden bg-dot-grid" id="skills">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="mono text-[var(--accent)] tracking-[0.2em]">02 // TECH_STACK_ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-4 tracking-tighter">
            Technical <span className="text-[var(--accent)]">Protocol.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm max-w-xl leading-relaxed">
            A modular ecosystem of specialized tools and frameworks, interconnected
            to build resilient, high-performance digital environments.
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* SVG Connections - Purely Visual */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <svg className="w-full h-full opacity-10">
              <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="12.5%" y1="0" x2="12.5%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="premium-card p-5 relative group"
            >
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                {group.icon}
              </div>

              <div className="mono text-[8px] text-[var(--text-muted)] mb-1">MODULE_{index + 1}</div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-5 tracking-tight flex items-center gap-2">
                {group.category}
                <div className="h-[1px] flex-1 bg-[var(--border)]" />
              </h3>

              <div className="space-y-2">
                {group.items.map((item) => (
                  <div key={item} className="flex items-center justify-between group/item">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[var(--border)] group-hover/item:bg-[var(--accent)] transition-colors" />
                      <span className="text-[11px] font-medium text-[var(--text-secondary)] group-hover/item:text-[var(--text-primary)] transition-colors">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Node Connect Points */}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-[var(--border)] bg-[var(--bg-primary)] z-20 group-hover:border-[var(--accent)] transition-colors" />
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-[var(--border)] bg-[var(--bg-primary)] z-20 group-hover:border-[var(--accent)] transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

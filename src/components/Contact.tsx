"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Contact({ onOpenLinkedIn }: { onOpenLinkedIn?: () => void }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // NOTE: You need to replace this access key with your own from https://web3forms.com/
      // Just enter rajpurohitritesh05@gmail.com on their site to get a free key sent to your email.
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f01d9f01-573c-4ca4-a80b-f1f30c5f71ae",
          subject: `New Portfolio Contact from ${formState.name}`,
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        console.error('Error sending message:', result);
        alert('Failed to send message: ' + result.message);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Failed to send message. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-20 bg-[var(--bg-primary)] pt-12 md:pt-24 pb-4 md:pb-8 px-4 md:px-12 overflow-hidden bg-dot-grid" id="contact">
      <div className="max-w-6xl mx-auto relative z-10 cursor-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Column: Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span className="mono text-[var(--accent)] tracking-[0.2em]">06 // COMMS_PROTOCOL</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-[var(--text-primary)] tracking-tighter">
              Let's build <br />
              <span className="text-[var(--accent)]">
                together.
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mb-10 max-w-sm leading-relaxed">
              Currently available for internships, freelance projects,
              and long-term engineering opportunities.
              Let’s create something impactful.
            </p>

            <div className="space-y-4 mb-10">
              <a href="mailto:rajpurohitritesh05@gmail.com" className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <HoverText text="rajpurohitritesh05@gmail.com" />
              </a>

              <div className="flex items-center gap-3" id="social">
                <MagneticSocialLink href="https://github.com/riteshrajpurohit" icon={<GithubIcon />} label="GitHub" />
                <MagneticSocialLink onClick={onOpenLinkedIn} icon={<LinkedinIcon />} label="LinkedIn" />
              </div>
            </div>

            <a
              href="/resume.pdf"
              download
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 no-underline shadow-none hover:shadow-[0_8px_16px_rgba(255,59,59,0.2)]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
              DOWNLOAD_RESUME
            </a>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 premium-card relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 mono text-[8px] text-[var(--text-muted)]">FORM_ID: #CTX_772</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mono text-[9px] text-[var(--text-muted)] mb-1.5 block">01_IDENTIFIER</label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-[var(--bg-primary)]/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-hidden focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-muted)]"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="mono text-[9px] text-[var(--text-muted)] mb-1.5 block">02_COMMS_ENDPOINT</label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-[var(--bg-primary)]/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-hidden focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-muted)]"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="mono text-[9px] text-[var(--text-muted)] mb-1.5 block">03_TRANSMISSION_CONTENT</label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  className="w-full bg-[var(--bg-primary)]/50 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-hidden focus:border-[var(--accent)] transition-colors resize-none placeholder:text-[var(--text-muted)]"
                  placeholder="Describe your project requirement..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 btn-primary disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-6"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    SENDING_PACKET...
                  </>
                ) : isSuccess ? (
                  "TRANSMISSION_COMPLETE"
                ) : (
                  "DISPATCH_MESSAGE"
                )}
              </button>
            </form>
          </motion.div>
        </div>

        <footer className="mt-24 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="mono text-[9px] text-[var(--text-muted)]">&copy; {new Date().getFullYear()} Ritesh Rajpurohit. ALL_RIGHTS_RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="mono text-[9px] text-[var(--text-muted)] flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[var(--accent)]" />
              STABLE_DEPLOYMENT
            </span>
            <span className="mono text-[9px] text-[var(--text-muted)]">V2.4.0</span>
          </div>
        </footer>
      </div>
    </section>
  );
}

function HoverText({ text }: { text: string }) {
  return (
    <div className="hover-link font-medium text-sm">
      <div className="hover-in">
        <span className="opacity-0">{text}</span>
        <div className="absolute top-0 left-0">{text}</div>
        <div className="hover-text-clone">{text}</div>
      </div>
    </div>
  );
}

function MagneticSocialLink({ href, icon, label, onClick }: { href?: string; icon: React.ReactNode; label: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(max-width: 768px)").matches) return;

    let hover = false;
    let currentX = 0;
    let currentY = 0;

    // Setup mousemove inside bounding box
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Calculate distance from center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Pull effect (percentage of distance)
      currentX = (e.clientX - centerX) * 0.3;
      currentY = (e.clientY - centerY) * 0.3;
      hover = true;
    };

    const onMouseLeave = () => {
      currentX = 0;
      currentY = 0;
      hover = false;
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    };

    const onMouseEnter = () => { hover = true; };

    el.addEventListener("mousemove", onMouseMove as EventListener);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseenter", onMouseEnter);

    let animationId: number;
    const loop = () => {
      if (hover) {
        gsap.to(el, { x: currentX, y: currentY, scale: 1.1, duration: 0.2, ease: "power2.out" });
      }
      animationId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      el.removeEventListener("mousemove", onMouseMove as EventListener);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const commonClasses = "w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] hover:shadow-[0_0_15px_rgba(255,68,68,0.3)] transition-colors cursor-pointer";

  if (onClick) {
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} onClick={onClick} className={commonClasses} aria-label={label} data-cursor="icons">
        {icon}
      </button>
    )
  }

  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={commonClasses}
      aria-label={label}
      data-cursor="icons"
    >
      {icon}
    </a>
  );
}

// Icons
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);

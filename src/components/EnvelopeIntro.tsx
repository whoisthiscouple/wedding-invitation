import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "closed" | "opening" | "revealed" | "exiting";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

type GlowParticle = {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
};

const GLOW_PARTICLES: GlowParticle[] = [
  { left: "6%", top: "18%", size: 9, delay: 0, duration: 7 },
  { left: "16%", top: "72%", size: 7, delay: 1.3, duration: 6 },
  { left: "14%", top: "42%", size: 6, delay: 2.2, duration: 8 },
  { left: "88%", top: "14%", size: 8, delay: 0.6, duration: 7 },
  { left: "93%", top: "48%", size: 6, delay: 1.8, duration: 6 },
  { left: "84%", top: "78%", size: 9, delay: 0.2, duration: 8 },
  { left: "60%", top: "92%", size: 7, delay: 2.7, duration: 7 },
  { left: "34%", top: "90%", size: 6, delay: 1.1, duration: 6 },
  { left: "72%", top: "6%", size: 6, delay: 0.9, duration: 7 },
  { left: "48%", top: "6%", size: 5, delay: 2.4, duration: 6 },
  { left: "6%", top: "6%", size: 7, delay: 1.6, duration: 7 },
  { left: "94%", top: "90%", size: 7, delay: 3, duration: 6 },
  { left: "28%", top: "12%", size: 5, delay: 0.4, duration: 8 },
  { left: "8%", top: "58%", size: 6, delay: 1.9, duration: 6 },
  { left: "40%", top: "86%", size: 5, delay: 0.7, duration: 8 },
  { left: "56%", top: "16%", size: 5, delay: 3.2, duration: 7 },
  { left: "26%", top: "62%", size: 5, delay: 2.5, duration: 6 },
];

const nameGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.55, delayChildren: 0.2 } },
};

const nameReveal = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.25, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const ampReveal = {
  hidden: { opacity: 0, scale: 0.4, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.9, ease: [0.34, 1.56, 0.64, 1] as const },
  },
};

type LeafNode = {
  x: number;
  y: number;
  stem: number;
  side: 1 | -1;
  splay: number;
  length: number;
  opacity: number;
  sway: number;
};

const leafNodes: LeafNode[] = [
  { x: 30.3, y: 255.9, stem: -64.6, side: -1, splay: 42, length: 42, opacity: 0.2, sway: 0 },
  { x: 42.5, y: 233.4, stem: -60.4, side: 1, splay: 39, length: 33, opacity: 0.15, sway: 0.9 },
  { x: 54.4, y: 213.3, stem: -57, side: -1, splay: 36, length: 37, opacity: 0.19, sway: 1.7 },
  { x: 81.6, y: 174.1, stem: -54.4, side: 1, splay: 40, length: 39, opacity: 0.16, sway: 0.5 },
  { x: 95, y: 154, stem: -55.5, side: -1, splay: 34, length: 30, opacity: 0.13, sway: 2.3 },
  { x: 109, y: 134.4, stem: -57.2, side: 1, splay: 37, length: 33, opacity: 0.18, sway: 1.2 },
  { x: 146.9, y: 63.4, stem: -62.5, side: -1, splay: 38, length: 31, opacity: 0.16, sway: 2.8 },
  { x: 164.2, y: 36, stem: -51.1, side: 1, splay: 35, length: 27, opacity: 0.14, sway: 0.3 },
  { x: 184.1, y: 17, stem: -36.5, side: -1, splay: 32, length: 24, opacity: 0.17, sway: 1.9 },
];

function BotanicalCorner({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="-16 -30 292 352" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
        <path d="M12 306C36 214 96 170 134 90C152 52 164 24 206 4" strokeWidth="1.3" />
        <path d="M58 208c14-26 15-46 6-66" strokeWidth="0.85" strokeOpacity=".7" />

        {leafNodes.map((leaf, i) => (
          <g key={i} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.stem + leaf.side * leaf.splay})`}>
            <g className="intro-botanical-leaf" style={{ animationDelay: `${leaf.sway}s` }}>
              <g transform={`scale(${leaf.length} ${leaf.length * leaf.side})`}>
                <path d="M0 0 L0.16 -0.008" strokeWidth="0.9" />
                <path
                  d="M0.16 -0.008 C0.4 -0.17 0.74 -0.2 1 -0.02 C0.72 0.17 0.38 0.15 0.16 -0.008 Z"
                  strokeWidth="0.9"
                  fill="currentColor"
                  fillOpacity={leaf.opacity}
                />
                <path d="M0.16 -0.008 C0.45 -0.03 0.74 -0.04 1 -0.02" strokeWidth="0.7" strokeOpacity=".55" />
                <path
                  d="M0.36 -0.022 L0.42 -0.11M0.56 -0.032 L0.64 -0.12M0.34 -0.02 L0.38 0.07M0.55 -0.03 L0.62 0.08"
                  strokeWidth="0.5"
                  strokeOpacity=".33"
                />
              </g>
            </g>
          </g>
        ))}

        <g strokeWidth="0.85" strokeOpacity=".75">
          <path d="M103 141 L96 149M108 134 L100 139M113 143 L106 150" />
          <path d="M150 58 L143 63M156 53 L149 57" />
        </g>
      </g>
      <g fill="currentColor" fillOpacity=".88">
        <circle cx="103" cy="141" r="3" />
        <circle cx="108" cy="134" r="2.4" />
        <circle cx="113" cy="143" r="2.2" />
        <circle cx="150" cy="58" r="2.6" />
        <circle cx="156" cy="53" r="2" />
      </g>
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<Stage>("closed");
  const interactedRef = useRef(false);

  const handleOpen = () => {
    if (interactedRef.current) return;
    interactedRef.current = true;
    setStage("opening");
    window.setTimeout(() => setStage("revealed"), 2200);
    window.setTimeout(() => {
      setStage("exiting");
      window.setTimeout(onComplete, 1200);
    }, 5500);
  };

  const handleEnter = () => {
    if (stage !== "revealed") return;
    setStage("exiting");
    window.setTimeout(onComplete, 1200);
  };

  useEffect(() => {
    if (stage !== "closed") return;
    const onScroll = () => {
      if (interactedRef.current) return;
      interactedRef.current = true;
      setStage("opening");
      window.setTimeout(() => setStage("revealed"), 2200);
      window.setTimeout(() => {
        setStage("exiting");
        window.setTimeout(onComplete, 1200);
      }, 5500);
    };
    window.addEventListener("wheel", onScroll, { passive: true, once: true });
    window.addEventListener("touchmove", onScroll, { passive: true, once: true });
    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [stage, onComplete]);

  useEffect(() => {
    if (stage !== "revealed") return;
    const onScrollOrClick = () => handleEnter();
    window.addEventListener("wheel", onScrollOrClick, { passive: true, once: true });
    window.addEventListener("touchstart", onScrollOrClick, { passive: true, once: true });
    return () => {
      window.removeEventListener("wheel", onScrollOrClick);
      window.removeEventListener("touchstart", onScrollOrClick);
    };
  }, [stage]);

  const sealed = stage !== "opening" && stage !== "revealed";

  return (
    <AnimatePresence>
      {stage !== "exiting" && (
        <motion.div
          className="intro-shell fixed inset-0 z-50"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="intro-glow" />
          <div className="intro-grain" />
          <BotanicalCorner className="intro-botanical intro-botanical-left" />
          <BotanicalCorner className="intro-botanical intro-botanical-right" />

          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {GLOW_PARTICLES.map((p, i) => (
              <span
                key={i}
                className="intro-glow-particle"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                }}
              />
            ))}
          </div>

          <div className="intro-scroll flex min-h-full w-full items-center justify-center">
            <AnimatePresence mode="wait">
              {sealed ? (
                <motion.div
                  key="sealed"
                  className="intro-sealed"
                  initial={{ opacity: 0, scale: 0.96, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -26, filter: "blur(5px)" }}
                  transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="intro-kicker">A gathering beneath the stars</p>

                  <motion.div className="intro-names" aria-label="Roop and Dhvani" variants={nameGroup} initial="hidden" animate="visible">
                    <motion.span className="intro-name-word" variants={nameReveal}>
                      <motion.span className="intro-name-float" animate={{ y: [0, -5, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
                        <span className="text-gold-shine">R</span>oop
                      </motion.span>
                    </motion.span>
                    <motion.span className="intro-names-amp" variants={ampReveal}>&amp;</motion.span>
                    <motion.span className="intro-name-word" variants={nameReveal}>
                      <motion.span className="intro-name-float" animate={{ y: [0, 5, 0] }} transition={{ duration: 6.5, delay: 0.9, repeat: Infinity, ease: "easeInOut" }}>
                        <span className="text-gold-shine">D</span>hvani
                      </motion.span>
                    </motion.span>
                  </motion.div>

                  <p className="intro-sealed-date">4 · DECEMBER · 2026</p>

                  <motion.button
                    type="button"
                    className="intro-envelope"
                    onClick={handleOpen}
                    whileHover={{ y: -9, rotate: -0.5 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Open Roop and Dhvani's wedding invitation"
                  >
                    <div className="intro-envelope-back" />
                    <div className="intro-envelope-mark">R&amp;D</div>
                    <div className="intro-envelope-flap" />
                    <div className="intro-envelope-front" />
                    <div className="intro-seal">
                      <img src="images/stamp-seal-transparent.png" alt="" />
                    </div>
                  </motion.button>

                  <motion.button
                    type="button"
                    className="intro-open-cta"
                    onClick={handleOpen}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="intro-open-cta-label" data-text="Break the seal">
                      Break the seal
                    </span>
                    <motion.span
                      className="intro-open-cta-arrow"
                      variants={{ rest: { x: 0, opacity: 0.75 }, hover: { x: 7, opacity: 1 } }}
                      transition={{ type: "spring", stiffness: 420, damping: 14 }}
                    >
                      &rarr;
                    </motion.span>
                    <motion.span
                      className="intro-open-cta-line"
                      variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </motion.button>

                  <p className="intro-hint">The next chapter unfolds beneath this note.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  className="intro-open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45 }}
                >
                  <motion.div
                    className="intro-envelope-shadow"
                    initial={{ scaleX: 0.55, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.8 }}
                  />
                  <motion.div
                    className="intro-open-envelope"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="intro-open-back" />
                    <div className="intro-open-left" />
                    <div className="intro-open-right" />
                    <motion.div
                      className="intro-open-flap"
                      initial={{ rotateX: 0 }}
                      animate={{ rotateX: 180 }}
                      transition={{ duration: 0.8, ease: [0.34, 1.36, 0.64, 1], delay: 0.06 }}
                    />
                  </motion.div>

                  <motion.article
                    className="intro-paper"
                    initial={{ y: 190, rotate: 2, opacity: 0.3 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 1.05, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className="intro-inner"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.82, duration: 0.7 }}
                    >
                      <img src="images/logo.png" alt="Roop & Dhvani" className="intro-logo" />
                      <p className="intro-overline">INVITING YOU TO JOIN US FOR OUR WEDDING CELEBRATION</p>
                      <h1 className="intro-paper-names">
                        <span className="text-gold-shine">R</span>oop <span className="intro-paper-amp">&amp;</span>{" "}
                        <span className="text-gold-shine">D</span>hvani
                      </h1>
                      <p className="intro-copy">Request the pleasure of your company</p>

                      <div className="intro-rule">
                        <span>*</span>
                      </div>

                      <p className="intro-date">4 — DECEMBER — 2026</p>
                      <p className="intro-place">
                        <span className="text-gold-shine">Join us as we say forever.</span>
                      </p>

                      <div className="intro-venue">
                        <span className="intro-venue-label">THE VENUE</span>
                        <p className="intro-venue-name">Royal Dine - Marigold Banquet Hall</p>
                        <p className="intro-venue-address">
                          Opp. Madhav Atria, Nr. Bagban Kratos Circle
                          <br />
                          Green City Road, Gaurav Path Road
                          <br />
                          Pal Gam, Surat, Gujarat 394510
                        </p>
                      </div>

                      <motion.div
                        className="intro-paper-cta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                      >
<motion.button
  type="button"
  className="intro-enter-btn"
  onClick={handleEnter}
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
>
  <span className="intro-enter-label">ENTER THE CELEBRATION</span>
  <span className="intro-enter-arrow">
    <ArrowUpRight />
  </span>
  <span className="intro-enter-underline" />
</motion.button>
                        <p className="intro-tap-hint">Tap or Scroll</p>
                      </motion.div>
                    </motion.div>
                  </motion.article>

                  <motion.p className="intro-open-caption" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                    An invitation, made with love.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
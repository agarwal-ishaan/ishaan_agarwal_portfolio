import React, { useEffect } from 'react';
import { ArrowRight, Mail, Download } from 'lucide-react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { Marquee, RaceButton } from './editorial';
import { track } from '../lib/track';

const RESUME_HREF = `${import.meta.env.BASE_URL}IshaanAgarwal.pdf`;

const StatItem = ({ value, suffix, label }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
    duration: 1500,
  });

  const displayValue = useTransform(springValue, (current) =>
    current % 1 === 0 ? current.toFixed(0) : current.toFixed(1)
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-1"
    >
      <span className="font-display text-3xl md:text-4xl text-primary-500 inline-flex leading-none">
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </span>
      <span className="hud-label">{label}</span>
    </motion.div>
  );
};

// Slide-up reveal with hard clip — race-graphics style
const ClipReveal = ({ children, delay = 0, className = '' }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: '110%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  </div>
);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section id="home" className="min-h-[92vh] flex flex-col justify-center relative">
      <div className="relative z-10 pt-20 pb-10">

        <motion.div {...fadeUp} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 mb-10 border border-primary-500/40 bg-primary-500/5 px-4 py-1.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-500">
            Open to Data Science &amp; ML roles
          </span>
        </motion.div>

        <h1 className="font-display uppercase leading-[0.86] mb-8 select-none">
          <ClipReveal delay={0.05}>
            <span className="block text-[19vw] sm:text-8xl md:text-[9.5rem] text-text tracking-tight">Ishaan</span>
          </ClipReveal>
          <ClipReveal delay={0.18}>
            <span className="block text-[19vw] sm:text-8xl md:text-[9.5rem] text-outline-volt tracking-tight hover:text-primary-500 transition-colors duration-500">Agarwal</span>
          </ClipReveal>
        </h1>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center gap-4 mb-8">
          <span className="h-[2px] w-12 bg-primary-500" aria-hidden="true" />
          <p className="font-mono text-sm md:text-base uppercase tracking-[0.26em] text-text">
            Data Scientist <span className="text-primary-500">/</span> ML Engineer
          </p>
        </motion.div>

        <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.45 }}
          className="text-lg md:text-xl text-text-soft mb-12 max-w-2xl leading-relaxed">
          Building ML systems that don't just perform well in notebooks, they scale
          in the real world. Cornell MPS, Applied Statistics '26 · Previously at UBS Bank.
        </motion.p>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-16 ml-1">
          <RaceButton href="#projects" variant="solid">
            View Projects <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </RaceButton>
          <RaceButton href={RESUME_HREF} download="IshaanAgarwal.pdf" variant="outline" onClick={() => track('resume-download')}>
            <Download size={15} className="group-hover:-translate-y-0.5 transition-transform duration-300" /> Download Resume
          </RaceButton>
        </motion.div>

        {/* Telemetry stats */}
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.65 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 border-t border-line pt-8 mb-14">
          <StatItem value={1.8} suffix="M+" label="users served" />
          <StatItem value={200} suffix="K" label="API calls / day" />
          <StatItem value={20} suffix="+" label="search indexes" />
          <StatItem value={2.4} suffix="M+" label="records reindexed" />
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.75 }}
          className="flex items-center gap-3">
          <a href="mailto:ia299@cornell.edu" aria-label="Email Ishaan" title="Email" onClick={() => track('click-email')}
            className="p-3 bg-surface border border-line hover:border-primary-500 hover:text-primary-500 transition-colors text-text-soft">
            <Mail size={18} />
          </a>
          <a href="https://linkedin.com/in/ishaan-agw" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn" onClick={() => track('click-linkedin')}
            className="p-3 bg-surface border border-line hover:border-primary-500 hover:text-primary-500 transition-colors text-text-soft">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          <a href="https://github.com/agarwal-ishaan" target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub" onClick={() => track('click-github')}
            className="p-3 bg-surface border border-line hover:border-primary-500 hover:text-primary-500 transition-colors text-text-soft">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
          </a>
        </motion.div>

      </div>

      {/* Full-bleed marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative -mx-[50vw] left-1/2 right-1/2 w-screen -rotate-1 mt-4"
      >
        <Marquee items={['Data Scientist', 'ML Engineer', "Cornell MPS '26", 'Ex-UBS', 'Causal Inference', 'RAG & LLMs']} />
      </motion.div>
    </section>
  );
};

export default Hero;

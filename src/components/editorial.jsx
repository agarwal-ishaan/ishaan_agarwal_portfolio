import React from 'react';
import { motion } from 'framer-motion';

// Scroll-triggered fade-up reveal used across all sections
export const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, ease: 'easeOut', delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// "01 / EXPERIENCE" telemetry-style section marker
export const SectionTag = ({ fig, label }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className="font-display text-2xl text-primary-500 leading-none">{fig}</span>
    <span className="hud-label text-text">/ {label}</span>
    <div className="flex-1 rule self-center" />
    <span className="w-2 h-2 bg-primary-500" aria-hidden="true" />
  </div>
);

// Full-bleed scrolling marquee strip.
// variant: 'volt' (volt bg, black text) | 'dark' (black bg, volt text)
export const Marquee = ({ items, className = '', reverse = false, variant = 'volt', duration = 22 }) => {
  const isVolt = variant === 'volt';

  const strip = (key) => (
    <div key={key} className="flex items-center shrink-0" aria-hidden={key === 'b'}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className={`font-display uppercase text-2xl md:text-3xl px-6 whitespace-nowrap ${isVolt ? 'text-background' : 'text-primary-500'}`}>
            {item}
          </span>
          <span className={`text-xl ${isVolt ? 'text-background/60' : 'text-primary-500/50'}`} aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`py-3 overflow-hidden select-none ${isVolt ? 'bg-primary-500' : 'bg-background border-y-2 border-primary-500/40'} ${className}`}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {strip('a')}
        {strip('b')}
      </div>
    </div>
  );
};

// Skewed race-livery CTA with a sliding fill on hover.
// variant: 'solid' (volt → black sweeps in) | 'outline' (ghost → volt sweeps in)
export const RaceButton = ({ href, download, variant = 'solid', className = '', children, ...rest }) => (
  <a
    href={href}
    {...(download ? { download } : {})}
    {...rest}
    className={`group relative inline-flex items-center overflow-hidden -skew-x-12 border-2 px-9 py-4 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
      variant === 'solid'
        ? 'border-primary-500 bg-primary-500 shadow-volt'
        : 'border-line bg-surface/40 hover:border-primary-500'
    } ${className}`}
  >
    {/* sliding fill */}
    <span
      aria-hidden="true"
      className={`absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${
        variant === 'solid' ? 'bg-background' : 'bg-primary-500'
      }`}
    />
    <span
      className={`relative z-10 skew-x-12 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] font-bold transition-colors duration-300 ${
        variant === 'solid'
          ? 'text-background group-hover:text-primary-500'
          : 'text-text group-hover:text-background'
      }`}
    >
      {children}
    </span>
  </a>
);

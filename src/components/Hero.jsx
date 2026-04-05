import React, { useEffect } from 'react';
import { ArrowRight, Terminal, Mail, Download } from 'lucide-react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

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
      className="flex items-center gap-1.5 text-text-soft"
    >
      <span className="text-primary-600 font-bold inline-flex">
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </span>
      {label}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-[80vh] flex flex-col justify-center relative">

      {/* Decorative localized toys outside main container */}
      {/* <div className="absolute -right-72 top-1/4 hidden xl:block z-40 transform hover:-translate-x-4 transition-transform duration-500">
        <RegressionToy />
      </div> */}

      {/* <div className="absolute -left-72 top-1/3 hidden xl:block z-40 transform hover:translate-x-4 transition-transform duration-500">
        <KFoldToy />
      </div> */}

      <div className="text-left bg-white/70 backdrop-blur-xl p-12 rounded-[3rem] border border-white/60 shadow-2xl relative z-10">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-white shadow-sm mb-6">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          <span className="text-sm font-medium text-text-soft">Open to opportunities · Spring 2026</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text mb-4">
          Ishaan <span className="text-gradient">Agarwal</span>
        </h1>

        <p className="text-2xl font-semibold text-text-soft mb-6">Data Scientist &amp; ML Engineer</p>

        <p className="text-lg text-text-soft mb-10 max-w-3xl leading-relaxed">
          Building ML systems that don't just perform well in notebooks — they scale in the real world. Cornell Masters, Applied Statistics · Previously at UBS Bank.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-10">
          <a href="#projects" className="px-8 py-4 rounded-xl bg-text text-white font-medium hover:bg-text-soft transition-colors flex items-center gap-2 shadow-lg">
            View Projects <ArrowRight size={18} />
          </a>
          <a href="/portfolio_website_march/IshaanAgarwal_Cornell.pdf" target="_blank" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white text-text font-medium hover:bg-gray-50 transition-colors">
            <Download size={18} /> Download Resume
          </a>
        </div>

        {/* Quick stats with count-up animation */}
        <div className="flex flex-wrap items-center justify-start gap-6 mb-10 text-sm">
          <StatItem value={20} suffix="+" label="Search Indexes Managed" />
          <span className="text-gray-300 hidden sm:block">|</span>
          <StatItem value={1.8} suffix="M+" label="Users Served" />
          <span className="text-gray-300 hidden sm:block">|</span>
          <StatItem value={200} suffix="K+" label="Daily API Calls" />
        </div>

        <div className="flex items-center justify-start gap-4">
          <a href="mailto:ia299@cornell.edu" className="p-3 bg-white/80 rounded-full hover:bg-white transition-colors shadow-sm text-text-soft hover:text-primary-600" title="Email">
            <Mail size={20} />
          </a>
          <a href="https://linkedin.com/in/ishaan-agw" target="_blank" rel="noreferrer" className="p-3 bg-white/80 rounded-full hover:bg-white transition-colors shadow-sm text-text-soft hover:text-primary-600" title="LinkedIn">
            {/* LinkedIn SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          <a href="https://github.com/agarwal-ishaan" target="_blank" rel="noreferrer" className="p-3 bg-white/80 rounded-full hover:bg-white transition-colors shadow-sm text-text-soft hover:text-primary-600" title="GitHub">
            {/* GitHub SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;

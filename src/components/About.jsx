import React from 'react';
import profilePic from '../assets/profile_new.jpg';
import { Reveal, SectionTag } from './editorial';

const About = () => {
  return (
    <section id="about" className="py-24 relative scroll-mt-20">
      <Reveal>
        <SectionTag fig="01" label="About" />

        <h2 className="font-display uppercase text-5xl md:text-7xl text-text mb-16 tracking-tight leading-[0.95] max-w-3xl">
          Bridging <span className="text-outline-volt">statistics</span><br />&amp; engineering
        </h2>
      </Reveal>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

        {/* Photo Block — volt offset frame */}
        <Reveal delay={0.1} className="w-full md:w-1/3 aspect-square relative group">
          <div className="absolute inset-0 border-2 border-primary-500 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5 duration-500"></div>
          <div className="relative h-full w-full overflow-hidden border border-line shadow-plate bg-surface">
            <img
              src={profilePic}
              alt="Ishaan Agarwal"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <span className="absolute bottom-2 left-2 font-mono text-[10px] bg-background/85 border border-line px-2 py-0.5 text-primary-500 uppercase tracking-wider">
              driver · IA-01
            </span>
          </div>
        </Reveal>

        {/* Text Block */}
        <Reveal delay={0.2} className="flex-1 space-y-6">
          <p className="text-xl text-text-soft leading-relaxed">
            I'm a <strong className="text-text font-semibold">Data Scientist</strong> and <strong className="text-text font-semibold">ML Engineer</strong> with
            a Master's in <span className="text-primary-500 font-semibold">Applied Statistics</span> from <span className="text-primary-500 font-semibold">Cornell University</span>.
          </p>

          <p className="text-xl text-text-soft leading-relaxed">
            At <strong className="text-text font-semibold">Cornell</strong>, my research focused on <strong className="text-text font-semibold">causal inference with LLM embeddings</strong> —
            testing whether text embeddings can stand in for latent confounders. Previously, I was part of
            the <strong className="text-text font-semibold">UBS Neo</strong> search team at <strong className="text-text font-semibold">UBS Bank</strong>,
            building and scaling search infrastructure that powered a cross-asset trading platform
            for over <span className="text-primary-500 font-bold">1.8 million users</span>.
          </p>
        </Reveal>

      </div>
    </section>
  );
};

export default About;

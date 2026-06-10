import React from 'react';
import manipalLogo from '../assets/manipal_logo.jpg';
import { Reveal, SectionTag } from './editorial';

const Education = () => {
  return (
    <section id="education" className="py-24 relative scroll-mt-20">
      <Reveal>
        <SectionTag fig="03" label="Education" />
      </Reveal>

      <div className="space-y-8">
        {/* Cornell */}
        <Reveal>
          <div className="bg-surface p-8 md:p-10 border border-line shadow-plate relative overflow-hidden group hover:border-primary-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity invert">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/47/Cornell_University_seal.svg" alt="" className="w-24 h-24" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
              <div>
                <h3 className="font-display uppercase text-2xl md:text-3xl text-text tracking-wide">Cornell University</h3>
                <p className="text-primary-500 font-semibold mt-2">Master of Professional Studies, Applied Statistics · GPA: 3.87 / 4.0</p>
                <p className="text-sm text-text-soft mt-1">Ann S. Bowers College of Computing &amp; Information Science</p>
              </div>
              <span className="font-mono text-text-soft font-bold text-xs mt-3 sm:mt-1 uppercase tracking-widest bg-background border border-line px-3 py-1">May 2026</span>
            </div>

            <div>
              <p className="hud-label mb-4">Selected Coursework</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Data Mining & Machine Learning', 'Applied Neural Networks',
                  'Introduction to Deep Learning', 'Bayesian Data Analysis',
                  'Applied Time Series Analysis', 'Modern Regression',
                  'Categorical Data', 'Statistical Computing'
                ].map(c => (
                  <span key={c} className="bg-background border border-line text-text px-3.5 py-1.5 font-mono text-xs hover:border-primary-500 transition-colors">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Manipal */}
        <Reveal>
          <div className="bg-surface p-8 md:p-10 border border-line shadow-glass relative overflow-hidden group hover:border-primary-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <img src={manipalLogo} alt="" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
              <div>
                <h3 className="font-display uppercase text-2xl md:text-3xl text-text tracking-wide">Manipal Institute of Technology</h3>
                <p className="text-primary-500 font-semibold mt-2">B.Tech, Electronics and Communication Engineering</p>
                <p className="text-sm text-text-soft mt-1">Minor: Data Science · Karnataka, India</p>
              </div>
              <span className="font-mono text-text-soft font-bold text-xs mt-3 sm:mt-1 uppercase tracking-widest bg-background border border-line px-3 py-1">Jun 2023</span>
            </div>

            <div>
              <p className="hud-label mb-4">Selected Coursework</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Data Structures & Algorithms', 'Database Systems', 'Regression Models',
                  'Statistical Inference', 'Machine Learning', 'Linux Programming',
                  'Engineering Mathematics I–IV'
                ].map(c => (
                  <span key={c} className="bg-background border border-line text-text px-3.5 py-1.5 font-mono text-xs hover:border-primary-500 transition-colors">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Education;

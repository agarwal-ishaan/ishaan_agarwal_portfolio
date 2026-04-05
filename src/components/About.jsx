import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="">

        {/* Subtitle / Tag */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-[1.5px] bg-primary-400"></div>
          <span className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.3em]">About Me</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-bold text-text mb-16 tracking-tight leading-[1.1] max-w-3xl">
          Bridging <span className="text-primary-500">Statistics</span> &amp; Engineering
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

          {/* Photo Block */}
          <div className="w-full md:w-1/3 aspect-square relative group">
            <div className="absolute inset-0 bg-primary-500 rounded-[2.5rem] rotate-3 transition-transform group-hover:rotate-6 duration-500"></div>
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border-2 border-white shadow-xl">
              <img
                src="src/assets/profile_new.jpg"
                alt="Ishaan Agarwal"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Text Block */}
          <div className="flex-1 space-y-6">
            <p className="text-xl text-text-soft leading-relaxed">
              I'm a <strong className="text-text">Data Scientist</strong> and <strong className="text-text">ML Engineer</strong> pursuing my Master's in <span className="text-primary-600 font-semibold">Applied Statistics</span> at <span className="text-primary-600 font-semibold">Cornell University</span>.
            </p>

            <p className="text-xl text-text-soft leading-relaxed">
              At <strong className="text-text">Cornell</strong>, my research focuses on <strong className="text-text">causal inference with LLM embeddings</strong>. Previously, I was part of the <strong className="text-text">UBS Neo</strong> search team at <strong className="text-text">UBS Bank</strong>, building and scaling search infrastructure that powered a cross-asset trading platform for over <span className="text-primary-600 font-bold">1.8 million users</span>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

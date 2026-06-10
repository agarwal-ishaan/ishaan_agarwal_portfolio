import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Research from './components/Research';
import Projects from './components/Projects';
import MilestoneTrace from './components/MilestoneTrace';
import TerminalContact from './components/TerminalContact';
import { Marquee } from './components/editorial';
import { track } from './lib/track';

function App() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden pt-12">

      <Navbar />

      {/* Milestone Trace — interactive background */}
      <MilestoneTrace />

      <main className="container mx-auto pl-[15px] pr-[30px] w-full max-w-4xl relative z-10 pt-10">
        
        <Hero />
        <About />
        <Experience />
        <Education />
        <Research />

        {/* Crossing skill marquees — full bleed */}
        <div className="relative -mx-[50vw] left-1/2 right-1/2 w-screen my-20 overflow-hidden py-8">
          <div className="-rotate-2">
            <Marquee
              items={['PyTorch', 'Causal Inference', 'RAG', 'LLM Embeddings', 'Azure', 'Kubernetes', 'Deep Learning', 'Time Series']}
              duration={26}
            />
          </div>
          <div className="rotate-2 -mt-4">
            <Marquee
              variant="dark"
              reverse
              items={['Double ML', 'Computer Vision', 'Kafka', 'High-Dim Statistics', 'Scikit-learn', 'HuggingFace', 'PostgreSQL', 'GitLab CI/CD']}
              duration={30}
            />
          </div>
        </div>

        <Projects />
        
        {/* Terminal Contact Footer */}
        <footer id="contact" className="py-24 mt-12 mb-20 relative z-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-display text-2xl text-primary-500 leading-none">06</span>
            <span className="hud-label text-text">/ Contact</span>
            <div className="flex-1 rule self-center" />
            <span className="w-2 h-2 bg-primary-500" aria-hidden="true" />
          </div>
          <div className="mb-12 text-left">
            <h2 className="font-display uppercase text-5xl md:text-7xl mb-6 text-text tracking-tight leading-[0.95]">
              Let's <span className="text-outline-volt">connect</span>
            </h2>
            <p className="text-text-soft text-lg">Open to roles in Data Science, ML Engineering &amp; AI.</p>
            <p className="text-text-soft text-lg">Based in Ithaca, NY</p>
            <div className="flex items-center justify-start gap-4 mt-6 font-mono text-[13px]">
              <a href="mailto:ia299@cornell.edu" onClick={() => track('click-email')} className="text-primary-500 hover:text-primary-300 hover:underline font-medium">ia299@cornell.edu</a>
              <span className="text-text-soft">·</span>
              <a href="https://linkedin.com/in/ishaan-agw" target="_blank" rel="noreferrer" onClick={() => track('click-linkedin')} className="text-primary-500 hover:text-primary-300 hover:underline font-medium">LinkedIn</a>
              <span className="text-text-soft">·</span>
              <a href="https://github.com/agarwal-ishaan" target="_blank" rel="noreferrer" onClick={() => track('click-github')} className="text-primary-500 hover:text-primary-300 hover:underline font-medium">GitHub</a>
            </div>
          </div>
          <TerminalContact />
        </footer>

      </main>
    </div>
  );
}

export default App;

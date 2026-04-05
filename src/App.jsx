import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Research from './components/Research';
import Projects from './components/Projects';
import MilestoneTrace from './components/MilestoneTrace';
import TerminalContact from './components/TerminalContact';

function App() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden pt-12">
      
      {/* Milestone Trace — interactive background */}
      <MilestoneTrace />
 
      <div className="container mx-auto pl-[15px] pr-[30px] w-full max-w-4xl relative z-10 pt-10">
        
        <Hero />
        <About />
        <Experience />
        <Education />
        <Research />
        <Projects />
        
        {/* Terminal Contact Footer */}
        <footer id="contact" className="py-24 mt-12 mb-20 relative z-20">
          <div className="mb-12 text-left">
            <h2 className="text-3xl font-bold mb-4 text-text">Let's Connect</h2>
            <p className="text-text-soft">Open to roles in Data Science, ML Engineering &amp; AI.</p>
            <p className="text-text-soft">Based in Ithaca, NY</p>
            <div className="flex items-center justify-start gap-4 mt-6 text-sm">
              <a href="mailto:ia299@cornell.edu" className="text-primary-600 hover:underline font-medium">ia299@cornell.edu</a>
              <span className="text-gray-300">·</span>
              <a href="https://linkedin.com/in/ishaan-agw" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline font-medium">LinkedIn</a>
              <span className="text-gray-300">·</span>
              <a href="https://github.com/agarwal-ishaan" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline font-medium">GitHub</a>
            </div>
          </div>
          <TerminalContact />
        </footer>

      </div>
    </div>
  );
}

export default App;

import React from 'react';
import manipalLogo from '../assets/manipal_logo.jpg';

const Education = () => {
  return (
    <section id="education" className="py-24 relative scroll-mt-20">
      <div className="">

        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-[1.5px] bg-primary-400"></div>
          <span className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.3em]">Education</span>
        </div>

        <div className="space-y-8">
          {/* Cornell */}
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/60 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/47/Cornell_University_seal.svg" alt="" className="w-24 h-24" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-text">Cornell University</h3>
                <p className="text-primary-600 font-semibold mt-1">Master of Professional Studies, Applied Statistics · GPA: 3.87 / 4.0</p>
                <p className="text-sm text-text-soft mt-1 italic">Ann S. Bowers College of Computing & Information Science</p>
              </div>
              <span className="text-text-soft font-bold text-sm mt-3 sm:mt-1 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">May 2026</span>
            </div>

            <div>
              <p className="text-[10px] font-bold text-text-soft uppercase tracking-[0.2em] mb-4">Selected Coursework</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Modern Regression', 'Categorical Data', 'Data Mining & Machine Learning',
                  'Statistical Computing – I', 'Time Series Analysis',
                  'Bayesian Data Analysis', 'Applied Neural Networks',
                  'Introduction to Deep Learning'
                ].map(c => (
                  <span key={c} className="bg-gray-50 border border-gray-100 text-gray-700 px-4 py-2 rounded-xl text-xs font-medium shadow-sm">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Manipal */}
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/60 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <img src={manipalLogo} alt="Manipal Logo" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-text">Manipal Institute of Technology</h3>
                <p className="text-primary-600 font-semibold mt-1">Bachelor of Technology · GPA: 3.68 / 4.0</p>
                <p className="text-sm text-text-soft mt-1">Minor: Data Science · Karnataka, India</p>
              </div>
              <span className="text-text-soft font-bold text-sm mt-3 sm:mt-1 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">Jun 2023</span>
            </div>

            <div>
              <p className="text-[10px] font-bold text-text-soft uppercase tracking-[0.2em] mb-4">Selected Coursework</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Data Structures & Algorithms', 'Database Systems', 'Regression Models',
                  'Statistical Inference', 'Machine Learning', 'Linux Programming',
                  'Engineering Mathematics I–IV'
                ].map(c => (
                  <span key={c} className="bg-gray-50 border border-gray-100 text-gray-700 px-4 py-2 rounded-xl text-xs font-medium shadow-sm">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

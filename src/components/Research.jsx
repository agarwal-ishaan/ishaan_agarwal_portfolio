import React from 'react';

const GithubIcon = ({ size = 15, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);



const Research = () => {
  return (
    <section id="research" className="py-24 relative scroll-mt-20">
      <div className="">

        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-[1.5px] bg-primary-400"></div>
          <span className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.3em]">Causal Inference Research</span>
        </div>

        <div className="bg-primary-50 border border-primary-100 rounded-[2.5rem] p-12 relative overflow-hidden shadow-xl">
          {/* Subtle background icon for research */}
          <div className="absolute top-10 right-10 opacity-10">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary-800">
              <path d="M12 2v8" /><path d="m4.93 10.93 1.41 1.41" /><path d="M2 18h2" /><path d="M20 18h2" /><path d="m19.07 10.93-1.41 1.41" /><path d="M22 22H2" /><path d="m8 22 4-10 4 10" /><path d="M16 18a4 4 0 0 0-8 0" />
            </svg>
          </div>

          <p className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.3em] mb-4">🎓 Supervised by Prof. Jelena Bradic · Cornell University</p>
          <h3 className="text-3xl font-bold text-slate-900 mb-8 max-w-2xl leading-tight">Embedding-Based Adjustment for Household Economics</h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-3">
              <ul className="list-disc pl-5 text-slate-700 space-y-4 text-sm leading-relaxed font-medium">
                <li>Investigating whether <strong>LLM embeddings</strong> (MiniLM, DistilBERT) of household histories can serve as valid proxies for <strong>latent confounders</strong> in causal models.</li>
                <li>Estimating the <strong>Average Treatment Effect (ATE)</strong> of job-related training on earnings using the Panel Study of Income Dynamics (PSID), applying <strong>Double Machine Learning (DML)</strong> with cross-fitting to control for hidden confounders in observational panel data.</li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-4">Focus Areas</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Causal Inference', 'LLM Embeddings', 'Double ML',
                  'PSID', 'MiniLM', 'DistilBERT'
                ].map(tag => (
                  <span key={tag} className="bg-white border border-primary-100 text-primary-700 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight shadow-sm">{tag}</span>
                ))}
              </div>
              <a
                href="https://github.com/Embedding-Based-Causal-Inference/psid_causal_inference/tree/ishaan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 mt-8 text-sm font-bold text-primary-700 bg-white border border-primary-200 rounded-xl hover:bg-primary-100 hover:border-primary-300 transition-all shadow-sm w-fit group"
              >
                <GithubIcon size={18} className="text-primary-600 group-hover:text-primary-800 transition-colors" />
                View Code
              </a>

            </div>
          </div>

        </div>
      </div>
    </section >
  );
};

export default Research;

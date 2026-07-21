import React from 'react';
import { FileText, Presentation } from 'lucide-react';
import { Reveal, SectionTag } from './editorial';
import { track } from '../lib/track';

const REPORT_HREF = `${import.meta.env.BASE_URL}PSID-Causal-Inference-Report.pdf`;
const POSTER_HREF = `${import.meta.env.BASE_URL}PSID-Causal-Inference-Poster.pdf`;

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

const headlineStats = [
  { value: '2–3.4×', label: 'RMSE reduction vs covariate-only adjustment' },
  { value: '55%', label: 'bias reduction in ATE estimates' },
  { value: '7', label: 'embedding pipelines benchmarked' },
  { value: '6,107', label: 'PSID households, waves 2007–2021' },
];

const Research = () => {
  return (
    <section id="research" className="py-24 relative scroll-mt-20">
      <Reveal>
        <SectionTag fig="04" label="Research" />
      </Reveal>

      <Reveal>
        <div className="bg-surface border border-line border-l-4 border-l-primary-500 p-8 md:p-12 relative overflow-hidden shadow-plate">

          <p className="font-mono text-[11px] font-bold text-primary-500 uppercase tracking-[0.22em] mb-1.5">
            Advisor: Prof. Jelena Bradic · Cornell SDS Project Showcase
          </p>
          <p className="font-mono text-[11px] text-text-soft uppercase tracking-[0.22em] mb-6">
            January – May 2026
          </p>

          <h3 className="font-display uppercase text-3xl md:text-5xl text-text mb-10 max-w-3xl leading-[1.0] tracking-wide">
            Embedding-Based Causal Adjustment for <span className="text-outline-volt">Latent Confounders</span>
          </h3>

          {/* Headline results — telemetry tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line mb-10">
            {headlineStats.map(({ value, label }) => (
              <div key={label} className="bg-background p-4 hover:bg-surface-flat transition-colors">
                <p className="font-display text-3xl md:text-4xl text-primary-500 mb-2 leading-none">{value}</p>
                <p className="font-mono text-[10.5px] leading-snug text-text-soft uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-3">
              <ul className="list-disc pl-5 text-text-soft space-y-4 text-[15px] leading-relaxed marker:text-primary-500">
                <li>Investigated whether <strong className="text-text font-semibold">LLM-derived text embeddings</strong> of household histories can serve as valid proxies for <strong className="text-text font-semibold">latent confounders</strong> (motivation, labor-market attachment) when estimating the causal effect of job training on earnings.</li>
                <li>Designed a <strong className="text-text font-semibold">semi-synthetic benchmark</strong> on 6,107 PSID households with injected latent confounders, spanning linear-to-threshold outcome regimes and constant-to-nonlinear-heterogeneous treatment effects.</li>
                <li>Built and benchmarked <strong className="text-text font-semibold">7 embedding pipelines</strong>: TF-IDF+SVD, Sentence-Transformers (MiniLM), trajectory embeddings over panel waves, multi-view fusion, adversarial overlap-aware projection, and contrastive stability-tuned ensembles.</li>
                <li>Estimated Average Treatment Effects via <strong className="text-text font-semibold">Double Machine Learning with AIPW and cross-fitting</strong>; applied to real PSID data, finding job training has <strong className="text-text font-semibold">no statistically significant effect on household income</strong>.</li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <p className="hud-label mb-4">Focus Areas</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Causal Inference', 'Double ML', 'AIPW', 'LLM Embeddings',
                  'Sentence-Transformers', 'PSID', 'Semi-Synthetic Benchmarks'
                ].map(tag => (
                  <span key={tag} className="bg-background border border-line text-text px-3 py-1.5 font-mono text-[11px] hover:border-primary-500 transition-colors">{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <a
                  href="https://github.com/Embedding-Based-Causal-Inference/psid_causal_inference/tree/ishaan"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('research-code')}
                  className="inline-flex items-center gap-2 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] font-bold text-background bg-primary-500 hover:bg-primary-300 transition-colors w-fit"
                >
                  <GithubIcon size={16} />
                  View Code
                </a>

                <a
                  href={REPORT_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('research-report')}
                  className="inline-flex items-center gap-2 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-text-soft bg-surface border border-line hover:border-primary-500 hover:text-primary-500 transition-colors w-fit"
                >
                  <FileText size={16} />
                  Report
                </a>

                <a
                  href={POSTER_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('research-poster')}
                  className="inline-flex items-center gap-2 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-text-soft bg-surface border border-line hover:border-primary-500 hover:text-primary-500 transition-colors w-fit"
                >
                  <Presentation size={16} />
                  Poster
                </a>
              </div>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
};

export default Research;

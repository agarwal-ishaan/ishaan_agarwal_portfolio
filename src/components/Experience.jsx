import React from 'react';
import { Reveal, SectionTag } from './editorial';

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative scroll-mt-20">
      <Reveal>
        <SectionTag fig="02" label="Experience" />
      </Reveal>

      <Reveal>
        <div className="bg-surface p-8 md:p-12 border border-line shadow-plate relative">
          {/* HUD corner brackets */}
          <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary-500" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary-500" aria-hidden="true" />

          <div className="space-y-14">
            {/* UBS */}
            <div className="relative pl-8 border-l-2 border-primary-500/50">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary-500 border-2 border-surface shadow-volt"></div>
              <div className="flex flex-col sm:flex-row justify-between items-start mb-1.5">
                <h3 className="font-display uppercase text-2xl md:text-3xl text-text tracking-wide">Software Engineer, Data &amp; Search Infrastructure</h3>
                <span className="font-mono text-primary-500 font-bold text-xs mt-2 shrink-0 uppercase tracking-wider">Jan 2023 – Jul 2025</span>
              </div>
              <p className="text-text-soft mb-5 font-mono text-[13px] uppercase tracking-wider">UBS Bank · Internship → Full-Time</p>
              <ul className="list-disc pl-5 text-text-soft space-y-3.5 text-[16.5px] leading-relaxed marker:text-primary-500">
                <li>Prototyped a <strong className="text-text font-semibold">RAG pipeline</strong> to auto-tag 10,000+ financial documents using LLM-generated tags from semantically similar document context, reducing manual tagging effort by <strong className="text-text font-semibold">60%</strong>; placed <strong className="text-text font-semibold">Top 5 in the UBS AI Quest Competition</strong>.</li>
                <li>Owned 20+ Azure Search indexes powering UBS Neo's cross-asset trading platform serving <strong className="text-text font-semibold">1.8M+ users and 200K daily API calls</strong>, with real-time ingestion from Kafka, Tibco, and REST APIs.</li>
                <li>Led end-to-end migration of a business-critical search service to a cloud-native AKS architecture, replacing service-level auth with platform-wide verification; shipped with <strong className="text-text font-semibold">zero production incidents</strong>.</li>
                <li>Implemented region-based data segmentation for the FX search pipeline by extending the Azure Search schema and executing a full reindex of <strong className="text-text font-semibold">2.4M+ financial instrument records</strong>.</li>
                <li>Migrated core services from 29West to gRPC and to Azure Cache for Redis, enabling AKS deployment and maintaining a real-time data-quality monitoring pipeline across upstream sources.</li>
              </ul>
            </div>
          </div>

          {/* ===== SKILLS ===== */}
          <div id="skills" className="mt-16 pt-14 border-t border-line scroll-mt-24">
            <div className="flex items-center gap-4 mb-10">
              <span className="font-display text-2xl text-primary-500 leading-none">02.1</span>
              <h3 className="font-display uppercase text-2xl md:text-3xl text-text tracking-wide">Technical Arsenal</h3>
            </div>

            <div className="grid grid-cols-1 gap-9">
              <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-10">
                <div className="w-40 shrink-0 pt-1.5">
                  <h4 className="hud-label">Languages &amp; Libraries</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'R', 'SQL', 'PyTorch', 'Scikit-learn', 'HuggingFace', 'Pandas', 'NumPy', 'Matplotlib'].map(skill => (
                    <span key={skill} className="bg-background border border-line text-text px-3.5 py-1.5 font-mono text-xs hover:border-primary-500 transition-colors">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-10">
                <div className="w-40 shrink-0 pt-1.5">
                  <h4 className="hud-label">ML &amp; Statistics</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Causal Inference (DML, AIPW)', 'Time Series Forecasting', 'Deep Learning', 'RAG', 'LLM Embeddings', 'Computer Vision', 'High-Dimensional Statistics'].map(skill => (
                    <span key={skill} className="bg-primary-500/10 border border-primary-500/40 text-primary-300 px-3.5 py-1.5 font-mono text-xs hover:bg-primary-500/20 transition-colors">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-10">
                <div className="w-40 shrink-0 pt-1.5">
                  <h4 className="hud-label">Cloud &amp; Infrastructure</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Azure (AKS, Search, Redis)', 'Kafka', 'Kubernetes', 'GitLab CI/CD', 'PostgreSQL', 'REST APIs'].map(skill => (
                    <span key={skill} className="bg-background border border-line text-text px-3.5 py-1.5 font-mono text-xs hover:border-primary-500 transition-colors">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-10">
                <div className="w-40 shrink-0 pt-1.5">
                  <h4 className="hud-label">Credentials</h4>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="w-1.5 h-1.5 bg-primary-500"></div>
                    <a
                      href="https://learn.microsoft.com/api/credentials/share/en-us/IshaanAgarwal-9129/E5D009CEB45B4B87?sharingId=F911EAD6B4565249"
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-semibold text-text leading-none hover:text-primary-500 transition-colors flex items-center gap-1.5 group"
                    >
                      Azure AI Fundamentals (AI-900)
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                    </a>
                    <span className="font-mono text-[10px] text-text-soft bg-surface-flat border border-line px-2 py-1 uppercase tracking-wider">Microsoft</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="w-1.5 h-1.5 bg-primary-500"></div>
                    <span className="text-base font-semibold text-text leading-none">Deep Learning Specialization</span>
                    <span className="font-mono text-[10px] text-text-soft bg-surface-flat border border-line px-2 py-1 uppercase tracking-wider">DeepLearning.AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
};

export default Experience;

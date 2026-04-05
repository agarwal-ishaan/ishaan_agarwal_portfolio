import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative scroll-mt-20">
 
      <div className="">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/60 shadow-2xl">
 
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-[1.5px] bg-primary-400"></div>
            <span className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.3em]">Professional Experience</span>
          </div>

          <div className="space-y-12">
            {/* UBS */}
            <div className="relative pl-8 border-l-2 border-primary-200">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary-500 border-2 border-white shadow-sm"></div>
              <div className="flex flex-col sm:flex-row justify-between items-start mb-2 text-slate-900">
                <h3 className="text-[22px] font-bold">Software Engineer — Data &amp; Search Infrastructure</h3>
                <span className="text-primary-600 font-bold text-[15px] mt-1 sm:mt-1 shrink-0 uppercase tracking-wider">Jan 2023 – Jul 2025</span>
              </div>
              <p className="text-slate-500 font-bold mb-4 text-[17.5px] flex items-center gap-2">Full-Time following internship</p>
              <ul className="list-disc pl-5 text-slate-600 space-y-3.5 text-[17.5px] leading-relaxed font-medium">
                <li>Managed and extended 20+ Azure Search indexes powering UBS Neo's cross-asset trading platform (1.8M+ users), ingesting real-time data via Kafka, Tibco, and REST APIs to support 200K daily API calls.</li>
                <li>Built a RAG pipeline prototype to automate tagging of 10,000+ financial documents using LLM-generated tags from similar document context, reducing manual effort by 60%; Top 5 in UBS AI Quest Competition.</li>
                <li>Led the end-to-end migration of a business-critical search service to a modern cloud-native AKS architecture, eliminating redundant service-level authentication in favor of platform-wide verification, delivered with zero production incidents.</li>
                <li>Implemented region-based data segmentation for the FX search pipeline by extending the Azure Search schema, executing a full reindex of 2.4M+ financial instrument records.</li>
                <li>Migrated a core search service from 29West to gRPC, eliminating .dll dependencies to enable AKS deployment; migrated services to Azure Cache for Redis, maintaining a real-time data quality monitoring pipeline tracking daily ingestion counts across upstream sources.</li>
              </ul>
            </div>

            {/* Cogoport */}
            <div className="relative pl-8 border-l-2 border-slate-200">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-300 border-2 border-white shadow-sm"></div>
              <div className="flex flex-col sm:flex-row justify-between items-start mb-2 text-slate-900">
                <h3 className="text-[22px] font-bold">Data Science Intern</h3>
                <span className="text-primary-600 font-bold text-[15px] mt-1 sm:mt-1 shrink-0 uppercase tracking-wider">Jun 2021 – Jul 2021</span>
              </div>
              <p className="text-slate-500 font-bold mb-4 text-[17.5px]">Cogoport · India · Internship</p>
              <ul className="list-disc pl-5 text-slate-600 space-y-3.5 text-[17.5px] leading-relaxed font-medium">
                <li>Developed <strong>LSTM models</strong> for freight rate forecasting, achieving <strong>RMSE of ~$1,200</strong> against an average freight price of ~$7,000; engineered geospatial features by clustering shipping ports, outperforming baseline ARIMA models.</li>
              </ul>
            </div>
          </div>
 
          {/* ===== TECHNICAL ARSENAL (always shown) ===== */}
          <div id="skills" className="mt-20 pt-20 border-t border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-12 text-left tracking-tight">Technical Arsenal</h3>
            
            <div className="grid grid-cols-1 gap-10 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
                <div className="w-32 shrink-0 pt-1">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Languages &amp; Libraries</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'R', 'SQL', 'Java', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'HuggingFace', 'Spring Boot'].map(skill => (
                    <span key={skill} className="bg-slate-50 border border-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
                <div className="w-32 shrink-0 pt-1">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Cloud, Data &amp; Tools</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Azure', 'Kubernetes', 'Docker', 'Git', 'Kafka', 'Redis', 'PostgreSQL', 'Google Cloud'].map(skill => (
                    <span key={skill} className="bg-primary-50/50 border border-primary-100/50 text-primary-700 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
                <div className="w-32 shrink-0 pt-1">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Methods</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Statistical Analysis', 'Time Series', 'Causal Inference', 'Machine Learning', 'Computer Vision', 'RAG', 'LLMs'].map(skill => (
                    <span key={skill} className="bg-slate-50 border border-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
                <div className="w-32 shrink-0 pt-1">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Credentials</h4>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                    <a 
                      href="https://learn.microsoft.com/api/credentials/share/en-us/IshaanAgarwal-9129/E5D009CEB45B4B87?sharingId=F911EAD6B4565249" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-base font-bold text-slate-900 leading-none hover:text-primary-600 transition-colors flex items-center gap-1.5 group"
                    >
                      Azure AI Fundamentals (AI-900)
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                    </a>
                    <span className="text-[9px] text-slate-400 font-bold bg-slate-100 px-2 py-1 rounded-lg uppercase tracking-wider">Microsoft</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                    <span className="text-base font-bold text-slate-900 leading-none">Deep Learning Specialization</span>
                    <span className="text-[9px] text-slate-400 font-bold bg-slate-100 px-2 py-1 rounded-lg uppercase tracking-wider">DeepLearning.AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
};

export default Experience;

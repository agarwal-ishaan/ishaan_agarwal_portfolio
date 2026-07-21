import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, ArrowUpRight, X, Activity, Database, KeySquare, TrendingUp, DollarSign, MessageSquare, Workflow, Globe, FileText } from 'lucide-react';
import { Reveal, SectionTag } from './editorial';
import { track } from '../lib/track';

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

const projectsData = [
  {
    id: 'caliper',
    title: 'Caliper: The Meter for Your AI Bill',
    description: 'Connects a read-only key to Anthropic and OpenAI and shows exactly where token spend is wasted, in dollars, ranked, with the fix attached.',
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker', 'Anthropic API', 'OpenAI API'],
    icon: <DollarSign className="text-primary-500" size={24} />,
    githubUrl: 'https://github.com/agarwal-ishaan/caliper',
    liveUrl: 'http://136.65.85.105:3000/',
    details: {
      problem: 'Teams running AI features rarely have a clear answer to where their token spend is actually going or how much of it is waste. Provider dashboards show totals, not actionable leaks.',
      dataset: 'Reads the read-only usage and cost reporting APIs Anthropic and OpenAI already expose, no prompts, completions, or customer data ever touched, pulling 90 days of usage history per connected organization.',
      architecture: 'Next.js (App Router) frontend with a FastAPI backend split into four layers: per-provider connectors, a normalizing ingestor, a pure-function analysis engine, and a thin API layer. Postgres for storage, Docker Compose for deployment, encrypted-at-rest API keys, and httpOnly session cookies with CSRF protection.',
      impact: 'Surfaces six dollar-quantified finding types, underused prompt caches, output-heavy calls, Batch-API candidates, premium-tier overuse, top spend drivers, and week-over-week spend spikes, ranked by recoverable monthly spend, with a full pivot-table breakdown and CSV export.'
    }
  },
  {
    id: 'rag-console',
    title: 'From-Scratch RAG System with Eval & Observability Console',
    description: 'A full-stack RAG system with cited answers and an LLM-as-judge evaluation framework, reaching 83% agreement with hand-labeled quality judgments.',
    tags: ['FastAPI', 'ChromaDB', 'Ollama', 'React', 'TypeScript'],
    icon: <MessageSquare className="text-accent-400" size={24} />,
    details: {
      problem: 'RAG pipelines fail silently. A wrong answer could be a retrieval miss, a generation error, or a stale config, with no way to tell which from the outside.',
      dataset: 'A locally indexed corpus in ChromaDB, queried against local LLMs served via Ollama, with every query traced end-to-end.',
      architecture: 'Built from scratch: a FastAPI backend with a config-versioned retrieval and generation pipeline, ChromaDB for vector storage, Ollama for local inference, and a React/TypeScript observability console. 135 automated tests across backend and frontend, developed via TDD.',
      impact: 'An LLM-as-judge framework scores context relevance, faithfulness, and answer relevance per query, reaching 83% agreement with hand-labeled examples, with automated failure attribution across retrieval vs. generation and per-query tracing (chunks, similarity scores, prompts, latency, token counts) tagged to a config-version hash, making regressions attributable to specific pipeline changes.'
    }
  },
  {
    id: 'github-archive-etl',
    title: 'GitHub Archive Dual-Path ETL Pipeline',
    description: 'A streaming and batch ETL pipeline over GitHub Archive event data, ingesting 267,000+ events per hour with YAML-driven dynamic DAG generation in Airflow.',
    tags: ['PySpark', 'Airflow', 'Kafka', 'PostgreSQL'],
    icon: <Workflow className="text-primary-400" size={24} />,
    details: {
      problem: 'GitHub Archive emits a high-volume, continuous stream of event data. Handling it well needs both low-latency processing and reliable historical backfills, without duplicating pipeline logic.',
      dataset: 'The GitHub Archive event stream, ingesting 267,000+ events per hour and curating 112,000+ rows per run into PostgreSQL.',
      architecture: 'A dual-path (streaming and batch) pipeline built with PySpark and Airflow, with YAML-driven dynamic DAG generation to parameterize pipeline configs without code changes, and built-in data-quality gates validating schema and completeness before load.',
      impact: 'Processes 267,000+ events per hour end-to-end with automated schema and completeness validation before load, letting pipeline configs change without touching code.'
    }
  },
  {
    id: 'vision-inductive-bias',
    title: 'Inductive Bias & Sample Efficiency: CNNs vs Vision Transformers',
    description: 'Benchmarked a lightweight ResNet against a Minimal ViT on progressive data splits (1%–100%), quantifying a ~20× data-efficiency gap from spatial inductive bias.',
    tags: ['PyTorch', 'ResNet', 'ViT', 'MNIST-Sign-Language'],
    icon: <Layout className="text-primary-500" size={24} />,
    githubUrl: 'https://github.com/agarwal-ishaan/InductiveVision',
    reportUrl: `${import.meta.env.BASE_URL}CNN-vs-ViT-Report.pdf`,
    details: {
      problem: 'How much does spatial inductive bias (baked into CNNs) help when training data is scarce? Vision Transformers learn everything from scratch, but at what data cost?',
      dataset: 'MNIST Sign Language dataset, evaluated across progressive splits from 1% to 100% with and without data augmentation to measure data hunger of each architecture.',
      architecture: 'Custom lightweight ResNet benchmarked against a Minimal Vision Transformer (ViT). Both trained from scratch under identical hyperparameter regimes per data split.',
      impact: 'CNN reached 84.55% test accuracy with only 5% of training data, while the ViT required the full dataset plus augmentation to reach its 95.66% peak, a ~20× data-efficiency gap demonstrating the value of inductive bias in low-data regimes.'
    }
  },
  {
    id: 'gene-network',
    title: 'High-Dimensional Gene Network Analysis',
    description: 'Estimated sparse precision matrices from breast cancer expression data (p ≫ n) by implementing CLIME and Graphical Lasso from scratch to reconstruct gene regulatory networks.',
    tags: ['Precision Matrix Estimation', 'CLIME', 'Graphical Lasso', 'LDA', 'SCAD'],
    icon: <Server className="text-accent-400" size={24} />,
    reportUrl: `${import.meta.env.BASE_URL}Gene-Network-Report.pdf`,
    details: {
      problem: 'Breast cancer gene expression data is notoriously high-dimensional (p ≫ n). How do you reliably estimate the covariance structure and reconstruct meaningful gene regulatory networks?',
      dataset: 'High-dimensional breast cancer expression datasets with far more features (genes) than observations, a classic sparse estimation challenge.',
      architecture: 'Implemented Constrained L1-Minimization (CLIME) and Graphical Lasso from scratch to estimate sparse precision matrices. Used Linear Discriminant Analysis (LDA) for downstream clinical response prediction.',
      impact: 'Successfully reconstructed gene regulatory networks and benchmarked convergence rates of convex (CLIME) vs. non-convex (SCAD) penalization methods, yielding interpretable biological insights.'
    }
  },
  {
    id: 'freight-lstm',
    title: 'Freight Rate Forecasting with LSTMs',
    description: 'Built LSTM models for freight rate forecasting at Cogoport, reaching an RMSE of ~$1,200 against a ~$7,000 average freight price by engineering geospatial features from clustered shipping ports.',
    tags: ['LSTM', 'Time Series', 'ARIMA', 'Geospatial Clustering'],
    icon: <TrendingUp className="text-primary-400" size={24} />,
    details: {
      problem: 'Freight rates are volatile and highly route-dependent. Accurate forecasts are needed to price shipments competitively without absorbing unexpected cost swings.',
      dataset: 'Historical freight pricing data across shipping routes and ports at Cogoport (India), covering a range of trade lanes.',
      architecture: 'LSTM sequence models for freight rate forecasting, with engineered geospatial features built by clustering shipping ports to capture route-level structure.',
      impact: 'Achieved an RMSE of ~$1,200 against an average freight price of ~$7,000, outperforming baseline ARIMA models.'
    }
  }
];

const Projects = () => {
  const [selectedId, setSelectedId] = useState(null);
  const selectedProject = projectsData.find(item => item.id === selectedId);

  const openProject = (id) => {
    track(`open-${id}`);
    setSelectedId(id);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedId]);

  // Close modal on Escape
  useEffect(() => {
    if (!selectedId) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') setSelectedId(null); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedId]);

  return (
    <section id="projects" className="py-24 relative scroll-mt-20">

      <Reveal>
        <SectionTag fig="05" label="Projects" />
        <div className="mb-16">
          <h2 className="font-display uppercase text-5xl md:text-7xl text-text mb-5 tracking-tight leading-[0.95]">
            Featured <span className="text-outline-volt">Projects</span>
          </h2>
          <p className="text-lg text-text-soft max-w-2xl">
            A selection of my recent work focusing on predictive modeling, infrastructure, and analytics.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08} className="h-full">
            <motion.div
              layoutId={`card-${project.id}`}
              onClick={() => openProject(project.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProject(project.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
              className="group bg-surface p-8 cursor-pointer border border-line hover:border-primary-500/60 hover:shadow-volt hover:-translate-y-1 transition-all duration-300 flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <motion.div layoutId={`icon-${project.id}`} className="h-12 w-12 bg-background border border-line flex items-center justify-center mb-6 group-hover:border-primary-500/60 transition-colors">
                {project.icon}
              </motion.div>

              <motion.h3 layoutId={`title-${project.id}`} className="font-display uppercase text-xl text-text mb-3 leading-tight tracking-wide group-hover:text-primary-500 transition-colors">
                {project.title}
              </motion.h3>

              <motion.p layoutId={`desc-${project.id}`} className="text-text-soft text-[15px] mb-6 flex-grow leading-relaxed">
                {project.description}
              </motion.p>

              <motion.div layoutId={`tags-${project.id}`} className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-background border border-line text-text-soft font-mono text-[11px]">
                    {tag}
                  </span>
                ))}
              </motion.div>

              <div className="flex flex-col gap-3 w-full mt-auto pt-4 border-t border-line">

                <div className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] font-bold text-background bg-primary-500 hover:bg-primary-300 transition-colors group/btn cursor-pointer w-fit">
                  View
                  <ArrowUpRight
                    size={15}
                    className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform"
                  />
                </div>

                {(project.githubUrl || project.liveUrl || project.reportUrl) && (
                  <div className="flex items-center gap-3 flex-wrap">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => { e.stopPropagation(); track(`code-${project.id}`); }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-text-soft bg-surface border border-line hover:border-primary-500 hover:text-primary-500 transition-colors relative z-10"
                      >
                        <GithubIcon size={15} /> Code
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => { e.stopPropagation(); track(`live-${project.id}`); }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-text-soft bg-surface border border-line hover:border-primary-500 hover:text-primary-500 transition-colors relative z-10"
                      >
                        <Globe size={15} /> Live
                      </a>
                    )}

                    {project.reportUrl && (
                      <a
                        href={project.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => { e.stopPropagation(); track(`report-${project.id}`); }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-text-soft bg-surface border border-line hover:border-primary-500 hover:text-primary-500 transition-colors relative z-10"
                      >
                        <FileText size={15} /> Report
                      </a>
                    )}
                  </div>
                )}

              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="relative bg-surface w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-line shadow-plate flex flex-col"
            >
              {/* Header Area */}
              <div className="p-8 md:p-12 border-b border-line bg-surface-flat/60">
                <button
                  onClick={() => setSelectedId(null)}
                  aria-label="Close project details"
                  className="absolute top-6 right-6 p-2 bg-surface border border-line hover:border-primary-500 hover:text-primary-500 text-text-soft rounded-full transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-6 mb-6">
                  <motion.div layoutId={`icon-${selectedProject.id}`} className="h-16 w-16 bg-background border border-line flex items-center justify-center shrink-0">
                    {React.cloneElement(selectedProject.icon, { size: 32 })}
                  </motion.div>
                  <div>
                    <motion.h3 layoutId={`title-${selectedProject.id}`} className="font-display uppercase text-3xl md:text-4xl text-text mb-3 leading-tight tracking-wide">
                      {selectedProject.title}
                    </motion.h3>
                    <motion.div layoutId={`tags-${selectedProject.id}`} className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-background border border-line text-text-soft font-mono text-xs">
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>

                <motion.p layoutId={`desc-${selectedProject.id}`} className="text-xl text-text-soft leading-relaxed max-w-3xl mb-6">
                  {selectedProject.description}
                </motion.p>

                {(selectedProject.githubUrl || selectedProject.liveUrl || selectedProject.reportUrl) && (
                  <div className="flex flex-wrap items-center gap-3">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track(`live-${selectedProject.id}`)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] font-bold text-background bg-primary-500 hover:bg-primary-300 transition-colors"
                      >
                        <Globe size={15} /> Live Site
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track(`code-${selectedProject.id}`)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-text-soft bg-surface border border-line hover:border-primary-500 hover:text-primary-500 transition-colors"
                      >
                        <GithubIcon size={15} /> View Code
                      </a>
                    )}
                    {selectedProject.reportUrl && (
                      <a
                        href={selectedProject.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track(`report-${selectedProject.id}`)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-text-soft bg-surface border border-line hover:border-primary-500 hover:text-primary-500 transition-colors"
                      >
                        <FileText size={15} /> Report
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Body Area - Case Study Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                <div className="space-y-12">
                  <div>
                    <h4 className="flex items-center gap-2 font-display uppercase text-lg text-text mb-3 tracking-wide">
                      <Activity className="text-primary-500" size={20} /> The Problem
                    </h4>
                    <p className="text-text-soft leading-relaxed">{selectedProject.details.problem}</p>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-display uppercase text-lg text-text mb-3 tracking-wide">
                      <Database className="text-accent-400" size={20} /> The Dataset
                    </h4>
                    <p className="text-text-soft leading-relaxed">{selectedProject.details.dataset}</p>
                  </div>
                </div>

                <div className="space-y-12">
                  <div>
                    <h4 className="flex items-center gap-2 font-display uppercase text-lg text-text mb-3 tracking-wide">
                      <KeySquare className="text-text" size={20} /> Architecture
                    </h4>
                    <p className="text-text-soft leading-relaxed">{selectedProject.details.architecture}</p>
                  </div>
                  <div className="p-6 bg-primary-500/10 border border-primary-500/40">
                    <h4 className="flex items-center gap-2 font-display uppercase text-lg text-primary-400 mb-3 tracking-wide">
                      <TrendingUp className="text-primary-500" size={20} /> Key Results
                    </h4>
                    <p className="text-text leading-relaxed">{selectedProject.details.impact}</p>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;

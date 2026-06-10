import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Layout, Server, ArrowUpRight, X, Activity, Database, KeySquare, TrendingUp } from 'lucide-react';
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
    id: 'project-1',
    title: 'Inductive Bias & Sample Efficiency: CNNs vs Vision Transformers',
    description: 'Benchmarked a lightweight ResNet against a Minimal ViT on progressive data splits (1%–100%), quantifying a ~20× data-efficiency gap from spatial inductive bias.',
    tags: ['PyTorch', 'ResNet', 'ViT', 'MNIST-Sign-Language'],
    icon: <Layout className="text-primary-500" size={24} />,
    githubUrl: 'https://github.com/agarwal-ishaan/InductiveVision',
    details: {
      problem: 'How much does spatial inductive bias (baked into CNNs) help when training data is scarce? Vision Transformers learn everything from scratch — but at what data cost?',
      dataset: 'MNIST Sign Language dataset, evaluated across progressive splits from 1% to 100% with and without data augmentation to measure data hunger of each architecture.',
      architecture: 'Custom lightweight ResNet benchmarked against a Minimal Vision Transformer (ViT). Both trained from scratch under identical hyperparameter regimes per data split.',
      impact: 'CNN reached 84.55% test accuracy with only 5% of training data, while the ViT required the full dataset plus augmentation to reach its 95.66% peak — a ~20× data-efficiency gap demonstrating the value of inductive bias in low-data regimes.'
    }
  },
  {
    id: 'project-2',
    title: 'High-Dimensional Gene Network Analysis',
    description: 'Estimated sparse precision matrices from breast cancer expression data (p ≫ n) by implementing CLIME and Graphical Lasso from scratch to reconstruct gene regulatory networks.',
    tags: ['Precision Matrix Estimation', 'CLIME', 'Graphical Lasso', 'LDA', 'SCAD'],
    icon: <Server className="text-accent-400" size={24} />,
    details: {
      problem: 'Breast cancer gene expression data is notoriously high-dimensional (p ≫ n). How do you reliably estimate the covariance structure and reconstruct meaningful gene regulatory networks?',
      dataset: 'High-dimensional breast cancer expression datasets with far more features (genes) than observations — a classic sparse estimation challenge.',
      architecture: 'Implemented Constrained L1-Minimization (CLIME) and Graphical Lasso from scratch to estimate sparse precision matrices. Used Linear Discriminant Analysis (LDA) for downstream clinical response prediction.',
      impact: 'Successfully reconstructed gene regulatory networks and benchmarked convergence rates of convex (CLIME) vs. non-convex (SCAD) penalization methods, yielding interpretable biological insights.'
    }
  },
  {
    id: 'project-3',
    title: 'RAG Pipeline for Financial Document Tagging',
    description: 'Built a Retrieval-Augmented Generation pipeline at UBS to automate the tagging of 10,000+ financial documents, reducing manual effort by 60%. Ranked Top 5 in UBS AI Quest Competition.',
    tags: ['Python', 'LLMs', 'RAG', 'Azure'],
    icon: <LineChart className="text-primary-400" size={24} />,
    details: {
      problem: 'UBS needed to tag over 10,000 financial documents manually — a slow, error-prone process with significant compliance risk and resource cost.',
      dataset: 'Proprietary corpus of 10,000+ internal financial documents spanning multiple asset classes and regulatory categories.',
      architecture: 'Built a RAG pipeline that generates candidate tags by retrieving semantically similar document context and prompting an LLM for classification. Deployed on Azure infrastructure with automated quality gates.',
      impact: 'Reduced manual tagging effort by 60%, accelerating document processing pipelines. Solution ranked in the Top 5 at the competitive internal UBS AI Quest competition.'
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

              <div className="flex items-center gap-3 w-full mt-auto pt-4 border-t border-line">

                <div className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] font-bold text-background bg-primary-500 hover:bg-primary-300 transition-colors group/btn cursor-pointer">
                  View
                  <ArrowUpRight
                    size={15}
                    className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform"
                  />
                </div>

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

                <motion.p layoutId={`desc-${selectedProject.id}`} className="text-xl text-text-soft leading-relaxed max-w-3xl">
                  {selectedProject.description}
                </motion.p>
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

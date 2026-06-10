import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { track } from '../lib/track';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#research', label: 'Research' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const RESUME_HREF = `${import.meta.env.BASE_URL}IshaanAgarwal.pdf`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-background/85 backdrop-blur-xl border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Volt scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-primary-500 origin-left shadow-volt"
        aria-hidden="true"
      />

      <nav aria-label="Main navigation" className="container mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            onClick={closeMenu}
            className="font-display text-2xl tracking-wide text-text hover:text-primary-500 transition-colors uppercase"
          >
            IA<span className="text-primary-500">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-soft hover:text-primary-500 transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href={RESUME_HREF}
              download="IshaanAgarwal.pdf"
              onClick={() => track('resume-download')}
              className="ml-4 inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] font-bold text-background bg-primary-500 hover:bg-primary-300 transition-colors"
            >
              <Download size={13} /> Resume
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 text-text-soft hover:text-primary-500 transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="px-3 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-text-soft hover:text-primary-500 hover:bg-surface transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href={RESUME_HREF}
              download="IshaanAgarwal.pdf"
              onClick={() => { track('resume-download'); closeMenu(); }}
              className="mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] font-bold text-background bg-primary-500 hover:bg-primary-300 transition-colors"
            >
              <Download size={13} /> Download Resume
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

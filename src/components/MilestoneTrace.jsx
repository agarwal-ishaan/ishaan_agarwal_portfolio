import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Axis dimensions — must match App.jsx padding (pt-12 pl-16) ──────────────
const LEFT_W = 64;
const TOP_H = 48;
const TEAL = '#ccff00';
const TRAIL_POINTS = 200;
const SMOOTH = 0.055;
const HIT_RADIUS = 70;
const GRID = 80;

// Year range shown on Y-axis (2019 at top, 2026 at bottom)
const Y_MIN_YEAR = 2019;  // top of axis
const Y_MAX_YEAR = 2026;  // bottom of axis
const Y_PAD_TOP = 0.08;
const Y_PAD_BOT = 0.06;

// Convert a year to a yPct (0 = top of viewport content area, 1 = bottom)
function yearToYPct(year) {
  return Y_PAD_TOP + ((year - Y_MIN_YEAR) / (Y_MAX_YEAR - Y_MIN_YEAR)) * (1 - Y_PAD_TOP - Y_PAD_BOT);
}

// Y-axis year labels to display (2019 at top)
const Y_AXIS_YEARS = [2019, 2021, 2023, 2024, 2025, 2026];

const MILESTONES = [
  {
    id: 'manipal',
    label: 'Manipal',
    sub: 'Bachelors · 2019 – 2023',
    color: '#34d399',
    xPct: 0.08, yPct: yearToYPct(2019),
    scrollIn: 0.00, scrollOut: 0.40,
    popupOverride: { top: 50, left: 10 }
  },
  {
    id: 'cogoport',
    label: 'Cogoport',
    sub: 'Data Science Intern · 2021',
    color: '#2dd4bf',
    xPct: 0.12, yPct: yearToYPct(2021),
    scrollIn: 0.08, scrollOut: 0.52,
  },
  {
    id: 'ubs',
    label: 'UBS Bank',
    sub: 'SDE · Jan 2023 – Jul 2025',
    color: '#60a5fa',
    xPct: 0.88, yPct: yearToYPct(2023),
    scrollIn: 0.25, scrollOut: 0.70,
  },
  {
    id: 'cornell-fall',
    label: "Cornell F'25",
    sub: 'Fall Semester at Cornell · 2025',
    color: '#f59e0b',
    xPct: 0.92, yPct: yearToYPct(2025),
    scrollIn: 0.48, scrollOut: 0.85,
  },
  {
    id: 'cornell-spring',
    label: "Cornell S'26",
    sub: 'Spring Semester at Cornell · 2026',
    color: '#a78bfa',
    xPct: 0.85, yPct: yearToYPct(2026),
    scrollIn: 0.68, scrollOut: 1.00,
    popupOverride: { bottom: 30, right: 20 }
  },
];

function calcNodes() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return MILESTONES.map(m => ({
    ...m,
    px: LEFT_W + m.xPct * (w - LEFT_W),
    py: TOP_H + m.yPct * (h - TOP_H),
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────
const MilestoneTrace = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -400, y: -400 });
  const smoothRef = useRef({ x: -400, y: -400 });
  const trailRef = useRef([]);
  const rafRef = useRef(null);
  const activeRef = useRef(null);

  const [smooth, setSmooth] = useState({ x: -400, y: -400 });
  const [activeMilestone, setActive] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [scrollPct, setScrollPct] = useState(0);

  // Node positions
  const recalc = useCallback(() => setNodes(calcNodes()), []);
  useEffect(() => {
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [recalc]);

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Canvas RAF loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = e => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const s = smoothRef.current;

      s.x += (mouseRef.current.x - s.x) * SMOOTH;
      s.y += (mouseRef.current.y - s.y) * SMOOTH;

      trailRef.current.push({ x: s.x, y: s.y });
      if (trailRef.current.length > TRAIL_POINTS) trailRef.current.shift();

      ctx.clearRect(0, 0, w, h);

      // Grid — faint radar lines on carbon
      ctx.strokeStyle = 'rgba(242,245,247,0.045)';
      ctx.lineWidth = 1;
      for (let x = LEFT_W; x <= w; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, TOP_H); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = TOP_H; y <= h; y += GRID) {
        ctx.beginPath(); ctx.moveTo(LEFT_W, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Trail
      const trail = trailRef.current;
      if (trail.length > 3) {
        for (let i = 1; i < trail.length; i++) {
          const t = i / trail.length;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.strokeStyle = TEAL;
          ctx.globalAlpha = t * 0.9;
          ctx.lineWidth = 1.8;
          ctx.lineCap = 'round';
          ctx.shadowColor = TEAL;
          ctx.shadowBlur = t > 0.88 ? 12 : 0;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      // Cursor dot
      if (s.x > 0) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = TEAL;
        ctx.shadowColor = TEAL;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Dashed drop-lines to axis bars
      if (s.x > LEFT_W && s.y > TOP_H) {
        ctx.setLineDash([4, 6]);
        ctx.strokeStyle = 'rgba(45,212,191,0.18)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x, TOP_H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(LEFT_W, s.y); ctx.stroke();
        ctx.setLineDash([]);
      }

      // Proximity check
      const positions = calcNodes();
      let nearId = null, nearDist = HIT_RADIUS;
      positions.forEach(m => {
        const d = Math.hypot(s.x - m.px, s.y - m.py);
        if (d < nearDist) { nearDist = d; nearId = m.id; }
      });
      if (nearId !== activeRef.current) {
        activeRef.current = nearId;
        setActive(nearId);
      }

      setSmooth({ x: s.x, y: s.y });
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const xPctValue = Math.max(0, ((smooth.x - LEFT_W) / (window.innerWidth - LEFT_W) * 100)).toFixed(0);
  // Derive year from cursor Y position (2019 top, 2026 bottom)
  const cursorYPct = Math.min(1, Math.max(0, (smooth.y - TOP_H) / (window.innerHeight - TOP_H)));
  const cursorYear = Math.round(Y_MIN_YEAR + ((cursorYPct - Y_PAD_TOP) / (1 - Y_PAD_TOP - Y_PAD_BOT)) * (Y_MAX_YEAR - Y_MIN_YEAR));
  const activeAxisYear = Y_AXIS_YEARS.reduce((prev, curr) => Math.abs(curr - cursorYear) < Math.abs(prev - cursorYear) ? curr : prev);
  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none select-none">

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* ── Y-AXIS (LEFT) ── */}
        <div
          className="absolute top-0 bottom-0 left-0 border-r-[1.5px] border-line"
          style={{ width: LEFT_W, background: 'rgba(11,15,20,0.6)' }}
        >
          {/* 1. The Static Year Labels */}
          {Y_AXIS_YEARS.map((year) => {
            const yPct = yearToYPct(year);

            // Sync the year labels with the exact scrollIn percentages of your milestones
            const scrollTriggers = {
              2019: 0.00,
              2021: 0.08,
              2023: 0.25,
              2024: 0.36, // Interpolated gap
              2025: 0.48,
              2026: 0.68,
            };

            // Check if the user has scrolled past this year's trigger point
            const isVisible = scrollPct >= (scrollTriggers[year] || 0);

            return (
              <div
                key={year}
                className="absolute w-full px-2 text-right pointer-events-none"
                style={{
                  top: `calc(${TOP_H}px + ${yPct} * (100vh - ${TOP_H}px))`,
                  transform: 'translateY(-50%)',
                }}
              >
                <AnimatePresence>
                  {isVisible && (
                    <motion.span
                      initial={{ opacity: 0, x: -15 }} // Starts slightly to the left and invisible
                      animate={{ opacity: 1, x: 0 }}   // Slides into place
                      exit={{ opacity: 0, x: -15 }}    // Slides back out if you scroll up
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter inline-block"
                    >
                      {year}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* 2. The Dynamic Hover Tracker */}
          {smooth.y > TOP_H && (
            <div
              className="absolute right-0 flex items-center pointer-events-none z-50 transition-opacity duration-200"
              style={{
                top: smooth.y,
                transform: 'translateY(-50%)',
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: TEAL,
                  background: '#0b0f14',
                  border: `1px solid ${TEAL}66`,
                  borderRadius: 4,
                  padding: '1px 6px',
                  marginRight: 2,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                }}
              >
                {cursorYear}
              </span>
              {/* Small horizontal tick pointing at the line */}
              <div style={{ width: 5, height: 1.5, background: TEAL, opacity: 0.6 }} />
            </div>
          )}
        </div>
      </div>

      {/* ── Live Scroll Phase badge (nav bar itself lives in Navbar.jsx) ── */}
      <div className="fixed top-0 left-0 right-0 h-16 z-[60] pointer-events-none select-none">
        {smooth.x > LEFT_W && (
          <div className="absolute bottom-0 flex flex-col items-center" style={{ left: smooth.x, transform: 'translateX(-50%)' }}>
            <span style={{
              fontSize: 9, fontFamily: 'monospace', fontWeight: 700,
              color: TEAL, background: '#0b0f14',
              border: `1px solid ${TEAL}66`, borderRadius: 4,
              padding: '1px 6px', marginBottom: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }}>{(scrollPct * 100).toFixed(0)}%</span>
            <div style={{ width: 1, height: 5, background: TEAL, opacity: 0.6 }} />
          </div>
        )}
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        {/* Milestone nodes — scroll-triggered */}
        {nodes.map((m, idx) => {
          const isActive = activeMilestone === m.id;
          const isVisible = scrollPct >= m.scrollIn && scrollPct <= m.scrollOut;
          const flipLeft = m.xPct > 0.60;
          const flipTop = m.yPct < 0.35;

          return (
            <AnimatePresence key={m.id}>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                  style={{ position: 'absolute', left: m.px, top: m.py, transform: 'translate(-50%,-50%)' }}
                >
                  {/* Pulse ring */}
                  <motion.div
                    animate={{ scale: [1, 1.9, 1], opacity: [0.28, 0, 0.28] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.8 }}
                    style={{
                      width: 20, height: 20, borderRadius: '50%',
                      border: `1.5px solid ${m.color}`,
                      position: 'absolute', top: -10, left: -10,
                    }}
                  />

                  {/* Dot */}
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: isActive ? m.color : m.color + '55',
                    border: `2px solid ${m.color}`,
                    boxShadow: isActive ? `0 0 16px ${m.color}, 0 0 32px ${m.color}44` : 'none',
                    transition: 'all 0.22s ease',
                    position: 'relative', zIndex: 1,
                    pointerEvents: 'auto',
                    cursor: 'pointer'
                  }} />

                  {/* Always-visible label pill */}
                  <div style={{
                    position: 'absolute', top: 14, left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(11,15,20,0.92)',
                    border: `1px solid ${m.color}55`,
                    borderRadius: 5,
                    padding: '2px 8px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.4)',
                  }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: m.color, letterSpacing: '0.04em' }}>
                      {m.label}
                    </span>
                  </div>

                  {/* Active glow */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="glow"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 480, damping: 24 }}
                        style={{
                          width: 20, height: 20, borderRadius: '50%',
                          background: m.color, position: 'absolute', top: -10, left: -10,
                          boxShadow: `0 0 22px ${m.color}, 0 0 55px ${m.color}44`, zIndex: 2,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Hover popup */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="popup"
                        initial={{ opacity: 0, scale: 0.9, y: flipTop ? -6 : 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: flipTop ? -6 : 6 }}
                        transition={{ duration: 0.16 }}
                        style={{
                          position: 'absolute',
                          ...(m.popupOverride ? m.popupOverride : {
                            ...(flipTop ? { bottom: 30 } : { top: 38 }),
                            ...(flipLeft ? { right: -6 } : { left: -6 }),
                          }),
                          background: 'rgba(5,8,15,0.95)',
                          border: `1px solid ${m.color}55`,
                          borderRadius: 10,
                          padding: '10px 14px',
                          whiteSpace: 'nowrap',
                          boxShadow: `0 6px 36px rgba(0,0,0,0.45), 0 0 18px ${m.color}18`,
                          backdropFilter: 'blur(14px)',
                          WebkitBackdropFilter: 'blur(14px)',
                          zIndex: 60,
                          minWidth: 185,
                        }}
                      >
                        <p style={{ color: m.color, fontSize: 12, fontWeight: 800, fontFamily: 'monospace', marginBottom: 4 }}>
                          {m.label}
                        </p>
                        <p style={{ color: 'rgba(148,163,184,0.9)', fontSize: 10, fontFamily: 'monospace', margin: 0 }}>
                          {m.sub}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </>
  );
};

export default MilestoneTrace;

import React, { useState, useEffect } from 'react';

const CursorGraphOverlay = () => {
  const [points, setPoints] = useState([]);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [dimensions, setDimensions] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [scrollY, setScrollY] = useState(window.scrollY);

  // Handle Resize for Axes
  useEffect(() => {
    const handleResize = () => setDimensions({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Scroll to shift history
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse Follower & Trail Logic
  useEffect(() => {
    let lastPointTime = 0;
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const now = Date.now();
      // Drop a moving point slightly staggered for discrete sampling look
      if (now - lastPointTime > 40) {
        setPoints(prev => {
          const newPoints = [...prev, { x: e.pageX, y: e.pageY, time: now }];
          // Keep a massive history for the long tail but not endless
          if (newPoints.length > 300) {
            return newPoints.slice(newPoints.length - 300);
          }
          return newPoints;
        });
        lastPointTime = now;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Extremely slow fade out when inactive so the history stays much longer
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        if (prev.length > 0) {
          const now = Date.now();
          // Drop points older than 10 seconds
          return prev.filter(p => now - p.time < 10000);
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Dynamically map absolute page coordinates back to strictly viewport space
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y - scrollY}`).join(' ');

  // Compute fake data metrics to display dynamically on the axes
  // The scale could represent something like X: "Time" and Y: "Loss" or "Impact"
  const xValue = ((mousePos.x / dimensions.w) * 100).toFixed(2);
  const yValue = ((1 - (mousePos.y / dimensions.h)) * 100).toFixed(2); // Invert Y so up is positive

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      
      {/* Background Grid - Scrolling along by pushing background position */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', 
             backgroundSize: '100px 100px',
             backgroundPositionY: `-${scrollY % 100}px` 
           }}>
      </div>

      {/* 2. Global SVG Canvas for Lines */}
      <svg className="absolute inset-0 w-full h-full">

        {/* Draw Main Line Graph Trajectory */}
        {points.length > 1 && (
          <path 
            d={pathData} 
            fill="none" 
            stroke="url(#trail-gradient)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="drop-shadow-lg"
          />
        )}

        {/* Draw Scatter Plot Nodes (Discrete data samples dropped along the line) */}
        {points.map((p, i) => {
          // Only draw a node every 5 points to represent "samples"
          if (i % 5 !== 0) return null;
          
          // Calculate fading opacity based on position in array
          const opacity = Math.min(1, (i / points.length) * 1.5);
          
          return (
            <circle 
              key={`node-${p.time}`}
              cx={p.x} 
              cy={p.y - scrollY} 
              r="3" 
              fill="white" 
              stroke="#0ea5e9" 
              strokeWidth="1.5"
              opacity={opacity}
              className="drop-shadow-sm"
            />
          );
        })}
        
        {/* Drop lines (Crosshairs) connecting cursor to the axes */}
        {mousePos.x > 0 && (
          <>
            {/* Vertical drop to X-Axis (top) */}
            <line x1={mousePos.x} y1={mousePos.y} x2={mousePos.x} y2={0} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            {/* Horizontal drop to Y-Axis (left) */}
            <line x1={mousePos.x} y1={mousePos.y} x2={0} y2={mousePos.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
          </>
        )}

        {/* Trail Gradient Definitions */}
        <defs>
          <linearGradient id="trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="30%" stopColor="#0ea5e9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* 2. Left Y-Axis */}
      <div className="absolute left-0 top-0 bottom-0 w-16 border-r-2 border-gray-200 bg-white/50 backdrop-blur-sm flex items-center justify-center">
        <div className="absolute top-1/4 w-3 h-[2px] bg-gray-300 right-0"></div>
        <div className="absolute top-2/4 w-3 h-[2px] bg-gray-300 right-0"></div>
        <div className="absolute top-3/4 w-3 h-[2px] bg-gray-300 right-0"></div>
        <span className="transform -rotate-90 text-[10px] uppercase font-bold text-gray-400 tracking-widest whitespace-nowrap">Impact Trajectory</span>
        
        {/* Live Y-Axis Marker */}
        {mousePos.y > 0 && (
          <div 
            className="absolute right-0 w-20 flex items-center justify-end pr-2 pointer-events-none transform -translate-y-1/2" 
            style={{ top: mousePos.y }}
          >
            <span className="text-[10px] font-mono text-primary-600 font-bold bg-white px-2 py-0.5 rounded border border-primary-200 shadow-sm">
              {yValue}
            </span>
          </div>
        )}
      </div>

      {/* 3. Top X-Axis */}
      <div className="absolute top-0 left-0 right-0 h-12 border-b-2 pl-16 border-gray-200 bg-white/50 backdrop-blur-sm flex items-center">
        <div className="absolute left-1/4 h-2 w-[2px] bg-gray-300 bottom-0"></div>
        <div className="absolute left-2/4 h-2 w-[2px] bg-gray-300 bottom-0"></div>
        <div className="absolute left-3/4 h-2 w-[2px] bg-gray-300 bottom-0"></div>
        <span className="ml-8 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Time (Epochs)</span>

        {/* Live X-Axis Marker */}
        {mousePos.x > 0 && (
          <div 
            className="absolute bottom-0 h-10 flex flex-col items-center justify-end pb-1 pointer-events-none transform -translate-x-1/2" 
            style={{ left: mousePos.x }}
          >
             <span className="text-[10px] font-mono text-primary-600 font-bold bg-white px-2 py-0.5 rounded border border-primary-200 shadow-sm mb-1">
              {xValue}
            </span>
          </div>
        )}
      </div>

      {/* 4. Active Scatter Point (Cursor overlay) */}
      <div 
        className="absolute w-4 h-4 rounded-full bg-primary-500/20 border-2 border-primary-500 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: mousePos.x, top: mousePos.y }}
      >
        <div className="absolute inset-1 rounded-full bg-primary-500"></div>
      </div>
      
    </div>
  );
};

export default CursorGraphOverlay;

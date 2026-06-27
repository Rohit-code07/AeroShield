import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Info, ShieldAlert } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class simulating road dust resuspension
    class DustParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 0.4) + height * 0.5; // concentrate particles at ground level (road surface)
        this.size = Math.random() * 4 + 1;
        this.speedX = -(Math.random() * 4 + 2); // blow left to simulate forward truck movement
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.opacity = Math.random() * 0.6 + 0.1;
        // grey dust colors or glowing industrial particle tints
        const colors = ['#94a3b8', '#cbd5e1', '#64748b', '#3b82f6', '#10b981'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset particle if it leaves screen or goes too high
        if (this.x < 0) {
          this.x = width;
          this.y = Math.random() * (height * 0.4) + height * 0.5;
          this.speedX = -(Math.random() * 4 + 2);
          this.opacity = Math.random() * 0.6 + 0.1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    const particleCount = 120;
    const particles: DustParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new DustParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw highway lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      if (document.documentElement.classList.contains('dark')) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      } else {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
      }
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.85);
      ctx.lineTo(width, height * 0.85);
      ctx.stroke();

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden border-b border-slate-200/50 bg-gradient-to-b from-slate-100 to-white py-12 px-6 dark:from-[#0b0f19] dark:to-[#030712] dark:border-slate-800/50"
    >
      {/* Animated dust canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none" />

      {/* Skyline & Road overlay details */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-40 opacity-15 dark:opacity-5 select-none pointer-events-none">
        {/* Simple silhouette of steel mills / towers */}
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 200" fill="currentColor">
          <path d="M0,200 L0,150 L50,150 L70,120 L90,120 L110,150 L200,150 L230,80 L250,80 L280,150 L340,150 L340,130 L380,130 L380,150 L500,150 L520,110 L550,110 L580,150 L700,150 L750,70 L770,70 L820,150 L950,150 L950,110 L1020,110 L1020,150 L1150,150 L1180,90 L1200,90 L1230,150 L1440,150 L1440,200 Z" />
        </svg>
      </div>

      {/* Truck Silhouette */}
      <div className="absolute bottom-4 right-10 z-10 w-96 opacity-10 dark:opacity-20 hidden md:block select-none pointer-events-none">
        <svg viewBox="0 0 450 180" fill="currentColor" className="w-full text-slate-400 dark:text-slate-600">
          <path d="M20,150 L400,150 L400,140 L380,120 L380,70 L340,50 L120,50 L80,50 L40,90 L20,100 Z" opacity="0.3"/>
          {/* Detailed trailer */}
          <rect x="100" y="45" width="260" height="95" rx="6" />
          {/* Cabin */}
          <path d="M355,140 L410,140 L410,100 L395,75 L360,75 Z" />
          {/* Wheels */}
          <circle cx="140" cy="148" r="22" />
          <circle cx="190" cy="148" r="22" />
          <circle cx="320" cy="148" r="22" />
          <circle cx="375" cy="148" r="22" />
          {/* Aero Wing preview outline */}
          <path d="M330,35 L380,30 L378,35 L332,40 Z" className="text-environmental-500 fill-current opacity-70" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-xs font-semibold text-brand-600 dark:border-brand-400/20 dark:bg-brand-400/5 dark:text-brand-400 mb-6"
        >
          <ShieldAlert className="h-4 w-4" />
          <span>Raipur–Bhilai Clean Corridor Proposal</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-sans text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white"
        >
          AeroShield
          <span className="block mt-2 bg-gradient-to-r from-brand-600 to-environmental-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-environmental-400">
            Heavy Vehicle Dust Mitigation
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
        >
          Reducing Fugitive Dust Emissions using Aerodynamic Wake Control, Smart Micro-Misting and Electrostatic Particle Capture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => handleScrollTo('problem-dashboard')}
            className="flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700 hover:shadow-brand-600/30 transition-all duration-200"
          >
            <span>Explore Dashboard</span>
            <ArrowRight className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={() => handleScrollTo('engineering-solution')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-700 backdrop-blur-sm hover:bg-slate-50 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white transition-all duration-200"
          >
            <Info className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
            <span>View Solution</span>
          </button>
        </motion.div>

        {/* Small features list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-4 border-t border-slate-200/50 pt-8 dark:border-slate-800/50 sm:grid-cols-3 max-w-lg mx-auto text-xs text-slate-400 dark:text-slate-500 font-semibold"
        >
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">85%+ PM10</span>
            <span>Mitigation Efficiency</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">4.5% Fuel</span>
            <span>Aerodynamic Savings</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">12-Month</span>
            <span>Average ROI Period</span>
          </div>
        </motion.div>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-50 dark:opacity-30">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Scroll
        </span>
        <div className="h-6 w-4 rounded-full border-2 border-slate-400 dark:border-slate-500 flex justify-center p-[2px]">
          <div className="h-1.5 w-1 rounded-full bg-slate-400 dark:bg-slate-500 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};

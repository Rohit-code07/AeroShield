import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Eye, EyeOff } from 'lucide-react';

export const WorkingAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMitigated, setIsMitigated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

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

    // Particle simulating road dust
    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;

      constructor(x: number, y: number, mitigated: boolean) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1.5;
        this.maxLife = Math.random() * 80 + 60;
        this.life = this.maxLife;

        if (mitigated) {
          // Mitigated: particles get pulled downwards towards collection chamber (x ~ 160-180, y ~ 160)
          this.vx = Math.random() * 2 + 1;
          this.vy = Math.random() * 2 + 2; // pull down
          this.color = 'rgba(16, 185, 129, 0.7)'; // Environmental green
        } else {
          // Unmitigated: particles get sucked into the high wake turbulences, rising high and spreading left-right
          this.vx = Math.random() * 5 + 2;
          this.vy = (Math.random() - 0.7) * 4; // rise up
          this.color = 'rgba(156, 163, 175, 0.6)'; // Grey dust
        }
      }

      update(mitigated: boolean) {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        if (mitigated) {
          // pull down faster as they approach collector chamber (around x: 190, y: 160)
          if (this.x > 140 && this.x < 240) {
            this.vy += 0.15;
            this.vx *= 0.95; // slow down forward velocity as they get trapped
          }
        } else {
          // swirl simulation in wake vortex
          if (this.x > 180 && this.x < 320) {
            this.vy -= 0.1; // pull up into low pressure
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fill();
      }
    }

    // Airflow lines (streamlines)
    class Streamline {
      points: { x: number; y: number }[];
      speed: number;
      offset: number;

      constructor(startY: number) {
        this.points = [];
        this.speed = Math.random() * 3 + 4;
        this.offset = Math.random() * 100;
        for (let x = 0; x < width; x += 20) {
          this.points.push({ x, y: startY });
        }
      }

      update(mitigated: boolean) {
        this.points.forEach((p) => {
          // Move points left to simulate air moving backward relative to the truck
          // Wait, to make it easier, let's keep the points static but modify their height dynamically to show waves
          const time = Date.now() * 0.005;
          if (mitigated) {
            // Mitigated: streamlines are directed downward and remain stable
            if (p.x > 140) {
              p.y = 120 + Math.sin(p.x * 0.02 + time) * 5 + (p.x - 140) * 0.15;
            }
          } else {
            // Unmitigated: streamlines expand upward and create huge swirling wave wakes
            if (p.x > 140) {
              p.y = 120 + Math.sin(p.x * 0.03 - time) * 25 - (p.x - 140) * 0.12;
            }
          }
        });
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.strokeStyle = document.documentElement.classList.contains('dark')
          ? 'rgba(59, 130, 246, 0.15)'
          : 'rgba(59, 130, 246, 0.08)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const particles: Particle[] = [];
    const streamlines: Streamline[] = [];

    // Create streamlines
    for (let y = 80; y <= 160; y += 15) {
      streamlines.push(new Streamline(y));
    }

    const render = () => {
      if (!isPlaying) return;

      ctx.clearRect(0, 0, width, height);

      // Draw road ground
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#111827' : '#f1f5f9';
      ctx.fillRect(0, 180, width, height - 180);

      // Draw truck outline on the left
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#1e293b' : '#cbd5e1';
      // Trailer cab
      ctx.fillRect(20, 60, 120, 95);
      // Cab front
      ctx.fillRect(140, 95, 40, 60);
      // Wheels
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(45, 168, 16, 0, Math.PI * 2);
      ctx.arc(105, 168, 16, 0, Math.PI * 2);
      ctx.arc(155, 168, 16, 0, Math.PI * 2);
      ctx.fill();

      // If mitigated, draw the AeroShield retrofit components on truck
      if (isMitigated) {
        // Draw aerodynamic wing on top rear (x: 20, y: 60)
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(18, 55);
        ctx.lineTo(35, 45);
        ctx.stroke();

        // Draw collection box at bottom rear (x: 20, y: 155)
        ctx.fillStyle = '#059669';
        ctx.fillRect(20, 155, 30, 10);
      }

      // Spawn particles near the rear wheels (x: 45, y: 168)
      if (Math.random() < 0.8) {
        // Road dust is kicked off from bottom rear wheel area
        particles.push(new Particle(50, 165, isMitigated));
      }

      // Update and draw streamlines
      streamlines.forEach((s) => {
        s.update(isMitigated);
        s.draw();
      });

      // Update and draw dust particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update(isMitigated);
        p.draw();

        // Remove dead particles
        if (p.life <= 0 || p.x > width || p.y > height || p.y < 0) {
          particles.splice(i, 1);
        }
      }

      // Text status overlay on canvas
      ctx.fillStyle = isMitigated ? '#10b981' : '#ef4444';
      ctx.font = 'bold 11px sans-serif';
      ctx.globalAlpha = 0.8;
      ctx.fillText(
        isMitigated ? 'AEROSHIELD MITIGATION ACTIVE' : 'UNCONTROLLED CORRIDOR DUST WAKE',
        20,
        30
      );
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMitigated, isPlaying]);

  return (
    <section id="working-animation" className="py-16 px-6 border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Trapping Simulator
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Wake Fluid Dynamics Simulation
          </h2>
          <p className="mt-4 max-w-xl text-slate-500 dark:text-slate-400 text-sm">
            Observe the difference in air stream profiles and fugitive dust dispersion with and without the aerodynamic-misting collector system.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Simulation Controls Sidebar */}
          <div className="glass-card p-6 flex flex-col justify-between h-fit lg:col-span-1">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-200/50 dark:border-slate-800/50 pb-2 mb-6">
                Simulator Panel
              </span>

              {/* Mode Toggle */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsMitigated(false)}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition-all duration-200 border ${
                    !isMitigated
                      ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <EyeOff className="h-4 w-4" />
                    <span>Without AeroShield</span>
                  </span>
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                </button>

                <button
                  onClick={() => setIsMitigated(true)}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition-all duration-200 border ${
                    isMitigated
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>With AeroShield</span>
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </button>
              </div>

              {/* Engine Stats summary */}
              <div className="mt-8 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60 border border-slate-200/30 dark:border-slate-800/30">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-2">DYNAMIC SIM METRICS</span>
                <div className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span>Flow State:</span>
                    <span className={isMitigated ? 'text-emerald-500' : 'text-red-500'}>
                      {isMitigated ? 'Stable / Laminar' : 'Turbulent Vortex'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dust Dispersion:</span>
                    <span className={isMitigated ? 'text-emerald-500' : 'text-red-500'}>
                      {isMitigated ? 'Captured (90%)' : 'Wide Spread (100%)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aerodynamic Drag:</span>
                    <span className={isMitigated ? 'text-emerald-500' : 'text-slate-500'}>
                      {isMitigated ? '-4.5% Coeff.' : 'Normal (Cd 0.65)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Play/Pause control bar */}
            <div className="mt-8 border-t border-slate-200/50 pt-4 dark:border-slate-800/50 flex gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors duration-200"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'Pause Sim' : 'Play Sim'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Simulation Frame */}
          <div className="glass-card p-6 lg:col-span-3 flex flex-col justify-between min-h-[350px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200/50 dark:border-slate-800/50 pb-2 mb-4">
              Canvas Physics Render (Real-Time Fluids)
            </span>

            <div className="flex-1 border border-slate-200/30 dark:border-slate-800/30 bg-slate-100/10 dark:bg-slate-950/20 rounded-xl relative overflow-hidden flex items-stretch">
              <canvas ref={canvasRef} className="w-full min-h-[260px] block" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

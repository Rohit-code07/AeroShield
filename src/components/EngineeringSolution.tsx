import { useState, Fragment } from 'react';
import { ENGINEERING_COMPONENTS } from '../data/dashboardData';
import { ChevronRight, Info } from 'lucide-react';

export const EngineeringSolution: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState(ENGINEERING_COMPONENTS[0]);

  return (
    <section id="engineering-solution" className="py-16 px-6 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            AeroShield Engineering Design
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Retrofit Device Component Diagram
          </h2>
          <p className="mt-4 max-w-2xl text-slate-500 dark:text-slate-400 text-sm">
            Interactive engineering schematic of the AeroShield device, showing how airflow is reshaped, misted, and electrostatically scrubbed behind a cargo truck.
          </p>
        </div>

        {/* Large Layout Flow */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Schematic SVG View */}
          <div className="glass-card p-6 lg:col-span-2 flex flex-col justify-between items-center relative overflow-hidden bg-white/40 dark:bg-slate-950/20">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest self-start border-b border-slate-200/50 dark:border-slate-800/50 pb-2 w-full mb-6">
              Chassis Schematic & Hotspots (Interactive)
            </span>

            {/* Truck SVG Schematic */}
            <div className="w-full max-w-lg my-8 relative">
              <svg viewBox="0 0 600 250" fill="currentColor" className="w-full text-slate-300 dark:text-slate-700">
                {/* Truck Cabin Silhouette */}
                <path d="M480,200 L580,200 L580,140 L560,110 L500,110 L480,120 Z" opacity="0.4" />
                <rect x="500" y="125" width="45" height="35" rx="3" fill="rgba(255,255,255,0.4)" opacity="0.6" />
                <circle cx="515" cy="205" r="24" fill="currentColor" />
                <circle cx="565" cy="205" r="24" fill="currentColor" />

                {/* Truck Trailer Chassis */}
                <rect x="80" y="70" width="380" height="110" rx="8" />
                <circle cx="140" cy="205" r="24" />
                <circle cx="195" cy="205" r="24" />
                <circle cx="340" cy="205" r="24" />
                <circle cx="395" cy="205" r="24" />

                {/* Draw AeroShield Components on SVG */}
                {/* 1. Aerodynamic Wing */}
                <path
                  d="M50,60 L95,50 L92,58 L48,68 Z"
                  className={`cursor-pointer transition-all duration-200 ${
                    activeComponent.id === 'wing' ? 'text-brand-500 stroke-brand-600' : 'text-slate-400'
                  }`}
                  strokeWidth="2"
                  onClick={() => setActiveComponent(ENGINEERING_COMPONENTS[0])}
                />
                
                {/* 2. Wake Stabilizer */}
                <rect
                  x="45"
                  y="85"
                  width="30"
                  height="80"
                  rx="3"
                  className={`cursor-pointer transition-all duration-200 ${
                    activeComponent.id === 'stabilizer' ? 'text-brand-500' : 'text-slate-400'
                  }`}
                  onClick={() => setActiveComponent(ENGINEERING_COMPONENTS[1])}
                />

                {/* 3. Micro Mist Nozzles */}
                <g
                  className={`cursor-pointer transition-all duration-200 ${
                    activeComponent.id === 'nozzles' ? 'text-environmental-500' : 'text-slate-400'
                  }`}
                  onClick={() => setActiveComponent(ENGINEERING_COMPONENTS[2])}
                >
                  <line x1="80" y1="183" x2="300" y2="183" stroke="currentColor" strokeWidth="4" />
                  <circle cx="100" cy="188" r="4" fill="currentColor" />
                  <circle cx="170" cy="188" r="4" fill="currentColor" />
                  <circle cx="230" cy="188" r="4" fill="currentColor" />
                  <circle cx="280" cy="188" r="4" fill="currentColor" />
                </g>

                {/* 4. Electrostatic Collector */}
                <rect
                  x="15"
                  y="100"
                  width="28"
                  height="50"
                  rx="4"
                  className={`cursor-pointer transition-all duration-200 ${
                    activeComponent.id === 'collector' ? 'text-purple-500' : 'text-slate-400'
                  }`}
                  onClick={() => setActiveComponent(ENGINEERING_COMPONENTS[3])}
                />

                {/* 5. Dust Capture Chamber */}
                <rect
                  x="10"
                  y="152"
                  width="45"
                  height="30"
                  rx="3"
                  className={`cursor-pointer transition-all duration-200 ${
                    activeComponent.id === 'chamber' ? 'text-amber-600' : 'text-slate-400'
                  }`}
                  onClick={() => setActiveComponent(ENGINEERING_COMPONENTS[4])}
                />

                {/* 6. Clean Air Flow arrow */}
                <path
                  d="M 5 125 L -35 125 M -25 115 L -35 125 L -25 135"
                  fill="none"
                  strokeWidth="3"
                  className={`cursor-pointer transition-all duration-200 ${
                    activeComponent.id === 'clean-air' ? 'text-environmental-500 stroke-environmental-500' : 'text-slate-400 stroke-slate-400'
                  }`}
                  onClick={() => setActiveComponent(ENGINEERING_COMPONENTS[5])}
                />
              </svg>

              {/* Indicator Buttons Overlay for easy mobile tap */}
              <div className="absolute top-0 inset-x-0 flex flex-wrap justify-center gap-1.5 z-10 text-[9px] font-bold">
                {ENGINEERING_COMPONENTS.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setActiveComponent(comp)}
                    className={`rounded-full px-2.5 py-1 border transition-all duration-200 ${
                      activeComponent.id === comp.id
                        ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {comp.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizontal flow line of steps */}
            <div className="w-full border-t border-slate-200/50 pt-4 dark:border-slate-800/50 mt-6 flex justify-between items-center text-[10px] font-bold text-slate-400 overflow-x-auto whitespace-nowrap gap-2 py-2">
              {ENGINEERING_COMPONENTS.map((c, i) => (
                <Fragment key={c.id}>
                  <span
                    onClick={() => setActiveComponent(c)}
                    className={`cursor-pointer hover:text-brand-500 transition-colors ${
                      activeComponent.id === c.id ? 'text-brand-600 dark:text-brand-400' : ''
                    }`}
                  >
                    {c.name}
                  </span>
                  {i < ENGINEERING_COMPONENTS.length - 1 && <ChevronRight className="h-3 w-3 shrink-0" />}
                </Fragment>
              ))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="glass-card p-6 flex flex-col justify-between border-brand-500/10">
            <div>
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200/50 dark:border-slate-800/50 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <Info className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">COMPONENT PROFILE</span>
                  <h3 className="font-sans text-sm font-extrabold text-slate-800 dark:text-slate-200">
                    Component Functionality
                  </h3>
                </div>
              </div>

              {activeComponent && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                      {activeComponent.name}
                    </h4>
                    <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {activeComponent.function}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60 border border-slate-200/30 dark:border-slate-800/30">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block">ENGINEERING SPECIFICATIONS</span>
                    <p className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                      {activeComponent.spec}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-slate-200/50 pt-4 dark:border-slate-800/50">
              <span className="text-[10px] font-bold text-slate-400">Mitigation Mechanics:</span>
              <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500 leading-normal">
                Aerodynamics shape the vortex. Water mist adds mass. Electrostatic attraction binds the particulate matrix, securing it in the chamber.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

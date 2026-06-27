import { useState } from 'react';
import { TIMELINE_DATA, type ScopeItem } from '../data/dashboardData';
import { Milestone, CheckCircle, Calendar, ShieldCheck } from 'lucide-react';

export const FutureScope: React.FC = () => {
  const [selectedTimeline, setSelectedTimeline] = useState<ScopeItem>(TIMELINE_DATA[0]);

  return (
    <section id="future-scope" className="py-16 px-6 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Roadmap
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            AeroShield Future Rollout Scope
          </h2>
          <p className="mt-4 max-w-xl text-slate-500 dark:text-slate-400 text-sm">
            Milestones and policy goals tracking the AeroShield project from current university laboratory models to nationwide highway freight integration.
          </p>
        </div>

        {/* Timeline Grid layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Vertical Stepper timeline */}
          <div className="glass-card p-6 lg:col-span-2 relative overflow-hidden">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-200/50 dark:border-slate-800/50 pb-2 mb-6">
              Development Roadmap Timeline
            </span>

            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-8 space-y-8">
              {TIMELINE_DATA.map((item) => {
                const isSelected = selectedTimeline.year === item.year;
                return (
                  <div
                    key={item.year}
                    onClick={() => setSelectedTimeline(item)}
                    className="relative cursor-pointer group"
                  >
                    {/* Pulsing indicator node on vertical line */}
                    <span className={`absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-500 text-white scale-110 shadow-md shadow-brand-500/10'
                        : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-400 group-hover:border-brand-500'
                    }`}>
                      <Calendar className="h-3.5 w-3.5" />
                    </span>

                    {/* Content brief */}
                    <div className="transition-transform duration-200 group-hover:translate-x-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-base font-extrabold ${
                          isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'
                        }`}>
                          {item.year}
                        </span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">— {item.phase}</span>
                      </div>
                      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Inspector Side Panel */}
          <div className="glass-card p-6 flex flex-col justify-between border-brand-500/10">
            <div>
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200/50 dark:border-slate-800/50 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <Milestone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PHASE TASKS</span>
                  <h3 className="font-sans text-sm font-extrabold text-slate-800 dark:text-slate-200">
                    Milestone Details
                  </h3>
                </div>
              </div>

              {selectedTimeline && (
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-base font-extrabold text-brand-600 dark:text-brand-400">
                      {selectedTimeline.year} Roadmap
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                      {selectedTimeline.phase}
                    </h4>
                  </div>

                  <ul className="space-y-3 pt-2">
                    {selectedTimeline.details.map((detail, index) => (
                      <li key={index} className="flex gap-2.5 items-start text-xs font-semibold text-slate-500 dark:text-slate-400 leading-normal">
                        <CheckCircle className="h-4 w-4 text-environmental-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-slate-200/50 pt-4 dark:border-slate-800/50">
              <div className="flex gap-2.5 items-center text-[10px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/5 border border-brand-500/10 rounded-lg p-2.5">
                <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
                <span>
                  All milestones are fully aligned with the central National Clean Air Programme (NCAP) standards.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

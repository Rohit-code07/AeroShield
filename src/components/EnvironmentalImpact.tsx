import { useEffect, useState, useRef } from 'react';
import { IMPACT_KPIS } from '../data/dashboardData';
import { Info } from 'lucide-react';

interface CircularProgressProps {
  percentage: number;
  color: string;
  valueString: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, color, valueString }) => {
  const [offset, setOffset] = useState(251.3);
  const elementRef = useRef<SVGSVGElement>(null);
  const hasAnimated = useRef(false);

  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.32

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Animate from full circumference to target offset
          const progressOffset = circumference - (percentage / 100) * circumference;
          setOffset(progressOffset);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [percentage, circumference]);

  return (
    <div className="relative flex items-center justify-center h-28 w-28">
      <svg ref={elementRef} className="transform -rotate-90 w-full h-full">
        {/* Background Circle */}
        <circle
          cx="56"
          cy="56"
          r={radius}
          className="stroke-slate-200 dark:stroke-slate-800"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Indicator Ring */}
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-[1500ms] ease-out"
        />
      </svg>
      {/* Centered label */}
      <span className="absolute font-mono text-sm font-extrabold text-slate-800 dark:text-slate-100">
        {valueString}
      </span>
    </div>
  );
};

export const EnvironmentalImpact: React.FC = () => {
  return (
    <section id="environmental-impact" className="py-16 px-6 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Impact Projection
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Efficacy & Ecological Impact
          </h2>
          <p className="mt-4 max-w-xl text-slate-500 dark:text-slate-400 text-sm">
            Model projections detailing environmental restoration levels after retrofitting targeted freight haulage fleets in the Raipur industrial corridor.
          </p>
        </div>

        {/* Impact KPIs Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {IMPACT_KPIS.map((kpi, idx) => {
            return (
              <div
                key={idx}
                className="glass-card p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center">
                  <CircularProgress
                    percentage={kpi.target}
                    color={kpi.color}
                    valueString={`${kpi.value}${kpi.unit ? kpi.unit.split(' ')[0] : ''}`}
                  />
                  <h3 className="font-sans text-xs font-extrabold text-slate-800 dark:text-slate-200 mt-4 leading-snug">
                    {kpi.label}
                  </h3>
                </div>

                <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed font-medium">
                  {kpi.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to action note */}
        <div className="glass-card mt-8 border-brand-500/10 p-5">
          <div className="flex gap-3 text-xs leading-normal">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Info className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">Environmental Equivalent:</span>
              <p className="mt-0.5 text-slate-400 dark:text-slate-500">
                Removing 48 Tons/day of road dust has the same ecological health benefit as planting over 380,000 mature deciduous trees within the Raipur bypass boundary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

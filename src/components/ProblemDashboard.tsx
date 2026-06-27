import { useEffect, useState, useRef } from 'react';
import * as Icons from 'lucide-react';
import { STATISTICS } from '../data/dashboardData';

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, duration = 1500, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentVal = progress * value;
            setCount(currentVal);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={elementRef} className="font-mono text-3xl font-extrabold tracking-tight">
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

export const ProblemDashboard: React.FC = () => {
  return (
    <section id="problem-dashboard" className="py-16 px-6 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Raipur–Bhilai Industrial Corridor
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Corridor Pollution Dashboard
          </h2>
          <p className="mt-4 max-w-xl text-slate-500 dark:text-slate-400 text-sm">
            Fugitive dust emissions from heavy mineral transport are key drivers of the regional air quality crisis.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATISTICS.map((stat) => {
            const IconComponent = (Icons[stat.iconName as keyof typeof Icons] || Icons.AlertCircle) as React.ComponentType<{ className?: string }>;
            const decimals = stat.value % 1 !== 0 ? 1 : 0;

            return (
              <div
                key={stat.id}
                className="glass-card hover:translate-y-[-4px] hover:border-brand-500/30 transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {stat.title}
                    </span>
                    <div className="rounded-lg bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {IconComponent && <IconComponent className="h-5 w-5" />}
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline gap-1 text-slate-900 dark:text-white">
                    <AnimatedCounter
                      value={stat.value}
                      decimals={decimals}
                      suffix={stat.unit ? ` ${stat.unit}` : ''}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px]">
                    {stat.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-200/50 pt-3 dark:border-slate-800/50 flex items-center justify-between text-[11px] font-semibold">
                  <span className="text-slate-400 dark:text-slate-500">Status Alert:</span>
                  <span className="text-red-500 dark:text-red-400 flex items-center gap-1 font-mono">
                    <Icons.TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

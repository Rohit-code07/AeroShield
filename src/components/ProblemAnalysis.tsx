import React from 'react';
import { Truck, Flame, Database, Wind, Shuffle, ShieldAlert, HeartPulse } from 'lucide-react';

interface AnalysisItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  details: string;
  gradient: string;
}

export const ProblemAnalysis: React.FC = () => {
  const analysisItems: AnalysisItem[] = [
    {
      title: 'Heavy Vehicle Traffic',
      icon: Truck,
      description: 'Massive transit volume traversing the state shipping lines.',
      details: 'Over 12,000 multi-axle commercial transport vehicles travel daily on the Raipur-Durg NH-53 route, resuspending dust with massive turbulence.',
      gradient: 'from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20'
    },
    {
      title: 'Coal & Mineral Transport',
      icon: Flame,
      description: 'Fugitive spillage and wind erosion of dry coal cargo.',
      details: 'Large fleets of open tipper trucks carry fine mineral coal from mines to steel plants, allowing high wind gusts to carry dust particles into ambient air.',
      gradient: 'from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20'
    },
    {
      title: 'Iron Ore Transport',
      icon: Database,
      description: 'Heavy mineral shipments leaving tailing residues.',
      details: 'Iron ore is transported in coarse loads. Vibrations throw micro-fine ore granules onto asphalt, where tires crush them to PM2.5 levels.',
      gradient: 'from-amber-500/10 to-yellow-500/10 hover:from-amber-500/20 hover:to-yellow-500/20'
    },
    {
      title: 'Road Dust Resuspension',
      icon: Shuffle,
      description: 'High velocity tire sweeps kicking up heavy debris.',
      details: 'Tires grind dust layers against road surfaces. Wakes create low pressure zones that pull particles up to 10 meters into the air column.',
      gradient: 'from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20'
    },
    {
      title: 'Traffic Congestion',
      icon: ShieldAlert,
      description: 'Persistent vehicle blockages increasing local exposures.',
      details: 'Tatibandh and Kumhari bottlenecks create heavy stop-and-go patterns. Prolonged idling concentrates exhaust and suspended dust.',
      gradient: 'from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20'
    },
    {
      title: 'Air Quality Deterioration',
      icon: Wind,
      description: 'Severe ambient PM load exceeding national standards.',
      details: 'High dust loading forces regional AQI values above 350 during dry winter months, creating a thick haze that blocks sunlight.',
      gradient: 'from-sky-500/10 to-blue-500/10 hover:from-sky-500/20 hover:to-blue-500/20'
    },
    {
      title: 'Public Health Effects',
      icon: HeartPulse,
      description: 'Severe respiratory risk spikes across surrounding cities.',
      details: 'Sustained breathing of PM2.5 particles drives a 38% increase in chronic asthma, COPD, and cardiovascular hospital admissions.',
      gradient: 'from-red-500/10 to-rose-500/10 hover:from-red-500/20 hover:to-rose-500/20'
    }
  ];

  return (
    <section id="problem-analysis" className="py-16 px-6 border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Source Investigation
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Core Environmental Problem Analysis
          </h2>
          <p className="mt-4 max-w-xl text-slate-500 dark:text-slate-400 text-sm">
            Investigating the mechanical and logical steps through which mineral haulage traffic degrades regional air quality and impacts community health.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {analysisItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`glass-card p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${item.gradient}`}
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm text-slate-800 dark:text-slate-200 mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-1">
                    {item.description}
                  </p>
                  <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

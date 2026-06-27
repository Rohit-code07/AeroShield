import React from 'react';
import { Leaf, Eye, TrendingDown, Heart, Shield, Settings, Truck, RefreshCw } from 'lucide-react';

interface BenefitCard {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  impactNumber: string;
}

export const BenefitsSection: React.FC = () => {
  const benefits: BenefitCard[] = [
    {
      title: 'Lower PM10 Levels',
      icon: TrendingDown,
      description: 'Massive reduction in coarse mineral particulates suspended along heavy vehicle paths.',
      impactNumber: '-85% PM10'
    },
    {
      title: 'Lower PM2.5 Concentration',
      icon: Leaf,
      description: 'Significant scrubbing of fine combustion soot and crushed ore particulates from exhaust plumes.',
      impactNumber: '-68% PM2.5'
    },
    {
      title: 'Better Regional Air Quality',
      icon: RefreshCw,
      description: 'General reduction in the corridor ambient haze, keeping winter AQI indexes in moderate ranges.',
      impactNumber: 'AQI < 120'
    },
    {
      title: 'Less Highway Dust Accumulation',
      icon: Shield,
      description: 'Fewer layers of mineral dust forming on concrete bypasses, eliminating secondary resuspension.',
      impactNumber: '-40 Tons/day'
    },
    {
      title: 'Improved Public Health',
      icon: Heart,
      description: 'Reduced cardiopulmonary morbidity spikes and respiratory clinic visits in neighboring suburbs.',
      impactNumber: '38% Fewer Cases'
    },
    {
      title: 'Better Driving Visibility',
      icon: Eye,
      description: 'Clearer driver sights during foggy winter corridors, preventing heavy multi-vehicle crashes.',
      impactNumber: '+60% Visibility'
    },
    {
      title: 'Lower Infrastructure Wear',
      icon: Settings,
      description: 'Less mineral dust settling in moving parts of vehicles and surrounding industrial machinery.',
      impactNumber: '15% Maintenance Save'
    },
    {
      title: 'Sustainable Logistics Transit',
      icon: Truck,
      description: 'Transforms regional metal freight fleets into eco-compliant carriers matching national mandates.',
      impactNumber: '100% Eco-Compliant'
    }
  ];

  return (
    <section id="benefits-section" className="py-16 px-6 border-b border-slate-200/50 dark:border-slate-800/50 bg-environmental-50/10 dark:bg-environmental-950/5">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-environmental-600 dark:text-environmental-400">
            Mitigation Gains
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            System Socio-Environmental Benefits
          </h2>
          <p className="mt-4 max-w-xl text-slate-500 dark:text-slate-400 text-sm">
            Installing AeroShield devices yields broad benefits across air purity, public safety, logistics overheads, and highway safety.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="glass-card hover:translate-y-[-4px] border-environmental-500/10 hover:border-environmental-500/30 bg-emerald-500/5 dark:bg-emerald-500/5 transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-environmental-500/10 text-environmental-600 dark:text-environmental-400">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-environmental-600 dark:text-environmental-400 bg-environmental-500/10 dark:bg-environmental-500/20 px-2.5 py-1 rounded-lg">
                      {b.impactNumber}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {b.description}
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

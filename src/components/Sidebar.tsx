import React from 'react';
import * as Icons from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  sections: { id: string; label: string; icon: keyof typeof Icons }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, sections }) => {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-slate-200/60 bg-white/80 p-4 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/60 dark:bg-darkbg-DEFAULT/80 lg:flex z-30">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-environmental-500 text-white shadow-md">
          <Icons.ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <span className="font-sans text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 to-environmental-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-environmental-400">
            AeroShield
          </span>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Heavy Vehicle Mitigation
          </p>
        </div>
      </div>

      <nav className="mt-8 flex-1 space-y-1 overflow-y-auto pr-1">
        {sections.map((section) => {
          const IconComponent = Icons[section.icon] as React.ComponentType<{ className?: string }>;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                const el = document.getElementById(section.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-500/10 to-environmental-500/10 text-brand-600 dark:text-brand-400 border-l-4 border-brand-500 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200 border-l-4 border-transparent'
              }`}
            >
              {IconComponent && <IconComponent className="h-5 w-5 shrink-0" />}
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-200/50 pt-4 dark:border-slate-800/50">
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
            <Icons.Cpu className="h-4 w-4" />
            <span>AI CORE ENABLED</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
            Analyzing dumper particulate concentration live.
          </p>
        </div>
      </div>
    </aside>
  );
};

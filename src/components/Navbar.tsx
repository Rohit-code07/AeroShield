import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  sections: { id: string; label: string; icon: keyof typeof Icons }[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExportPDF: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  sections,
  activeSection,
  setActiveSection,
  searchQuery,
  setSearchQuery,
  onExportPDF,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Main Navigation Bar */}
      <header className="sticky top-0 right-0 left-0 lg:left-64 z-40 bg-white/70 backdrop-blur-md border-b border-slate-200/50 dark:bg-darkbg-DEFAULT/70 dark:border-slate-800/50 transition-colors duration-300">
        {/* Scroll Progress Indicator */}
        <div 
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-brand-500 to-environmental-500 transition-all duration-100" 
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="flex h-16 items-center justify-between px-6 gap-4">
          {/* Mobile Brand / Menu Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            >
              {isOpen ? <Icons.X className="h-6 w-6" /> : <Icons.Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-600 to-environmental-500 text-white shadow-sm">
                <Icons.ShieldCheck className="h-5 w-5" />
              </div>
              <span className="font-sans text-md font-bold tracking-tight text-slate-800 dark:text-slate-100">
                AeroShield
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <Icons.Search className="absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search environmental logs, proposal, components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200/80 bg-slate-50/50 py-2 pr-4 pl-10 text-sm outline-none transition-all duration-200 focus:border-brand-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/30 dark:focus:border-brand-500 dark:focus:bg-slate-900/80"
            />
          </div>

          {/* Action Items */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Icons.Sun className="h-5 w-5" /> : <Icons.Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={onExportPDF}
              className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-3.5 py-2 text-xs font-semibold tracking-wide transition-all duration-200"
              title="Export Report as PDF"
            >
              <Icons.Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>

            <a
              href="#government-proposal"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-environmental-600 hover:from-brand-700 hover:to-environmental-700 text-white px-3.5 py-2 text-xs font-bold tracking-wide shadow-sm shadow-brand-500/10 transition-all duration-200"
            >
              <Icons.FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Download Report</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/40 backdrop-blur-sm">
          <div className="w-72 bg-white dark:bg-darkbg-DEFAULT h-full p-4 flex flex-col shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-6 border-b border-slate-200/50 dark:border-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-600 to-environmental-500 text-white">
                  <Icons.ShieldCheck className="h-5 w-5" />
                </div>
                <span className="font-sans text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100">
                  AeroShield
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <Icons.X className="h-5.5 w-5.5" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="relative my-4">
              <Icons.Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pr-3 pl-9 text-xs outline-none dark:border-slate-800 dark:bg-slate-900/30"
              />
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
              {sections.map((section) => {
                const IconComponent = Icons[section.icon] as React.ComponentType<{ className?: string }>;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveSection(section.id);
                      const el = document.getElementById(section.id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-500/10 to-environmental-500/10 text-brand-600 dark:text-brand-400 border-l-4 border-brand-500'
                        : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 border-l-4 border-transparent'
                    }`}
                  >
                    {IconComponent && <IconComponent className="h-4.5 w-4.5" />}
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

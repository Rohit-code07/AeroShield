import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemDashboard } from './components/ProblemDashboard';
import { InteractiveCharts } from './components/InteractiveCharts';
import { PollutionMap } from './components/PollutionMap';
import { ProblemAnalysis } from './components/ProblemAnalysis';
import { EngineeringSolution } from './components/EngineeringSolution';
import { WorkingAnimation } from './components/WorkingAnimation';
import { BenefitsSection } from './components/BenefitsSection';
import { CostAnalysis } from './components/CostAnalysis';
import { EnvironmentalImpact } from './components/EnvironmentalImpact';
import { FutureScope } from './components/FutureScope';
import { ImplementationReport } from './components/ImplementationReport';

const SECTIONS: { id: string; label: string; icon: keyof typeof Icons }[] = [
  { id: 'hero', label: 'Overview & Intro', icon: 'ShieldCheck' },
  { id: 'problem-dashboard', label: 'Pollution Stats', icon: 'Gauge' },
  { id: 'interactive-charts', label: 'AQI Trends & PM', icon: 'TrendingUp' },
  { id: 'pollution-map', label: 'Corridor Hotspots', icon: 'MapPin' },
  { id: 'problem-analysis', label: 'Problem Analysis', icon: 'AlertTriangle' },
  { id: 'engineering-solution', label: 'Engineering Design', icon: 'Wrench' },
  { id: 'working-animation', label: 'Trapping Sim', icon: 'Play' },
  { id: 'benefits-section', label: 'Corridor Benefits', icon: 'CheckCircle' },
  { id: 'cost-analysis', label: 'Costing & ROI', icon: 'DollarSign' },
  { id: 'environmental-impact', label: 'Eco Impact', icon: 'Award' },
  { id: 'future-scope', label: 'Deployment Roadmap', icon: 'Milestone' },
  { id: 'government-proposal', label: 'Technical Proposal', icon: 'FileText' },
];

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [searchQuery, setSearchQuery] = useState('');

  // IntersectionObserver to auto-update active tab on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // trigger when section is in main middle viewport area
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-darkbg-DEFAULT dark:text-slate-100 transition-colors duration-300">
        {/* Main Sidebar (Desktop Only) */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sections={SECTIONS}
        />

        {/* Desktop & Mobile Main Section */}
        <div className="lg:pl-64 flex flex-col min-h-screen">
          {/* Top Sticky Header */}
          <Navbar
            sections={SECTIONS}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onExportPDF={handleExportPDF}
          />

          {/* Page Sections Content Scroll Container */}
          <main className="flex-1">
            <HeroSection />
            <ProblemDashboard />
            <InteractiveCharts />
            <PollutionMap />
            <ProblemAnalysis />
            <EngineeringSolution />
            <WorkingAnimation />
            <BenefitsSection />
            <CostAnalysis />
            <EnvironmentalImpact />
            <FutureScope />
            <ImplementationReport searchQuery={searchQuery} />
          </main>

          {/* Footer Info */}
          <footer className="border-t border-slate-200/50 py-8 px-6 text-center text-xs font-semibold text-slate-400 dark:border-slate-800/50 dark:text-slate-500 bg-white/30 dark:bg-darkbg-dark/20">
            <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>© 2026 AeroShield Consortium. All rights reserved.</span>
              <div className="flex gap-4">
                <a href="#hero" className="hover:text-brand-500 transition-colors">Overview</a>
                <a href="#engineering-solution" className="hover:text-brand-500 transition-colors">Engineering Design</a>
                <a href="#government-proposal" className="hover:text-brand-500 transition-colors">Technical Proposal</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

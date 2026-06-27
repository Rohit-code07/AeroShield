import { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { CHART_DATA, MAP_MARKERS } from '../data/dashboardData';
import { Info, BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';

export const InteractiveCharts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'aqi' | 'pm' | 'traffic' | 'dust' | 'heatmap'>('aqi');

  // Format data for radar heatmap representation
  const radarData = MAP_MARKERS.map((m) => ({
    subject: m.name.split(' ')[0], // short name
    AQI: m.aqi,
    PM10: m.pm10,
    PM25: m.pm25,
    fullMark: 500,
  }));

  // Custom tooltips for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-200 bg-white/95 p-4 shadow-xl dark:border-slate-800 dark:bg-slate-950/95 backdrop-blur-md">
          <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
          <div className="mt-2 space-y-1.5">
            {payload.map((p: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5" style={{ color: p.color }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.name}:
                </span>
                <span className="font-mono text-slate-800 dark:text-slate-200">
                  {p.value.toLocaleString()} {p.unit || ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="interactive-charts" className="py-16 px-6 border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Data & Analytics Engine
            </span>
            <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Interactive Pollution Charts
            </h2>
            <p className="mt-2 max-w-lg text-slate-500 dark:text-slate-400 text-sm">
              Explore historical air quality and traffic metrics along the NH-53 corridor and see the projected mitigation effects of the AeroShield system.
            </p>
          </div>

          {/* Tab togglers */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'aqi', label: 'AQI Trends', icon: TrendingUp },
              { id: 'pm', label: 'PM10 & PM2.5', icon: Info },
              { id: 'traffic', label: 'Heavy Traffic', icon: BarChart3 },
              { id: 'dust', label: 'Dust & Capture', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/10'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800/60 dark:hover:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Chart Container */}
          <div className="glass-card p-6 lg:col-span-2 min-h-[400px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-slate-800/50 mb-6">
              <div>
                <h3 className="font-sans text-sm font-bold text-slate-800 dark:text-slate-200">
                  {activeTab === 'aqi' && 'Comparative AQI Trend Analysis (Monthly)'}
                  {activeTab === 'pm' && 'Particulate Matter Baseline (Ambient Exposure)'}
                  {activeTab === 'traffic' && 'Heavy Freight Transport Volume (NH-53)'}
                  {activeTab === 'dust' && 'Fugitive Dust Capture Performance'}
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  {activeTab === 'aqi' && 'Simulated project impact after complete AeroShield fleet retrofit.'}
                  {activeTab === 'pm' && 'Comparison of coarse (PM10) to fine (PM2.5) particulate concentrations.'}
                  {activeTab === 'traffic' && 'Monthly dumper and tipper movements along the primary highway corridors.'}
                  {activeTab === 'dust' && 'Tons of fugitive road-dust prevented from rising per month.'}
                </p>
              </div>
            </div>

            <div className="h-80 w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                {activeTab === 'aqi' ? (
                  <LineChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: 11, fontWeight: 500 }} />
                    <YAxis tickLine={false} axisLine={false} style={{ fontSize: 11, fontWeight: 500 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 600, paddingTop: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="aqiBefore"
                      name="AQI Before (Current)"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="aqiAfter"
                      name="AQI After (AeroShield)"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                ) : activeTab === 'pm' ? (
                  <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPm10" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorPm25" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: 11, fontWeight: 500 }} />
                    <YAxis tickLine={false} axisLine={false} style={{ fontSize: 11, fontWeight: 500 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                    <Area
                      type="monotone"
                      dataKey="pm10Before"
                      name="Ambient PM10 (µg/m³)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPm10)"
                    />
                    <Area
                      type="monotone"
                      dataKey="pm25Before"
                      name="Ambient PM2.5 (µg/m³)"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPm25)"
                    />
                  </AreaChart>
                ) : activeTab === 'traffic' ? (
                  <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: 11, fontWeight: 500 }} />
                    <YAxis tickLine={false} axisLine={false} style={{ fontSize: 11, fontWeight: 500 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                    <Bar
                      dataKey="vehicleCount"
                      name="Average Heavy Vehicles / Day"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                ) : (
                  <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: 11, fontWeight: 500 }} />
                    <YAxis tickLine={false} axisLine={false} style={{ fontSize: 11, fontWeight: 500 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                    <Bar
                      dataKey="dustReducedTons"
                      name="Prevented Road Dust (Tons)"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sidebar Area: Pollution Heatmap & Hotspots */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-sans text-sm font-bold text-slate-800 dark:text-slate-200">
                Pollution Heatmap Profile
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-6">
                Comparative metrics mapping peak pollution levels by region coordinates in the corridor.
              </p>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="rgba(148, 163, 184, 0.1)" />
                  <PolarAngleAxis dataKey="subject" style={{ fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 450]} style={{ fontSize: 8 }} />
                  <Radar name="AQI Index" dataKey="AQI" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                  <Radar name="PM10 Level" dataKey="PM10" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 border-t border-slate-200/50 pt-4 dark:border-slate-800/50">
              <div className="flex gap-3 text-xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                  <Info className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Observation Note:</span>
                  <p className="mt-0.5 text-slate-400 dark:text-slate-500 leading-normal">
                    Peak concentration is centered around the Bhilai Steel Plant and the Jamul Quarry Zone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

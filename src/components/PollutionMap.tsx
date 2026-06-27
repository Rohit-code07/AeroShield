import { useState } from 'react';
import { MAP_MARKERS, type MapMarker } from '../data/dashboardData';
import { MapPin, Info, Factory, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export const PollutionMap: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker>(MAP_MARKERS[1]); // Default to Bhilai Steel Plant

  // Helper to color map points based on AQI levels
  const getMarkerColor = (aqi: number) => {
    if (aqi > 380) return 'text-red-600 bg-red-600'; // Severe
    if (aqi > 320) return 'text-orange-500 bg-orange-500'; // Very Poor
    return 'text-yellow-500 bg-yellow-500'; // Poor
  };

  const getMarkerIcon = (type: MapMarker['type']) => {
    switch (type) {
      case 'industrial':
        return Factory;
      case 'steel':
        return Factory;
      case 'mining':
        return AlertTriangle;
      case 'traffic':
        return MapPin;
      case 'pollution':
        return AlertTriangle;
      default:
        return HelpCircle;
    }
  };

  return (
    <section id="pollution-map" className="py-16 px-6 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Spatial Distribution
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            NH-53 Transport Corridor Pollution Map
          </h2>
          <p className="mt-4 max-w-2xl text-slate-500 dark:text-slate-400 text-sm">
            Interactive routing map highlighting logistics nodes, metal factories, mining centers, and their ambient particulates concentrations.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* SVG Map Section */}
          <div className="glass-card p-6 lg:col-span-2 relative min-h-[400px] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-4 dark:border-slate-800/50 mb-4">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                NH-53 Expressway Schematic (Durg ⇄ Raipur)
              </span>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-red-600" /> Severe (&gt;380)</span>
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-orange-500" /> Very Poor (320-380)</span>
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-yellow-500" /> Poor (&lt;320)</span>
              </div>
            </div>

            {/* Map Area */}
            <div className="relative flex-1 bg-slate-100/40 dark:bg-slate-950/40 border border-slate-200/30 dark:border-slate-800/30 rounded-xl min-h-[300px] flex items-center justify-center">
              {/* Map SVG Graphic Grid */}
              <svg className="absolute inset-0 h-full w-full opacity-35 dark:opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* NH-53 Corridor Line */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* NH-53 Main Corridor highway */}
                <path
                  d="M 50 150 Q 150 145 250 148 T 400 155 T 550 162"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.4)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="dark:stroke-brand-900/40"
                  pathLength="100"
                />
                <path
                  d="M 50 150 Q 150 145 250 148 T 400 155 T 550 162"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.7)"
                  strokeWidth="2"
                  strokeDasharray="5, 5"
                  strokeLinecap="round"
                  pathLength="100"
                />
                
                {/* Secondary logistics pathways */}
                <path
                  d="M 200 60 L 220 150 M 420 155 L 450 250"
                  fill="none"
                  stroke="rgba(148, 163, 184, 0.2)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* City boundary circles */}
                <circle cx="90" cy="150" r="45" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeDasharray="3 3" />
                <circle cx="240" cy="148" r="50" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeDasharray="3 3" />
                <circle cx="480" cy="155" r="55" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeDasharray="3 3" />
              </svg>

              {/* Markers Overlay */}
              {MAP_MARKERS.map((marker) => {
                const colors = getMarkerColor(marker.aqi);
                const Icon = getMarkerIcon(marker.type);
                const isSelected = selectedMarker.id === marker.id;

                return (
                  <button
                    key={marker.id}
                    onClick={() => setSelectedMarker(marker)}
                    className="absolute group transition-transform duration-200 hover:scale-110 focus:outline-none"
                    style={{ left: `${marker.coordinates.x}%`, top: `${marker.coordinates.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    {/* Ring Pulse Effect */}
                    <span className={`absolute inline-flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 map-marker-pulse ${colors.split(' ')[1]}`} />
                    
                    {/* Centered Indicator Pin */}
                    <div
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-200 ${
                        isSelected
                          ? 'border-brand-500 scale-110 z-20'
                          : 'border-white dark:border-slate-800'
                      } ${colors.split(' ')[1]} text-white`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Simple Tooltip on Hover */}
                    <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-[10px] font-bold text-white transition-transform group-hover:scale-100 whitespace-nowrap z-30">
                      {marker.name}
                    </div>
                  </button>
                );
              })}

              {/* Directional Labels */}
              <span className="absolute bottom-4 left-6 text-[10px] font-bold text-slate-400 tracking-wider">← WEST (To Durg/Nagpur)</span>
              <span className="absolute bottom-4 right-6 text-[10px] font-bold text-slate-400 tracking-wider">EAST (To Raipur/Kolkata) →</span>
            </div>
          </div>

          {/* Inspector Panel */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-4 border-b border-slate-200/50 dark:border-slate-800/50 mb-6">
                <Info className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                <h3 className="font-sans text-sm font-bold text-slate-800 dark:text-slate-200">
                  Node Details
                </h3>
              </div>

              {selectedMarker ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {selectedMarker.type.toUpperCase()} LOCATION
                    </span>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                      {selectedMarker.name}
                    </h4>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {selectedMarker.details}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60 border border-slate-200/30 dark:border-slate-800/30 text-center">
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block">AQI</span>
                      <span className={`text-base font-extrabold block mt-1 ${
                        selectedMarker.aqi > 380 ? 'text-red-500' : selectedMarker.aqi > 320 ? 'text-orange-500' : 'text-yellow-500'
                      }`}>
                        {selectedMarker.aqi}
                      </span>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60 border border-slate-200/30 dark:border-slate-800/30 text-center">
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block">PM10</span>
                      <span className="text-base font-extrabold text-slate-700 dark:text-slate-200 block mt-1">
                        {selectedMarker.pm10}
                      </span>
                      <span className="text-[8px] text-slate-400">µg/m³</span>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60 border border-slate-200/30 dark:border-slate-800/30 text-center">
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block">PM2.5</span>
                      <span className="text-base font-extrabold text-slate-700 dark:text-slate-200 block mt-1">
                        {selectedMarker.pm25}
                      </span>
                      <span className="text-[8px] text-slate-400">µg/m³</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-brand-500/5 to-environmental-500/5 border border-brand-500/10 p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600 dark:text-slate-400">Freight Traffic Intensity:</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {selectedMarker.vehiclesPerDay.toLocaleString()} trucks/day
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-500 to-environmental-500"
                        style={{ width: `${Math.min((selectedMarker.vehiclesPerDay / 13000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">Click any marker on the map to inspect regional statistics.</p>
              )}
            </div>

            <div className="mt-6 border-t border-slate-200/50 pt-4 dark:border-slate-800/50">
              <div className="flex gap-2.5 items-center bg-environmental-500/5 border border-environmental-500/15 rounded-xl p-3 text-[11px] text-environmental-600 dark:text-environmental-400">
                <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
                <span>
                  <strong>AeroShield target</strong>: Reduce transit emissions by &gt;85% at all identified hotzones.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

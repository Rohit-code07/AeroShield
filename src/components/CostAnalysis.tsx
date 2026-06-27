import { useState } from 'react';
import { COST_DATA } from '../data/dashboardData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Sparkles } from 'lucide-react';

export const CostAnalysis: React.FC = () => {
  const [retrofitRatio, setRetrofitRatio] = useState(60); // Default to retrofitting 60% of regional fleets

  // Calculate totals dynamically based on selected ratio
  const calculateTotalCost = () => {
    let totalCapEx = 0;
    let annualSavings = 0;
    let averageDustReduction = 0;

    COST_DATA.forEach((row) => {
      const activeTrucks = Math.round(row.existingTrucks * (retrofitRatio / 100));
      const capEx = activeTrucks * row.retrofitCost; // capEx in INR
      totalCapEx += capEx;

      // Fuel savings calculation:
      // average truck fuel expense: ~12,00,000 INR/year
      // saving percent * fuel expense
      const fuelSavedVal = activeTrucks * 1200000 * (row.fuelSavings / 100);
      annualSavings += fuelSavedVal;

      averageDustReduction += row.dustReduction;
    });

    return {
      totalCapExCr: (totalCapEx / 10000000).toFixed(2), // Crores
      annualSavingsCr: (annualSavings / 10000000).toFixed(2), // Crores
      netDustReduction: Math.round(averageDustReduction / COST_DATA.length),
      amortizationYears: (totalCapEx / annualSavings).toFixed(1),
    };
  };

  const metrics = calculateTotalCost();

  // Data for visual payback chart
  const paybackData = [
    { name: 'Year 1', Investment: parseFloat(metrics.totalCapExCr), Savings: parseFloat(metrics.annualSavingsCr) },
    { name: 'Year 2', Investment: 0, Savings: parseFloat(metrics.annualSavingsCr) * 2 },
    { name: 'Year 3', Investment: 0, Savings: parseFloat(metrics.annualSavingsCr) * 3 },
  ];

  return (
    <section id="cost-analysis" className="py-16 px-6 border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Financial Modeling
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Fleet Retrofit Cost & ROI Modeler
          </h2>
          <p className="mt-4 max-w-2xl text-slate-500 dark:text-slate-400 text-sm">
            Adjust the fleet coverage slider to calculate capital expenditure, operational maintenance overheads, fuel recovery margins, and project amortization.
          </p>
        </div>

        {/* Fleet Slider Control */}
        <div className="glass-card p-6 mb-8 border-brand-500/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                <span>FLEET COVERAGE RATIO</span>
                <span className="text-brand-600 dark:text-brand-400 font-mono text-sm">{retrofitRatio}% of Total Trucks</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={retrofitRatio}
                onChange={(e) => setRetrofitRatio(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-800 appearance-none cursor-pointer accent-brand-600"
              />
            </div>

            {/* Dynamic Outcomes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:border-l md:border-slate-200/50 md:pl-6 dark:border-slate-800/50">
              <div className="text-center md:text-left">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Total CapEx</span>
                <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100 block mt-1">₹{metrics.totalCapExCr} Cr</span>
              </div>
              <div className="text-center md:text-left">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Annual Fuel Save</span>
                <span className="text-lg font-extrabold text-environmental-500 block mt-1">₹{metrics.annualSavingsCr} Cr</span>
              </div>
              <div className="text-center md:text-left">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Avg. ROI Period</span>
                <span className="text-lg font-extrabold text-brand-600 dark:text-brand-400 block mt-1">{metrics.amortizationYears} Yrs</span>
              </div>
              <div className="text-center md:text-left">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Dust Reduction</span>
                <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100 block mt-1">{metrics.netDustReduction}% Avg.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Matrix & Chart Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Table Container */}
          <div className="glass-card p-6 lg:col-span-2 overflow-x-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-200/50 dark:border-slate-800/50 pb-2 mb-4">
              Retrofitting Parameters Matrix
            </span>

            <table className="w-full min-w-[500px] text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/50 dark:border-slate-800/50 text-slate-400 font-bold">
                  <th className="py-3 pr-2">Truck Category</th>
                  <th className="py-3 px-2 text-right">Target Fleet</th>
                  <th className="py-3 px-2 text-right">Unit Retrofit (₹)</th>
                  <th className="py-3 px-2 text-right">Annual Maint. (₹)</th>
                  <th className="py-3 px-2 text-right">Fuel Saved</th>
                  <th className="py-3 px-2 text-right">Amortization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/20 dark:divide-slate-800/20">
                {COST_DATA.map((row, idx) => {
                  const targetTrucks = Math.round(row.existingTrucks * (retrofitRatio / 100));
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 text-slate-600 dark:text-slate-300 font-semibold">
                      <td className="py-3.5 pr-2 font-sans text-slate-800 dark:text-slate-200">{row.vehicleCategory}</td>
                      <td className="py-3.5 px-2 text-right font-mono">{targetTrucks.toLocaleString()}</td>
                      <td className="py-3.5 px-2 text-right font-mono">₹{row.retrofitCost.toLocaleString()}</td>
                      <td className="py-3.5 px-2 text-right font-mono">₹{row.annualMaintenance.toLocaleString()}</td>
                      <td className="py-3.5 px-2 text-right font-mono text-environmental-500">+{row.fuelSavings}%</td>
                      <td className="py-3.5 px-2 text-right font-mono text-brand-600 dark:text-brand-400">{row.roiMonths} mos</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Payback Chart Container */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-sans text-sm font-bold text-slate-800 dark:text-slate-200">
                Investment Recovery Curve
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-6">
                Visualizing fleet installation costs versus cumulative fuel cost savings over a 3-year timeline.
              </p>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paybackData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} style={{ fontSize: 10, fontWeight: 500 }} />
                  <YAxis tickLine={false} axisLine={false} style={{ fontSize: 10, fontWeight: 500 }} />
                  <Tooltip
                    content={({ active, payload }: any) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl dark:border-slate-800 dark:bg-slate-950/95 text-xs font-semibold">
                            <p className="text-[#3b82f6]">CapEx: ₹{payload[0]?.value} Cr</p>
                            <p className="text-[#10b981] mt-1">Savings: ₹{payload[1]?.value} Cr</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="Investment" name="Fleet CapEx" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={30} />
                  <Bar dataKey="Savings" name="Accrued Savings" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 border-t border-slate-200/50 pt-3 dark:border-slate-800/50">
              <div className="flex gap-2 items-center text-[10px] font-semibold text-environmental-600 dark:text-environmental-400 bg-environmental-500/5 border border-environmental-500/10 rounded-lg p-2.5">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>
                  Aerodynamic stabilizers cover maintenance overheads in under 15 months.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import { useState } from "react";
import axios from "axios";
import { AlertTriangle, Thermometer, Clock, Wind, Activity, Droplets, Biohazard } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

export default function Home() {
  // --- State Variables ---
  const [temp, setTemp] = useState(30);
  const [days, setDays] = useState(10);
  const [source, setSource] = useState("Sewage");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // --- API Call Function ---
  const handlePredict = async () => {
    setLoading(true);
    try {
      // Ensure this URL matches your active Render deployment
      const response = await axios.post("https://bio-kinetic-gas-predictor.onrender.com/predict", {
        temperature: temp,
        days_stagnant: days,
        source_type: source,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Failed to connect to backend. Is the Render server awake?");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen relative font-sans text-emerald-50 py-12 px-4 sm:px-8 overflow-hidden bg-black">
      
      {/* ================= NEW BIO-KINETIC BACKGROUND ANIMATION ================= */}
      <div className="fixed inset-0 z-0">
        {/* Deep base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950 via-teal-950 to-black opacity-90"></div>
        
        {/* Moving organic shapes (Bio-kinetics) */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-700/20 blur-[120px] animate-[drift_20s_infinite_alternate]"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[50%] h-[50%] rounded-full bg-teal-800/20 blur-[150px] animate-[drift_25s_infinite_alternate-reverse]"></div>
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-green-900/30 blur-[100px] animate-[pulse_15s_infinite]"></div>
        
        {/* Subtle noise texture for realism */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9LjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==')] opacity-20 mix-blend-overlay"></div>
      </div>
      {/* ========================================================================== */}


      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-emerald-950/50 border border-emerald-800/50 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-bold text-emerald-300 tracking-wider uppercase">Bio-Kinetic System Active</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-b from-emerald-300 via-teal-400 to-green-500 bg-clip-text text-transparent drop-shadow-2xl">
              Gas Predictor
            </span>
          </h1>
          <p className="text-xl text-emerald-200/80 max-w-2xl mx-auto font-light leading-relaxed">
            Advanced AI simulation of hazardous biochemical gas generation in stagnant water environments.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Controls (Green Glassmorphism) */}
          <div className="lg:col-span-5 bg-emerald-950/30 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-emerald-900/50 shadow-[0_8px_32px_0_rgba(6,78,59,0.2)] relative overflow-hidden group">
            {/* Subtle internal glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-emerald-100 relative z-10">
              <Droplets className="text-emerald-400" /> Parameters
            </h2>

            {/* Source Selection */}
            <div className="mb-8 relative z-10">
              <label className="block text-sm font-bold text-emerald-300/80 mb-3 uppercase tracking-wider">Environment Source</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSource("Sewage")}
                  className={`py-5 px-4 rounded-2xl border transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg ${
                    source === "Sewage"
                      ? "bg-gradient-to-br from-teal-900/80 to-emerald-900/80 border-emerald-500 text-emerald-100 shadow-[inset_0_0_20px_rgba(16,185,129,0.2)]"
                      : "bg-emerald-950/50 border-emerald-900/50 text-emerald-400/70 hover:bg-emerald-900/50 hover:text-emerald-200"
                  }`}
                >
                 <Biohazard size={24} className={source === "Sewage" ? "text-emerald-400" : "opacity-50"} /> Sewage
                </button>
                <button
                  onClick={() => setSource("Rainwater")}
                  className={`py-5 px-4 rounded-2xl border transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg ${
                    source === "Rainwater"
                      ? "bg-gradient-to-br from-cyan-900/80 to-teal-900/80 border-cyan-500 text-cyan-100 shadow-[inset_0_0_20px_rgba(6,182,212,0.2)]"
                      : "bg-emerald-950/50 border-emerald-900/50 text-emerald-400/70 hover:bg-emerald-900/50 hover:text-emerald-200"
                  }`}
                >
                  <Wind size={24} className={source === "Rainwater" ? "text-cyan-400" : "opacity-50"} /> Rainwater
                </button>
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="mb-8 group/slider relative z-10">
              <div className="flex justify-between mb-3">
                <label className="flex items-center gap-2 text-emerald-200 font-medium transition-colors">
                  <Thermometer size={20} className="text-emerald-500" /> Temp (°C)
                </label>
                <span className="text-emerald-300 font-mono font-bold text-xl">{temp}°</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full h-3 bg-emerald-950/80 rounded-full appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all border border-emerald-900/50"
              />
            </div>

            {/* Days Slider */}
            <div className="mb-12 group/slider relative z-10">
              <div className="flex justify-between mb-3">
                <label className="flex items-center gap-2 text-emerald-200 font-medium transition-colors">
                  <Clock size={20} className="text-emerald-500" /> Stagnation (Days)
                </label>
                <span className="text-emerald-300 font-mono font-bold text-xl">{days}</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-3 bg-emerald-950/80 rounded-full appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all border border-emerald-900/50"
              />
            </div>

            {/* Run Button */}
            <button
              onClick={handlePredict}
              disabled={loading}
              className="relative z-10 w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-2xl font-bold text-xl text-white transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:transform-none overflow-hidden"
            >
              {/* Subtle sheen effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[30deg] -translate-x-[150%] animate-[shimmer_2.5s_infinite]"></div>
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <Activity className="animate-spin" /> Analyzing Bio-Kinetics...
                </span>
              ) : "Run Bio-Simulation"}
            </button>
          </div>

          {/* RIGHT COLUMN: Results Display */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Result Card */}
            {result ? (
              <div className={`p-8 rounded-[2.5rem] border backdrop-blur-2xl transition-all duration-500 relative overflow-hidden ${
                result.risk_level === "CRITICAL" ? "bg-red-950/40 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)]" :
                result.risk_level === "High" ? "bg-orange-950/40 border-orange-500/50 shadow-[0_0_40px_rgba(249,115,22,0.3)]" :
                "bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
              }`}>
                {/* Background glow based on risk */}
                <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-20 blur-[100px] -z-10 ${
                   result.risk_level === "CRITICAL" ? "bg-red-800" :
                   result.risk_level === "High" ? "bg-orange-800" :
                   "bg-emerald-800"
                }`}></div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
                  <div>
                    <h3 className="text-emerald-200/70 text-sm font-bold uppercase tracking-widest mb-2">Concentration Level</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-7xl font-black tracking-tighter text-white drop-shadow-lg">
                        {result.predicted_ppm}
                      </span>
                      <span className="text-2xl text-emerald-400/80 font-bold">ppm</span>
                    </div>
                    <div className="text-emerald-300 text-lg mt-1 font-medium">{result.gas_type}</div>
                  </div>
                  <div className={`px-6 py-3 rounded-2xl text-lg font-black uppercase tracking-widest shadow-lg border ${
                    result.risk_level === "CRITICAL" ? "bg-red-600 text-white border-red-400 shadow-red-900/50" :
                    result.risk_level === "High" ? "bg-orange-600 text-white border-orange-400 shadow-orange-900/50" :
                    "bg-emerald-600 text-white border-emerald-400 shadow-emerald-900/50"
                  }`}>
                    {result.risk_level} RISK
                  </div>
                </div>

                <div className="flex items-start gap-5 p-5 bg-black/30 rounded-3xl border border-emerald-500/20">
                  <div className={`p-4 rounded-2xl shrink-0 ${
                    result.risk_level === "CRITICAL" ? "bg-red-500/20 text-red-400 shadow-[inset_0_0_15px_rgba(239,68,68,0.2)]" : 
                    result.risk_level === "High" ? "bg-orange-500/20 text-orange-400 shadow-[inset_0_0_15px_rgba(249,115,22,0.2)]" : "bg-emerald-500/20 text-emerald-400 shadow-[inset_0_0_15px_rgba(16,185,129,0.2)]"
                  }`}>
                    <AlertTriangle size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-emerald-100 mb-2">Bio-Safety Protocol</h4>
                    <p className="text-emerald-200/90 leading-relaxed text-lg">{result.health_advice}</p>
                  </div>
                </div>
              </div>
            ) : (
              // Empty State
              <div className="h-[22rem] flex flex-col items-center justify-center bg-emerald-950/20 backdrop-blur-2xl border-2 border-dashed border-emerald-800/50 rounded-[2.5rem] text-emerald-500/50 group hover:border-emerald-500/50 transition-colors">
                <div className="p-6 bg-emerald-900/20 rounded-full mb-6 group-hover:scale-110 transition-transform">
                    <Activity size={64} className="opacity-50" />
                </div>
                <p className="text-2xl font-bold text-emerald-300/70">System Ready</p>
                <p className="text-emerald-400/50">Awaiting environmental parameters...</p>
              </div>
            )}

            {/* Kinetics Graph (Green Theme) */}
            <div className="bg-emerald-950/30 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-emerald-900/50 shadow-xl relative overflow-hidden">
                 {/* Subtle internal glow */}
               <div className="absolute inset-0 bg-gradient-to-tl from-teal-500/5 to-transparent pointer-events-none"></div>
              <h3 className="text-xl font-bold text-emerald-100 mb-6 flex items-center gap-3">
                <Activity className="text-emerald-400" size={24} /> Growth Kinetics Projection
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {/* Switched to AreaChart for a more organic look */}
                  <AreaChart data={[
                    { day: 0, ppm: 0 },
                    { day: Math.round(days * 0.25), ppm: result ? result.predicted_ppm * 0.2 : 5 },
                    { day: Math.round(days * 0.5), ppm: result ? result.predicted_ppm * 0.55 : 18 },
                    { day: Math.round(days * 0.75), ppm: result ? result.predicted_ppm * 0.85 : 32 },
                    { day: days, ppm: result ? result.predicted_ppm : 45 },
                  ]}>
                    <defs>
                      <linearGradient id="colorPpm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} opacity={0.5} />
                    <XAxis dataKey="day" stroke="#059669" fontSize={12} tickMargin={10} tickLine={false} axisLine={false} fontAttributes={{fontWeight: 'bold'}} label={{ value: 'Days', position: 'insideBottomRight', offset: -5, fill: '#059669' }}/>
                    <YAxis stroke="#059669" fontSize={12} tickMargin={10} tickLine={false} axisLine={false} fontAttributes={{fontWeight: 'bold'}} label={{ value: 'PPM', angle: -90, position: 'insideLeft', fill: '#059669' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#022c22', border: '1px solid #059669', borderRadius: '16px', backdropFilter: 'blur(8px)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                      itemStyle={{ color: '#34d399', fontWeight: 'bold', fontSize: '16px' }}
                      cursor={{stroke: '#34d399', strokeWidth: 1, strokeDasharray: '5 5'}}
                    />
                    <Area type="monotone" dataKey="ppm" stroke="#34d399" strokeWidth={4} fillOpacity={1} fill="url(#colorPpm)" dot={{ r: 6, fill: '#065f46', stroke: '#34d399', strokeWidth: 3 }} activeDot={{ r: 10, fill: '#34d399', stroke: '#ffffff' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import axios from "axios";
import { AlertTriangle, Thermometer, Clock, Wind, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Home() {
  const [temp, setTemp] = useState(30);
  const [days, setDays] = useState(10);
  const [source, setSource] = useState("Sewage");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
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
    <main className="min-h-screen relative font-sans text-white py-12 px-4 sm:px-8 overflow-hidden">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="fixed inset-0 z-[-1]">
        {/* Dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-slate-950/85 z-10 bg-gradient-to-b from-slate-950/80 to-slate-900/90"></div>
        {/* Abstract dark fluid/science background from Unsplash */}
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2560&auto=format&fit=crop" 
          alt="Abstract Dark Fluid" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* HEADER */}
        <header className="mb-12 text-center animate-fade-in-down">
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md">
            <Activity className="text-blue-400 w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium text-slate-300 tracking-wide uppercase">AI Safety System Online</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-lg">
              Bio-Kinetic Gas Predictor
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
            Simulate and predict hazardous <span className="text-emerald-400 font-medium">H₂S</span> and <span className="text-blue-400 font-medium">CH₄</span> generation in stagnant water systems using Random Forest models.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Controls (Glassmorphism) */}
          <div className="lg:col-span-5 bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all">
            <h2 className="text-xl font-semibold mb-8 flex items-center gap-3 text-slate-100">
              <Wind className="text-blue-400" /> Simulation Parameters
            </h2>

            {/* Source Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-400 mb-3">Water Source Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSource("Sewage")}
                  className={`py-4 px-3 rounded-xl border-2 transition-all duration-300 font-medium ${
                    source === "Sewage"
                      ? "bg-purple-500/20 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                      : "bg-slate-800/50 border-transparent text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                  }`}
                >
                  <span className="text-xl block mb-1">🤢</span> Sewage (H₂S)
                </button>
                <button
                  onClick={() => setSource("Rainwater")}
                  className={`py-4 px-3 rounded-xl border-2 transition-all duration-300 font-medium ${
                    source === "Rainwater"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "bg-slate-800/50 border-transparent text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                  }`}
                >
                  <span className="text-xl block mb-1">🌧️</span> Rainwater (CH₄)
                </button>
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="mb-8 group">
              <div className="flex justify-between mb-3">
                <label className="flex items-center gap-2 text-slate-300 font-medium group-hover:text-blue-400 transition-colors">
                  <Thermometer size={18} /> Temperature
                </label>
                <span className="text-blue-400 font-mono font-bold bg-blue-500/10 px-2 py-1 rounded-md">{temp}°C</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
              />
            </div>

            {/* Days Slider */}
            <div className="mb-10 group">
              <div className="flex justify-between mb-3">
                <label className="flex items-center gap-2 text-slate-300 font-medium group-hover:text-blue-400 transition-colors">
                  <Clock size={18} /> Stagnation Duration
                </label>
                <span className="text-blue-400 font-mono font-bold bg-blue-500/10 px-2 py-1 rounded-md">{days} Days</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
              />
            </div>

            {/* Run Button */}
            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Activity className="animate-spin" /> Processing AI Model...
                </span>
              ) : "Run Prediction Model"}
            </button>
          </div>

          {/* RIGHT COLUMN: Results Display */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Result Card */}
            {result ? (
              <div className={`p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 ${
                result.risk_level === "CRITICAL" ? "bg-red-950/40 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]" :
                result.risk_level === "High" ? "bg-orange-950/40 border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.2)]" :
                "bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
              }`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-1">Predicted Concentration</h3>
                    <div className="text-6xl font-mono font-black tracking-tighter text-white">
                      {result.predicted_ppm} <span className="text-2xl text-slate-500 font-sans tracking-normal font-medium">ppm</span>
                    </div>
                  </div>
                  <div className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg ${
                    result.risk_level === "CRITICAL" ? "bg-red-500 text-white shadow-red-500/50" :
                    result.risk_level === "High" ? "bg-orange-500 text-white shadow-orange-500/50" :
                    "bg-emerald-500 text-white shadow-emerald-500/50"
                  }`}>
                    {result.risk_level} RISK
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-4 p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                  <div className={`p-3 rounded-full ${
                    result.risk_level === "CRITICAL" ? "bg-red-500/20 text-red-500" : 
                    result.risk_level === "High" ? "bg-orange-500/20 text-orange-400" : "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-1">Safety Recommendation</h4>
                    <p className="text-slate-400 leading-relaxed">{result.health_advice}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-56 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-xl border-2 border-dashed border-slate-700/50 rounded-3xl text-slate-500">
                <Activity size={48} className="mb-4 opacity-20" />
                <p className="text-lg">Awaiting simulation parameters...</p>
              </div>
            )}

            {/* Kinetics Graph */}
            <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-xl">
              <h3 className="text-slate-300 font-semibold mb-6 flex items-center gap-2">
                <Activity className="text-blue-400" size={18} /> Kinetics Projection (Theoretical)
              </h3>
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: 0, ppm: 0 },
                    { day: Math.round(days * 0.3), ppm: result ? result.predicted_ppm * 0.35 : 10 },
                    { day: Math.round(days * 0.6), ppm: result ? result.predicted_ppm * 0.7 : 25 },
                    { day: days, ppm: result ? result.predicted_ppm : 40 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickMargin={10} />
                    <YAxis stroke="#64748b" fontSize={12} tickMargin={10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(8px)' }}
                      itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="ppm" name="Gas (ppm)" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
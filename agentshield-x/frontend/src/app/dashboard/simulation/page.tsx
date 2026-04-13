"use client";

import React, { useState } from "react";
import { 
  Zap, 
  ShieldAlert, 
  Activity, 
  Terminal, 
  Target, 
  AlertTriangle,
  Play,
  RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SIMULATION_TYPES = [
  {
    id: "prompt-injection",
    title: "Prompt Injection",
    description: "Simulate a multi-turn jailbreak attempt targeting the reasoning core.",
    severity: "critical",
    icon: <Terminal className="text-red-500" />
  },
  {
    id: "behavioral-drift",
    title: "Behavioral Drift",
    description: "Trigger abnormal API calling patterns and outlier action sequences.",
    severity: "high",
    icon: <Activity className="text-orange-500" />
  },
  {
    id: "unauthorized-exfil",
    title: "Data Exfiltration",
    description: "Simulate an attempt to pipe encrypted packets to untrusted IPs.",
    severity: "critical",
    icon: <Target className="text-red-600" />
  },
  {
    id: "dos-surge",
    title: "Logic Bomb / DoS",
    description: "Saturate the inference pipeline to cause node degradation.",
    severity: "medium",
    icon: <Zap className="text-amber-500" />
  }
];

export default function SimulationPage() {
  const [activeSim, setActiveSim] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const runSimulation = (id: string) => {
    setActiveSim(id);
    const sim = SIMULATION_TYPES.find(s => s.id === id);
    
    // Simulate processing
    setTimeout(() => {
      setActiveSim(null);
      setHistory(prev => [{
        id: Date.now(),
        type: sim?.title,
        status: "DETECTION_SUCCESS",
        time: new Date().toLocaleTimeString(),
        impact: "Isolated 1 Node"
      }, ...prev.slice(0, 4)]);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase flex items-center gap-3">
          <Zap className="text-cyan-400" />
          Attack Simulation Environment
        </h1>
        <p className="text-white/40 font-medium">Stress test your guardrails by triggering controlled security anomalies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Simulation Cards */}
        <div className="space-y-4">
           {SIMULATION_TYPES.map((sim) => (
             <div key={sim.id} className="glass p-6 border-white/5 relative overflow-hidden group">
                <div className="flex justify-between items-start">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                         {sim.icon}
                      </div>
                      <div>
                         <h3 className="text-lg font-black tracking-tight uppercase">{sim.title}</h3>
                         <p className="text-xs text-white/40 max-w-xs">{sim.description}</p>
                      </div>
                   </div>
                   <button 
                    disabled={activeSim !== null}
                    onClick={() => runSimulation(sim.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                   >
                      {activeSim === sim.id ? (
                        <RotateCcw className="animate-spin" size={14} />
                      ) : (
                        <Play size={14} className="group-hover:text-cyan-400" />
                      )}
                      {activeSim === sim.id ? "Running..." : "Trigger"}
                   </button>
                </div>
                {activeSim === sim.id && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className="absolute bottom-0 left-0 h-1 bg-cyan-500"
                  />
                )}
             </div>
           ))}
        </div>

        {/* Live Visualization / Output */}
        <div className="flex flex-col gap-8">
           <div className="flex-1 glass border-white/5 bg-black/40 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="bg-grid absolute inset-0 opacity-10"></div>
              
              <AnimatePresence mode="wait">
                {activeSim ? (
                  <motion.div 
                    key="running"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="relative z-10"
                  >
                     <div className="w-24 h-24 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin mb-6 mx-auto"></div>
                     <h2 className="text-2xl font-black uppercase tracking-tighter text-cyan-400">Injection in Progress</h2>
                     <p className="text-white/40 text-sm font-mono mt-2">Bypassing Guardrail Layer 4...</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10"
                  >
                     <ShieldAlert size={64} className="text-white/10 mb-4 mx-auto" />
                     <h2 className="text-xl font-black uppercase tracking-tighter text-white/20">System Idle</h2>
                     <p className="text-white/10 text-xs uppercase tracking-widest font-black">Waiting for simulation trigger</p>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           {/* History */}
           <div className="glass border-white/5 p-6 h-64 overflow-hidden flex flex-col">
              <h4 className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-4">Simulation History</h4>
              <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                 {history.length === 0 && <p className="text-xs text-white/10 font-bold italic">No simulations run in this session.</p>}
                 {history.map((h) => (
                   <div key={h.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-lime-400"></div>
                         <div>
                            <p className="text-xs font-bold uppercase">{h.type}</p>
                            <p className="text-[10px] text-white/40 font-mono">{h.time} &bull; {h.status}</p>
                         </div>
                      </div>
                      <span className="text-[9px] font-black uppercase text-lime-400 underline">{h.impact}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

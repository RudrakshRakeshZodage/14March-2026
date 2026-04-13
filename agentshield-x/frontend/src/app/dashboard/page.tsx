"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  Terminal,
  Server,
  AlertTriangle,
  ArrowUpRight,
  Database,
  Grid
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
import AgentDrawer from "@/components/dashboard/AgentDrawer";

// --- Mock Data ---
const MOCK_AGENTS = [
  { id: "A-1024", name: "QueryOptimizer-v1", status: "safe", score: 98, lastAction: "DB_INDEX_SYNC" },
  { id: "A-3091", name: "SecurityScanner-v4", status: "suspicious", score: 62, lastAction: "PORT_SCAN_X" },
  { id: "A-8821", name: "DataExfiltrator-X", status: "compromised", score: 12, lastAction: "EXT_IP_CONN" },
  { id: "A-5520", name: "AutoCoder-Helper", status: "safe", score: 95, lastAction: "GENERATE_CODE" },
];

export default function DashboardOverview() {
  const [logs, setLogs] = useState<any[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Simulate WebSocket logs
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        agent: MOCK_AGENTS[Math.floor(Math.random() * MOCK_AGENTS.length)].name,
        action: ["API_CALL", "FILE_READ", "NET_SEND", "MODEL_INF"][Math.floor(Math.random() * 4)],
        severity: Math.random() > 0.8 ? "high" : "info",
        timestamp: new Date().toLocaleTimeString(),
        message: "Action authenticated and logged."
      };
      setLogs(prev => [newLog, ...prev.slice(0, 15)]);

      if (Math.random() > 0.9) {
        setActiveAlerts(prev => [{
          id: Date.now(),
          title: "Prompt Injection Detected",
          agent: "AutoCoder-Helper",
          time: "Just now"
        }, ...prev.slice(0, 2)]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const openAgentDetails = (agent: any) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">System Status Overview</h1>
          <p className="text-white/40 font-medium">Monitoring 1,280 agents across 4 distributed clusters.</p>
        </div>
        <div className="w-96">
          <InsightsPanel />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Agents" value="1,284" change="+12" icon={<Server size={24} className="text-blue-400" />} />
        <StatCard title="System Integrity" value="94.2%" change="-0.4%" icon={<ShieldCheck size={24} className="text-cyan-400" />} />
        <StatCard title="Active Threats" value="3" change="+1" icon={<ShieldAlert size={24} className="text-red-400" />} warning />
        <StatCard title="Network Load" value="4.2 GB/s" change="+0.8%" icon={<Activity size={24} className="text-lime-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Agent Registry */}
        <div className="lg:col-span-2 glass p-6 border-white/5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black uppercase tracking-wider flex items-center gap-2">
              <Database size={18} className="text-cyan-400" />
              Agent Registry
            </h2>
            <button className="text-xs font-bold text-cyan-400 hover:underline">View All Agents</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-monospace text-white/30 border-b border-white/5">
                  <th className="pb-3 uppercase tracking-widest pl-2">Agent ID</th>
                  <th className="pb-3 uppercase tracking-widest">Name</th>
                  <th className="pb-3 uppercase tracking-widest">Status</th>
                  <th className="pb-3 uppercase tracking-widest">Score</th>
                  <th className="pb-3 uppercase tracking-widest text-right pr-2">Last Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {MOCK_AGENTS.map((agent) => (
                  <tr 
                    key={agent.id} 
                    onClick={() => openAgentDetails(agent)}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 font-mono text-xs text-white/50 pl-2">{agent.id}</td>
                    <td className="py-4 font-bold">{agent.name}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                        agent.status === 'safe' ? 'bg-cyan-500/10 text-cyan-400' :
                        agent.status === 'suspicious' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {agent.status}
                      </span>
                    </td>
                    <td className="py-4 font-mono font-bold tracking-tighter">
                      {agent.score}
                    </td>
                    <td className="py-4 text-right pr-2">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs font-mono text-white/40">{agent.lastAction}</span>
                        <ArrowUpRight size={14} className="text-white/20 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Risk Heatmap (New) */}
          <div className="mt-8 pt-8 border-t border-white/5">
             <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                   <Grid size={12} /> Cluster Risk Heatmap
                </h4>
                <span className="text-[10px] font-mono text-white/20">4 Clusters &bull; 64 Nodes/ea</span>
             </div>
             <div className="flex gap-1 h-8">
                {Array.from({length: 48}).map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-sm ${
                      i === 12 || i === 34 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 
                      i % 7 === 0 ? 'bg-amber-500/40' : 'bg-cyan-500/10'
                    }`}
                  />
                ))}
             </div>
          </div>
        </div>

        {/* Real-time Logs */}
        <div className="glass p-6 border-white/5 flex flex-col h-[600px]">
          <h2 className="text-lg font-black uppercase tracking-wider mb-6 flex items-center gap-2">
            <Terminal size={18} className="text-lime-400" />
            Live Feed
          </h2>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg border text-[11px] font-mono leading-tight ${
                    log.severity === 'high' ? 'bg-red-500/5 border-red-500/20 text-red-400' : 'bg-white/5 border-white/5 text-white/50'
                  }`}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-black">[{log.timestamp}]</span>
                    <span className="uppercase text-[9px] px-1 bg-white/10 rounded">{log.action}</span>
                  </div>
                  <p><span className="text-white font-bold">{log.agent}:</span> {log.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AgentDrawer 
        agent={selectedAgent} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />

      {/* Floating Alerts Area */}
      <div className="fixed bottom-8 right-8 w-80 space-y-4 z-50">
        <AnimatePresence>
          {activeAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-red-950/90 backdrop-blur-md border border-red-500/50 p-4 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.3)] flex gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="text-black" />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase text-red-100">{alert.title}</h4>
                <p className="text-xs text-red-200/60 font-medium">{alert.agent} &bull; {alert.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, warning = false }: any) {
  return (
    <div className={`glass-card ${warning ? 'border-red-500/20' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
          {icon}
        </div>
        <span className={`text-xs font-mono font-bold ${change.startsWith('+') ? 'text-lime-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-2xl font-black tracking-tighter">{value}</h3>
    </div>
  );
}

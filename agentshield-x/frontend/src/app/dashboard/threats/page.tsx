"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  MoreVertical,
  ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_THREATS = [
  { 
    id: "TR-9001", 
    type: "Prompt Injection", 
    agent: "CustomerSupport-AI", 
    severity: "critical", 
    status: "active",
    time: "2 mins ago",
    description: "Detected attempt to bypass system prompt through multi-turn jailbreaking technique."
  },
  { 
    id: "TR-9002", 
    type: "Unauthorized Tool Use", 
    agent: "DataAnalyst-v2", 
    severity: "high", 
    status: "investigating",
    time: "15 mins ago",
    description: "Agent attempted to call 'filesystem_write' permission which is restricted in this environment."
  },
  { 
    id: "TR-9003", 
    type: "Behavioral Drift", 
    agent: "MarketForecaster", 
    severity: "medium", 
    status: "active",
    time: "42 mins ago",
    description: "Outlier detected in action sequence; agent is making abnormal number of external API requests."
  },
  { 
    id: "TR-9004", 
    type: "Abnormal Data Access", 
    agent: "InventoryManager", 
    severity: "low", 
    status: "resolved",
    time: "4 hours ago",
    description: "Slight elevation in data read frequency relative to hourly baseline."
  }
];

export default function ThreatsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-8 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase flex items-center gap-3">
            <ShieldAlert className="text-red-500" />
            Threat Detection Panel
          </h1>
          <p className="text-white/40 font-medium">Monitoring real-time security anomalies and behavioral drift.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-5 py-2 glass border-red-500/20 text-red-400 font-bold text-xs uppercase hover:bg-red-500/10 transition-colors">
              Deploy Global Kill-Switch
           </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 items-center">
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
          <FilterTab active={filter === "all"} onClick={() => setFilter("all")} label="All Alerts" />
          <FilterTab active={filter === "active"} onClick={() => setFilter("active")} label="Active" />
          <FilterTab active={filter === "threat"} onClick={() => setFilter("threat")} label="Critical" />
          <FilterTab active={filter === "resolved"} onClick={() => setFilter("resolved")} label="Resolved" />
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 text-white/40 glass px-4 py-2 border-white/5">
          <Search size={14} />
          <input type="text" placeholder="Filter by agent or ID..." className="bg-transparent border-none outline-none text-xs font-bold uppercase tracking-widest placeholder:text-white/20" />
        </div>
      </div>

      {/* Threat List */}
      <div className="flex-1 space-y-4">
        {MOCK_THREATS.map((threat) => (
          <motion.div 
            key={threat.id}
            whileHover={{ x: 4 }}
            className={`glass p-5 border-white/5 flex flex-col gap-4 relative overflow-hidden group ${
              threat.severity === 'critical' ? 'border-l-4 border-l-red-500' : 
              threat.severity === 'high' ? 'border-l-4 border-l-orange-500' : ''
            }`}
          >
            {threat.status === 'active' && (
              <div className="absolute top-0 right-0 p-2">
                 <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              </div>
            )}
            
            <div className="flex justify-between items-start">
               <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    threat.severity === 'critical' ? 'bg-red-500/10 text-red-500' : 
                    threat.severity === 'high' ? 'bg-orange-500/10 text-orange-500' : 'bg-white/5 text-white/40'
                  }`}>
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight uppercase flex items-center gap-2">
                       {threat.type}
                       <span className="text-[10px] text-white/30 font-mono">#{threat.id}</span>
                    </h3>
                    <p className="text-sm text-white/60 font-medium">Target Agent: <span className="text-cyan-400">{threat.agent}</span></p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-xs font-black uppercase text-white/40 mb-1">{threat.time}</p>
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                     threat.status === 'active' ? 'bg-red-500/20 text-red-400' :
                     threat.status === 'resolved' ? 'bg-lime-500/20 text-lime-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                     {threat.status}
                  </span>
               </div>
            </div>

            <p className="text-sm text-white/40 leading-relaxed max-w-3xl">
              {threat.description}
            </p>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-cyan-300">
                     <Eye size={14} /> View Evidence
                  </button>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300">
                     <CheckCircle size={14} /> Isolate Agent
                  </button>
               </div>
               <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <MoreVertical size={16} className="text-white/20" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FilterTab({ active, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
        active ? 'bg-white/10 text-white shadow-lg' : 'text-white/30 hover:text-white/60'
      }`}
    >
      {label}
    </button>
  );
}

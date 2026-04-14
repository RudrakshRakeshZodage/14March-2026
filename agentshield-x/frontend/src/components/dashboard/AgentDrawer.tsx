"use client";

import React from "react";
import { 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Database, 
  Activity,
  Lock,
  ExternalLink
} from "lucide-react";

type Agent = {
  id: string;
  name: string;
  status: string;
  score: number;
  lastAction: string;
};

type DetailRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

type AuditSnippetProps = {
  time: string;
  action: string;
  status: string;
  warning?: boolean;
};
import { motion, AnimatePresence } from "framer-motion";

export default function AgentDrawer({ agent, isOpen, onClose }: { agent: Agent | null, isOpen: boolean, onClose: () => void }) {
  if (!agent) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-[450px] bg-black border-l border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.8)] z-[70] flex flex-col"
          >
             <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-lg ${
                      agent.status === 'safe' ? 'bg-cyan-500/20 text-cyan-400' : 
                      agent.status === 'compromised' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'
                   }`}>
                      {agent.status === 'safe' ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                   </div>
                   <div>
                      <h2 className="font-black text-lg uppercase tracking-tight">{agent.name}</h2>
                      <span className="text-[10px] font-mono text-white/30 tracking-widest">{agent.id}</span>
                   </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                   <X size={20} className="text-white/40" />
                </button>
             </div>

             <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {/* Score Section */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="glass p-4 border-white/5 text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Integrity Score</p>
                      <h3 className={`text-3xl font-black ${agent.score > 80 ? 'text-cyan-400' : 'text-red-400'}`}>{agent.score}</h3>
                   </div>
                   <div className="glass p-4 border-white/5 text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Trust Level</p>
                      <h3 className="text-lg font-black uppercase text-white/60">{agent.status}</h3>
                   </div>
                </div>

                {/* Behavioral Metadata */}
                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20">Behavioral Metadata</h4>
                   <div className="space-y-3">
                      <DetailRow icon={<Clock size={14} />} label="Registration Time" value="2026-04-12 14:22:05" />
                      <DetailRow icon={<Database size={14} />} label="Identity Anchor" value="0x882...1b2c" />
                      <DetailRow icon={<Activity size={14} />} label="Last Activity" value={agent.lastAction} />
                      <DetailRow icon={<Lock size={14} />} label="RBAC Policy" value="Strict-Isolation" />
                   </div>
                </div>

                {/* Behavioral Drift Graph Placeholder */}
                <div className="glass p-6 border-white/5 space-y-4">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-white/40">Action Sequence Drift</span>
                      <span className="text-cyan-400">Normal Range</span>
                   </div>
                   <div className="h-32 w-full flex items-end gap-1">
                      {[40, 60, 45, 80, 50, 90, 30, 70, 40, 60, 80, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group">
                           <motion.div 
                             initial={{ height: 0 }}
                             animate={{ height: `${h}%` }}
                             className={`w-full rounded-t-sm ${h > 75 ? 'bg-red-500/40' : 'bg-cyan-500/20'}`}
                           />
                        </div>
                      ))}
                   </div>
                </div>

                {/* Audit Trail Snippet */}
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20">Audit Trail Snippets</h4>
                      <button className="text-[10px] font-black uppercase text-cyan-400 flex items-center gap-1">
                         Full History <ExternalLink size={10} />
                      </button>
                   </div>
                   <div className="space-y-2">
                      <AuditSnippet time="14:12:05" action="API_CALL" status="Success" />
                      <AuditSnippet time="14:12:08" action="NET_SEND" status="Blocked" warning />
                      <AuditSnippet time="14:12:12" action="IMG_TRANS" status="Success" />
                   </div>
                </div>
             </div>

             <div className="p-8 border-t border-white/5 grid grid-cols-2 gap-4">
                <button className="py-3 glass border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                   Suspend Agent
                </button>
                <button className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                   agent.status === 'safe' ? 'bg-red-500/20 text-red-500 border border-red-500/20' : 'bg-lime-500/20 text-lime-400 border border-lime-500/20'
                }`}>
                   Isolate & Purge
                </button>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2 last:border-none">
       <div className="flex items-center gap-2 text-white/30">
          {icon}
          <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
       </div>
       <span className="text-xs font-mono font-medium text-white/60">{value}</span>
    </div>
  );
}

function AuditSnippet({ time, action, status, warning = false }: AuditSnippetProps) {
  return (
    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg text-xs font-mono">
       <div className="flex items-center gap-3">
          <span className="text-white/20">{time}</span>
          <span className="font-bold uppercase tracking-tighter">{action}</span>
       </div>
       <span className={warning ? 'text-red-400' : 'text-cyan-400'}>{status}</span>
    </div>
  );
}

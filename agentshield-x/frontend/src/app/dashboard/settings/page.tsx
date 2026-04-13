"use client";

import React from "react";
import { 
  Settings, 
  Shield, 
  Database, 
  Bell, 
  Key, 
  Zap,
  Save,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase flex items-center gap-3">
          <Settings className="text-white/60" />
          System Settings
        </h1>
        <p className="text-white/40 font-medium">Configure AgentShield X security parameters and integration endpoints.</p>
      </div>

      <div className="space-y-6">
        {/* Security Section */}
        <SettingsSection 
          icon={<Shield size={20} className="text-cyan-400" />}
          title="Security & Detection"
          description="Adjust sensitivity for the ML detection engine and guardrail policies."
        >
          <div className="space-y-4">
            <ToggleItem label="Real-time Behavioral Monitoring" active />
            <ToggleItem label="Prompt Injection Protection" active />
            <div className="pt-2">
              <label className="text-[10px] font-black uppercase text-white/30 tracking-widest block mb-2">Detection Sensitivity</label>
              <input type="range" className="w-full accent-cyan-500 bg-white/5" />
              <div className="flex justify-between text-[10px] font-mono text-white/20 mt-1">
                <span>Aggressive</span>
                <span>Optimized</span>
                <span>Balanced</span>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Blockchain Section */}
        <SettingsSection 
          icon={<Database size={20} className="text-purple-400" />}
          title="Blockchain Archival"
          description="Manage how logs are anchored to the decentralized ledger."
        >
          <div className="space-y-4">
            <div className="flex gap-4">
               <div className="flex-1">
                  <label className="text-[10px] font-black uppercase text-white/30 tracking-widest block mb-2">Sync Frequency</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:border-cyan-500/50">
                     <option>Every 5 seconds (Instant)</option>
                     <option>Batch every 1 minute</option>
                     <option>Batch every 5 minutes</option>
                  </select>
               </div>
            </div>
            <ToggleItem label="Merkle Proof Verification" active />
          </div>
        </SettingsSection>

        {/* API Keys Section */}
        <SettingsSection 
          icon={<Key size={20} className="text-lime-400" />}
          title="Integration API Keys"
          description="Manage keys used by AI agents to communicate with the platform."
        >
          <div className="space-y-3">
             <div className="glass p-3 border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-lime-400"></div>
                   <span className="text-xs font-mono text-white/60">MAIN_CLUSTER_ENFORCER</span>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white">Revoke</button>
             </div>
             <button className="text-xs font-bold text-cyan-400 flex items-center gap-1 hover:underline">
                <Zap size={14} /> Generate New Cluster Key
             </button>
          </div>
        </SettingsSection>
      </div>

      <div className="pt-6 border-t border-white/5 flex justify-between">
         <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all font-bold text-sm">
            <RefreshCw size={18} /> Discard Changes
         </button>
         <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 transition-all font-black text-sm shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <Save size={18} /> Save Configurations
         </button>
      </div>
    </div>
  );
}

function SettingsSection({ icon, title, description, children }: any) {
  return (
    <div className="glass p-6 border-white/5">
      <div className="flex gap-4 mb-6">
        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-black tracking-tight uppercase">{title}</h2>
          <p className="text-sm text-white/40">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ToggleItem({ label, active = false }: { label: string, active?: boolean }) {
  const [isOn, setIsOn] = React.useState(active);
  return (
    <div className="flex justify-between items-center group">
      <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">{label}</span>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={`w-10 h-5 rounded-full relative transition-colors ${isOn ? 'bg-cyan-500' : 'bg-white/10'}`}
      >
        <motion.div 
          animate={{ x: isOn ? 20 : 2 }}
          className="w-4 h-4 bg-white rounded-full absolute top-0.5"
        />
      </button>
    </div>
  );
}

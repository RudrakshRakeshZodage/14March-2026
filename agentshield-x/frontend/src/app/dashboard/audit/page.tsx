"use client";

import React, { useState } from "react";
import { 
  Database, 
  Hash, 
  Search, 
  ExternalLink, 
  ShieldCheck,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Blockchain Data ---
const MOCK_AUDIT_LOGS = [
  { 
    id: "0x7d...f2a1", 
    agent: "QueryOptimizer-v1", 
    action: "DB_INDEX_SYNC", 
    txHash: "0x92f...a3e2", 
    prevHash: "0x88c...b1d4",
    merkleRoot: "0x112...e4f9",
    timestamp: "2026-04-13 21:12:05",
    status: "verified"
  },
  { 
    id: "0x5a...e1b9", 
    agent: "SecurityScanner-v4", 
    action: "PORT_SCAN_X", 
    txHash: "0x77d...b1c0", 
    prevHash: "0x7d...f2a1",
    merkleRoot: "0x112...e4f9",
    timestamp: "2026-04-13 21:12:08",
    status: "verified"
  },
  { 
    id: "0x33...c1d2", 
    agent: "DataExfiltrator-X", 
    action: "EXT_IP_CONN", 
    txHash: "0x44a...f9b2", 
    prevHash: "0x5a...e1b9",
    merkleRoot: "0x112...e4f9",
    timestamp: "2026-04-13 21:12:12",
    status: "verified"
  }
];

export default function AuditExplorerPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-8 h-full flex flex-col">
       <div>
        <h1 className="text-3xl font-black tracking-tight uppercase flex items-center gap-3">
          <Database className="text-purple-400" />
          Blockchain Audit Explorer
        </h1>
        <p className="text-white/40 font-medium">Immutable verification of all agent actions anchored to the decentralized ledger.</p>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {/* Verification Status Banner */}
        <div className="glass p-4 border-lime-500/20 bg-lime-500/5 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-lime-500 flex items-center justify-center">
                 <ShieldCheck className="text-black" />
              </div>
              <div>
                 <p className="font-black text-sm uppercase">Global Chain Integrity</p>
                 <p className="text-xs text-lime-400/60 font-mono">Current Merkle Root: 0x112...e4f9 &bull; Synced with Ethereum Mainnet</p>
              </div>
           </div>
           <button className="px-4 py-2 glass border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5">
              Verify Full Chain
           </button>
        </div>

        {/* Audit List */}
        <div className="flex-1 glass border-white/5 overflow-hidden flex flex-col">
           <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex gap-4">
                 <div className="px-3 py-1 bg-white/10 rounded-md text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-white/20">All Sources</div>
                 <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/40 cursor-pointer hover:text-white">High Severity Only</div>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                 <Search size={14} />
                 <input type="text" placeholder="TX HASH / LOG ID" className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest" />
              </div>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar">
              {MOCK_AUDIT_LOGS.map((log) => (
                <div key={log.id} className="border-b border-white/5 last:border-none">
                  <div 
                    onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                    className="p-4 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-6">
                       <Hash className="text-white/20" size={20} />
                       <div>
                          <p className="font-bold text-sm tracking-tight">{log.agent}</p>
                          <p className="text-[10px] font-mono text-white/30 uppercase">{log.action}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-12 text-sm">
                       <div className="text-right">
                          <p className="font-mono text-white/50 text-[11px]">{log.txHash}</p>
                          <p className="text-[10px] text-white/20 uppercase font-black">Transaction Hash</p>
                       </div>
                       <div className="text-right w-32">
                          <p className="font-bold text-xs">{log.timestamp.split(' ')[1]}</p>
                          <p className="text-[10px] text-white/20 uppercase font-black">Time</p>
                       </div>
                       {expandedId === log.id ? <ChevronUp className="text-white/20" /> : <ChevronDown className="text-white/20" />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === log.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-black/40 border-t border-white/5"
                      >
                         <div className="p-6 grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                               <DetailItem label="Previous Block Hash" value={log.prevHash} copyable />
                               <DetailItem label="Merkle Root" value={log.merkleRoot} />
                               <DetailItem label="Log UUID" value="b2e8-4a1d-9f3c-8821-4f1b2c3d4e5f" />
                            </div>
                            <div className="space-y-6">
                               <div className="glass p-4 border-white/5">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Payload Preview</p>
                                  <pre className="text-[10px] font-mono text-cyan-400 bg-black/40 p-3 rounded-lg overflow-x-auto">
                                    {`{
  "action": "${log.action}",
  "executor": "${log.agent}",
  "nonce": 420,
  "integrity_check": "PASS",
  "blockchain_anchor": true
}`}
                                  </pre>
                               </div>
                               <button className="w-full flex items-center justify-center gap-2 py-3 glass border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-white">
                                  <ExternalLink size={14} className="text-cyan-400" />
                                  View on Etherscan
                               </button>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, copyable = false }: { label: string, value: string, copyable?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <p className="font-mono text-xs text-white/70 break-all">{value}</p>
        {copyable && <LinkIcon size={12} className="text-white/20 hover:text-white cursor-pointer" />}
      </div>
    </div>
  );
}

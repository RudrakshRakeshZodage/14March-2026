"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Zap, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_INSIGHTS = [
  {
    category: "optimization",
    title: "Drift Correlation Detected",
    text: "Agents in Cluster-A show 14% behavioral deviation. Recommended policy: Restrict outward API calls for 30m.",
    icon: <Sparkles size={16} className="text-cyan-400" />
  },
  {
    category: "threat",
    title: "Anomalous Identity Swap",
    text: "Agent 'AutoCoder-v4' is using outdated PKI signatures. Verify on-chain registry status immediately.",
    icon: <AlertCircle size={16} className="text-red-400" />
  },
  {
    category: "performance",
    title: "Inference Loop Optimization",
    text: "Redundant integrity checks causing 15ms latency. Can safely offload to L2 guardrails.",
    icon: <Zap size={16} className="text-lime-400" />
  }
];

export default function InsightsPanel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_INSIGHTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const insight = MOCK_INSIGHTS[currentIndex];

  return (
    <div className="glass p-6 border-cyan-500/10 bg-cyan-500/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4">
        <Sparkles size={20} className="text-cyan-400/20 group-hover:text-cyan-400 transition-colors animate-pulse" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/80">AI Insight Engine</span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/20 to-transparent"></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center">
              {insight.icon}
            </div>
            <h4 className="text-sm font-black uppercase tracking-tight">{insight.title}</h4>
          </div>
          <p className="text-xs text-white/50 leading-relaxed font-medium">
            {insight.text}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex gap-1">
          {MOCK_INSIGHTS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-white/10'}`} 
            />
          ))}
        </div>
        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors">
          Apply Recommendation <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Lock, Activity, Globe, Cpu } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden bg-grid">
      <div className="scanline"></div>
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-6 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-cyan-400 neon-glow-cyan" />
          <span className="text-xl font-bold tracking-tighter uppercase">AgentShield X</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/60">
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#security" className="hover:text-cyan-400 transition-colors">Security</a>
          <a href="#network" className="hover:text-cyan-400 transition-colors">Network</a>
        </div>
        <Link href="/dashboard">
          <button className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            Launch Platform
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-8 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 mb-6 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Next-Gen Runtime Integrity
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            IMMUTABLE SECURITY <br /> FOR AI AGENTS
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Enforce runtime integrity monitoring for autonomous AI agents across distributed networks. Detect drift, prevent prompt injection, and log everything to the blockchain.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <button className="w-full md:w-auto px-10 py-4 bg-white text-black font-black text-lg rounded-xl hover:bg-white/90 transition-all">
                Get Started Now
              </button>
            </Link>
            <button className="w-full md:w-auto px-10 py-4 glass border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/5 transition-all">
              View Documentation
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Activity className="w-6 h-6 text-cyan-400" />}
            title="Real-Time Telemetry"
            description="Sub-100ms monitoring of agent tool calls, API requests, and internal states."
          />
          <FeatureCard 
            icon={<Lock className="w-6 h-6 text-purple-400" />}
            title="Blockchain Auditing"
            description="Every agent action is hashed and anchored to a tamper-proof blockchain ledger."
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-lime-400" />}
            title="Drift Detection"
            description="ML-powered behavioral baselining to identify malicious deviations instantly."
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6 text-cyan-400" />}
            title="Distributed Isolation"
            description="Quarantine compromised agents across your network with single-click precision."
          />
          <FeatureCard 
            icon={<Cpu className="w-6 h-6 text-purple-400" />}
            title="Policy Enforcement"
            description="Dynamic guardrails that inspect every prompt and output for security violations."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-lime-400" />}
            title="Runtime Attestation"
            description="Cryptographic proof that your AI runtimes haven't been tampered with."
          />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 py-10 px-8 border-t border-white/5 text-center text-white/30 text-sm font-mono uppercase tracking-widest">
        &copy; 2026 AgentShield X &bull; Quantum-Grade AI Security
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card hover:border-cyan-500/30 group"
    >
      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/40 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
}

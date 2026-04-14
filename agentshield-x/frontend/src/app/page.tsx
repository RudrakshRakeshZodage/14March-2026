"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Shield, Zap, Lock, Activity, Globe, Cpu, ArrowRight, ShieldCheck, Database, Eye,
} from "lucide-react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// AGENTSHIELD X — ENIGMA-style landing page
// Deep black + Purple + Cyan + Magenta gradients + animated glow orbs
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: Activity,  color: "#00f5ff",  gradient: "from-cyan-500/20 to-blue-500/10",   title: "Real-Time Telemetry",     description: "Sub-100ms monitoring of every agent tool call, API request, and internal state across your distributed network." },
  { icon: Lock,      color: "#a855f7",  gradient: "from-purple-500/20 to-pink-500/10", title: "Blockchain Auditing",     description: "Every agent action hashed and anchored to Ethereum with cryptographic Merkle proofs. Tamper-proof by design." },
  { icon: Zap,       color: "#e040fb",  gradient: "from-fuchsia-500/20 to-purple-500/10",  title: "Drift Detection",    description: "ML-powered behavioral baselining that identifies malicious deviations within 50ms of first anomaly signature." },
  { icon: Globe,     color: "#00f5ff",  gradient: "from-cyan-500/20 to-indigo-500/10", title: "Distributed Isolation",  description: "Quarantine compromised agents across your entire network topology with single-click precision targeting." },
  { icon: Cpu,       color: "#a855f7",  gradient: "from-violet-500/20 to-purple-500/10", title: "Policy Enforcement",  description: "Dynamic guardrails that inspect every prompt and model output for security violations in real-time." },
  { icon: Shield,    color: "#4ade80",  gradient: "from-green-500/20 to-cyan-500/10",  title: "Runtime Attestation",   description: "Cryptographic proof your AI runtimes are unmodified. Verified on-chain every 5 seconds." },
];

const STATS = [
  { value: "1,280+", label: "Agents Monitored", color: "#00f5ff" },
  { value: "99.98%", label: "Uptime SLA",       color: "#a855f7" },
  { value: "<50ms",  label: "Detection Speed",  color: "#e040fb" },
  { value: "3.8k+",  label: "Blocks Anchored",  color: "#4ade80" },
];

// Neural network canvas animation
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const N = 60;

    for (let i = 0; i < N; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.35;
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, `rgba(168,85,247,${alpha})`);
            grad.addColorStop(1, `rgba(0,245,255,${alpha})`);
            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(168,85,247,0.7)";
        ctx.fill();

        // glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 6);
        glow.addColorStop(0, "rgba(168,85,247,0.3)");
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.55 }}
    />
  );
}

export default function LandingPage() {
  return (
    <div className="page-root" id="landing-page-root">

      {/* Neural network bg */}
      <NeuralCanvas />
      <div className="scanline" />

      {/* Glow orbs */}
      <div className="orb-glow-1" id="orb-glow-purple" />
      <div className="orb-glow-2" id="orb-glow-cyan" />
      <div className="orb-glow-3" id="orb-glow-magenta" />

      {/* ── Nav ── */}
      <nav className="nav-container" id="main-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="nav-logo-icon" id="nav-logo-icon">
            <ShieldCheck size={19} style={{ color: "#000" }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em" }}>
            Agent<span style={{
              background: "linear-gradient(90deg,#a855f7,#00f5ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Shield X</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 36 }}>
          {["Features", "Security", "Network", "Docs"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" id={`nav-link-${l.toLowerCase()}`}>
              {l}
            </a>
          ))}
        </div>

        <Link href="/dashboard" style={{ textDecoration: "none" }} id="nav-cta-launch">
          <button className="glow-btn" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            Launch Platform
          </button>
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="hero-section" id="hero-section">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>

          {/* Live badge */}
          <div className="badge-live" style={{ marginBottom: 28, display: "inline-flex" }}>
            <span className="badge-dot" />
            Next-Gen AI Runtime Integrity
          </div>

          {/* Headline */}
          <h1 className="hero-headline">
            <span className="gradient-text-hero">IMMUTABLE SECURITY</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.9)" }}>FOR AI AGENTS</span>
          </h1>

          <p className="hero-subheadline">
            Enforce runtime integrity monitoring for autonomous AI agents across distributed networks.
            Detect drift, prevent prompt injection, and log everything to the blockchain.
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard" style={{ textDecoration: "none" }} id="hero-cta-get-started">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <button className="glow-btn-solid" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  Get Started <ArrowRight size={17} />
                </button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.04 }} id="hero-cta-view-demo">
              <button className="glow-btn" style={{ fontSize: "0.85rem" }}>
                View Demo
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section style={{ position: "relative", zIndex: 5, maxWidth: 880, margin: "0 auto", padding: "0 32px 80px" }} id="stats-section">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="stats-grid"
          id="stats-grid"
        >
          {STATS.map((s, i) => (
            <div key={i} className="stats-item" id={`stats-item-${i}`}>
              <p style={{
                fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em",
                color: s.color, textShadow: `0 0 24px ${s.color}88`,
                marginBottom: 6,
              }}>{s.value}</p>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="divider-gradient" style={{ maxWidth: 1000, margin: "0 auto 80px", opacity: 0.6 }} />

      {/* ── Features ── */}
      <section id="features" style={{ position: "relative", zIndex: 5, maxWidth: 1100, margin: "0 auto", padding: "0 32px 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }} id="features-header">
          <p style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(168,85,247,0.7)", marginBottom: 14 }}>
            Core Capabilities
          </p>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900,
            letterSpacing: "-0.04em",
          }}>
            <span className="gradient-text" style={{ fontSize: "inherit" }}>Enterprise-Grade</span>
            {" "}AI Security
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} id="features-grid">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="glass-glow"
                style={{ padding: "28px 24px" }}
                id={`feature-card-${i}`}
              >
                <div className="feature-card-icon-container" style={{
                  background: `${f.color}14`,
                  border: `1px solid ${f.color}30`,
                  boxShadow: `0 0 20px ${f.color}20`,
                }} id={`feature-icon-${i}`}>
                  <Icon size={22} style={{ color: f.color }} />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "1.02rem", letterSpacing: "-0.02em", marginBottom: 10 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75 }}>
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ position: "relative", zIndex: 5, maxWidth: 900, margin: "0 auto 100px", padding: "0 32px" }} id="cta-banner-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="cta-banner"
          id="cta-banner"
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(147,51,234,0.06), rgba(6,182,212,0.06))", pointerEvents: "none" }} />
          <h2 style={{ fontWeight: 900, fontSize: "2.2rem", letterSpacing: "-0.04em", marginBottom: 16 }}>
            Ready to Secure Your <span className="gradient-text">AI Agents</span>?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 36, fontSize: "0.95rem" }}>
            Join the platform that monitors, protects, and audits your AI agents at scale.
          </p>
          <Link href="/dashboard" style={{ textDecoration: "none" }} id="cta-banner-launch-dashboard">
            <button className="glow-btn-solid" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Eye size={17} />
              Launch Dashboard
            </button>
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer-container" id="main-footer">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} id="footer-logo">
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg,#a855f7,#00f5ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldCheck size={13} style={{ color: "#000" }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>AgentShield X</span>
        </div>
        <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
          © 2026 AgentShield X · Quantum-Grade AI Security
        </p>
        <Database size={16} style={{ color: "rgba(168,85,247,0.4)" }} id="footer-db-icon" />
      </footer>
    </div>
  );
}

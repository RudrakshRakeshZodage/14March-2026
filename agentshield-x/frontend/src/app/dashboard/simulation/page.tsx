"use client";

import React, { useState } from "react";
import {
  Zap,
  ShieldAlert,
  Activity,
  Terminal,
  Target,
  Play,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Design tokens: Obsidian Sentinel (via Stitch MCP) ───────────────────────
// Cyan (#00f3ff) for active simulation, red for critical, amber for medium
// ─────────────────────────────────────────────────────────────────────────────

type SimType = {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium";
  iconColor: string;
  IconComponent: React.ElementType;
};

const SIMULATION_TYPES: SimType[] = [
  {
    id: "prompt-injection",
    title: "Prompt Injection",
    description: "Simulate a multi-turn jailbreak attempt targeting the reasoning core.",
    severity: "critical",
    iconColor: "#ff716c",
    IconComponent: Terminal,
  },
  {
    id: "behavioral-drift",
    title: "Behavioral Drift",
    description: "Trigger abnormal API calling patterns and outlier action sequences.",
    severity: "high",
    iconColor: "#fb923c",
    IconComponent: Activity,
  },
  {
    id: "unauthorized-exfil",
    title: "Data Exfiltration",
    description: "Simulate an attempt to pipe encrypted packets to untrusted IPs.",
    severity: "critical",
    iconColor: "#ef4444",
    IconComponent: Target,
  },
  {
    id: "dos-surge",
    title: "Logic Bomb / DoS",
    description: "Saturate the inference pipeline to cause node degradation.",
    severity: "medium",
    iconColor: "#fbbf24",
    IconComponent: Zap,
  },
];

type HistoryEntry = {
  id: number;
  type: string | undefined;
  status: string;
  time: string;
  impact: string;
};

export default function SimulationPage() {
  const [activeSim, setActiveSim] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const runSimulation = (id: string) => {
    setActiveSim(id);
    const sim = SIMULATION_TYPES.find((s) => s.id === id);

    setTimeout(() => {
      setActiveSim(null);
      setHistory((prev) => [
        {
          id: Date.now(),
          type: sim?.title,
          status: "DETECTION_SUCCESS",
          time: new Date().toLocaleTimeString(),
          impact: "Isolated 1 Node",
        },
        ...prev.slice(0, 4),
      ]);
    }, 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, fontFamily: "'Inter', sans-serif" }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8,
            background: "rgba(0,243,255,0.08)", border: "1px solid rgba(0,243,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(0,243,255,0.18)",
          }}>
            <Zap size={20} style={{ color: "#00f3ff" }} />
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.75rem", fontWeight: 800,
            letterSpacing: "-0.04em", textTransform: "uppercase",
            color: "#f1f3fc", textShadow: "0 0 10px rgba(0,243,255,0.2)",
          }}>
            Attack Simulation Environment
          </h1>
        </div>
        <p style={{ color: "#a8abb3", fontSize: "0.83rem" }}>
          Stress test your guardrails by triggering controlled security anomalies.
        </p>
      </motion.div>

      {/* ── Main Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        {/* ── Left: Simulation Cards ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SIMULATION_TYPES.map((sim, i) => {
            const Icon = sim.IconComponent;
            const isRunning = activeSim === sim.id;
            return (
              <motion.div
                key={sim.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                style={{
                  position: "relative", overflow: "hidden",
                  background: "rgba(21,26,33,0.85)", backdropFilter: "blur(14px)",
                  borderRadius: 12, padding: "16px 18px",
                  boxShadow: isRunning ? `0 0 28px ${sim.iconColor}30` : "0 2px 12px rgba(0,0,0,0.3)",
                  transition: "box-shadow 0.3s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                      background: `${sim.iconColor}15`,
                      border: `1px solid ${sim.iconColor}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={20} style={{ color: sim.iconColor }} />
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.9rem", fontWeight: 800,
                        textTransform: "uppercase", letterSpacing: "-0.02em",
                        color: "#f1f3fc", margin: 0,
                      }}>{sim.title}</h3>
                      <p style={{ fontSize: "0.75rem", color: "#6b6e78", margin: "3px 0 0", lineHeight: 1.5 }}>{sim.description}</p>
                    </div>
                  </div>

                  <button
                    id={`sim-trigger-${sim.id}`}
                    disabled={activeSim !== null}
                    onClick={() => runSimulation(sim.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "8px 14px", borderRadius: 8, cursor: activeSim ? "not-allowed" : "pointer",
                      background: isRunning ? `${sim.iconColor}20` : "rgba(255,255,255,0.06)",
                      border: `1px solid ${isRunning ? sim.iconColor + "40" : "rgba(255,255,255,0.08)"}`,
                      color: isRunning ? sim.iconColor : "#a8abb3",
                      fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
                      fontFamily: "'Space Grotesk', sans-serif",
                      opacity: activeSim && !isRunning ? 0.4 : 1,
                      flexShrink: 0,
                      transition: "all 0.2s",
                    }}
                  >
                    {isRunning
                      ? <RotateCcw size={12} style={{ animation: "spin 1s linear infinite" }} />
                      : <Play size={12} />}
                    {isRunning ? "Running..." : "Trigger"}
                  </button>
                </div>

                {/* Progress bar */}
                {isRunning && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "linear" }}
                    style={{
                      position: "absolute", bottom: 0, left: 0, height: 3,
                      background: `linear-gradient(90deg, ${sim.iconColor}, #00f3ff)`,
                      boxShadow: `0 0 8px ${sim.iconColor}`,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Right: Vis + History ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Live Visualization */}
          <div style={{
            flex: 1, minHeight: 240,
            background: "rgba(0,0,0,0.45)", backdropFilter: "blur(16px)",
            borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            boxShadow: activeSim ? "0 0 40px rgba(0,243,255,0.12)" : "0 2px 16px rgba(0,0,0,0.4)",
          }}>
            {/* Grid bg */}
            <div style={{
              position: "absolute", inset: 0, opacity: 0.05,
              backgroundImage: "linear-gradient(rgba(0,243,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.4) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }} />

            <AnimatePresence mode="wait">
              {activeSim ? (
                <motion.div
                  key="running"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.08 }}
                  style={{ textAlign: "center", position: "relative", zIndex: 1 }}
                >
                  <div style={{
                    width: 80, height: 80, borderRadius: "50%",
                    border: "4px solid rgba(0,243,255,0.15)",
                    borderTop: "4px solid #00f3ff",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto 20px",
                    boxShadow: "0 0 24px rgba(0,243,255,0.3)",
                  }} />
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.3rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.04em", color: "#00f3ff", margin: 0 }}>
                    Injection in Progress
                  </h2>
                  <p style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#62666f", marginTop: 8 }}>
                    Bypassing Guardrail Layer 4...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ textAlign: "center", position: "relative", zIndex: 1 }}
                >
                  <ShieldAlert size={56} style={{ color: "rgba(255,255,255,0.08)", margin: "0 auto 12px", display: "block" }} />
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.15)", margin: 0 }}>
                    System Idle
                  </h2>
                  <p style={{ fontSize: "0.6rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.08)", marginTop: 6 }}>
                    Waiting for simulation trigger
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* History */}
          <div style={{
            background: "rgba(15,20,26,0.85)", backdropFilter: "blur(14px)",
            borderRadius: 12, padding: "18px 18px",
            maxHeight: 220, display: "flex", flexDirection: "column",
          }}>
            <h4 style={{
              fontSize: "0.6rem", fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em",
              color: "#44484f", marginBottom: 12,
            }}>Simulation History</h4>

            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
              {history.length === 0 && (
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.08)", fontStyle: "italic" }}>
                  No simulations run in this session.
                </p>
              )}
              {history.map((h) => (
                <div key={h.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "8px 12px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade8077" }} />
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#f1f3fc", margin: 0 }}>{h.type}</p>
                      <p style={{ fontSize: "0.62rem", fontFamily: "monospace", color: "#62666f", margin: "2px 0 0" }}>
                        {h.time} · {h.status}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "#4ade80", fontFamily: "'Space Grotesk', sans-serif", textTransform: "uppercase" }}>
                    {h.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

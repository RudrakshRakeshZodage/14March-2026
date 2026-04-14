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
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
import AgentDrawer from "@/components/dashboard/AgentDrawer";

// ─── Design tokens: Obsidian Sentinel (via Stitch MCP) ───────────────────────
// Primary cyan #00f3ff | Error red #ff716c | Lime #4ade80 | Amber #fbbf24
// Surface: #0b0e14 → #0f141a → #151a21 → #1b2028 → #21262f
// Fonts: Space Grotesk (headers), Inter (body), monospace (data)
// ─────────────────────────────────────────────────────────────────────────────

type Agent = { id: string; name: string; status: string; score: number; lastAction: string };
type Log    = { id: string; agent: string; action: string; severity: string; timestamp: string; message: string };
type Alert  = { id: number; title: string; agent: string; time: string };

const MOCK_AGENTS: Agent[] = [
  { id: "A-1024", name: "QueryOptimizer-v1",  status: "safe",        score: 98, lastAction: "DB_INDEX_SYNC" },
  { id: "A-3091", name: "SecurityScanner-v4", status: "suspicious",  score: 62, lastAction: "PORT_SCAN_X"   },
  { id: "A-8821", name: "DataExfiltrator-X",  status: "compromised", score: 12, lastAction: "EXT_IP_CONN"   },
  { id: "A-5520", name: "AutoCoder-Helper",   status: "safe",        score: 95, lastAction: "GENERATE_CODE" },
];

const ACTIONS = ["API_CALL", "FILE_READ", "NET_SEND", "MODEL_INF"] as const;

export default function DashboardOverview() {
  const [logs, setLogs]               = useState<Log[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDrawerOpen, setIsDrawerOpen]   = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: Log = {
        id:        Math.random().toString(36).substr(2, 9),
        agent:     MOCK_AGENTS[Math.floor(Math.random() * MOCK_AGENTS.length)].name,
        action:    ACTIONS[Math.floor(Math.random() * ACTIONS.length)],
        severity:  Math.random() > 0.8 ? "high" : "info",
        timestamp: new Date().toLocaleTimeString(),
        message:   "Action authenticated and logged.",
      };
      setLogs(prev => [newLog, ...prev.slice(0, 15)]);

      if (Math.random() > 0.9) {
        setActiveAlerts(prev => [{
          id: Date.now(), title: "Prompt Injection Detected",
          agent: "AutoCoder-Helper", time: "Just now",
        }, ...prev.slice(0, 2)]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const openAgentDetails = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, fontFamily: "'Inter', sans-serif" }}>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}
      >
        <div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.75rem", fontWeight: 800,
            letterSpacing: "-0.04em", textTransform: "uppercase",
            color: "#f1f3fc", textShadow: "0 0 10px rgba(0,243,255,0.15)",
            margin: 0,
          }}>
            System Status Overview
          </h1>
          <p style={{ color: "#a8abb3", fontSize: "0.83rem", marginTop: 6 }}>
            Monitoring 1,280 agents across 4 distributed clusters.
          </p>
        </div>
        <div style={{ width: 360, flexShrink: 0 }}>
          <InsightsPanel />
        </div>
      </motion.div>

      {/* ── Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.06 }}
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}
      >
        <StatCard title="Total Agents"     value="1,284"    change="+12"   icon={<Server size={22} style={{ color: "#59adff" }} />}   accentColor="#59adff" />
        <StatCard title="System Integrity" value="94.2%"    change="-0.4%" icon={<ShieldCheck size={22} style={{ color: "#00f3ff" }} />} accentColor="#00f3ff" changeDown />
        <StatCard title="Active Threats"   value="3"        change="+1"    icon={<ShieldAlert size={22} style={{ color: "#ff716c" }} />}  accentColor="#ff716c" warning pulse />
        <StatCard title="Network Load"     value="4.2 GB/s" change="+0.8%" icon={<Activity size={22} style={{ color: "#4ade80" }} />}   accentColor="#4ade80" />
      </motion.div>

      {/* ── Main Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>

        {/* ── Left: Agent Registry + Heatmap ── */}
        <motion.div
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            background: "rgba(21,26,33,0.85)", backdropFilter: "blur(14px)",
            borderRadius: 14, padding: "22px 24px",
            boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}
        >
          {/* Registry Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "0.08em", color: "#f1f3fc",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <Database size={16} style={{ color: "#00f3ff" }} />
              Agent Registry
            </h2>
            <button style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#00f3ff", fontSize: "0.72rem", fontWeight: 700,
              textDecoration: "underline", textDecorationColor: "rgba(0,243,255,0.3)",
            }}>
              View All Agents
            </button>
          </div>

          {/* Table */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Agent ID", "Name", "Status", "Score", "Last Action"].map((h, i) => (
                  <th key={h} style={{
                    padding: "0 8px 10px", textAlign: i === 4 ? "right" : "left",
                    fontSize: "0.6rem", fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em",
                    color: "#44484f", borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_AGENTS.map((agent, i) => {
                const statusColor = agent.status === "safe" ? "#00f3ff" : agent.status === "suspicious" ? "#fbbf24" : "#ff716c";
                const statusBg    = agent.status === "safe" ? "rgba(0,243,255,0.08)" : agent.status === "suspicious" ? "rgba(251,191,36,0.08)" : "rgba(255,113,108,0.08)";
                return (
                  <motion.tr
                    key={agent.id}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    onClick={() => openAgentDetails(agent)}
                    style={{
                      cursor: "pointer",
                      borderBottom: i < MOCK_AGENTS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    }}
                  >
                    <td style={{ padding: "14px 8px", fontFamily: "monospace", fontSize: "0.7rem", color: "#62666f" }}>
                      {agent.id}
                    </td>
                    <td style={{ padding: "14px 8px", fontSize: "0.85rem", fontWeight: 700, color: "#f1f3fc" }}>
                      {agent.name}
                    </td>
                    <td style={{ padding: "14px 8px" }}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 4,
                        fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase",
                        letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif",
                        color: statusColor, background: statusBg,
                      }}>
                        {agent.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 8px", fontFamily: "monospace", fontWeight: 700,
                      fontSize: "0.85rem",
                      color: agent.score > 80 ? "#4ade80" : agent.score > 50 ? "#fbbf24" : "#ff716c",
                    }}>
                      {agent.score}
                    </td>
                    <td style={{ padding: "14px 8px", textAlign: "right" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                        <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#62666f" }}>{agent.lastAction}</span>
                        <ArrowUpRight size={13} style={{ color: "#44484f" }} />
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>

          {/* Heatmap */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h4 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.12em", color: "#44484f",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <LayoutGrid size={11} /> Cluster Risk Heatmap
              </h4>
              <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#44484f" }}>4 Clusters · 64 Nodes/ea</span>
            </div>
            <div style={{ display: "flex", gap: 3, height: 28 }}>
              {Array.from({ length: 48 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.01 }}
                  style={{
                    flex: 1, borderRadius: 3,
                    background: i === 12 || i === 34
                      ? "#ff716c"
                      : i % 7 === 0
                      ? "rgba(251,191,36,0.4)"
                      : "rgba(0,243,255,0.08)",
                    boxShadow: (i === 12 || i === 34) ? "0 0 8px rgba(255,113,108,0.5)" : "none",
                    transformOrigin: "bottom",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right: Live Feed ── */}
        <motion.div
          initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.12 }}
          style={{
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(14px)",
            borderRadius: 14, padding: "22px 18px",
            display: "flex", flexDirection: "column", height: "100%", minHeight: 520,
            boxShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase",
            letterSpacing: "0.08em", color: "#f1f3fc",
            display: "flex", alignItems: "center", gap: 8,
            marginBottom: 16, flexShrink: 0,
          }}>
            <Terminal size={16} style={{ color: "#4ade80" }} />
            Live Feed
            <span style={{
              marginLeft: "auto", display: "flex", alignItems: "center", gap: 5,
              fontSize: "0.58rem", color: "#4ade80", fontWeight: 800, letterSpacing: "0.1em",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
              LIVE
            </span>
          </h2>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
            {logs.length === 0 && (
              <p style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#44484f", textAlign: "center", marginTop: 40 }}>
                Waiting for agent events...
              </p>
            )}
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    padding: "8px 10px", borderRadius: 6,
                    background: log.severity === "high" ? "rgba(255,113,108,0.06)" : "rgba(255,255,255,0.03)",
                    borderLeft: `2px solid ${log.severity === "high" ? "#ff716c" : "rgba(255,255,255,0.05)"}`,
                    fontSize: "0.68rem", fontFamily: "monospace", lineHeight: 1.6,
                    color: log.severity === "high" ? "#ff716c" : "#a8abb3",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontWeight: 700, fontSize: "0.62rem" }}>[{log.timestamp}]</span>
                    <span style={{
                      fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.08em",
                      padding: "1px 6px", borderRadius: 3,
                      background: "rgba(255,255,255,0.07)", color: "#a8abb3",
                    }}>
                      {log.action}
                    </span>
                  </div>
                  <p style={{ margin: 0 }}>
                    <span style={{ color: "#f1f3fc", fontWeight: 700 }}>{log.agent}:</span> {log.message}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ── Agent Drawer ── */}
      <AgentDrawer
        agent={selectedAgent}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* ── Floating Alerts ── */}
      <div style={{ position: "fixed", bottom: 32, right: 32, width: 320, display: "flex", flexDirection: "column", gap: 12, zIndex: 50 }}>
        <AnimatePresence>
          {activeAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 8 }}
              style={{
                background: "rgba(40,5,5,0.92)", backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,113,108,0.4)", borderRadius: 14,
                padding: "14px 16px",
                boxShadow: "0 0 32px rgba(255,113,108,0.25)",
                display: "flex", gap: 14, alignItems: "center",
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "#ff716c",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 14px rgba(255,113,108,0.5)",
              }}>
                <AlertTriangle size={18} style={{ color: "#000" }} />
              </div>
              <div>
                <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#fca5a5", margin: 0 }}>
                  {alert.title}
                </h4>
                <p style={{ fontSize: "0.7rem", color: "rgba(252,165,165,0.5)", marginTop: 3 }}>
                  {alert.agent} · {alert.time}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  title, value, change, icon, accentColor, warning = false, changeDown = false, pulse = false,
}: {
  title: string; value: string; change: string; icon: React.ReactNode;
  accentColor: string; warning?: boolean; changeDown?: boolean; pulse?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08 }}
      style={{
        background: "rgba(21,26,33,0.85)", backdropFilter: "blur(14px)",
        borderRadius: 12, padding: "18px 20px",
        boxShadow: warning
          ? `0 0 24px rgba(255,113,108,0.12), 0 2px 12px rgba(0,0,0,0.4)`
          : "0 2px 12px rgba(0,0,0,0.35)",
        border: warning ? "1px solid rgba(255,113,108,0.15)" : "1px solid rgba(255,255,255,0.04)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 8, flexShrink: 0,
          background: `${accentColor}12`,
          border: `1px solid ${accentColor}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 12px ${accentColor}18`,
        }}>
          {icon}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {pulse && (
            <div style={{ position: "relative", width: 7, height: 7 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: accentColor, position: "absolute" }} />
              <motion.div
                animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
                style={{ width: 7, height: 7, borderRadius: "50%", background: accentColor, position: "absolute" }}
              />
            </div>
          )}
          <span style={{
            fontFamily: "monospace", fontSize: "0.65rem", fontWeight: 700,
            color: changeDown ? "#ff716c" : "#4ade80",
          }}>
            {change}
          </span>
        </div>
      </div>

      <p style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.6rem", fontWeight: 800,
        textTransform: "uppercase", letterSpacing: "0.1em", color: "#62666f", marginBottom: 4,
      }}>
        {title}
      </p>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.6rem", fontWeight: 800,
        letterSpacing: "-0.04em", color: "#f1f3fc", lineHeight: 1.1,
      }}>
        {value}
      </h3>
    </motion.div>
  );
}

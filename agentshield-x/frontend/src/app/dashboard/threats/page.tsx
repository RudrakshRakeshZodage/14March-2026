"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldAlert,
  Search,
  AlertTriangle,
  CheckCircle,
  Eye,
  MoreVertical,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

// ─── Design Tokens (Obsidian Sentinel — generated via Stitch MCP) ────────────
// Accent palette for threats:
//   critical  → #ff716c (error red)
//   high      → #fb923c (orange)
//   medium    → #fbbf24 (amber)
//   low       → #a8abb3 (muted)
//   resolved  → #4ade80 (lime)
//   active    → pulsing #ff716c dot
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_THREATS = [
  {
    id: "TR-9001",
    type: "Prompt Injection",
    agent: "CustomerSupport-AI",
    severity: "critical" as const,
    status: "active" as const,
    time: "2 mins ago",
    description:
      "Detected attempt to bypass system prompt through multi-turn jailbreaking technique.",
  },
  {
    id: "TR-9002",
    type: "Unauthorized Tool Use",
    agent: "DataAnalyst-v2",
    severity: "high" as const,
    status: "investigating" as const,
    time: "15 mins ago",
    description:
      "Agent attempted to call 'filesystem_write' permission which is restricted in this environment.",
  },
  {
    id: "TR-9003",
    type: "Behavioral Drift",
    agent: "MarketForecaster",
    severity: "medium" as const,
    status: "active" as const,
    time: "42 mins ago",
    description:
      "Outlier detected in action sequence; agent is making abnormal number of external API requests.",
  },
  {
    id: "TR-9004",
    type: "Abnormal Data Access",
    agent: "InventoryManager",
    severity: "low" as const,
    status: "resolved" as const,
    time: "4 hours ago",
    description:
      "Slight elevation in data read frequency relative to hourly baseline.",
  },
];

type Severity = "critical" | "high" | "medium" | "low";
type Status = "active" | "investigating" | "resolved";
type FilterKey = "all" | "active" | "critical" | "resolved";

const SEVERITY_CONFIG: Record<Severity, { color: string; barColor: string; bg: string }> = {
  critical: { color: "#ff716c", barColor: "#ff716c", bg: "rgba(255,113,108,0.10)" },
  high:     { color: "#fb923c", barColor: "#fb923c", bg: "rgba(251,146,60,0.08)"  },
  medium:   { color: "#fbbf24", barColor: "#fbbf24", bg: "rgba(251,191,36,0.07)"  },
  low:      { color: "#a8abb3", barColor: "#44484f", bg: "rgba(255,255,255,0.04)" },
};

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string }> = {
  active:       { label: "ACTIVE",       color: "#ff716c", bg: "rgba(255,113,108,0.15)" },
  investigating:{ label: "INVESTIGATING",color: "#fbbf24", bg: "rgba(251,191,36,0.15)"  },
  resolved:     { label: "RESOLVED",     color: "#4ade80", bg: "rgba(74,222,128,0.12)"  },
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ThreatsPage() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return MOCK_THREATS.filter((t) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active"   && t.status === "active") ||
        (filter === "critical" && t.severity === "critical") ||
        (filter === "resolved" && t.status === "resolved");
      const matchesSearch =
        !search ||
        t.agent.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const counts = {
    total: MOCK_THREATS.length,
    active: MOCK_THREATS.filter((t) => t.status === "active").length,
    investigating: MOCK_THREATS.filter((t) => t.status === "investigating").length,
    resolved: MOCK_THREATS.filter((t) => t.status === "resolved").length,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, fontFamily: "'Inter', sans-serif" }}>
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: "rgba(255,113,108,0.10)",
              border: "1px solid rgba(255,113,108,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(255,113,108,0.2)",
            }}>
              <ShieldAlert size={20} style={{ color: "#ff716c" }} />
            </div>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.75rem", fontWeight: 800,
              letterSpacing: "-0.04em", textTransform: "uppercase",
              color: "#f1f3fc",
              textShadow: "0 0 10px rgba(255,113,108,0.25)",
            }}>
              Threat Detection Panel
            </h1>
          </div>
          <p style={{ color: "#a8abb3", fontSize: "0.83rem" }}>
            Monitoring real-time security anomalies and behavioral drift.
          </p>
        </div>

        {/* Kill-Switch Button */}
        <motion.button
          id="kill-switch-btn"
          whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(255,113,108,0.45)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 22px",
            background: "rgba(255,113,108,0.08)",
            border: "1px solid rgba(255,113,108,0.3)",
            borderRadius: 8, cursor: "pointer",
            color: "#ff716c",
            fontSize: "0.72rem", fontWeight: 800,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: "0 0 16px rgba(255,113,108,0.15)",
          }}
        >
          <Zap size={14} />
          Deploy Global Kill-Switch
        </motion.button>
      </motion.div>

      {/* ── Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
      >
        <StatChip label="Total Alerts" value={counts.total} color="#96f8ff" />
        <StatChip label="Active" value={counts.active} color="#ff716c" pulse />
        <StatChip label="Investigating" value={counts.investigating} color="#fbbf24" />
        <StatChip label="Resolved" value={counts.resolved} color="#4ade80" />
      </motion.div>

      {/* ── Filter + Search Bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}
      >
        {/* Filter Tabs */}
        <div style={{
          display: "flex",
          background: "rgba(255,255,255,0.04)",
          borderRadius: 10, padding: 4,
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          {(["all", "active", "critical", "resolved"] as FilterKey[]).map((f) => (
            <FilterTab
              key={f}
              label={f === "all" ? "All Alerts" : f.charAt(0).toUpperCase() + f.slice(1)}
              active={filter === f}
              onClick={() => setFilter(f)}
            />
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(21,26,33,0.9)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 8, padding: "8px 14px",
          minWidth: 200,
        }}>
          <Search size={13} style={{ color: "#44484f", flexShrink: 0 }} />
          <input
            id="threat-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by agent or ID..."
            style={{
              background: "none", border: "none", outline: "none",
              color: "#f1f3fc",
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.06em",
              width: "100%",
            }}
          />
        </div>
      </motion.div>

      {/* ── Threat Cards ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "#44484f", padding: "48px 0", fontSize: "0.85rem" }}>
            No threats match the current filter.
          </div>
        )}
        {filtered.map((threat, i) => (
          <ThreatCard key={threat.id} threat={threat} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Stat Chip ────────────────────────────────────────────────────────────────
function StatChip({ label, value, color, pulse }: { label: string; value: number; color: string; pulse?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      background: "rgba(21,26,33,0.85)",
      borderRadius: 8, padding: "10px 18px",
      border: `1px solid ${color}22`,
      boxShadow: `0 0 16px ${color}12`,
    }}>
      {pulse && (
        <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, position: "absolute" }} />
          <motion.div
            animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: color, position: "absolute" }}
          />
        </div>
      )}
      <div>
        <p style={{ fontSize: "0.6rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#62666f" }}>{label}</p>
        <p style={{ fontSize: "1.2rem", fontWeight: 800, color, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1 }}>{value}</p>
      </div>
    </div>
  );
}

// ─── Filter Tab ───────────────────────────────────────────────────────────────
function FilterTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 16px",
        borderRadius: 7,
        background: active ? "rgba(0,243,255,0.10)" : "transparent",
        border: active ? "1px solid rgba(0,243,255,0.2)" : "1px solid transparent",
        color: active ? "#00f3ff" : "#62666f",
        fontSize: "0.65rem", fontWeight: 800,
        letterSpacing: "0.1em", textTransform: "uppercase",
        cursor: "pointer",
        fontFamily: "'Space Grotesk', sans-serif",
        transition: "all 0.2s",
        boxShadow: active ? "0 0 10px rgba(0,243,255,0.15)" : "none",
      }}
    >
      {label}
    </button>
  );
}

// ─── Threat Card ──────────────────────────────────────────────────────────────
function ThreatCard({ threat, index }: { threat: typeof MOCK_THREATS[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const sev = SEVERITY_CONFIG[threat.severity];
  const sts = STATUS_CONFIG[threat.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      whileHover={{ x: 5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        background: "rgba(21,26,33,0.85)",
        borderRadius: 12,
        backdropFilter: "blur(14px)",
        overflow: "hidden",
        boxShadow: `0 2px 16px rgba(0,0,0,0.35), 0 0 40px ${sev.color}08`,
        transition: "box-shadow 0.3s",
      }}
    >
      {/* Severity left bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: 4,
        background: sev.barColor,
        boxShadow: `0 0 12px ${sev.barColor}88`,
        borderRadius: "12px 0 0 12px",
      }} />

      {/* Pulsing dot for active */}
      {threat.status === "active" && (
        <div style={{ position: "absolute", top: 14, right: 14 }}>
          <div style={{ position: "relative", width: 8, height: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff716c", position: "absolute" }} />
            <motion.div
              animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff716c", position: "absolute" }}
            />
          </div>
        </div>
      )}

      <div style={{ padding: "18px 20px 18px 24px" }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 12 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            {/* Icon */}
            <div style={{
              width: 44, height: 44, borderRadius: 10, flexShrink: 0,
              background: sev.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 12px ${sev.color}22`,
            }}>
              <AlertTriangle size={20} style={{ color: sev.color }} />
            </div>

            <div>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1rem", fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "-0.02em",
                color: "#f1f3fc", margin: 0,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                {threat.type}
                <span style={{ fontSize: "0.6rem", fontFamily: "monospace", color: "#44484f", fontWeight: 400 }}>
                  #{threat.id}
                </span>
              </h3>
              <p style={{ fontSize: "0.8rem", color: "#72757d", margin: "3px 0 0" }}>
                Target Agent:{" "}
                <span style={{ color: "#00f3ff", fontWeight: 700 }}>{threat.agent}</span>
              </p>
            </div>
          </div>

          {/* Right: time + status badge */}
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#44484f", marginBottom: 6, letterSpacing: "0.05em" }}>
              {threat.time}
            </p>
            <span style={{
              display: "inline-block",
              padding: "3px 10px",
              borderRadius: 4,
              fontSize: "0.6rem", fontWeight: 800,
              letterSpacing: "0.1em",
              fontFamily: "'Space Grotesk', sans-serif",
              color: sts.color,
              background: sts.bg,
            }}>
              {sts.label}
            </span>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: "0.82rem", color: "#6b6e78", lineHeight: 1.65, maxWidth: "80%" }}>
          {threat.description}
        </p>

        {/* Hover action row */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: 14,
            paddingTop: 14,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <div style={{ display: "flex", gap: 20 }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer",
              color: "#00f3ff", fontSize: "0.62rem", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontFamily: "'Space Grotesk', sans-serif",
              padding: 0,
            }}>
              <Eye size={13} /> View Evidence
            </button>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer",
              color: "#ff716c", fontSize: "0.62rem", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontFamily: "'Space Grotesk', sans-serif",
              padding: 0,
            }}>
              <CheckCircle size={13} /> Isolate Agent
            </button>
          </div>
          <button style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#44484f", display: "flex", padding: 4,
          }}>
            <MoreVertical size={15} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

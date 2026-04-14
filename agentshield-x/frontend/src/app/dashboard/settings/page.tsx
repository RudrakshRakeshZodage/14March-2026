"use client";

import React, { useState } from "react";
import {
  Settings,
  Shield,
  Database,
  Bell,
  Key,
  Zap,
  Save,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

// ─── Design Tokens (Obsidian Sentinel — generated via Stitch MCP) ────────────
// Primary: #96f8ff / #00f1fd (cyan neon)
// Secondary: #ac89ff / #7000ff (purple neon)
// Surface hierarchy: #0b0e14 → #0f141a → #151a21 → #1b2028 → #21262f
// Fonts: Space Grotesk (headings), Inter (body), monospace (data)
// ─────────────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Page Header ── */}
      <PageHeader />

      {/* ── Settings Sections ── */}
      <div className="space-y-5">
        <SecuritySection />
        <BlockchainSection />
        <ApiKeysSection />
        <NotificationsSection />
      </div>

      {/* ── Action Bar ── */}
      <ActionBar />
    </div>
  );
}

// ─── Page Header ─────────────────────────────────────────────────────────────
function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          style={{
            background: "rgba(0,243,255,0.08)",
            border: "1px solid rgba(0,243,255,0.15)",
            borderRadius: 8,
            padding: "10px",
            boxShadow: "0 0 18px rgba(0,243,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Settings size={22} style={{ color: "#00f3ff" }} />
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.9rem",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#f1f3fc",
            textShadow: "0 0 8px rgba(0,241,253,0.35)",
          }}
        >
          System Settings
        </h1>
      </div>
      <p style={{ color: "#a8abb3", fontSize: "0.85rem", paddingLeft: 2 }}>
        Configure AgentShield X security parameters and integration endpoints.
      </p>
    </motion.div>
  );
}

// ─── Reusable Section Wrapper ─────────────────────────────────────────────────
function SettingsSection({
  icon,
  title,
  accentColor,
  delay = 0,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accentColor: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{
        background: "rgba(21,26,33,0.85)",
        backdropFilter: "blur(16px)",
        borderRadius: 12,
        padding: "1.5rem",
        boxShadow: `0 0 36px rgba(${accentColor},0.06), 0 2px 12px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Section title row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#f1f3fc",
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}

// ─── Animated Toggle ──────────────────────────────────────────────────────────
function ToggleItem({
  label,
  active = false,
  accentColor = "#00f3ff",
}: {
  label: string;
  active?: boolean;
  accentColor?: string;
}) {
  const [isOn, setIsOn] = useState(active);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
      }}
    >
      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: isOn ? "#f1f3fc" : "#62666f" }}>
        {label}
      </span>
      <button
        onClick={() => setIsOn(!isOn)}
        aria-pressed={isOn}
        aria-label={`Toggle ${label}`}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          background: isOn ? accentColor : "rgba(255,255,255,0.08)",
          border: "none",
          cursor: "pointer",
          position: "relative",
          transition: "background 0.25s ease",
          boxShadow: isOn ? `0 0 12px ${accentColor}55` : "none",
          flexShrink: 0,
        }}
      >
        <motion.div
          animate={{ x: isOn ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: 3,
          }}
        />
      </button>
    </div>
  );
}

// ─── Label ─────────────────────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: "0.65rem",
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: "#62666f",
        marginBottom: 8,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {children}
    </label>
  );
}

// ─── Security & Detection ─────────────────────────────────────────────────────
function SecuritySection() {
  const [sensitivity, setSensitivity] = useState(70);
  const [threshold, setThreshold] = useState(85);

  return (
    <SettingsSection
      icon={<Shield size={18} style={{ color: "#00f3ff" }} />}
      title="Security & Detection"
      accentColor="0,243,255"
      delay={0.05}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <ToggleItem label="Real-time Behavioral Monitoring" active accentColor="#00f3ff" />
        <div style={{ height: 1, background: "rgba(255,255,255,0.04)", margin: "4px 0" }} />
        <ToggleItem label="Prompt Injection Protection" active accentColor="#00f3ff" />

        <div style={{ marginTop: 16 }}>
          <FieldLabel>Detection Sensitivity</FieldLabel>
          <input
            id="sensitivity-slider"
            type="range"
            min={0}
            max={100}
            value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#00f3ff", cursor: "pointer" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 4,
              fontSize: "0.6rem",
              fontFamily: "monospace",
              color: "#44484f",
              letterSpacing: "0.05em",
            }}
          >
            <span>AGGRESSIVE</span>
            <span>OPTIMIZED</span>
            <span>BALANCED</span>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <FieldLabel>Anomaly Threshold (%)</FieldLabel>
          <input
            id="anomaly-threshold"
            type="number"
            min={0}
            max={100}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            style={{
              width: "100%",
              background: "#000",
              border: "none",
              borderBottom: "2px solid rgba(68,72,79,0.6)",
              color: "#96f8ff",
              fontFamily: "monospace",
              fontSize: "0.95rem",
              padding: "6px 4px",
              outline: "none",
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </SettingsSection>
  );
}

// ─── Blockchain Archival ──────────────────────────────────────────────────────
function BlockchainSection() {
  return (
    <SettingsSection
      icon={<Database size={18} style={{ color: "#ac89ff" }} />}
      title="Blockchain Archival"
      accentColor="112,0,255"
      delay={0.1}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <FieldLabel>Sync Frequency</FieldLabel>
          <div style={{ position: "relative" }}>
            <select
              id="sync-frequency"
              style={{
                width: "100%",
                background: "#0b0e14",
                border: "1px solid rgba(172,137,255,0.2)",
                borderRadius: 8,
                padding: "10px 36px 10px 14px",
                color: "#f1f3fc",
                fontSize: "0.85rem",
                appearance: "none",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option>Every 5 seconds (Instant)</option>
              <option>Batch every 1 minute</option>
              <option>Batch every 5 minutes</option>
            </select>
            <ChevronDown
              size={14}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#ac89ff", pointerEvents: "none" }}
            />
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.04)" }} />
        <ToggleItem label="Merkle Proof Verification" active accentColor="#ac89ff" />

        {/* Pulsing Ledger Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(0,0,0,0.3)",
            borderRadius: 8,
            padding: "10px 14px",
            marginTop: 4,
          }}
        >
          <PulsingDot color="#4ade80" />
          <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#a8abb3" }}>
            LEDGER STATUS:{" "}
            <span style={{ color: "#4ade80", fontWeight: 700 }}>3,847 blocks anchored</span>
          </span>
        </div>
      </div>
    </SettingsSection>
  );
}

function PulsingDot({ color }: { color: string }) {
  return (
    <div style={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, position: "absolute" }} />
      <motion.div
        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        style={{ width: 10, height: 10, borderRadius: "50%", background: color, position: "absolute" }}
      />
    </div>
  );
}

// ─── Integration API Keys ─────────────────────────────────────────────────────
function ApiKeysSection() {
  const keys = [
    { id: "MAIN_CLUSTER_ENFORCER", masked: "as-x•••••••••••••••••••3A9F" },
    { id: "AGENT_BRIDGE_NODE", masked: "as-x•••••••••••••••••••7C2D" },
  ];

  return (
    <SettingsSection
      icon={<Key size={18} style={{ color: "#a3e635" }} />}
      title="Integration API Keys"
      accentColor="163,230,53"
      delay={0.15}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {keys.map((k, i) => (
          <div
            key={k.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
              borderRadius: 8,
              padding: "10px 12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#a3e635", boxShadow: "0 0 6px #a3e63577" }} />
              <div>
                <p style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "#a8abb3" }}>{k.id}</p>
                <p style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#44484f", letterSpacing: "0.05em" }}>{k.masked}</p>
              </div>
            </div>
            <button
              style={{
                background: "none",
                border: "1px solid rgba(255,107,107,0.25)",
                color: "#ff716c",
                fontSize: "0.6rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Revoke
            </button>
          </div>
        ))}

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#00f3ff",
            fontSize: "0.78rem",
            fontWeight: 700,
            marginTop: 6,
            padding: 0,
            textShadow: "0 0 8px rgba(0,243,255,0.4)",
          }}
        >
          <Zap size={14} style={{ color: "#00f3ff" }} />
          Generate New Cluster Key
        </button>
      </div>
    </SettingsSection>
  );
}

// ─── Notifications & Alerts ───────────────────────────────────────────────────
function NotificationsSection() {
  return (
    <SettingsSection
      icon={<Bell size={18} style={{ color: "#f9a825" }} />}
      title="Notifications & Alerts"
      accentColor="249,168,37"
      delay={0.2}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <ToggleItem label="Critical Breach Alerts" active accentColor="#f9a825" />
        <div style={{ height: 1, background: "rgba(255,255,255,0.04)", margin: "4px 0" }} />
        <ToggleItem label="Weekly Threat Report" active accentColor="#f9a825" />
        <div style={{ height: 1, background: "rgba(255,255,255,0.04)", margin: "4px 0" }} />
        <ToggleItem label="Anomaly Digest Emails" active={false} accentColor="#f9a825" />
      </div>
    </SettingsSection>
  );
}

// ─── Action Bar ───────────────────────────────────────────────────────────────
function ActionBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 24,
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#a8abb3",
          fontSize: "0.8rem",
          fontWeight: 700,
          padding: "10px 20px",
          borderRadius: 8,
          cursor: "pointer",
          fontFamily: "'Space Grotesk', sans-serif",
          transition: "all 0.2s",
        }}
        id="discard-changes-btn"
      >
        <RefreshCw size={16} />
        Discard Changes
      </button>

      <button
        id="save-configurations-btn"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "linear-gradient(135deg, #96f8ff, #00f1fd)",
          border: "none",
          color: "#004145",
          fontSize: "0.8rem",
          fontWeight: 900,
          padding: "10px 28px",
          borderRadius: 8,
          cursor: "pointer",
          fontFamily: "'Space Grotesk', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          boxShadow: "0 0 24px rgba(0,241,253,0.35), 0 4px 16px rgba(0,0,0,0.4)",
          transition: "all 0.2s",
        }}
      >
        <Save size={16} />
        Save Configurations
      </button>
    </motion.div>
  );
}

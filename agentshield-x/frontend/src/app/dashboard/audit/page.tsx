"use client";

import React, { useState } from "react";
import {
  Database,
  Hash,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Copy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Design tokens: Obsidian Sentinel (via Stitch MCP) ───────────────────────
// Purple (#ac89ff) for blockchain/chain elements
// Lime (#4ade80) for verified/integrity status
// Cyan (#00f3ff) for payload/code highlights
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_AUDIT_LOGS = [
  {
    id: "0x7d...f2a1",
    agent: "QueryOptimizer-v1",
    action: "DB_INDEX_SYNC",
    txHash: "0x92f...a3e2",
    prevHash: "0x88c...b1d4",
    merkleRoot: "0x112...e4f9",
    timestamp: "2026-04-13 21:12:05",
    status: "verified",
  },
  {
    id: "0x5a...e1b9",
    agent: "SecurityScanner-v4",
    action: "PORT_SCAN_X",
    txHash: "0x77d...b1c0",
    prevHash: "0x7d...f2a1",
    merkleRoot: "0x112...e4f9",
    timestamp: "2026-04-13 21:12:08",
    status: "verified",
  },
  {
    id: "0x33...c1d2",
    agent: "DataExfiltrator-X",
    action: "EXT_IP_CONN",
    txHash: "0x44a...f9b2",
    prevHash: "0x5a...e1b9",
    merkleRoot: "0x112...e4f9",
    timestamp: "2026-04-13 21:12:12",
    status: "verified",
  },
];

type FilterKey = "all" | "high";

export default function AuditExplorerPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 1500);
  };

  const filtered = MOCK_AUDIT_LOGS.filter((log) => {
    const matchSearch =
      !search ||
      log.txHash.toLowerCase().includes(search.toLowerCase()) ||
      log.id.toLowerCase().includes(search.toLowerCase()) ||
      log.agent.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" || (filter === "high" && log.agent.includes("Exfiltrator"));
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Inter', sans-serif" }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, flexShrink: 0,
            background: "rgba(172,137,255,0.10)",
            border: "1px solid rgba(172,137,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(172,137,255,0.2)",
          }}>
            <Database size={20} style={{ color: "#ac89ff" }} />
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.75rem", fontWeight: 800,
            letterSpacing: "-0.04em", textTransform: "uppercase",
            color: "#f1f3fc",
            textShadow: "0 0 10px rgba(172,137,255,0.2)",
          }}>
            Blockchain Audit Explorer
          </h1>
        </div>
        <p style={{ color: "#a8abb3", fontSize: "0.83rem" }}>
          Immutable verification of all agent actions anchored to the decentralized ledger.
        </p>
      </motion.div>

      {/* ── Chain Integrity Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.06 }}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          background: "rgba(74,222,128,0.06)",
          border: "1px solid rgba(74,222,128,0.18)",
          borderRadius: 12, padding: "14px 18px",
          boxShadow: "0 0 28px rgba(74,222,128,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "#4ade80",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 14px rgba(74,222,128,0.5)",
            flexShrink: 0,
          }}>
            <ShieldCheck size={20} style={{ color: "#000" }} />
          </div>
          <div>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.78rem", fontWeight: 800,
              textTransform: "uppercase", letterSpacing: "0.08em", color: "#4ade80",
            }}>
              Global Chain Integrity: Verified
            </p>
            <p style={{ fontSize: "0.67rem", fontFamily: "monospace", color: "rgba(74,222,128,0.55)", marginTop: 3 }}>
              Merkle Root: 0x112...e4f9 &bull; Synced · Ethereum Mainnet
            </p>
          </div>

          {/* Stats chips */}
          <div style={{ display: "flex", gap: 8, marginLeft: 16, flexWrap: "wrap" }}>
            <StatChip label="Total Blocks" value="3,847" color="#ac89ff" />
            <StatChip label="Verified" value="3,847" color="#4ade80" />
            <StatChip label="Pending" value="0" color="#44484f" />
          </div>
        </div>

        <button style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 8, padding: "8px 16px", cursor: "pointer",
          color: "#f1f3fc", fontSize: "0.65rem", fontWeight: 800,
          letterSpacing: "0.1em", textTransform: "uppercase",
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          Verify Full Chain
        </button>
      </motion.div>

      {/* ── Filter + Search ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}
        style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}
      >
        <div style={{
          display: "flex", background: "rgba(255,255,255,0.04)",
          borderRadius: 10, padding: 4, border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <FilterTab label="All Sources" active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterTab label="High Severity Only" active={filter === "high"} onClick={() => setFilter("high")} />
        </div>
        <div style={{ flex: 1 }} />
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(21,26,33,0.9)", borderRadius: 8, padding: "8px 14px",
          border: "1px solid rgba(255,255,255,0.07)", minWidth: 220,
        }}>
          <Search size={13} style={{ color: "#44484f", flexShrink: 0 }} />
          <input
            id="audit-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="TX HASH / LOG ID"
            style={{
              background: "none", border: "none", outline: "none",
              color: "#f1f3fc", fontSize: "0.68rem",
              fontFamily: "monospace", letterSpacing: "0.06em", width: "100%",
            }}
          />
        </div>
      </motion.div>

      {/* ── Audit Log List ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: 0.14 }}
        style={{
          background: "rgba(15,20,26,0.85)", backdropFilter: "blur(14px)",
          borderRadius: 12, overflow: "hidden",
          boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
        }}
      >
        {/* Table header */}
        <div style={{
          display: "grid", gridTemplateColumns: "40px 1fr 160px 100px 28px",
          gap: 12, alignItems: "center",
          padding: "10px 20px",
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          {["", "Agent / Action", "TX Hash", "Time", ""].map((h, i) => (
            <span key={i} style={{ fontSize: "0.6rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#44484f" }}>
              {h}
            </span>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "#44484f", padding: "40px 0", fontSize: "0.82rem" }}>
            No audit logs match the current filter.
          </div>
        )}

        {filtered.map((log, i) => (
          <div key={log.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            {/* Row */}
            <div
              onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
              style={{
                display: "grid", gridTemplateColumns: "40px 1fr 160px 100px 28px",
                gap: 12, alignItems: "center",
                padding: "14px 20px", cursor: "pointer",
                background: expandedId === log.id ? "rgba(172,137,255,0.05)" : "transparent",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { if (expandedId !== log.id) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}
              onMouseLeave={(e) => { if (expandedId !== log.id) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
            >
              <Hash size={16} style={{ color: "#ac89ff", opacity: 0.5 }} />
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f1f3fc", margin: 0 }}>{log.agent}</p>
                <p style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#62666f", margin: "2px 0 0", letterSpacing: "0.06em" }}>{log.action}</p>
              </div>
              <p style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "#ac89ff" }}>{log.txHash}</p>
              <p style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "#62666f" }}>{log.timestamp.split(" ")[1]}</p>
              {expandedId === log.id
                ? <ChevronUp size={16} style={{ color: "#ac89ff" }} />
                : <ChevronDown size={16} style={{ color: "#44484f" }} />
              }
            </div>

            {/* Expanded Panel */}
            <AnimatePresence>
              {expandedId === log.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: "hidden", background: "rgba(0,0,0,0.35)", borderTop: "1px solid rgba(172,137,255,0.1)" }}
                >
                  <div style={{
                    padding: "20px 24px",
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
                  }}>
                    {/* Left: metadata */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <DetailItem label="Previous Block Hash" value={log.prevHash} onCopy={handleCopy} copied={copied} />
                      <DetailItem label="Merkle Root" value={log.merkleRoot} onCopy={handleCopy} copied={copied} />
                      <DetailItem label="Log UUID" value="b2e8-4a1d-9f3c-8821-4f1b2c3d4e5f" onCopy={handleCopy} copied={copied} />
                    </div>

                    {/* Right: payload + Etherscan */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div style={{ background: "rgba(0,0,0,0.5)", borderRadius: 8, padding: "14px 16px" }}>
                        <p style={{ fontSize: "0.6rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#44484f", marginBottom: 10 }}>
                          Payload Preview
                        </p>
                        <pre style={{ fontSize: "0.68rem", fontFamily: "monospace", color: "#00f3ff", margin: 0, lineHeight: 1.7, overflowX: "auto" }}>
{`{
  "action": "${log.action}",
  "executor": "${log.agent}",
  "nonce": 420,
  "integrity_check": "PASS",
  "blockchain_anchor": true
}`}
                        </pre>
                      </div>

                      <button style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        padding: "12px", borderRadius: 8, cursor: "pointer",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#f1f3fc", fontSize: "0.65rem", fontWeight: 800,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}>
                        <ExternalLink size={13} style={{ color: "#00f3ff" }} />
                        View on Etherscan
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StatChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      background: "rgba(0,0,0,0.25)", borderRadius: 6, padding: "6px 12px",
      border: `1px solid ${color}22`,
    }}>
      <span style={{ fontSize: "0.55rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#44484f" }}>{label}</span>
      <span style={{ fontSize: "0.95rem", fontWeight: 800, color, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.2 }}>{value}</span>
    </div>
  );
}

function FilterTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 14px", borderRadius: 7,
      background: active ? "rgba(172,137,255,0.12)" : "transparent",
      border: active ? "1px solid rgba(172,137,255,0.25)" : "1px solid transparent",
      color: active ? "#ac89ff" : "#62666f",
      fontSize: "0.63rem", fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase",
      cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif",
      boxShadow: active ? "0 0 10px rgba(172,137,255,0.12)" : "none",
      transition: "all 0.2s",
    }}>
      {label}
    </button>
  );
}

function DetailItem({ label, value, onCopy, copied }: { label: string; value: string; onCopy: (v: string) => void; copied: string | null }) {
  const isCopied = copied === value;
  return (
    <div>
      <p style={{ fontSize: "0.58rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#44484f", marginBottom: 5 }}>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#ac89ff", wordBreak: "break-all", margin: 0 }}>{value}</p>
        <button onClick={() => onCopy(value)} style={{ background: "none", border: "none", cursor: "pointer", color: isCopied ? "#4ade80" : "#44484f", flexShrink: 0, padding: 0 }}>
          {isCopied ? <ShieldCheck size={12} /> : <Copy size={12} />}
        </button>
      </div>
    </div>
  );
}

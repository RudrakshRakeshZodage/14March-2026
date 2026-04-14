"use client";

import React from "react";
import {
  LayoutDashboard, ShieldAlert, Database, Share2,
  Settings, LogOut, Bell, Search, User, Zap, ShieldCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview",      href: "/dashboard" },
  { icon: ShieldAlert,     label: "Threats",       href: "/dashboard/threats" },
  { icon: Zap,             label: "Simulation",    href: "/dashboard/simulation" },
  { icon: Share2,          label: "Network Graph", href: "/dashboard/graph" },
  { icon: Database,        label: "Audit Logs",    href: "/dashboard/audit" },
  { icon: Settings,        label: "Settings",      href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      background: "#040408", color: "#fff", fontFamily: "'Inter','Segoe UI',sans-serif",
    }}>

      {/* Neural bg dots */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(168,85,247,0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      {/* Orbs */}
      <div style={{ position: "fixed", top: "-20%", left: "-5%",  width: "40%", height: "40%", background: "radial-gradient(circle,rgba(147,51,234,0.18),transparent)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-10%", right: "-5%", width: "35%", height: "35%", background: "radial-gradient(circle,rgba(6,182,212,0.12),transparent)", pointerEvents: "none", zIndex: 0 }} />

      {/* ── Sidebar ── */}
      <aside style={{
        width: 228, flexShrink: 0, position: "relative", zIndex: 20,
        background: "rgba(4,4,12,0.96)", backdropFilter: "blur(24px)",
        borderRight: "1px solid rgba(168,85,247,0.15)",
        display: "flex", flexDirection: "column",
        boxShadow: "4px 0 40px rgba(0,0,0,0.6)",
      }}>

        {/* Logo */}
        <div style={{
          padding: "22px 18px 16px",
          borderBottom: "1px solid rgba(168,85,247,0.1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: "linear-gradient(135deg,#a855f7,#00f5ff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(168,85,247,0.7), 0 0 8px rgba(0,245,255,0.3)",
            }}>
              <ShieldCheck size={18} style={{ color: "#000", fontWeight: 900 }} />
            </div>
            <div>
              <p style={{ fontWeight: 900, fontSize: "0.95rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
                Shield<span style={{
                  background: "linear-gradient(90deg,#a855f7,#00f5ff)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>_X</span>
              </p>
              <p style={{ fontSize: "0.52rem", fontFamily: "monospace", color: "#a855f7", letterSpacing: "0.12em", marginTop: 1 }}>
                SENTINEL // v2.0
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          <p style={{ fontSize: "0.52rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.2)", padding: "4px 10px 10px" }}>
            Navigation
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                    position: "relative", overflow: "hidden",
                    background: isActive
                      ? "linear-gradient(90deg,rgba(168,85,247,0.15),rgba(0,245,255,0.05))"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(168,85,247,0.3)"
                      : "1px solid transparent",
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.35)",
                    transition: "color 0.2s, background 0.2s",
                    boxShadow: isActive ? "0 0 20px rgba(168,85,247,0.1)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.85)";
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(168,85,247,0.07)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.35)";
                      (e.currentTarget as HTMLDivElement).style.background = "transparent";
                    }
                  }}
                >
                  {/* Active left accent */}
                  {isActive && (
                    <div style={{
                      position: "absolute", left: 0, top: "15%", height: "70%",
                      width: 3, borderRadius: "0 3px 3px 0",
                      background: "linear-gradient(180deg,#e040fb,#00f5ff)",
                      boxShadow: "0 0 12px #a855f7",
                    }} />
                  )}
                  <Icon size={16} style={{ flexShrink: 0, color: isActive ? "#a855f7" : "inherit" }} />
                  <span style={{ fontSize: "0.82rem", fontWeight: isActive ? 700 : 500 }}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* System status */}
        <div style={{
          margin: "0 10px 10px",
          padding: "12px 14px", borderRadius: 10,
          background: "rgba(74,222,128,0.05)",
          border: "1px solid rgba(74,222,128,0.12)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
            <motion.div
              animate={{ scale: [1,2.2], opacity: [0.8,0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80" }}
            />
          </div>
          <div>
            <p style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4ade80" }}>System Online</p>
            <p style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "rgba(74,222,128,0.5)" }}>All nodes healthy</p>
          </div>
        </div>

        {/* Sign Out */}
        <div style={{ padding: "10px 10px 14px", borderTop: "1px solid rgba(168,85,247,0.1)" }}>
          <button
            style={{
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", background: "none", border: "none",
              cursor: "pointer", borderRadius: 9, padding: "10px 12px",
              color: "rgba(255,255,255,0.25)", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#f43f5e";
              e.currentTarget.style.background = "rgba(244,63,94,0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.25)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <LogOut size={15} />
            <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>Sign Out System</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", zIndex: 10 }}>

        {/* Topbar */}
        <header style={{
          height: 60, flexShrink: 0,
          background: "rgba(4,4,12,0.88)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(168,85,247,0.12)",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 28px",
          boxShadow: "0 2px 30px rgba(0,0,0,0.5)",
        }}>

          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(168,85,247,0.14)",
            borderRadius: 10, padding: "8px 16px", width: 340,
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
            onFocus={() => {}}
          >
            <Search size={14} style={{ color: "rgba(168,85,247,0.5)", flexShrink: 0 }} />
            <input
              id="global-search"
              type="text"
              placeholder="Search agents, hashes, audit logs..."
              style={{
                background: "none", border: "none", outline: "none",
                color: "#fff", fontSize: "0.78rem", width: "100%",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* Bell */}
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={18} style={{ color: "rgba(255,255,255,0.4)" }} />
              <motion.div
                animate={{ scale: [1,2.5], opacity: [0.9,0] }}
                transition={{ duration: 1.3, repeat: Infinity }}
                style={{ position: "absolute", top: -1, right: -1, width: 8, height: 8, borderRadius: "50%", background: "#00f5ff" }}
              />
              <div style={{ position: "absolute", top: -1, right: -1, width: 8, height: 8, borderRadius: "50%", background: "#00f5ff", boxShadow: "0 0 8px #00f5ff" }} />
            </div>

            <div style={{ width: 1, height: 28, background: "rgba(168,85,247,0.15)" }} />

            {/* User */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>Admin-0x42</p>
                <p style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "#a855f7" }}>System Architect</p>
              </div>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "linear-gradient(135deg,rgba(168,85,247,0.2),rgba(0,245,255,0.1))",
                border: "1px solid rgba(168,85,247,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 14px rgba(168,85,247,0.25)",
              }}>
                <User size={16} style={{ color: "#a855f7" }} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}

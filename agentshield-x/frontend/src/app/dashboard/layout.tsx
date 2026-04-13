"use client";

import React from "react";
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Database, 
  Share2, 
  Settings, 
  LogOut,
  Bell,
  Search,
  User,
  Zap
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#050505] text-white bg-grid overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col z-30">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center neon-glow-cyan">
            <LayoutDashboard className="w-5 h-5 text-black" />
          </div>
          <span className="font-black text-lg tracking-tighter uppercase italic">SHIELD X</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={pathname === "/dashboard"} href="/dashboard" />
          <NavItem icon={<ShieldAlert size={20} />} label="Threats" active={pathname === "/dashboard/threats"} href="/dashboard/threats" />
          <NavItem icon={<Zap size={20} />} label="Simulation" active={pathname === "/dashboard/simulation"} href="/dashboard/simulation" />
          <NavItem icon={<Share2 size={20} />} label="Network Graph" active={pathname === "/dashboard/graph"} href="/dashboard/graph" />
          <NavItem icon={<Database size={20} />} label="Audit Logs" active={pathname === "/dashboard/audit"} href="/dashboard/audit" />
          <NavItem icon={<Settings size={20} />} label="Settings" active={pathname === "/dashboard/settings"} href="/dashboard/settings" />
        </nav>

        <div className="p-6 border-t border-white/5">
          <button className="flex items-center gap-3 text-white/40 hover:text-red-400 transition-colors w-full group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Sign Out System</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/5 backdrop-blur-md bg-black/20 flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-lg border border-white/10 w-96">
            <Search size={18} className="text-white/30" />
            <input 
              type="text" 
              placeholder="Search agents, nodes, or audit hashes..." 
              className="bg-transparent border-none outline-none text-sm w-full font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell size={20} className="text-white/60 cursor-pointer hover:text-white" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black uppercase text-white">Admin-0x42</p>
                <p className="text-[10px] text-cyan-400 font-mono">System Architect</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                <User size={24} className="text-white/60" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="scanline opacity-20 pointer-events-none"></div>
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, href }: { icon: React.ReactNode, label: string, active?: boolean, href: string }) {
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ x: 4 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
          active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-white/50 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className={active ? 'text-cyan-400' : 'text-inherit'}>
          {icon}
        </div>
        <span className="font-bold text-sm tracking-tight">{label}</span>
      </motion.div>
    </Link>
  );
}

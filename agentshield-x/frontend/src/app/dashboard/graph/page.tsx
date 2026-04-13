"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Share2, Activity, ShieldAlert, Cpu } from "lucide-react";

// Dynamically import react-force-graph-2d to prevent SSR issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

// --- Mock Network Data ---
const generateData = () => {
  const nodes = [];
  const links = [];
  
  // Create clusters
  const clusters = ["Core", "Gateway", "Worker"];
  
  for (let i = 0; i < 40; i++) {
    const isCompromised = i === 12 || i === 25;
    const isSuspicious = i === 5 || i === 18;
    
    nodes.push({
      id: i,
      name: `Agent-${i}`,
      group: clusters[i % 3],
      status: isCompromised ? "compromised" : isSuspicious ? "suspicious" : "safe",
      val: isCompromised ? 10 : 5
    });
  }

  for (let i = 0; i < 60; i++) {
    links.push({
      source: Math.floor(Math.random() * 40),
      target: Math.floor(Math.random() * 40),
      value: Math.random()
    });
  }

  return { nodes, links };
};

export default function NetworkGraphPage() {
  const [data, setData] = useState(generateData());
  const graphRef = useRef<any>(null);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase flex items-center gap-3">
            <Share2 className="text-cyan-400" />
            Agent Network Topology
          </h1>
          <p className="text-white/40 font-medium">Visualizing real-time propagation and communication paths.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-4 py-2 flex items-center gap-2 border-white/5">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Healthy</span>
          </div>
          <div className="glass px-4 py-2 flex items-center gap-2 border-white/5">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Infected</span>
          </div>
        </div>
      </div>

      <div className="flex-1 glass border-white/5 relative overflow-hidden bg-black/40">
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="scanline opacity-10"></div>
        </div>

        <ForceGraph2D
          graphData={data}
          nodeLabel="name"
          nodeColor={(node: any) => {
            if (node.status === "compromised") return "#ef4444";
            if (node.status === "suspicious") return "#f59e0b";
            return "#22d3ee";
          }}
          linkColor={() => "rgba(255,255,255,0.05)"}
          nodeRelSize={6}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={(d: any) => d.value * 0.01}
          backgroundColor="rgba(0,0,0,0)"
          onNodeClick={(node: any) => {
             // Handle node inspection
             console.log("Inspecting node", node);
          }}
          nodeCanvasObject={(node: any, ctx: any, globalScale: any) => {
            const label = node.name;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Inter`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); 

            // Draw shadow/glow
            ctx.shadowColor = node.status === "compromised" ? "#ef4444" : "#22d3ee";
            ctx.shadowBlur = 10;

            // Draw node circle
            ctx.fillStyle = node.status === "compromised" ? "#ef4444" : (node.status === "suspicious" ? "#f59e0b" : "#22d3ee");
            ctx.beginPath(); 
            ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false); 
            ctx.fill();

            // Draw label
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillText(label, node.x - textWidth / 2, node.y + 10);
            
            ctx.shadowBlur = 0; // Reset shadow
          }}
        />

        {/* Legend / Stats overlay */}
        <div className="absolute top-6 left-6 space-y-4">
           <div className="glass p-4 border-white/5 w-48">
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={14} className="text-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">Active Nodes</span>
              </div>
              <p className="text-2xl font-black italic tracking-tighter">4,092</p>
           </div>
           <div className="glass p-4 border-white/5 w-48 border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert size={14} className="text-red-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-red-100">Isolation Zone</span>
              </div>
              <p className="text-2xl font-black italic tracking-tighter text-red-400">2 Nodes</p>
           </div>
        </div>

        <div className="absolute bottom-6 right-6">
           <button 
            onClick={() => setData(generateData())}
            className="glass px-6 py-2 border-white/10 hover:bg-white/5 font-bold text-xs uppercase tracking-widest flex items-center gap-2"
           >
             <Activity size={14} className="text-lime-400" />
             Refresh Topology
           </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Grid,
  FileText,
  Calendar,
  Share2,
  Clock,
  User,
  Settings,
  Bell,
  Search,
  Users,
  Check,
  Activity,
  Moon,
  Atom,
  LogOut,
  Mic,
  Headphones,
  MousePointer,
  Plus,
  GitBranch,
  Play,
} from "lucide-react";
import { ARCHITECTURE_NODES, ArchitectureNode } from "../types";

interface SidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  activeAppMode: 'operational' | 'architecture';
  setActiveAppMode: (mode: 'operational' | 'architecture') => void;
  voiceActive: boolean;
  setVoiceActive: (active: boolean) => void;
  vetoActive: boolean;
  setVetoActive: (active: boolean) => void;
  hasRedError: boolean;
  currentDept: string;
  setCurrentDept: (dept: string) => void;
  orgDepts: string[];
  selectedNode: ArchitectureNode;
  setSelectedNode: (node: ArchitectureNode) => void;
  activeTool: string;
  onToolChange: (tool: string) => void;
}

const AURA_NODES_LOCAL = [
  { id: "facturacion", name: "Billing", color: "#3b82f6" },
  { id: "casos",       name: "Cases",       color: "#3b82f6" },
  { id: "actividades", name: "Activities", color: "#2563eb" },
  { id: "ledger",      name: "Ledger",      color: "#1d4ed8" },
  { id: "voz",         name: "Voz",         color: "#06b6d4" },
];

export function SidebarGlass({
  activeSection,
  onSelectSection,
  activeAppMode,
  setActiveAppMode,
  voiceActive,
  setVoiceActive,
  vetoActive,
  setVetoActive,
  hasRedError,
  currentDept,
  setCurrentDept,
  orgDepts,
  selectedNode,
  setSelectedNode,
  activeTool,
  onToolChange,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOperationalControlOpen, setIsOperationalControlOpen] = useState(true);

  const mainNav = [
    { id: "documents", icon: FileText, label: "Documents" },
    { id: "calendar", icon: Calendar, label: "Calendar / Schedule" },
    { id: "share", icon: Share2, label: "Share View" },
    { id: "history", icon: Clock, label: "History Logs" },
  ];

  const tools = [
    { id: "cursor",   icon: MousePointer,  label: "Precise Selection" },
    { id: "add-kpi",  icon: Plus,          label: "+KPI — New Entity" },
    { id: "link",     icon: GitBranch,     label: "Link Flow" },
    { id: "play",     icon: Play,          label: "Execute / Recalculate Graph" },
    { id: "search",   icon: Search,        label: "Search KPIs / Issues" },
    { id: "settings", icon: Settings,      label: "Thresholds · Confidence 94%" },
  ];

  const filteredNodes = ARCHITECTURE_NODES.filter(node =>
    node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex gap-4 sticky top-0 h-screen py-5 pl-5 flex-shrink-0 z-40 select-none pointer-events-auto">
      
      {/* ─── PRIMARY SIDEBAR (EDGE-LEFT) ─── */}
      <div
        className="w-20 h-full flex flex-col items-center py-6 justify-between transition-all duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.48)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.65)",
          borderRadius: "24px",
          boxShadow: "8px 8px 24px rgba(174, 192, 208, 0.22), -8px -8px 24px rgba(255, 255, 255, 0.8), inset 1px 1px 3px rgba(255, 255, 255, 0.5)",
        }}
      >
        {/* Top Section: Salesforce Cloud Logo & Operational Control Block */}
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Nube de Salesforce */}
          <div className="w-12 h-12 flex items-center justify-center relative">
            <svg className="w-8 h-8 text-[#009fdb] drop-shadow-[0_3px_6px_rgba(0,159,219,0.35)] fill-current" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          </div>

          {/* Bloque completo del Operational Control */}
          <div className="flex flex-col items-center gap-2.5 w-full">
            {/* Controlador de Interfaz (Botón Azul): único evento cerrar/ocultar menú, renderizado de 9 puntos (grid) */}
            <motion.button
              id="operational-control-toggle"
              onClick={() => setIsOperationalControlOpen(!isOperationalControlOpen)}
              className="w-11 h-11 rounded-2xl flex items-center justify-center relative transition-all duration-200 border bg-white cursor-pointer"
              style={{
                borderColor: "rgba(255,255,255,0.95)",
                boxShadow: isOperationalControlOpen
                  ? "inset 2px 2px 5px rgba(165,185,210,0.22), inset -2px -2px 5px rgba(255,255,255,0.75)"
                  : "3px 3px 8px rgba(165,185,210,0.35), -3px -3px 8px rgba(255,255,255,0.9)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Cerrar/Ocultar Menú de Operational Control"
            >
              <div className="grid grid-cols-3 gap-0.5 w-5 h-5 items-center justify-center">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-[1.5px] bg-[#009fdb]" />
                ))}
              </div>
            </motion.button>
          </div>
        </div>

        {/* Middle Section: Navigation Stack (Neumorphic Rounded Square active state) */}
        <div className="flex flex-col gap-4.5">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <div key={item.id} className="relative group flex justify-center">
                <motion.button
                  onClick={() => onSelectSection(item.id)}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center relative transition-all duration-200 border cursor-pointer"
                  style={{
                    background: isActive ? "linear-gradient(135deg, #f0f4f8, #ffffff)" : "transparent",
                    borderColor: isActive ? "rgba(255,255,255,0.95)" : "transparent",
                    boxShadow: isActive
                      ? "3px 3px 8px rgba(165,185,210,0.35), -3px -3px 8px rgba(255,255,255,0.9), inset 2px 2px 5px rgba(165,185,210,0.22), inset -2px -2px 5px rgba(255,255,255,0.75)"
                      : "none",
                  }}
                  whileHover={{ scale: 1.05, background: isActive ? "" : "rgba(37, 99, 235, 0.05)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#009fdb]" : "text-[#5b7290]"}`} />
                </motion.button>

                {/* Tooltip on Hover */}
                <div className="absolute left-16 top-1/2 -translate-y-1/2 pl-3 opacity-0 group-hover:opacity-100 transition-all pointer-events-none duration-200 z-50 whitespace-nowrap">
                  <div className="px-3 py-1.5 rounded-xl text-[10px] font-bold text-white bg-slate-900/90 backdrop-blur-md shadow-lg border border-slate-700/55">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section: Profile Avatar & Migrated Floating Toolbar */}
        <div className="flex flex-col items-center gap-3.5 w-full mt-auto">
          {/* Profile Avatar */}
          <div className="relative group flex justify-center">
            <motion.button
              onClick={() => onSelectSection("admin")}
              className="w-11 h-11 rounded-full flex items-center justify-center relative bg-white border border-white/90 shadow-[3px_3px_8px_rgba(165,185,210,0.3),-3px_-3px_8px_rgba(255,255,255,0.95)] transition-all duration-200 text-[#009fdb] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5 text-[#009fdb]" />
            </motion.button>
            <div className="absolute left-16 top-1/2 -translate-y-1/2 pl-3 opacity-0 group-hover:opacity-100 transition-all pointer-events-none duration-200 z-50 whitespace-nowrap">
              <div className="px-3 py-1.5 rounded-xl text-[10px] font-bold text-white bg-slate-900/90 backdrop-blur-md shadow-lg border border-slate-700/55">
                Admin Profile
              </div>
            </div>
          </div>

          {/* Simple Divider */}
          <div className="w-8 h-px bg-blue-100/50" />

          {/* Migrated Floating Toolbar */}
          <div className="flex flex-col items-center gap-1 w-full">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <div key={tool.id} className="relative group flex justify-center">
                  <motion.button
                    onClick={() => onToolChange(tool.id)}
                    title={tool.label}
                    className="w-9 h-9 rounded-[14px] flex items-center justify-center relative transition-all duration-150 border cursor-pointer"
                    style={{
                      background: "#eff6ff",
                      borderColor: isActive ? "rgba(30,58,138,0.2)" : "rgba(255,255,255,0.5)",
                      boxShadow: isActive
                        ? "inset 2px 2px 4px #cbd5e1, inset -2px -2px 4px #ffffff"
                        : "2px 2px 4px #cbd5e1, -2px -2px 4px #ffffff",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" style={{ color: isActive ? "#1e3a8a" : "#475569" }} />
                  </motion.button>
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 pl-3 opacity-0 group-hover:opacity-100 transition-all pointer-events-none duration-200 z-50 whitespace-nowrap">
                    <div className="px-2.5 py-1.5 rounded-xl text-[10px] font-bold text-white bg-slate-900/90 backdrop-blur-md shadow-lg border border-slate-700/55">
                      {tool.label}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="w-5 h-px my-1" style={{ background: "rgba(30,58,138,0.14)" }} />

            <motion.div
              className="px-1.5 py-1 rounded-xl text-center cursor-default"
              style={{ background: "rgba(30,58,138,0.05)" }}
              animate={{ opacity: [1, 0.65, 1] }}
              transition={{ duration: 2.6, repeat: Infinity }}
            >
              <span className="text-[8px] font-bold block font-mono" style={{ color: "#1e3a8a" }}>94%</span>
              <span className="text-[7px] block" style={{ color: "#475569" }}>CONF</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── SECONDARY SIDEBAR (ATTACHED GLASS) ─── */}
      <AnimatePresence>
        {isOperationalControlOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0, marginRight: -16 }}
            animate={{ width: 256, opacity: 1, marginRight: 0 }}
            exit={{ width: 0, opacity: 0, marginRight: -16 }}
            transition={{ duration: 0.25 }}
            className="w-64 h-full flex flex-col p-5 justify-between transition-all duration-300 overflow-y-auto"
            style={{
              background: "rgba(255, 255, 255, 0.48)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.65)",
              borderRadius: "24px",
              boxShadow: "8px 8px 24px rgba(174, 192, 208, 0.22), -8px -8px 24px rgba(255, 255, 255, 0.8), inset 1px 1px 3px rgba(255, 255, 255, 0.5)",
            }}
          >
            <div className="space-y-5.5">
              {/* Header */}
              <div className="pb-3.5 border-b border-blue-100/50 text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b7290]" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                  ALRO SUPREME
                </p>
                <h3 className="text-sm font-bold text-blue-950 mt-0.5" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                  {activeAppMode === 'operational' ? "AURA LIVE" : "Architecture Control"}
                </h3>
              </div>

              {/* SECTION 1: Controllers (Image 2 style Moon/Atom switch, Bell button, and Glass circular empty container) */}
              <div className="flex items-center justify-between bg-white/40 p-1.5 rounded-2xl border border-white/60 shadow-sm">
                {/* Moon/Atom Switch Pill */}
                <button
                  onClick={() => setActiveAppMode(activeAppMode === 'operational' ? 'architecture' : 'operational')}
                  className="w-16 h-8 rounded-full bg-slate-100/90 border border-slate-200/50 p-1 flex items-center relative cursor-pointer"
                  style={{
                    boxShadow: "inset 2px 2px 5px rgba(165,185,210,0.18), inset -2px -2px 5px rgba(255,255,255,0.75)"
                  }}
                  title="Toggle Workspace Mode"
                >
                  <motion.div
                    className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-blue-600 border border-slate-200/25"
                    style={{
                      boxShadow: "1px 1px 4px rgba(165,185,210,0.25)"
                    }}
                    animate={{ x: activeAppMode === 'operational' ? 0 : 32 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  >
                    {activeAppMode === 'operational' ? (
                      <Moon className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <Atom className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </motion.div>
                  <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none text-slate-400">
                    <Moon className={`w-3.5 h-3.5 ${activeAppMode === 'operational' ? 'opacity-0' : 'opacity-40'}`} />
                    <Atom className={`w-3.5 h-3.5 ${activeAppMode === 'architecture' ? 'opacity-0' : 'opacity-40'}`} />
                  </div>
                </button>

                {/* Notification Bell (Circular button) */}
                <button
                  onClick={() => onSelectSection("alerts")}
                  className="w-8 h-8 rounded-full flex items-center justify-center relative bg-white border border-slate-200/50 text-[#1e3a8a] transition-all hover:scale-105 cursor-pointer"
                  style={{
                    boxShadow: "2px 2px 5px rgba(165,185,210,0.2), -2px -2px 5px rgba(255,255,255,0.95)"
                  }}
                  title="Alerts"
                >
                  <Bell className="w-3.5 h-3.5 text-blue-900" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full text-white text-[8px] flex items-center justify-center font-bold">3</span>
                </button>

                {/* Glass circular container (Image 2 style) */}
                <button
                  onClick={() => onSelectSection("settings")}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-white to-slate-50 border border-slate-200/50 transition-all hover:scale-105 cursor-pointer"
                  style={{
                    boxShadow: "2px 2px 5px rgba(165,185,210,0.2), -2px -2px 5px rgba(255,255,255,0.95)"
                  }}
                  title="System Settings"
                >
                  <Settings className="w-3.5 h-3.5 text-blue-900" />
                </button>
              </div>

              {/* DYNAMIC VIEW-BASED SECONDARY CONTENT */}
              <AnimatePresence mode="wait">
                {activeAppMode === 'operational' ? (
                  <motion.div
                    key="operational-sec"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                {/* Live Color Status Menu */}
                <div className="space-y-2 text-left bg-white/20 p-2.5 rounded-2xl border border-white/40">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#5b7290]" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                    Aura Live Status
                  </p>
                  <div className="flex items-center gap-1 bg-white/70 px-2.5 py-1.5 rounded-xl border border-slate-200/50 shadow-sm w-fit">
                    {AURA_NODES_LOCAL.map(node => (
                      <div key={node.id} className="w-2 h-2 rounded-full" style={{ background: node.color }} title={node.name} />
                    ))}
                    <span className="text-[8px] font-black text-blue-600 font-mono tracking-widest ml-1 animate-pulse">LIVE</span>
                  </div>
                </div>

                {/* 1. Status Lights */}
                <div className="space-y-2 text-left">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#5b7290]" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                    Status Lights
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Red / Error */}
                    <button
                      onClick={() => setVetoActive(!vetoActive)}
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border transition-all text-left bg-white/45"
                      style={{
                        borderColor: vetoActive ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.7)",
                        boxShadow: vetoActive
                          ? "inset 1px 1px 2px rgba(255,255,255,0.8), 2px 2px 5px rgba(239, 68, 68, 0.08)"
                          : "2px 2px 5px rgba(165, 185, 210, 0.1), -1px -1px 3px rgba(255, 255, 255, 0.8)",
                      }}
                      title="Click to toggle Safety Veto state"
                    >
                      <span className="relative flex h-2 w-2 flex-shrink-0">
                        {hasRedError && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${hasRedError ? "bg-rose-500" : "bg-rose-500/30"}`} />
                      </span>
                      <span className={`text-[9px] font-bold font-mono ${hasRedError ? "text-rose-600" : "text-rose-400/75"}`}>🔴 ERROR</span>
                    </button>

                    {/* Blue-Slate / Warn */}
                    <button
                      onClick={() => setVoiceActive(!voiceActive)}
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border transition-all text-left bg-white/45"
                      style={{
                        borderColor: voiceActive ? "rgba(14, 165, 233, 0.2)" : "rgba(255, 255, 255, 0.7)",
                        boxShadow: voiceActive
                          ? "inset 1px 1px 2px rgba(255,255,255,0.8), 2px 2px 5px rgba(14, 165, 233, 0.08)"
                          : "2px 2px 5px rgba(165, 185, 210, 0.1), -1px -1px 3px rgba(255, 255, 255, 0.8)",
                      }}
                      title="Click to toggle Voice Input state"
                    >
                      <span className="relative flex h-2 w-2 flex-shrink-0">
                        {voiceActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${voiceActive ? "bg-sky-500" : "bg-sky-500/30"}`} />
                      </span>
                      <span className={`text-[9px] font-bold font-mono ${voiceActive ? "text-sky-600" : "text-sky-400/75"}`}>🔵 WARN</span>
                    </button>

                    {/* Blue / Info */}
                    <div
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border text-left bg-white/45"
                      style={{
                        borderColor: !hasRedError ? "rgba(14, 165, 233, 0.2)" : "rgba(255, 255, 255, 0.7)",
                        boxShadow: "2px 2px 5px rgba(165, 185, 210, 0.1), -1px -1px 3px rgba(255, 255, 255, 0.8)"
                      }}
                    >
                      <span className="relative flex h-2 w-2 flex-shrink-0">
                        {!hasRedError && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${!hasRedError ? "bg-sky-500" : "bg-sky-500/30"}`} />
                      </span>
                      <span className={`text-[9px] font-bold font-mono ${!hasRedError ? "text-sky-600" : "text-sky-400/75"}`}>🔵 INFO</span>
                    </div>

                    {/* Blue / OK */}
                    <div
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border text-left bg-white/45"
                      style={{
                        borderColor: !hasRedError ? "rgba(37, 99, 235, 0.2)" : "rgba(255, 255, 255, 0.7)",
                        boxShadow: "2px 2px 5px rgba(165, 185, 210, 0.1), -1px -1px 3px rgba(255, 255, 255, 0.8)"
                      }}
                    >
                      <span className="relative flex h-2 w-2 flex-shrink-0">
                        {!hasRedError && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${!hasRedError ? "bg-blue-500" : "bg-blue-500/30"}`} />
                      </span>
                      <span className={`text-[9px] font-bold font-mono ${!hasRedError ? "text-blue-600" : "text-blue-400/75"}`}>🔵 OK</span>
                    </div>
                  </div>
                </div>

                {/* 2. GDS Indicators */}
                <div className="space-y-2 text-left">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#5b7290]" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                    GDS Indicators
                  </p>
                  <div className="space-y-1.5">
                    {[
                      { id: "flux",    label: "FLUX",    sub: "AWU_Ledger__c",  color: "#3b82f6" },
                      { id: "intent",  label: "INTENT",  sub: "IntentVector",   color: "#3b82f6" },
                      { id: "formula", label: "FORMULA", sub: "Colab Engine",   color: "#3b82f6" },
                    ].map(led => (
                      <div 
                        key={led.id} 
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-white/40 border border-white/60 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: led.color, boxShadow: `0 0 4px ${led.color}88` }}
                            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-[10px] font-bold font-mono tracking-wide" style={{ color: led.color }}>{led.label}</span>
                        </div>
                        <span className="text-[8px] font-mono text-slate-400 max-w-[80px] truncate">({led.sub})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Active Department */}
                <div className="space-y-2 text-left">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#5b7290]" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                    Active Department
                  </p>
                  <div className="space-y-1 bg-white/30 p-1.5 rounded-2xl border border-white/40 max-h-[170px] overflow-y-auto pr-1">
                    {orgDepts.map(dept => {
                      const isSelected = currentDept === dept;
                      return (
                        <button
                          key={dept}
                          onClick={() => setCurrentDept(dept)}
                          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all text-left"
                          style={{
                            background: isSelected ? "rgba(37, 99, 235, 0.08)" : "transparent",
                            color: isSelected ? "#1e3a8a" : "#5b7290",
                            fontWeight: isSelected ? 700 : 400,
                          }}
                        >
                          <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>{dept}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="architecture-sec"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* 1. Search */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/45 border border-white/80 shadow-sm text-left">
                  <Search className="w-3.5 h-3.5 text-[#009fdb] flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search component..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs text-blue-950 placeholder-blue-300 outline-none w-full font-semibold"
                    style={{ fontFamily: "'Segoe UI', sans-serif" }}
                  />
                </div>
 
                {/* 2. Architecture Nodes navigation list */}
                <div className="space-y-2 text-left">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#5b7290] pl-1" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                    Architecture Nodes ({filteredNodes.length})
                  </p>
                  <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
                    {filteredNodes.map((node) => {
                      const isSelected = selectedNode?.id === node.id;
                      const idx = ARCHITECTURE_NODES.findIndex(n => n.id === node.id);
                      return (
                        <button
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          className="w-full text-left p-2 rounded-xl transition-all border flex items-start gap-2"
                          style={{
                            background: isSelected 
                              ? "rgba(224, 242, 254, 0.75)" 
                              : "rgba(255, 255, 255, 0.35)",
                            borderColor: isSelected ? "rgba(14, 165, 233, 0.3)" : "rgba(255, 255, 255, 0.5)",
                            boxShadow: isSelected
                              ? "inset 1px 1px 2px rgba(255, 255, 255, 0.8), 2px 2px 5px rgba(14, 165, 233, 0.08)"
                              : "2px 2px 5px rgba(165, 185, 210, 0.08), -1px -1px 3px rgba(255, 255, 255, 0.8)",
                          }}
                        >
                          <div className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center text-[10px] flex-shrink-0 ${
                            isSelected ? 'bg-[#0ea5e9] text-white shadow-sm' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {['➤', '⚛', '🔒', '🛡', '⚙', '⚖', '⏱', '🎯'][idx]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-blue-950 truncate" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                              {node.title}
                            </p>
                            <p className="text-[8px] text-[#5b7290] truncate" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                              {node.shortDescription}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Info: Environment connectivity status */}
        <div className="pt-3.5 border-t border-blue-100/50 text-center flex flex-col gap-1 text-left">
          <p className="text-[8px] font-bold text-slate-400 tracking-widest leading-tight uppercase" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
            AMB_PROD_DEMO_01
          </p>
          <div className="flex items-center gap-1.5 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
            <span className="text-[8px] font-bold text-[#3b82f6]" style={{ fontFamily: "'Segoe UI', sans-serif" }}>SECURE SYSTEM</span>
          </div>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}

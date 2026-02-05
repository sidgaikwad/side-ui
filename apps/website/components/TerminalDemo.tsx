"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Items data - No colors here, style is handled in the component for consistency
const GRID_ITEMS = [
  { id: "button", label: "Buttons", desc: "Styled variants", icon: "◉" },
  { id: "select", label: "Select", desc: "Single-select", icon: "◎" },
  { id: "checkbox", label: "Multi-Select", desc: "Checkboxes", icon: "☑" },
  { id: "input", label: "Text Input", desc: "Live typing", icon: "✎" },
  { id: "tree", label: "Tree", desc: "Hierarchy", icon: "◫" },
  { id: "tabs", label: "Tabs", desc: "Tab interface", icon: "⊟" },
  { id: "table", label: "Table", desc: "Data grid", icon: "▦" },
  { id: "card", label: "Cards", desc: "Panel layout", icon: "◇" },
  { id: "badge", label: "Badges", desc: "Status tags", icon: "◆" },
];

export function TerminalDemo() {
  const router = useRouter();
  const [view, setView] = useState<"boot" | "grid">("boot");
  const [bootStep, setBootStep] = useState(0);

  // --- Actions ---
  const reboot = useCallback(() => {
    setView("boot");
    setBootStep(0);
  }, []);

  const handleNavigate = (id: string) => {
    router.push(`/components/${id}`);
  };

  // --- Boot Sequence ---
  useEffect(() => {
    if (view !== "boot") return;

    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setBootStep(1), 500));
    timers.push(setTimeout(() => setBootStep(2), 1200));
    timers.push(setTimeout(() => setView("grid"), 3000));

    return () => timers.forEach(clearTimeout);
  }, [view]);

  return (
    <div className="relative mx-auto w-full max-w-4xl h-full group">
      {/* Glow effect - STRICTLY EMERALD NOW */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-emerald-900/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c] shadow-2xl h-full flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 bg-white/[0.03] shrink-0">
          <div className="flex gap-1.5">
            <button
              onClick={reboot}
              className="h-3 w-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors"
              title="Reboot (R)"
            />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center font-mono text-xs text-white/30">
            siddcn — bash — 80x24
          </div>
          <div className="text-[10px] text-white/20 font-mono">
            {view === "grid" ? "GRID VIEW" : "BOOT"}
          </div>
        </div>

        {/* Terminal Content Area */}
        <div className="flex-1 p-6 font-mono text-sm relative flex flex-col">
          <AnimatePresence mode="wait">
            {/* --- VIEW 1: BOOT SEQUENCE --- */}
            {view === "boot" && (
              <motion.div
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                className="h-full flex flex-col items-center justify-center space-y-6 text-center"
              >
                {bootStep >= 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-500 font-bold leading-none tracking-tighter"
                  >
                    <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">
                      {`   _____ __    __    __           
  / ___// /___/ /___/ /________  
  \\__ \\/ / __  / __  / ___/ __ \\ 
 ___/ / / /_/ / /_/ / /__/ / / / 
/____/_/\\__,_/\\__,_/\\___/_/ /_/  `}
                    </pre>
                  </motion.div>
                )}

                {bootStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-1"
                  >
                    <div className="text-white font-bold text-lg">
                      siddcn UI
                    </div>
                    <div className="text-slate-500 text-xs">v1.0.0-beta</div>
                  </motion.div>
                )}

                {bootStep >= 2 && (
                  <div className="w-64 space-y-2">
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-emerald-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 uppercase">
                      <span>Loading modules</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        OK
                      </motion.span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* --- VIEW 2: GRID INTERACTIVE --- */}
            {view === "grid" && (
              <motion.div
                key="grid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col"
              >
                {/* Header */}
                <div className="flex justify-center mb-4 shrink-0">
                  <div className="border-y border-x border-white/10 bg-white/5 px-6 py-1 text-slate-300 font-bold tracking-wider text-xs uppercase relative">
                    Select a component
                    <div className="absolute top-0 left-0 -mt-px -ml-px w-1.5 h-1.5 border-t border-l border-white/30"></div>
                    <div className="absolute top-0 right-0 -mt-px -mr-px w-1.5 h-1.5 border-t border-r border-white/30"></div>
                    <div className="absolute bottom-0 left-0 -mb-px -ml-px w-1.5 h-1.5 border-b border-l border-white/30"></div>
                    <div className="absolute bottom-0 right-0 -mb-px -mr-px w-1.5 h-1.5 border-b border-r border-white/30"></div>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
                  {GRID_ITEMS.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        relative p-3 text-left rounded border border-white/5
                        transition-all duration-200 group flex flex-col justify-center
                        hover:border-emerald-500/50 hover:bg-emerald-500/10
                      `}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        {/* Icon is Emerald to match loader */}
                        <span className="text-emerald-500/80 group-hover:text-emerald-400 transition-colors">
                          {item.icon}
                        </span>
                        {/* Text goes from gray to white */}
                        <span className="font-bold text-slate-400 group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 pl-6 truncate group-hover:text-emerald-500/60 transition-colors">
                        {item.desc}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-4 pt-2 border-t border-white/10 flex justify-between text-[10px] text-slate-600 font-mono shrink-0">
                  <span>9 modules loaded</span>
                  <button
                    onClick={reboot}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    [R] REBOOT SYSTEM
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

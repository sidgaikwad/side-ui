"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Same Grid Items as your main terminal for consistency
const GRID_ITEMS = [
  { id: "btn", label: "Buttons", desc: "Styled variants", icon: "◉" },
  { id: "sel", label: "Select", desc: "Single-select", icon: "◎" },
  { id: "mul", label: "Multi-Select", desc: "Checkboxes", icon: "☑" },
  { id: "txt", label: "Text Input", desc: "Live typing", icon: "✎" },
  { id: "tre", label: "Tree", desc: "Hierarchy", icon: "◫" },
  { id: "tab", label: "Tabs", desc: "Tab interface", icon: "⊟" },
  { id: "tbl", label: "Table", desc: "Data grid", icon: "▦" },
  { id: "crd", label: "Cards", desc: "Panel layout", icon: "◇" },
  { id: "bdg", label: "Badges", desc: "Status tags", icon: "◆" },
];

export function SshTerminal() {
  const [view, setView] = useState<"input" | "loader" | "grid">("input");
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [bootStep, setBootStep] = useState(0);

  const COMMAND = "ssh siddcn.sh -p 22";

  // --- Actions ---
  const reboot = useCallback(() => {
    setView("input");
    setTypedText("");
    setBootStep(0);
  }, []);

  // --- 1. Typing Animation ---
  useEffect(() => {
    if (view !== "input") return;

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= COMMAND.length) {
        setTypedText(COMMAND.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setView("loader"), 600);
      }
    }, 40); // Faster typing speed

    return () => clearInterval(typeInterval);
  }, [view]);

  // --- Blinking Cursor ---
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // --- 2. Loader Sequence ---
  useEffect(() => {
    if (view !== "loader") return;

    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setBootStep(1), 200)); // Logo
    timers.push(setTimeout(() => setBootStep(2), 1000)); // Progress
    timers.push(setTimeout(() => setView("grid"), 2500)); // Finish

    return () => timers.forEach(clearTimeout);
  }, [view]);

  return (
    <div className="relative mx-auto max-w-2xl transform transition-all hover:scale-[1.01] duration-500">
      {/* Glowing Border Container - Slightly different hue (Purple/Pink) for SSH vibe */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500" />

      <div className="relative rounded-xl bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-2xl h-[400px] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3 shrink-0">
          <div className="flex gap-2">
            {/* The 'Close' button acts as Reboot here too */}
            <button
              onClick={reboot}
              className="h-3 w-3 rounded-full bg-[#ff5f56] hover:bg-red-400 transition-colors"
              title="Disconnect"
            />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center text-xs font-mono text-white/30">
            user@192.168.1.1:~
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 font-mono text-sm overflow-hidden relative flex flex-col">
          <AnimatePresence mode="wait">
            {/* VIEW 1: TYPING INPUT */}
            {view === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-slate-300"
              >
                <div className="flex gap-2">
                  <span className="text-emerald-400 font-bold">➜</span>
                  <span>
                    {typedText}
                    {cursorVisible && (
                      <span className="bg-slate-500 text-transparent inline-block w-2 h-4 align-middle ml-1">
                        |
                      </span>
                    )}
                  </span>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: LOADER (Same as Demo) */}
            {view === "loader" && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                className="h-full flex flex-col items-center justify-center space-y-6 text-center"
              >
                {bootStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-500 font-bold leading-none tracking-tighter"
                  >
                    <pre className="text-[10px] whitespace-pre">
                      {`   _____ __    __    __           
  / ___// /___/ /___/ /________  
  \\__ \\/ / __  / __  / ___/ __ \\ 
 ___/ / / /_/ / /_/ / /__/ / / / 
/____/_/\\__,_/\\__,_/\\___/_/ /_/  `}
                    </pre>
                  </motion.div>
                )}

                {bootStep >= 2 && (
                  <div className="w-48 space-y-2">
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-purple-500" // Purple bar for SSH distinction
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest">
                      <span>Establishing Tunnel</span>
                      <span>SECURE</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* VIEW 3: GRID (Using Grid Items) */}
            {view === "grid" && (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col"
              >
                <div className="flex justify-center mb-4 shrink-0">
                  <div className="border border-white/10 bg-white/5 px-4 py-1 text-slate-300 font-bold text-[10px] uppercase rounded-full">
                    Remote Session Active
                  </div>
                </div>

                {/* THE GRID */}
                <div className="grid grid-cols-3 gap-3 flex-1 min-h-0 content-start">
                  {GRID_ITEMS.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative p-2.5 text-left rounded border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-purple-500/30 transition-colors group cursor-default"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-purple-400/80 group-hover:text-purple-400 transition-colors text-xs">
                          {item.icon}
                        </span>
                        <span className="font-bold text-slate-400 group-hover:text-white transition-colors text-xs">
                          {item.label}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer with Proper Button */}
                <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-center">
                  <div className="text-[10px] text-slate-600 font-mono">
                    <span className="w-1.5 h-1.5 inline-block rounded-full bg-emerald-500 animate-pulse mr-2" />
                    Connected: 127.0.0.1
                  </div>

                  <button
                    onClick={reboot}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] text-slate-300 hover:text-white transition-all active:scale-95"
                  >
                    [ RECONNECT ]
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

"use client";

import { useState } from "react";
import Link from "next/link";

const themes = [
  {
    id: "default",
    name: "Default",
    description: "Cyan & Green - The classic siddcn look",
    colors: {
      primary: "#7dcfff",
      secondary: "#7aa2f7",
      success: "#9ece6a",
      border: "#7dcfff",
    },
    borderStyle: "round",
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Deep blue theme inspired by the sea",
    colors: {
      primary: "#7aa2f7",
      secondary: "#7dcfff",
      success: "#89b4fa",
      border: "#7aa2f7",
    },
    borderStyle: "double",
  },
  {
    id: "forest",
    name: "Forest",
    description: "Natural green theme for the nature lovers",
    colors: {
      primary: "#9ece6a",
      secondary: "#98c379",
      success: "#9ece6a",
      border: "#9ece6a",
    },
    borderStyle: "round",
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm orange & pink theme",
    colors: {
      primary: "#f7768e",
      secondary: "#e0af68",
      success: "#e0af68",
      border: "#f7768e",
    },
    borderStyle: "round",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean white & gray theme",
    colors: {
      primary: "#ffffff",
      secondary: "#888888",
      success: "#ffffff",
      border: "#ffffff",
    },
    borderStyle: "single",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Neon pink & cyan futuristic theme",
    colors: {
      primary: "#ff79c6",
      secondary: "#8be9fd",
      success: "#50fa7b",
      border: "#ff79c6",
    },
    borderStyle: "bold",
  },
];

export default function ThemesPage() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-terminal-cyan">
            Theme Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-terminal-text/70">
            Siddcn comes with 6 beautiful built-in themes. Click on any theme to
            preview it, or create your own custom theme.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Theme Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme)}
                className={`rounded-lg border p-4 text-left transition-all ${
                  selectedTheme.id === theme.id
                    ? "border-terminal-cyan bg-terminal-cyan/10"
                    : "border-terminal-cyan/20 bg-terminal-bg/50 hover:border-terminal-cyan/50"
                }`}
              >
                <div
                  className="mb-3 h-2 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <h3 className="font-semibold text-terminal-text">
                  {theme.name}
                </h3>
                <p className="mt-1 text-sm text-terminal-text/60">
                  {theme.description}
                </p>
                <div className="mt-3 flex gap-2">
                  {Object.values(theme.colors).map((color, idx) => (
                    <div
                      key={idx}
                      className="h-4 w-4 rounded border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Theme Preview */}
          <div className="rounded-lg border border-terminal-cyan/30 bg-terminal-bg/80 p-6">
            <h3 className="mb-4 text-xl font-semibold text-terminal-cyan">
              Preview: {selectedTheme.name}
            </h3>

            <div
              className="rounded-lg p-4 font-mono text-sm"
              style={{
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: selectedTheme.colors.border,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              {/* Simulated Terminal UI */}
              <div className="mb-4">
                <span style={{ color: selectedTheme.colors.primary }}>
                  siddcn
                </span>
                <span className="text-terminal-text/60">
                  {" "}
                  Component Library
                </span>
              </div>

              <div
                className="mb-4 rounded p-2"
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: selectedTheme.colors.border,
                }}
              >
                <div style={{ color: selectedTheme.colors.primary }}>
                  {">"} Buttons
                </div>
                <div className="text-terminal-text/60"> Progress</div>
                <div className="text-terminal-text/60"> Badges</div>
              </div>

              <div className="mb-4">
                <span style={{ color: selectedTheme.colors.success }}>
                  [========
                </span>
                <span className="text-terminal-text/40">{"  ]"}</span>
                <span className="text-terminal-text/60"> 75%</span>
              </div>

              <div className="flex gap-2">
                <span
                  className="rounded px-2"
                  style={{
                    backgroundColor: selectedTheme.colors.success + "33",
                    color: selectedTheme.colors.success,
                  }}
                >
                  Active
                </span>
                <span
                  className="rounded px-2"
                  style={{
                    backgroundColor: selectedTheme.colors.secondary + "33",
                    color: selectedTheme.colors.secondary,
                  }}
                >
                  Pending
                </span>
              </div>
            </div>

            <div className="mt-4 text-sm text-terminal-text/60">
              <p>
                <strong>Border Style:</strong> {selectedTheme.borderStyle}
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <Link
                href="/docs/themes"
                className="rounded-lg bg-terminal-cyan px-4 py-2 text-sm font-semibold text-terminal-bg transition-colors hover:bg-terminal-cyan/80"
              >
                Theme Documentation
              </Link>
              <Link
                href="/docs/adding-components"
                className="rounded-lg border border-terminal-cyan px-4 py-2 text-sm font-semibold text-terminal-cyan transition-colors hover:bg-terminal-cyan/10"
              >
                Create Custom Theme
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

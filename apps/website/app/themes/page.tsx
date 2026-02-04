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
            {themes.map((theme, idx) => {
              const isActive = selectedTheme.id === theme.id;

              return (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className="group relative block text-left outline-none"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {/* Hover Gradient Glow Effect */}
                  <div
                    className={`absolute -inset-0.5 rounded-xl blur transition-opacity duration-300 ${
                      isActive
                        ? "opacity-75"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{
                      background: `linear-gradient(to right, ${theme.colors.primary}33, ${theme.colors.secondary}33)`,
                    }}
                  />

                  {/* Card Content */}
                  <div
                    className={`relative h-full rounded-lg border p-4 transition-all ${
                      isActive
                        ? "border-terminal-cyan/50 bg-terminal-bg"
                        : "border-terminal-cyan/20 bg-terminal-bg/50 group-hover:border-terminal-cyan/40"
                    }`}
                  >
                    <div
                      className="mb-3 h-2 rounded-full transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: theme.colors.primary }}
                    />

                    <h3
                      className={`font-semibold transition-colors ${
                        isActive
                          ? "text-terminal-cyan"
                          : "text-terminal-text group-hover:text-white"
                      }`}
                    >
                      {theme.name}
                    </h3>

                    <p className="mt-1 text-sm text-terminal-text/60 group-hover:text-terminal-text/80 transition-colors">
                      {theme.description}
                    </p>

                    <div className="mt-3 flex gap-2">
                      {Object.values(theme.colors).map((color, idx) => (
                        <div
                          key={idx}
                          className="h-4 w-4 rounded border border-white/10 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* Active Indicator Arrow */}
                    {isActive && (
                      <div className="absolute bottom-3 right-3 text-terminal-cyan animate-pulse">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Theme Preview - No changes needed here, keeping logic same */}
          <div className="rounded-lg border border-terminal-cyan/30 bg-terminal-bg/80 p-6 sticky top-6 h-fit backdrop-blur-sm">
            <h3 className="mb-4 text-xl font-semibold text-terminal-cyan">
              Preview: {selectedTheme.name}
            </h3>

            <div
              className="rounded-lg p-4 font-mono text-sm transition-all duration-300"
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
                className="mb-4 rounded p-2 transition-colors duration-300"
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

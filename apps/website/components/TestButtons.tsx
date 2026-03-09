"use client";

import React from "react";

export function ErrorTestButton() {
  return (
    <button
      onClick={() => {
        throw new Error("PostHog Manual Test Error!");
      }}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500/20 h-9 px-4 py-2"
    >
      Manual Error
    </button>
  );
}

export function RageClickButton() {
  return (
    <button
      onClick={() => {
        console.log("Rage clicked!");
      }}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-orange-500 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 h-9 px-4 py-2"
    >
      Rage Click Me
    </button>
  );
}

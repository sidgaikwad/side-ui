"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "tsx", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-lg border border-terminal-cyan/20 bg-terminal-bg/80">
      {filename && (
        <div className="flex items-center justify-between border-b border-terminal-cyan/20 px-4 py-2">
          <span className="font-mono text-sm text-terminal-text/60">
            {filename}
          </span>
          <span className="font-mono text-xs text-terminal-cyan/60">
            {language}
          </span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4">
          <code className="font-mono text-sm text-terminal-green">{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 rounded border border-terminal-cyan/30 bg-terminal-bg px-2 py-1 text-xs text-terminal-cyan opacity-0 transition-opacity group-hover:opacity-100"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

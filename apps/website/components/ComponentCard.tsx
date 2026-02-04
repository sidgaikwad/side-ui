"use client";

import Link from "next/link";

interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  preview: string;
}

interface ComponentCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  variants: ComponentVariant[];
}

export function ComponentCard({
  id,
  name,
  icon,
  description,
  variants,
}: ComponentCardProps) {
  return (
    <div className="rounded-lg border border-terminal-blue/20 bg-terminal-bg/50 p-6 transition-all hover:border-terminal-blue/50">
      <div className="mb-4 flex items-start justify-between">
        <div className="text-4xl">{icon}</div>
        <span className="rounded bg-terminal-cyan/20 px-2 py-1 text-xs text-terminal-cyan">
          {variants.length} variant{variants.length !== 1 ? "s" : ""}
        </span>
      </div>

      <h3 className="mb-2 text-xl font-semibold text-terminal-cyan">{name}</h3>
      <p className="mb-4 text-sm text-terminal-text/70">{description}</p>

      <div className="space-y-2">
        {variants.map((variant) => (
          <Link
            key={variant.id}
            href={`/components/${id}/${variant.id}`}
            className="block rounded border border-terminal-cyan/10 bg-terminal-bg/80 p-3 transition-all hover:border-terminal-cyan/30"
          >
            <div className="mb-1 font-medium text-terminal-text">
              {variant.name}
            </div>
            <div className="mb-2 text-xs text-terminal-text/60">
              {variant.description}
            </div>
            <div className="font-mono text-sm text-terminal-green">
              {variant.preview}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

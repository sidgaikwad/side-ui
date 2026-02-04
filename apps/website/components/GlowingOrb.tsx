'use client'

export function GlowingOrb({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl" />
        <div className="absolute inset-4 animate-pulse rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-2xl" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  )
}

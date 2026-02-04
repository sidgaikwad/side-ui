'use client'

import { useState, useEffect } from 'react'

export function TerminalDemo() {
  const [step, setStep] = useState(0)
  const [output, setOutput] = useState<string[]>([])

  const sequence = [
    { delay: 500, text: '$ siddcn', type: 'input' },
    { delay: 1000, text: 'Initializing...', type: 'output' },
    { delay: 800, text: '[████████████████████] 100%', type: 'progress' },
    { delay: 500, text: '', type: 'output' },
    { delay: 300, text: 'Component Categories', type: 'title' },
    { delay: 300, text: '━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'separator' },
    { delay: 200, text: '  Buttons', type: 'menu' },
    { delay: 200, text: '  Progress Bars', type: 'menu' },
    { delay: 200, text: '  Badges', type: 'menu' },
    { delay: 200, text: '  Charts', type: 'menu' },
    { delay: 200, text: '  Trees', type: 'menu' },
  ]

  useEffect(() => {
    if (step < sequence.length) {
      const timer = setTimeout(() => {
        setOutput(prev => [...prev, sequence[step].text])
        setStep(step + 1)
      }, sequence[step].delay)

      return () => clearTimeout(timer)
    } else {
      const resetTimer = setTimeout(() => {
        setStep(0)
        setOutput([])
      }, 3000)
      return () => clearTimeout(resetTimer)
    }
  }, [step])

  const getLineClass = (index: number) => {
    const item = sequence[index]
    if (!item) return 'text-white/70'
    
    switch (item.type) {
      case 'input':
        return 'text-emerald-400'
      case 'title':
        return 'text-white font-medium'
      case 'separator':
        return 'text-white/20'
      case 'menu':
        return 'text-white/60'
      case 'progress':
        return 'text-blue-400'
      default:
        return 'text-white/70'
    }
  }

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="code-block overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 font-mono text-xs text-white/40">
            siddcn
          </span>
        </div>

        {/* Terminal Content */}
        <div className="min-h-[360px] p-6 font-mono text-sm">
          {output.map((line, idx) => (
            <div key={idx} className={`${getLineClass(idx)} mb-1`}>
              {line}
              {idx === output.length - 1 && step < sequence.length && (
                <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-white/70" />
              )}
            </div>
          ))}
          {output.length === 0 && (
            <span className="inline-block h-4 w-1.5 animate-pulse bg-white/70" />
          )}
        </div>
      </div>

      {/* Floating hint */}
      <div className="absolute -bottom-8 right-4 flex items-center gap-2 text-sm text-white/30">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400/50" />
        Live demo
      </div>
    </div>
  )
}

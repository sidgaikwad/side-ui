'use client'

import { useState, useEffect } from 'react'

export function TerminalDemo() {
  const [step, setStep] = useState(0)
  const [output, setOutput] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

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
      // Animate menu selection
      const menuItems = sequence.filter(s => s.type === 'menu').length
      const selectionTimer = setInterval(() => {
        setSelectedIndex(prev => {
          if (prev >= menuItems - 1) {
            clearInterval(selectionTimer)
            setTimeout(() => {
              setStep(0)
              setOutput([])
              setSelectedIndex(-1)
            }, 2000)
            return prev
          }
          return prev + 1
        })
      }, 600)
      return () => clearInterval(selectionTimer)
    }
  }, [step])

  const getLineClass = (index: number) => {
    const item = sequence[index]
    if (!item) return 'text-white/70'
    
    // Check if this is a menu item and if it's selected
    const menuStartIndex = sequence.findIndex(s => s.type === 'menu')
    if (item.type === 'menu') {
      const menuIndex = index - menuStartIndex
      if (menuIndex === selectedIndex) {
        return 'text-emerald-400 bg-emerald-400/10 -mx-4 px-4 py-0.5 rounded'
      }
    }
    
    switch (item.type) {
      case 'input':
        return 'text-emerald-400'
      case 'title':
        return 'text-white font-medium'
      case 'separator':
        return 'text-white/20'
      case 'menu':
        return 'text-white/60 transition-colors duration-200'
      case 'progress':
        return 'text-blue-400'
      default:
        return 'text-white/70'
    }
  }

  return (
    <div className="relative mx-auto max-w-3xl group">
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative code-block overflow-hidden gradient-border">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 bg-black/50">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors cursor-pointer" />
            <div className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors cursor-pointer" />
          </div>
          <span className="ml-2 font-mono text-xs text-white/40">
            siddcn
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-white/30">zsh</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="min-h-[360px] p-6 font-mono text-sm bg-gradient-to-b from-black/50 to-black/30">
          {output.map((line, idx) => (
            <div key={idx} className={`${getLineClass(idx)} mb-1 transition-all duration-200`}>
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
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400/80" />
        </span>
        Live demo
      </div>
    </div>
  )
}

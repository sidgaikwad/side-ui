'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface ShimmerButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export function ShimmerButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
}: ShimmerButtonProps) {
  // Base styles: Structure + Animation logic (colors removed here to be dynamic)
  const baseStyles = `
    relative inline-flex items-center justify-center overflow-hidden rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300
    before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:to-transparent
    hover:scale-[1.02] active:scale-[0.98]
  `

  const variantStyles = {
    // Primary: Black bg (Light Mode) / White bg (Dark Mode)
    primary: `
      bg-zinc-900 text-white hover:bg-zinc-800
      dark:bg-white dark:text-black dark:hover:bg-zinc-200
      before:via-white/20 dark:before:via-black/10
      shadow-md hover:shadow-lg
    `,
    // Secondary: Bordered (Light Mode) / Glass (Dark Mode)
    secondary: `
      border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50
      dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10
      before:via-zinc-900/10 dark:before:via-white/10
    `,
  }

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  )
}
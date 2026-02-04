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
  const baseStyles = `
    relative inline-flex items-center justify-center overflow-hidden rounded-lg px-6 py-3 text-sm font-medium transition-all
    before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
  `

  const variantStyles = {
    primary: 'bg-white text-black hover:bg-white/90',
    secondary: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
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

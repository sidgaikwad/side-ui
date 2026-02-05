"use client";

import {
  animate,
  motion,
  useMotionValue,
} from "framer-motion";
import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The specific wordmark implementation for "siddcn"
 */
export const Wordmark = () => {
  return (
    <div className="relative w-full overflow-hidden pt-2">
      <div className="flex w-full items-center justify-center">
        {/* CHANGED: Removed max-w-3xl/4xl. Now it takes full width. */}
        <div className="w-full px-4">
          <MagicSVG
            className="h-auto w-full"
            gradientSize={150} // Increased light size slightly for the bigger text
            width={1200}
            height={300}
          >
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-geist-sans), system-ui, sans-serif"
              fontWeight="900"
              fontSize="280"
              letterSpacing="-0.06em"
              className="select-none"
            >
              siddcn
            </text>
          </MagicSVG>
        </div>
      </div>
    </div>
  );
};

interface MagicSVGProps {
  children: React.ReactNode;
  width: number;
  height: number;
  className?: string;
  gradientSize?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function MagicSVG({
  children,
  width,
  height,
  className,
  gradientSize = 100,
  gradientFrom = "#10b981", // Emerald-500
  gradientTo = "#34d399", // Emerald-400
}: MagicSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const mouseX = useMotionValue(-gradientSize * 2);
  const mouseY = useMotionValue(-gradientSize * 2);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (svgRef.current) {
        const { left, top } = svgRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    animate(mouseX, -gradientSize * 2, { type: "spring", bounce: 0 });
    animate(mouseY, -gradientSize * 2, { type: "spring", bounce: 0 });
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    const footer = svgRef.current?.closest("footer");

    if (footer) {
      footer.addEventListener("mousemove", handleMouseMove);
      footer.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (footer) {
        footer.removeEventListener("mousemove", handleMouseMove);
        footer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  const maskId = "magic-mask-siddcn";
  const gradientId = "magic-gradient-siddcn";

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("w-full transition-opacity duration-300", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <motion.radialGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          cx={mouseX}
          cy={mouseY}
          r={gradientSize}
        >
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="50%" stopColor={gradientTo} />
          <stop offset="100%" stopColor="transparent" stopOpacity={0} />
        </motion.radialGradient>

        <mask id={maskId}>
          <rect width="100%" height="100%" fill="black" />
          <motion.circle
            cx={mouseX}
            cy={mouseY}
            r={gradientSize}
            fill="white"
            filter="blur(20px)"
          />
        </mask>
      </defs>

      {/* Layer 1: Visible dim outline */}
      <g stroke="#525252" strokeWidth="1" fill="none" opacity="0.8">
        {children}
      </g>

      {/* Layer 2: Glowing reveal */}
      <g mask={`url(#${maskId})`}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(
              child as React.ReactElement<React.SVGProps<SVGElement>>,
              {
                stroke: `url(#${gradientId})`,
                strokeWidth: 2,
                fill: "none",
              },
            );
          }
          return null;
        })}
      </g>
    </svg>
  );
}

import React, { useState, useEffect } from "react";
import { Box, Text } from "ink";
import { animations } from "../utils/animations.js";

export const ProgressBarStyles = {
  BLOCKS: "blocks",
  ARROWS: "arrows",
  DOTS: "dots",
  LINES: "lines",
  GRADIENT: "gradient",
  SMOOTH: "smooth",
};

export const ProgressBar = ({
  progress = 0,
  width = 40,
  style = ProgressBarStyles.BLOCKS,
  showPercentage = true,
  label,
  color = "#00A8E8",
}) => {
  const percentage = Math.min(100, Math.max(0, progress));
  const filledWidth = Math.floor((percentage / 100) * width);
  const emptyWidth = width - filledWidth;

  const getBar = () => {
    const chars =
      animations.progressBars[style] || animations.progressBars.blocks;

    switch (style) {
      case ProgressBarStyles.BLOCKS:
        return "█".repeat(filledWidth) + "░".repeat(emptyWidth);

      case ProgressBarStyles.ARROWS:
        return "▶".repeat(filledWidth) + "▹".repeat(emptyWidth);

      case ProgressBarStyles.DOTS:
        return "⣿".repeat(filledWidth) + "⣀".repeat(emptyWidth);

      case ProgressBarStyles.LINES:
        return "━".repeat(filledWidth) + "─".repeat(emptyWidth);

      case ProgressBarStyles.GRADIENT:
        let gradientBar = "";
        for (let i = 0; i < width; i++) {
          if (i < filledWidth) {
            const gradientChar =
              chars[Math.floor((i / filledWidth) * (chars.length - 1))];
            gradientBar += gradientChar;
          } else {
            gradientBar += "░";
          }
        }
        return gradientBar;

      case ProgressBarStyles.SMOOTH:
        const fullBlocks = Math.floor(filledWidth);
        const remainder = filledWidth - fullBlocks;
        const partialBlock =
          remainder > 0 ? chars[Math.floor(remainder * chars.length)] : "";
        return (
          "█".repeat(fullBlocks) +
          partialBlock +
          "░".repeat(emptyWidth - (partialBlock ? 1 : 0))
        );

      default:
        return "█".repeat(filledWidth) + "░".repeat(emptyWidth);
    }
  };

  const barContent = getBar();
  const filled = barContent.slice(0, filledWidth);
  const empty = barContent.slice(filledWidth);

  return (
    <Box flexDirection="column">
      {label && (
        <Box marginBottom={0}>
          <Text>{label}</Text>
        </Box>
      )}
      <Box>
        <Text>[</Text>
        <Text color={color}>{filled}</Text>
        <Text dimColor>{empty}</Text>
        <Text>]</Text>
        {showPercentage && (
          <Box marginLeft={1}>
            <Text color="#FFD700" bold>
              {percentage.toFixed(0)}%
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProgressBar;

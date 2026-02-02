import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import ProgressBar, { ProgressBarStyles } from "../components/progressBar.js";
import InstallationAccordion from "../components/InstallationAccordion.js";
import BoxComponent from "../utils/Box.js";

const PROGRESS_STYLES = [
  {
    style: ProgressBarStyles.BLOCKS,
    label: "Block Style",
    desc: "Solid blocks",
    color: "#00A8E8",
  },
  {
    style: ProgressBarStyles.ARROWS,
    label: "Arrow Style",
    desc: "Arrow indicators",
    color: "#00D9FF",
  },
  {
    style: ProgressBarStyles.DOTS,
    label: "Dots Style",
    desc: "Braille patterns",
    color: "#6BCF7F",
  },
  {
    style: ProgressBarStyles.LINES,
    label: "Line Style",
    desc: "Clean lines",
    color: "#FFD93D",
  },
  {
    style: ProgressBarStyles.GRADIENT,
    label: "Gradient Style",
    desc: "Smooth gradient",
    color: "#FF6B35",
  },
  {
    style: ProgressBarStyles.SMOOTH,
    label: "Smooth Style",
    desc: "Sub-char precision",
    color: "#7209B7",
  },
];

export const ProgressScreen = ({ onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showInstall, setShowInstall] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow) {
      setSelectedIndex((prev) =>
        Math.min(PROGRESS_STYLES.length - 1, prev + 1),
      );
    } else if (input === "i") {
      setShowInstall((prev) => !prev);
    } else if (key.escape || input === "q") {
      onBack();
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <BoxComponent
        title="Progress Bar Components - 6 Animated Styles"
        borderStyle="bold"
        width={75}
      >
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text>
              Beautiful, animated progress bars with multiple visual styles
            </Text>
          </Box>

          <Box flexDirection="column">
            {PROGRESS_STYLES.map((prog, index) => (
              <Box key={prog.style} flexDirection="column" marginY={1}>
                <Box marginBottom={0}>
                  <Text
                    color={selectedIndex === index ? "#FFD700" : undefined}
                    bold={selectedIndex === index}
                  >
                    {selectedIndex === index ? "▶ " : "  "}
                    {prog.label}
                  </Text>
                  <Text dimColor> - {prog.desc}</Text>
                </Box>
                <Box marginLeft={2}>
                  <ProgressBar
                    progress={progress}
                    style={prog.style}
                    width={50}
                    showPercentage={true}
                    color={prog.color}
                  />
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            marginTop={2}
            borderStyle="single"
            borderColor="#6C757D"
            paddingX={1}
          >
            <Text dimColor>
              <Text color="#FFD700">↑↓</Text> Navigate •
              <Text color="#FFD700"> i</Text> Installation •
              <Text color="#FFD700"> ESC</Text> Back
            </Text>
          </Box>
        </Box>
      </BoxComponent>

      <InstallationAccordion componentName="ProgressBar" isOpen={showInstall} />
    </Box>
  );
};

export default ProgressScreen;

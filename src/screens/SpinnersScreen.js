import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import Spinner, { SpinnerStyles } from "../components/spinner.js";
import InstallationAccordion from "../components/InstallationAccordion.js";
import BoxComponent from "../utils/Box.js";

const SPINNER_STYLES = [
  {
    style: SpinnerStyles.DOTS,
    label: "Dots Spinner",
    speed: 80,
    color: "#00A8E8",
  },
  {
    style: SpinnerStyles.LINE,
    label: "Line Spinner",
    speed: 130,
    color: "#00D9FF",
  },
  { style: SpinnerStyles.DOTS2, label: "Dots 2", speed: 80, color: "#6BCF7F" },
  { style: SpinnerStyles.DOTS3, label: "Dots 3", speed: 80, color: "#FFD93D" },
  {
    style: SpinnerStyles.ARROW,
    label: "Arrow Spinner",
    speed: 100,
    color: "#FF6B35",
  },
  {
    style: SpinnerStyles.BOUNCING_BAR,
    label: "Bouncing Bar",
    speed: 100,
    color: "#7209B7",
  },
  {
    style: SpinnerStyles.BOUNCING_BALL,
    label: "Bouncing Ball",
    speed: 80,
    color: "#4CC9F0",
  },
  {
    style: SpinnerStyles.PONG,
    label: "Pong Animation",
    speed: 80,
    color: "#52B788",
  },
  {
    style: SpinnerStyles.STAR,
    label: "Star Spinner",
    speed: 70,
    color: "#F7931E",
  },
  {
    style: SpinnerStyles.FLIP,
    label: "Flip Animation",
    speed: 70,
    color: "#F72585",
  },
  {
    style: SpinnerStyles.HAMBURGER,
    label: "Hamburger",
    speed: 100,
    color: "#2D6A4F",
  },
  {
    style: SpinnerStyles.GROW_VERTICAL,
    label: "Grow Vertical",
    speed: 120,
    color: "#00FF41",
  },
  {
    style: SpinnerStyles.GROW_HORIZONTAL,
    label: "Grow Horizontal",
    speed: 120,
    color: "#00FFFF",
  },
  {
    style: SpinnerStyles.HEARTS,
    label: "Hearts",
    speed: 100,
    color: "#FF6B6B",
  },
  { style: SpinnerStyles.CLOCK, label: "Clock", speed: 100, color: "#FFD700" },
  { style: SpinnerStyles.EARTH, label: "Earth", speed: 180, color: "#4CC9F0" },
  {
    style: SpinnerStyles.MOON,
    label: "Moon Phases",
    speed: 80,
    color: "#E0E0E0",
  },
];

export const SpinnersScreen = ({ onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showInstall, setShowInstall] = useState(false);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow) {
      setSelectedIndex((prev) => Math.min(SPINNER_STYLES.length - 1, prev + 1));
    } else if (input === "i") {
      setShowInstall((prev) => !prev);
    } else if (key.escape || input === "q") {
      onBack();
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <BoxComponent
        title="Spinner Components - 17 Animation Styles"
        borderStyle="bold"
        width={75}
      >
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text>Smooth loading spinners with diverse animation styles</Text>
          </Box>

          <Box flexDirection="column">
            {SPINNER_STYLES.map((spin, index) => (
              <Box key={spin.style} marginY={0}>
                <Text
                  color={selectedIndex === index ? "#FFD700" : undefined}
                  bold={selectedIndex === index}
                >
                  {selectedIndex === index ? "▶ " : "  "}
                </Text>
                <Spinner
                  style={spin.style}
                  speed={spin.speed}
                  label={spin.label}
                  color={spin.color}
                />
                <Box marginLeft={2}>
                  <Text dimColor>speed: {spin.speed}ms</Text>
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

      <InstallationAccordion componentName="Spinner" isOpen={showInstall} />
    </Box>
  );
};

export default SpinnersScreen;

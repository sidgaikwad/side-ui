import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import Button, { ButtonVariants } from "../components/Button.js";
import InstallationAccordion from "../components/InstallationAccordion.js";
import BoxComponent from "../utils/Box.js";

const BUTTON_VARIANTS = [
  { variant: ButtonVariants.PRIMARY, label: "Primary Button", icon: "◉" },
  { variant: ButtonVariants.SECONDARY, label: "Secondary Button", icon: "◎" },
  { variant: ButtonVariants.SUCCESS, label: "Success Button", icon: "✓" },
  { variant: ButtonVariants.DANGER, label: "Danger Button", icon: "✗" },
  { variant: ButtonVariants.WARNING, label: "Warning Button", icon: "⚠" },
  { variant: ButtonVariants.INFO, label: "Info Button", icon: "ℹ" },
  { variant: ButtonVariants.GHOST, label: "Ghost Button", icon: "◯" },
  { variant: ButtonVariants.OUTLINED, label: "Outlined Button", icon: "◻" },
];

export const ButtonsScreen = ({ onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showInstall, setShowInstall] = useState(false);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow) {
      setSelectedIndex((prev) =>
        Math.min(BUTTON_VARIANTS.length - 1, prev + 1),
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
        title="Button Components - 8 Variants"
        borderStyle="bold"
        width={70}
      >
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text>
              Stylish, themeable buttons with multiple variants and icons
            </Text>
          </Box>

          <Box flexDirection="column">
            {BUTTON_VARIANTS.map((btn, index) => (
              <Box key={btn.variant} marginY={0}>
                <Button
                  label={btn.label}
                  variant={btn.variant}
                  icon={btn.icon}
                  isSelected={selectedIndex === index}
                />
                <Box marginLeft={2}>
                  <Text dimColor>variant="{btn.variant}"</Text>
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

      <InstallationAccordion componentName="Button" isOpen={showInstall} />
    </Box>
  );
};

export default ButtonsScreen;

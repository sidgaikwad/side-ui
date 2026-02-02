import React from "react";
import { Box, Text } from "ink";
import { getTheme } from "../themes/index.js";

export const ButtonVariants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  DANGER: "danger",
  WARNING: "warning",
  INFO: "info",
  GHOST: "ghost",
  OUTLINED: "outlined",
};

export const Button = ({
  label,
  variant = ButtonVariants.PRIMARY,
  isSelected = false,
  icon,
}) => {
  const theme = getTheme();

  const getColors = () => {
    const colors = {
      [ButtonVariants.PRIMARY]: { bg: "#00A8E8", text: "#000000" },
      [ButtonVariants.SECONDARY]: { bg: "#007EA7", text: "#FFFFFF" },
      [ButtonVariants.SUCCESS]: { bg: "#00D9FF", text: "#000000" },
      [ButtonVariants.DANGER]: { bg: "#FF6B6B", text: "#FFFFFF" },
      [ButtonVariants.WARNING]: { bg: "#FFD93D", text: "#000000" },
      [ButtonVariants.INFO]: { bg: "#6BCF7F", text: "#000000" },
      [ButtonVariants.GHOST]: { bg: "transparent", text: "#E0E0E0" },
      [ButtonVariants.OUTLINED]: {
        bg: "transparent",
        text: "#00A8E8",
        border: true,
      },
    };
    return colors[variant] || colors.primary;
  };

  const colors = getColors();
  const prefix = isSelected ? "▶ " : "  ";
  const content = icon ? `${icon} ${label}` : label;

  if (variant === ButtonVariants.OUTLINED) {
    return (
      <Box borderStyle="round" borderColor={colors.text} paddingX={1}>
        <Text color={colors.text} bold={isSelected}>
          {prefix}
          {content}
        </Text>
      </Box>
    );
  }

  if (variant === ButtonVariants.GHOST) {
    return (
      <Box paddingX={1}>
        <Text color={colors.text} bold={isSelected}>
          {prefix}
          {content}
        </Text>
      </Box>
    );
  }

  return (
    <Box paddingX={2}>
      <Text backgroundColor={colors.bg} color={colors.text} bold={isSelected}>
        {prefix}
        {content}
      </Text>
    </Box>
  );
};

export default Button;

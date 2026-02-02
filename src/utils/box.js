import React from "react";
import { Box as InkBox, Text } from "ink";
import { getTheme } from "../themes/index.js";

// Box styles
export const boxStyles = {
  single: {
    topLeft: "┌",
    topRight: "┐",
    bottomLeft: "└",
    bottomRight: "┘",
    horizontal: "─",
    vertical: "│",
  },
  double: {
    topLeft: "╔",
    topRight: "╗",
    bottomLeft: "╚",
    bottomRight: "╝",
    horizontal: "═",
    vertical: "║",
  },
  rounded: {
    topLeft: "╭",
    topRight: "╮",
    bottomLeft: "╰",
    bottomRight: "╯",
    horizontal: "─",
    vertical: "│",
  },
  bold: {
    topLeft: "┏",
    topRight: "┓",
    bottomLeft: "┗",
    bottomRight: "┛",
    horizontal: "━",
    vertical: "┃",
  },
  dashed: {
    topLeft: "┌",
    topRight: "┐",
    bottomLeft: "└",
    bottomRight: "┘",
    horizontal: "┄",
    vertical: "┆",
  },
};

export const BoxComponent = ({
  children,
  title,
  width = 60,
  borderStyle = "single",
  borderColor,
  dimBorder = false,
}) => {
  const theme = getTheme();
  const style = boxStyles[borderStyle] || boxStyles.single;

  // Get hex color from chalk object
  const getHexColor = (chalkColor) => {
    if (!chalkColor) return undefined;
    // Extract hex from chalk color
    const hex = chalkColor.hex || undefined;
    return hex;
  };

  const color = borderColor
    ? getHexColor(borderColor)
    : getHexColor(theme.border);

  return (
    <InkBox flexDirection="column">
      {/* Top border */}
      <Text color={color} dimColor={dimBorder}>
        {style.topLeft}
        {title
          ? `${style.horizontal.repeat(2)} ${title} ${style.horizontal.repeat(Math.max(0, width - title.length - 6))}`
          : style.horizontal.repeat(width - 2)}
        {style.topRight}
      </Text>

      {/* Content */}
      <InkBox>
        <Text color={color} dimColor={dimBorder}>
          {style.vertical}
        </Text>
        <InkBox paddingX={1} flexGrow={1}>
          {children}
        </InkBox>
        <Text color={color} dimColor={dimBorder}>
          {style.vertical}
        </Text>
      </InkBox>

      {/* Bottom border */}
      <Text color={color} dimColor={dimBorder}>
        {style.bottomLeft}
        {style.horizontal.repeat(width - 2)}
        {style.bottomRight}
      </Text>
    </InkBox>
  );
};

export default BoxComponent;

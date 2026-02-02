import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import BoxComponent from "../utils/Box.js";

const MENU_ITEMS = [
  {
    key: "buttons",
    label: "Buttons",
    icon: "◉",
    desc: "8 button variants",
    color: "#00A8E8",
  },
  {
    key: "progress",
    label: "Progress",
    icon: "▬",
    desc: "6 animated styles",
    color: "#00D9FF",
  },
  {
    key: "spinners",
    label: "Spinners",
    icon: "⟳",
    desc: "17 animations",
    color: "#6BCF7F",
  },
  {
    key: "tables",
    label: "Tables",
    icon: "▦",
    desc: "Data grids",
    color: "#FFD93D",
  },
  {
    key: "cards",
    label: "Cards",
    icon: "▢",
    desc: "Containers",
    color: "#FF6B35",
  },
  {
    key: "badges",
    label: "Badges",
    icon: "◆",
    desc: "Status tags",
    color: "#7209B7",
  },
  {
    key: "select",
    label: "Select",
    icon: "▼",
    desc: "Dropdowns",
    color: "#4CC9F0",
  },
  {
    key: "multiselect",
    label: "Multi-Select",
    icon: "☑",
    desc: "Checkboxes",
    color: "#52B788",
  },
  {
    key: "textinput",
    label: "Text Input",
    icon: "✎",
    desc: "Form inputs",
    color: "#F7931E",
  },
  {
    key: "tabs",
    label: "Tabs",
    icon: "⊞",
    desc: "Tab interfaces",
    color: "#F72585",
  },
  {
    key: "tree",
    label: "Tree",
    icon: "🌳",
    desc: "Hierarchies",
    color: "#2D6A4F",
  },
  {
    key: "themes",
    label: "Themes",
    icon: "✦",
    desc: "Color schemes",
    color: "#00FF41",
  },
];

export const MainMenu = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cols = 3;

  useInput((input, key) => {
    if (key.leftArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.rightArrow) {
      setSelectedIndex((prev) => Math.min(MENU_ITEMS.length - 1, prev + 1));
    } else if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - cols));
    } else if (key.downArrow) {
      setSelectedIndex((prev) => Math.min(MENU_ITEMS.length - 1, prev + cols));
    } else if (key.return) {
      onSelect(MENU_ITEMS[selectedIndex].key);
    } else if (input === "q" || (key.ctrl && input === "c")) {
      process.exit(0);
    }
  });

  const title = `
╔════════════════════════════════════════════════════════════════╗
║  SIDDCN - Component Library Showcase                          ║
║  Navigate: Arrow Keys • Select: Enter • Quit: Q or Ctrl+C    ║
╚════════════════════════════════════════════════════════════════╝
  `;

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="#00A8E8">{title}</Text>

      <Box marginTop={1} flexDirection="column">
        {Array.from({ length: Math.ceil(MENU_ITEMS.length / cols) }).map(
          (_, rowIndex) => (
            <Box key={rowIndex} marginBottom={1}>
              {MENU_ITEMS.slice(rowIndex * cols, (rowIndex + 1) * cols).map(
                (item, colIndex) => {
                  const index = rowIndex * cols + colIndex;
                  const isSelected = selectedIndex === index;
                  return (
                    <Box key={item.key} marginRight={2}>
                      <Box
                        width={22}
                        borderStyle={isSelected ? "double" : "single"}
                        borderColor={isSelected ? item.color : "#6C757D"}
                        paddingX={1}
                        paddingY={0}
                      >
                        <Box flexDirection="column">
                          <Box>
                            {isSelected && <Text color={item.color}>▶ </Text>}
                            <Text color={item.color} bold>
                              {item.icon}
                            </Text>
                            <Text bold> {item.label}</Text>
                          </Box>
                          <Text dimColor>{item.desc}</Text>
                        </Box>
                      </Box>
                    </Box>
                  );
                },
              )}
            </Box>
          ),
        )}
      </Box>

      <Box
        marginTop={1}
        borderStyle="single"
        borderColor="#6C757D"
        paddingX={2}
      >
        <Text color="#00FFFF">
          {MENU_ITEMS.length} components available • Version 1.0.0
        </Text>
      </Box>
    </Box>
  );
};

export default MainMenu;

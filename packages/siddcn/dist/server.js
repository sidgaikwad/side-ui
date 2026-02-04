#!/usr/bin/env node

// src/server.ts
import fs from "fs";
import path from "path";
import ssh2 from "ssh2";
import { render } from "ink";
import React18 from "react";

// src/App.tsx
import React17, { useState as useState9 } from "react";
import { useInput as useInput8 } from "ink";

// src/screens/LoaderScreen.tsx
import React, { useState, useEffect } from "react";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";
import gradient from "gradient-string";
var LoaderScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing...");
  useEffect(() => {
    let isMounted = true;
    const steps = [
      { delay: 300, progress: 20, status: "Loading components..." },
      { delay: 500, progress: 50, status: "Building registry..." },
      { delay: 400, progress: 75, status: "Preparing navigation..." },
      { delay: 300, progress: 100, status: "Ready!" }
    ];
    const runSequence = async () => {
      for (const step of steps) {
        if (!isMounted) return;
        await new Promise((resolve) => setTimeout(resolve, step.delay));
        if (isMounted) {
          setProgress(step.progress);
          setStatus(step.status);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (isMounted) {
        onComplete();
      }
    };
    runSequence();
    return () => {
      isMounted = false;
    };
  }, []);
  const barLength = 40;
  const filled = Math.round(progress / 100 * barLength);
  const empty = barLength - filled;
  return /* @__PURE__ */ React.createElement(Box, { flexDirection: "column", padding: 2, alignItems: "center", width: "100%" }, /* @__PURE__ */ React.createElement(Box, { justifyContent: "center", marginBottom: 2 }, /* @__PURE__ */ React.createElement(Text, null, gradient.pastel.multiline(`
\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2557   \u2588\u2588\u2557
\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551
\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2554\u2588\u2588\u2557 \u2588\u2588\u2551
\u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2551\u255A\u2588\u2588\u2557\u2588\u2588\u2551
\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2551
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u255D  \u255A\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u2550\u2550\u255D
          `))), /* @__PURE__ */ React.createElement(Box, { justifyContent: "center", marginBottom: 1 }, /* @__PURE__ */ React.createElement(Text, { color: "cyan", bold: true }, "Terminal UI Component Library")), /* @__PURE__ */ React.createElement(Box, { justifyContent: "center", marginBottom: 2 }, /* @__PURE__ */ React.createElement(Text, { dimColor: true }, "Press Ctrl+C to exit anytime")), /* @__PURE__ */ React.createElement(
    Box,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: "gray",
      paddingX: 2,
      paddingY: 1,
      width: 60
    },
    /* @__PURE__ */ React.createElement(Box, { marginBottom: 1 }, /* @__PURE__ */ React.createElement(Text, { color: "green" }, /* @__PURE__ */ React.createElement(Spinner, { type: "dots" })), /* @__PURE__ */ React.createElement(Text, null, " "), /* @__PURE__ */ React.createElement(Text, null, status)),
    /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Text, { color: "cyan" }, "["), /* @__PURE__ */ React.createElement(Text, { color: "green" }, "\u2588".repeat(filled)), /* @__PURE__ */ React.createElement(Text, { dimColor: true }, "\u2591".repeat(empty)), /* @__PURE__ */ React.createElement(Text, { color: "cyan" }, "]"), /* @__PURE__ */ React.createElement(Text, null, " "), /* @__PURE__ */ React.createElement(Text, { color: "yellow" }, progress, "%"))
  ));
};

// src/screens/ShowcaseMenuScreen.tsx
import React5, { useState as useState3 } from "react";
import { Box as Box5, Text as Text5, useInput } from "ink";

// src/utils/theme.ts
var themes = {
  default: {
    name: "Default (Cyan & Green)",
    colors: {
      primary: "cyan",
      secondary: "blue",
      success: "green",
      warning: "yellow",
      error: "red",
      info: "blue",
      text: "white",
      dimText: "gray",
      border: "cyan",
      background: "black"
    },
    borderStyle: "round"
  },
  ocean: {
    name: "Ocean (Blue Theme)",
    colors: {
      primary: "blue",
      secondary: "cyan",
      success: "blueBright",
      warning: "cyanBright",
      error: "magenta",
      info: "cyan",
      text: "white",
      dimText: "gray",
      border: "blue",
      background: "black"
    },
    borderStyle: "double"
  },
  forest: {
    name: "Forest (Green Theme)",
    colors: {
      primary: "green",
      secondary: "greenBright",
      success: "green",
      warning: "yellow",
      error: "red",
      info: "greenBright",
      text: "white",
      dimText: "gray",
      border: "green",
      background: "black"
    },
    borderStyle: "round"
  },
  sunset: {
    name: "Sunset (Orange & Pink)",
    colors: {
      primary: "magenta",
      secondary: "yellow",
      success: "yellow",
      warning: "magenta",
      error: "red",
      info: "magentaBright",
      text: "white",
      dimText: "gray",
      border: "magenta",
      background: "black"
    },
    borderStyle: "round"
  },
  minimal: {
    name: "Minimal (White & Gray)",
    colors: {
      primary: "white",
      secondary: "gray",
      success: "white",
      warning: "white",
      error: "white",
      info: "white",
      text: "white",
      dimText: "gray",
      border: "white",
      background: "black"
    },
    borderStyle: "single"
  },
  cyberpunk: {
    name: "Cyberpunk (Pink & Cyan)",
    colors: {
      primary: "magentaBright",
      secondary: "cyanBright",
      success: "greenBright",
      warning: "yellowBright",
      error: "redBright",
      info: "cyanBright",
      text: "white",
      dimText: "gray",
      border: "magentaBright",
      background: "black"
    },
    borderStyle: "bold"
  }
};
var currentTheme = themes.default;
function setTheme(themeName) {
  if (themes[themeName]) {
    currentTheme = themes[themeName];
  }
}
function getTheme() {
  return currentTheme;
}
function getAvailableThemes() {
  return Object.values(themes);
}
function getThemeNames() {
  return Object.keys(themes);
}

// src/components/buttons/index.tsx
import React2 from "react";
import { Box as Box2, Text as Text2 } from "ink";
var SimpleButton = ({ label = "Button" }) => {
  const theme = getTheme();
  return /* @__PURE__ */ React2.createElement(Box2, { borderStyle: theme.borderStyle, borderColor: theme.colors.border, paddingX: 2 }, /* @__PURE__ */ React2.createElement(Text2, { color: theme.colors.text }, label));
};
var PrimaryButton = ({ label = "Primary" }) => {
  const theme = getTheme();
  return /* @__PURE__ */ React2.createElement(Box2, { borderStyle: "double", borderColor: theme.colors.primary, paddingX: 2 }, /* @__PURE__ */ React2.createElement(Text2, { bold: true, color: theme.colors.primary }, label));
};
var DangerButton = ({ label = "Delete" }) => {
  const theme = getTheme();
  return /* @__PURE__ */ React2.createElement(Box2, { borderStyle: theme.borderStyle, borderColor: theme.colors.error, paddingX: 2 }, /* @__PURE__ */ React2.createElement(Text2, { bold: true, color: theme.colors.error }, label));
};

// src/components/progress/index.tsx
import React3, { useState as useState2, useEffect as useEffect2 } from "react";
import { Box as Box3, Text as Text3 } from "ink";
import Spinner2 from "ink-spinner";
var LinearProgress = ({ value, max = 100, animated = true }) => {
  const theme = getTheme();
  const [currentValue, setCurrentValue] = useState2(value || 0);
  useEffect2(() => {
    if (!animated) {
      setCurrentValue(value || 75);
      return;
    }
    const targetValue = value || 75;
    const duration = 2e3;
    const steps = 60;
    const increment = targetValue / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCurrentValue(targetValue);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.floor(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [value, animated]);
  const percentage = Math.round(currentValue / max * 100);
  const filled = Math.round(percentage / 100 * 30);
  const empty = 30 - filled;
  return /* @__PURE__ */ React3.createElement(Box3, { flexDirection: "column" }, /* @__PURE__ */ React3.createElement(Text3, null, /* @__PURE__ */ React3.createElement(Text3, { color: theme.colors.success }, "\u2588".repeat(filled)), /* @__PURE__ */ React3.createElement(Text3, { dimColor: true }, "\u2591".repeat(empty)), " ", /* @__PURE__ */ React3.createElement(Text3, { color: theme.colors.primary }, percentage, "%")), /* @__PURE__ */ React3.createElement(Text3, { dimColor: true }, "Linear Progress Bar (Animated)"));
};
var CircularProgress = ({ percentage, animated = true }) => {
  const theme = getTheme();
  const [currentPercentage, setCurrentPercentage] = useState2(0);
  useEffect2(() => {
    if (!animated) {
      setCurrentPercentage(percentage || 60);
      return;
    }
    const targetPercentage = percentage || 60;
    const duration = 2e3;
    const steps = 60;
    const increment = targetPercentage / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetPercentage) {
        setCurrentPercentage(targetPercentage);
        clearInterval(timer);
      } else {
        setCurrentPercentage(Math.floor(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [percentage, animated]);
  return /* @__PURE__ */ React3.createElement(Box3, { flexDirection: "column" }, /* @__PURE__ */ React3.createElement(Box3, null, /* @__PURE__ */ React3.createElement(Text3, { color: theme.colors.success }, /* @__PURE__ */ React3.createElement(Spinner2, { type: "dots" })), /* @__PURE__ */ React3.createElement(Text3, null, " "), /* @__PURE__ */ React3.createElement(Text3, { color: theme.colors.primary }, currentPercentage, "%")), /* @__PURE__ */ React3.createElement(Text3, { dimColor: true }, "Circular Progress (Animated)"));
};
var StepProgress = () => {
  const theme = getTheme();
  const [currentStep, setCurrentStep] = useState2(0);
  useEffect2(() => {
    const steps = [0, 1, 2, 3];
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 3) return 0;
        return prev + 1;
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, []);
  const stepIcons = ["\u25CB", "\u25CF", "\u2713", "\u2713"];
  const stepColors = [
    theme.colors.dimText,
    theme.colors.primary,
    theme.colors.success,
    theme.colors.success
  ];
  return /* @__PURE__ */ React3.createElement(Box3, { flexDirection: "column" }, /* @__PURE__ */ React3.createElement(Box3, null, [0, 1, 2, 3].map((step, idx) => /* @__PURE__ */ React3.createElement(React3.Fragment, { key: step }, idx > 0 && /* @__PURE__ */ React3.createElement(Text3, { color: step <= currentStep ? theme.colors.success : theme.colors.dimText }, " \u2501\u2501 "), /* @__PURE__ */ React3.createElement(Text3, { color: step <= currentStep ? stepColors[step] : theme.colors.dimText }, step < currentStep ? "\u2713" : step === currentStep ? "\u25CF" : "\u25CB")))), /* @__PURE__ */ React3.createElement(Box3, { marginTop: 1 }, ["Step 1", "Step 2", "Step 3", "Step 4"].map((label, idx) => /* @__PURE__ */ React3.createElement(
    Text3,
    {
      key: idx,
      color: idx <= currentStep ? idx < currentStep ? theme.colors.success : theme.colors.primary : theme.colors.dimText,
      bold: idx === currentStep
    },
    label,
    idx < 3 && "    "
  ))), /* @__PURE__ */ React3.createElement(Box3, { marginTop: 1 }, /* @__PURE__ */ React3.createElement(Text3, { dimColor: true }, "Multi-step Progress (Animated)")));
};

// src/components/badges/index.tsx
import React4 from "react";
import { Box as Box4, Text as Text4 } from "ink";
var StatusBadge = ({ status = "success" }) => {
  const theme = getTheme();
  const colors = {
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
    info: theme.colors.info
  };
  const labels = {
    success: "Active",
    warning: "Pending",
    error: "Error",
    info: "Info"
  };
  return /* @__PURE__ */ React4.createElement(Box4, null, /* @__PURE__ */ React4.createElement(Box4, { borderStyle: theme.borderStyle, borderColor: colors[status], paddingX: 1 }, /* @__PURE__ */ React4.createElement(Text4, { color: colors[status] }, labels[status])));
};
var CountBadge = ({ count = 42 }) => {
  const theme = getTheme();
  return /* @__PURE__ */ React4.createElement(Box4, null, /* @__PURE__ */ React4.createElement(Box4, { borderStyle: theme.borderStyle, borderColor: theme.colors.primary, paddingX: 1 }, /* @__PURE__ */ React4.createElement(Text4, { color: theme.colors.primary, bold: true }, count)));
};
var DotBadge = ({ color }) => {
  const theme = getTheme();
  const dotColor = color || theme.colors.success;
  return /* @__PURE__ */ React4.createElement(Box4, null, /* @__PURE__ */ React4.createElement(Text4, { color: dotColor }, "\u25CF"), /* @__PURE__ */ React4.createElement(Text4, null, " Online"));
};

// src/screens/ShowcaseMenuScreen.tsx
var ShowcaseMenuScreen = ({ onSelect, onThemeSelect }) => {
  const theme = getTheme();
  const [selectedIndex, setSelectedIndex] = useState3(0);
  const items = [
    {
      id: "buttons",
      title: "Buttons",
      subtitle: "[ Primary ]\nStyled variants",
      icon: "\u25C9",
      preview: /* @__PURE__ */ React5.createElement(SimpleButton, { label: "Primary" })
    },
    {
      id: "themes",
      title: "Themes",
      subtitle: "\u{1F3A8} Preview\n& Install",
      icon: "\u{1F3A8}",
      preview: /* @__PURE__ */ React5.createElement(Text5, { color: theme.colors.primary }, "6 Themes")
    },
    {
      id: "select",
      title: "Select",
      subtitle: "\u25B8 Option 1\nSingle-select",
      icon: "\u25B8",
      preview: /* @__PURE__ */ React5.createElement(Text5, null, "\u25B8 ", /* @__PURE__ */ React5.createElement(Text5, { color: theme.colors.primary }, "Option 1"))
    },
    {
      id: "multi-select",
      title: "Multi-Select",
      subtitle: "\u2611 Item A\nCheckboxes",
      icon: "\u2611",
      preview: /* @__PURE__ */ React5.createElement(Text5, null, /* @__PURE__ */ React5.createElement(Text5, { color: theme.colors.primary }, "\u2611"), " Item A\\n", /* @__PURE__ */ React5.createElement(Text5, { dimColor: true }, "\u2610"), " Item B")
    },
    {
      id: "text-input",
      title: "Text Input",
      subtitle: "\u2502 Type... \u2588\nLive typing",
      icon: "\u270E",
      preview: /* @__PURE__ */ React5.createElement(Text5, { dimColor: true }, "\u2502 Type... ", /* @__PURE__ */ React5.createElement(Text5, { color: theme.colors.primary }, "\u2588"))
    },
    {
      id: "trees",
      title: "Tree",
      subtitle: "\u251C\u2500 folder/\nHierarchy",
      icon: "\u{1F333}",
      preview: /* @__PURE__ */ React5.createElement(Text5, null, "\u251C\u2500 ", /* @__PURE__ */ React5.createElement(Text5, { color: theme.colors.primary }, "folder/"))
    },
    {
      id: "tabs",
      title: "Tabs",
      subtitle: "[ Tab 1 ]\nTab interface",
      icon: "\u229F",
      preview: /* @__PURE__ */ React5.createElement(Text5, null, "[ ", /* @__PURE__ */ React5.createElement(Text5, { color: theme.colors.primary, bold: true }, "Tab 1"), " ]")
    },
    {
      id: "tables",
      title: "Table",
      subtitle: "\u2502 Row 1 \u2502\nData grid",
      icon: "\u25A6",
      preview: /* @__PURE__ */ React5.createElement(Text5, { dimColor: true }, "\u2502 Row 1 \u2502")
    },
    {
      id: "cards",
      title: "Cards",
      subtitle: "\u250C\u2500Card\u2500\u2510\nPanel layout",
      icon: "\u25C8",
      preview: /* @__PURE__ */ React5.createElement(Text5, { dimColor: true }, "\u250C\u2500Card\u2500\u2510")
    },
    {
      id: "badges",
      title: "Badges",
      subtitle: "[ Active ]\nStatus tags",
      icon: "\u2666",
      preview: /* @__PURE__ */ React5.createElement(StatusBadge, { status: "success" })
    },
    {
      id: "progress",
      title: "Progress",
      subtitle: "[\u2588\u2588\u2588\u2588\u2591] 60%\nProgress bars",
      icon: "\u25AA",
      preview: /* @__PURE__ */ React5.createElement(LinearProgress, { value: 60, max: 100, animated: false })
    },
    {
      id: "spinners",
      title: "Spinners",
      subtitle: "\u280B Loading...\nAnimations",
      icon: "\u25CB",
      preview: /* @__PURE__ */ React5.createElement(Text5, null, /* @__PURE__ */ React5.createElement(Text5, { color: theme.colors.primary }, "\u280B"), " Loading...")
    },
    {
      id: "charts",
      title: "Chart",
      subtitle: "\u2582\u2583\u2585\u2587\u2586\u2584\u2582\nLive data",
      icon: "\u25A4",
      preview: /* @__PURE__ */ React5.createElement(Text5, { color: theme.colors.primary }, "\u2582\u2583\u2585\u2587\u2586\u2584\u2582")
    }
  ];
  useInput((input, key) => {
    if (key.leftArrow || input === "h") {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.rightArrow || input === "l") {
      setSelectedIndex((prev) => Math.min(items.length - 1, prev + 1));
    } else if (key.upArrow || input === "k") {
      setSelectedIndex((prev) => Math.max(0, prev - 3));
    } else if (key.downArrow || input === "j") {
      setSelectedIndex((prev) => Math.min(items.length - 1, prev + 3));
    } else if (input === "t" || input === "T") {
      onThemeSelect?.();
    } else if (key.return) {
      const selectedItem = items[selectedIndex];
      if (selectedItem.id === "themes") {
        onThemeSelect?.();
      } else {
        onSelect(selectedItem.id);
      }
    }
  });
  const cols = 3;
  const selectedRow = Math.floor(selectedIndex / cols);
  const selectedCol = selectedIndex % cols;
  return /* @__PURE__ */ React5.createElement(Box5, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React5.createElement(
    Box5,
    {
      borderStyle: theme.borderStyle,
      borderColor: theme.colors.border,
      justifyContent: "center",
      paddingX: 2,
      marginBottom: 1
    },
    /* @__PURE__ */ React5.createElement(Text5, { bold: true, color: theme.colors.primary }, "siddcn Component Library Showcase")
  ), /* @__PURE__ */ React5.createElement(Box5, { marginBottom: 2, justifyContent: "center" }, /* @__PURE__ */ React5.createElement(Text5, { dimColor: true }, "Navigate the grid with arrow keys \xB7 Enter to explore")), /* @__PURE__ */ React5.createElement(Box5, { marginBottom: 2, justifyContent: "center", borderStyle: "round", borderColor: "yellow", paddingX: 2 }, /* @__PURE__ */ React5.createElement(Text5, { bold: true, color: "yellow" }, "\u{1F4A1} Press 'T' anytime for Theme Showcase (6 themes available)")), /* @__PURE__ */ React5.createElement(Box5, { flexDirection: "column" }, [0, 1, 2, 3].map((row) => /* @__PURE__ */ React5.createElement(Box5, { key: row, marginBottom: 1 }, [0, 1, 2].map((col) => {
    const index = row * 3 + col;
    if (index >= items.length) {
      return /* @__PURE__ */ React5.createElement(Box5, { key: col, width: 30 });
    }
    const item = items[index];
    const isSelected = index === selectedIndex;
    return /* @__PURE__ */ React5.createElement(
      Box5,
      {
        key: col,
        width: 30,
        marginRight: 2,
        borderStyle: isSelected ? "bold" : "single",
        borderColor: isSelected ? theme.colors.primary : theme.colors.border,
        paddingX: 1,
        paddingY: 1,
        flexDirection: "column"
      },
      /* @__PURE__ */ React5.createElement(Box5, { marginBottom: 0 }, /* @__PURE__ */ React5.createElement(Text5, { color: isSelected ? theme.colors.primary : theme.colors.text }, item.icon, "  ", /* @__PURE__ */ React5.createElement(Text5, { bold: true }, item.title))),
      /* @__PURE__ */ React5.createElement(Box5, { marginTop: 0 }, /* @__PURE__ */ React5.createElement(Text5, { dimColor: true }, item.subtitle))
    );
  })))), /* @__PURE__ */ React5.createElement(Box5, { marginTop: 2, justifyContent: "center" }, /* @__PURE__ */ React5.createElement(Text5, { dimColor: true }, items.length, " components \xB7 Arrow keys navigate \xB7 Enter select \xB7 Ctrl+C quit")));
};

// src/screens/MainMenuScreen.tsx
import React12 from "react";
import { Box as Box11, Text as Text11 } from "ink";
import SelectInput from "ink-select-input";

// src/components/registry.tsx
import React11 from "react";

// src/components/charts/index.tsx
import React6 from "react";
import { Box as Box6, Text as Text6 } from "ink";
var BarChart = () => {
  const data = [
    { label: "Jan", value: 30 },
    { label: "Feb", value: 45 },
    { label: "Mar", value: 60 },
    { label: "Apr", value: 40 }
  ];
  const maxValue = Math.max(...data.map((d) => d.value));
  return /* @__PURE__ */ React6.createElement(Box6, { flexDirection: "column" }, /* @__PURE__ */ React6.createElement(Text6, { color: "cyan", bold: true }, "Bar Chart"), /* @__PURE__ */ React6.createElement(Box6, { marginTop: 1, flexDirection: "column" }, data.map((item, idx) => {
    const barLength = Math.round(item.value / maxValue * 20);
    return /* @__PURE__ */ React6.createElement(Box6, { key: idx }, /* @__PURE__ */ React6.createElement(Text6, null, item.label, ": "), /* @__PURE__ */ React6.createElement(Text6, { color: "green" }, "\u2588".repeat(barLength)), /* @__PURE__ */ React6.createElement(Text6, null, " ", item.value));
  })));
};
var LineChart = () => {
  const data = [10, 20, 15, 30, 25, 35, 32];
  return /* @__PURE__ */ React6.createElement(Box6, { flexDirection: "column" }, /* @__PURE__ */ React6.createElement(Text6, { color: "cyan", bold: true }, "Line Chart"), /* @__PURE__ */ React6.createElement(Box6, { marginTop: 1 }, /* @__PURE__ */ React6.createElement(Text6, { color: "green" }, data.map((val, idx) => {
    const prev = idx > 0 ? data[idx - 1] : val;
    if (val > prev) return "\u2571";
    if (val < prev) return "\u2572";
    return "\u2500";
  }).join(""))), /* @__PURE__ */ React6.createElement(Box6, null, /* @__PURE__ */ React6.createElement(Text6, { dimColor: true }, data.map((val) => ` ${val}`).join(" "))));
};

// src/components/trees/index.tsx
import React7, { useState as useState4 } from "react";
import { Box as Box7, Text as Text7, useInput as useInput2 } from "ink";
function getNodeId(node, depth) {
  return `${depth}:${node.name}`;
}
function flattenTree(node, expandedSet, depth = 0) {
  const result = [];
  const nodeId = getNodeId(node, depth);
  const isExpanded = node.type === "dir" && expandedSet.has(nodeId);
  result.push({
    node,
    depth,
    isDir: node.type === "dir",
    expanded: isExpanded,
    id: nodeId
  });
  if (node.type === "dir" && isExpanded && node.children) {
    for (const child of node.children) {
      result.push(...flattenTree(child, expandedSet, depth + 1));
    }
  }
  return result;
}
function getFileIcon(filename) {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "tsx":
    case "ts":
      return "\u25C8";
    case "jsx":
    case "js":
      return "\u25C7";
    case "css":
      return "\u25C6";
    case "json":
      return "\u25C9";
    case "md":
      return "\u25CE";
    default:
      return "\u25CB";
  }
}
function getFileColor(filename, theme) {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "tsx":
    case "ts":
      return theme.colors.primary;
    case "jsx":
    case "js":
      return theme.colors.secondary;
    case "json":
      return theme.colors.warning;
    case "md":
      return theme.colors.info;
    default:
      return theme.colors.dimText;
  }
}
var FileTree = ({ data, onSelect }) => {
  const theme = getTheme();
  const [cursor, setCursor] = useState4(0);
  const [expanded, setExpanded] = useState4(/* @__PURE__ */ new Set([getNodeId(data, 0)]));
  const flatList = flattenTree(data, expanded);
  useInput2((input, key) => {
    if (key.upArrow || input === "k") {
      setCursor((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow || input === "j") {
      setCursor((prev) => Math.min(flatList.length - 1, prev + 1));
    } else if (key.rightArrow || input === "l") {
      const item = flatList[cursor];
      if (item && item.isDir && !item.expanded) {
        setExpanded((prev) => /* @__PURE__ */ new Set([...prev, item.id]));
      }
    } else if (key.leftArrow || input === "h") {
      const item = flatList[cursor];
      if (item && item.isDir && item.expanded) {
        setExpanded((prev) => {
          const newSet = new Set(prev);
          newSet.delete(item.id);
          return newSet;
        });
      }
    } else if (key.return) {
      const item = flatList[cursor];
      if (item?.isDir) {
        setExpanded((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(item.id)) {
            newSet.delete(item.id);
          } else {
            newSet.add(item.id);
          }
          return newSet;
        });
      }
      onSelect?.(item.node);
    }
  });
  const totalDirs = flatList.filter((f) => f.isDir).length;
  const totalFiles = flatList.filter((f) => !f.isDir).length;
  return /* @__PURE__ */ React7.createElement(Box7, { flexDirection: "column" }, /* @__PURE__ */ React7.createElement(Box7, { marginBottom: 1 }, /* @__PURE__ */ React7.createElement(Text7, { dimColor: true }, "Showing "), /* @__PURE__ */ React7.createElement(Text7, { color: theme.colors.primary }, totalDirs), /* @__PURE__ */ React7.createElement(Text7, { dimColor: true }, " folders, "), /* @__PURE__ */ React7.createElement(Text7, { color: theme.colors.primary }, totalFiles), /* @__PURE__ */ React7.createElement(Text7, { dimColor: true }, " files")), /* @__PURE__ */ React7.createElement(Box7, { marginBottom: 1 }, /* @__PURE__ */ React7.createElement(Text7, { color: theme.colors.border }, "\u2500".repeat(48))), /* @__PURE__ */ React7.createElement(Box7, { flexDirection: "column" }, flatList.map((item, index) => {
    const isSelected = index === cursor;
    let indent = "";
    for (let d = 1; d < item.depth; d++) {
      indent += "\u2502   ";
    }
    if (item.depth > 0) {
      indent += "\u251C\u2500\u2500 ";
    }
    let icon;
    let nameColor;
    if (item.isDir) {
      icon = item.expanded ? "\u25BE " : "\u25B8 ";
      nameColor = theme.colors.primary;
    } else {
      icon = getFileIcon(item.node.name) + " ";
      nameColor = getFileColor(item.node.name, theme);
    }
    return /* @__PURE__ */ React7.createElement(Box7, { key: item.id }, /* @__PURE__ */ React7.createElement(Text7, { color: isSelected ? theme.colors.primary : theme.colors.text, bold: isSelected }, isSelected ? "> " : "  "), /* @__PURE__ */ React7.createElement(Text7, { dimColor: true }, indent), /* @__PURE__ */ React7.createElement(Text7, { color: nameColor }, icon), /* @__PURE__ */ React7.createElement(
      Text7,
      {
        color: isSelected ? "white" : item.isDir ? nameColor : theme.colors.text,
        bold: isSelected
      },
      item.node.name
    ), item.node.meta && /* @__PURE__ */ React7.createElement(Text7, { dimColor: true }, "  ", item.node.meta));
  })), /* @__PURE__ */ React7.createElement(Box7, { marginTop: 1 }, /* @__PURE__ */ React7.createElement(Text7, { color: theme.colors.border }, "\u2500".repeat(48))), flatList[cursor] && /* @__PURE__ */ React7.createElement(Box7, { marginTop: 1 }, /* @__PURE__ */ React7.createElement(Text7, { dimColor: true }, "Selected: "), /* @__PURE__ */ React7.createElement(Text7, { color: theme.colors.primary }, flatList[cursor].isDir ? "\u{1F4C1} " : "\u{1F4C4} ", flatList[cursor].node.name)), /* @__PURE__ */ React7.createElement(Box7, { marginTop: 1 }, /* @__PURE__ */ React7.createElement(Text7, { dimColor: true }, "\u2191\u2193 Navigate   \u2192 Expand   \u2190 Collapse   Enter Toggle")));
};
var DataTree = ({ data, onSelect }) => {
  const theme = getTheme();
  const [cursor, setCursor] = useState4(0);
  const [expanded, setExpanded] = useState4(/* @__PURE__ */ new Set([getNodeId(data, 0)]));
  const flatList = flattenTree(data, expanded);
  useInput2((input, key) => {
    if (key.upArrow) {
      setCursor((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow) {
      setCursor((prev) => Math.min(flatList.length - 1, prev + 1));
    } else if (key.rightArrow) {
      const item = flatList[cursor];
      if (item?.isDir && !item.expanded) {
        setExpanded((prev) => /* @__PURE__ */ new Set([...prev, item.id]));
      }
    } else if (key.leftArrow) {
      const item = flatList[cursor];
      if (item?.isDir && item.expanded) {
        setExpanded((prev) => {
          const newSet = new Set(prev);
          newSet.delete(item.id);
          return newSet;
        });
      }
    } else if (key.return) {
      const item = flatList[cursor];
      if (item?.isDir) {
        setExpanded((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(item.id)) {
            newSet.delete(item.id);
          } else {
            newSet.add(item.id);
          }
          return newSet;
        });
      }
      onSelect?.(item.node);
    }
  });
  return /* @__PURE__ */ React7.createElement(Box7, { flexDirection: "column" }, flatList.map((item, index) => {
    const isSelected = index === cursor;
    const indent = "  ".repeat(item.depth);
    return /* @__PURE__ */ React7.createElement(Box7, { key: item.id }, /* @__PURE__ */ React7.createElement(Text7, { color: isSelected ? theme.colors.primary : theme.colors.text }, isSelected ? "\u25CF " : "\u25CB "), /* @__PURE__ */ React7.createElement(Text7, null, indent), /* @__PURE__ */ React7.createElement(
      Text7,
      {
        color: item.isDir ? theme.colors.primary : theme.colors.text,
        bold: isSelected
      },
      item.isDir && (item.expanded ? "\u25BE " : "\u25B8 "),
      item.node.name
    ));
  }));
};

// src/components/tabs/index.tsx
import React8, { useState as useState5 } from "react";
import { Box as Box8, Text as Text8, useInput as useInput3 } from "ink";
var TabStyles = {
  modern: {
    borderStyle: "bold",
    activeBorder: "double"
  },
  rounded: {
    borderStyle: "round",
    activeBorder: "round"
  },
  underline: {
    borderStyle: "single",
    activeBorder: "single"
  },
  pills: {
    borderStyle: "round",
    activeBorder: "round"
  },
  blocks: {
    borderStyle: "bold",
    activeBorder: "bold"
  }
};
var Tabs = ({
  tabs,
  defaultTab = 0,
  onTabChange,
  style = "modern"
}) => {
  const theme = getTheme();
  const [activeTab, setActiveTab] = useState5(defaultTab);
  const styleConfig = TabStyles[style];
  useInput3((input, key) => {
    if (key.leftArrow) {
      const newIndex = Math.max(0, activeTab - 1);
      setActiveTab(newIndex);
      onTabChange?.(newIndex);
    } else if (key.rightArrow) {
      const newIndex = Math.min(tabs.length - 1, activeTab + 1);
      setActiveTab(newIndex);
      onTabChange?.(newIndex);
    } else if (key.tab) {
      const newIndex = (activeTab + 1) % tabs.length;
      setActiveTab(newIndex);
      onTabChange?.(newIndex);
    } else if (input >= "1" && input <= "9") {
      const idx = parseInt(input) - 1;
      if (idx < tabs.length) {
        setActiveTab(idx);
        onTabChange?.(idx);
      }
    }
  });
  return /* @__PURE__ */ React8.createElement(Box8, { flexDirection: "column" }, /* @__PURE__ */ React8.createElement(Box8, null, tabs.map((tab, index) => {
    const isActive = index === activeTab;
    return /* @__PURE__ */ React8.createElement(
      Box8,
      {
        key: tab.id,
        marginRight: 1,
        borderStyle: isActive ? styleConfig.activeBorder : styleConfig.borderStyle,
        borderColor: isActive ? theme.colors.primary : theme.colors.border,
        paddingX: 2,
        paddingY: 0
      },
      /* @__PURE__ */ React8.createElement(
        Text8,
        {
          color: isActive ? theme.colors.primary : theme.colors.text,
          bold: isActive
        },
        tab.icon && `${tab.icon} `,
        tab.label
      )
    );
  })), /* @__PURE__ */ React8.createElement(Box8, { marginY: 1 }, /* @__PURE__ */ React8.createElement(Text8, { color: theme.colors.border }, "\u2500".repeat(60))), /* @__PURE__ */ React8.createElement(
    Box8,
    {
      borderStyle: theme.borderStyle,
      borderColor: theme.colors.border,
      padding: 1,
      flexDirection: "column"
    },
    tabs[activeTab].content
  ), /* @__PURE__ */ React8.createElement(Box8, { marginTop: 1, justifyContent: "center" }, tabs.map((tab, index) => /* @__PURE__ */ React8.createElement(
    Text8,
    {
      key: tab.id,
      color: index === activeTab ? theme.colors.primary : theme.colors.dimText,
      bold: index === activeTab
    },
    tab.icon || "\u25CF",
    index < tabs.length - 1 && "   "
  ))), /* @__PURE__ */ React8.createElement(Box8, { marginTop: 1, justifyContent: "center" }, /* @__PURE__ */ React8.createElement(Text8, { dimColor: true }, "\u2190 \u2192 Navigate   1-", tabs.length, " Quick Switch   Tab Cycle")));
};
var DashboardTab = () => {
  const theme = getTheme();
  const stats = [
    { label: "Active Users", value: "12.4K", change: "+12.5%", positive: true },
    { label: "Revenue", value: "$48.2K", change: "+8.2%", positive: true },
    { label: "Conversion", value: "3.4%", change: "-2.1%", positive: false }
  ];
  return /* @__PURE__ */ React8.createElement(Box8, { flexDirection: "column" }, /* @__PURE__ */ React8.createElement(Text8, { bold: true, color: theme.colors.primary }, "Dashboard Overview"), /* @__PURE__ */ React8.createElement(Box8, { marginTop: 1, flexDirection: "column" }, stats.map((stat, idx) => /* @__PURE__ */ React8.createElement(Box8, { key: idx, marginBottom: 1 }, /* @__PURE__ */ React8.createElement(Text8, { bold: true, color: theme.colors.secondary }, stat.value.padEnd(10)), /* @__PURE__ */ React8.createElement(Text8, null, stat.label.padEnd(18)), /* @__PURE__ */ React8.createElement(Text8, { color: stat.positive ? theme.colors.success : theme.colors.error }, stat.change)))), /* @__PURE__ */ React8.createElement(Box8, { marginTop: 1 }, /* @__PURE__ */ React8.createElement(Text8, { dimColor: true }, "Real-time metrics updated every minute")));
};

// src/components/table/index.tsx
import React9, { useState as useState6 } from "react";
import { Box as Box9, Text as Text9, useInput as useInput4 } from "ink";
var Table = ({
  columns,
  data,
  maxVisibleRows = 10,
  onSelect
}) => {
  const theme = getTheme();
  const [selected, setSelected] = useState6(0);
  const [scrollTop, setScrollTop] = useState6(0);
  useInput4((input, key) => {
    if (key.upArrow) {
      const newSelected = Math.max(0, selected - 1);
      setSelected(newSelected);
      if (newSelected < scrollTop) {
        setScrollTop(newSelected);
      }
    } else if (key.downArrow) {
      const newSelected = Math.min(data.length - 1, selected + 1);
      setSelected(newSelected);
      if (newSelected >= scrollTop + maxVisibleRows) {
        setScrollTop(newSelected - maxVisibleRows + 1);
      }
    } else if (key.pageUp) {
      setSelected((prev) => Math.max(0, prev - 8));
    } else if (key.pageDown) {
      setSelected((prev) => Math.min(data.length - 1, prev + 8));
    } else if (input === "g") {
      setSelected(0);
      setScrollTop(0);
    } else if (input === "G") {
      setSelected(data.length - 1);
    } else if (key.return) {
      onSelect?.(data[selected], selected);
    }
  });
  const endRow = Math.min(data.length, scrollTop + maxVisibleRows);
  return /* @__PURE__ */ React9.createElement(Box9, { flexDirection: "column" }, /* @__PURE__ */ React9.createElement(Box9, null, columns.map((col, index) => /* @__PURE__ */ React9.createElement(
    Text9,
    {
      key: col.key,
      color: theme.colors.primary,
      bold: true
    },
    col.header.padEnd(col.width),
    index < columns.length - 1 && " \u2502 "
  ))), /* @__PURE__ */ React9.createElement(Box9, null, columns.map((col, index) => /* @__PURE__ */ React9.createElement(Text9, { key: col.key, color: theme.colors.border }, "\u2500".repeat(col.width), index < columns.length - 1 && "\u2500\u253C\u2500"))), /* @__PURE__ */ React9.createElement(Box9, { flexDirection: "column" }, data.slice(scrollTop, endRow).map((row, displayIndex) => {
    const actualIndex = scrollTop + displayIndex;
    const isSelected = actualIndex === selected;
    const isEven = actualIndex % 2 === 0;
    return /* @__PURE__ */ React9.createElement(Box9, { key: actualIndex }, /* @__PURE__ */ React9.createElement(Text9, { color: isSelected ? theme.colors.primary : theme.colors.text, bold: isSelected }, isSelected ? "\u25B8 " : "  "), columns.map((col, colIndex) => {
      const cellValue = String(row[col.key] || "").padEnd(col.width);
      return /* @__PURE__ */ React9.createElement(
        Text9,
        {
          key: col.key,
          color: isSelected ? "white" : isEven ? theme.colors.text : theme.colors.dimText
        },
        cellValue.slice(0, col.width),
        colIndex < columns.length - 1 && " \u2502 "
      );
    }));
  })), /* @__PURE__ */ React9.createElement(Box9, { marginTop: 1 }, /* @__PURE__ */ React9.createElement(Text9, { dimColor: true }, "Row ", selected + 1, " of ", data.length, "  \xB7  Showing ", scrollTop + 1, "\u2013", endRow)), /* @__PURE__ */ React9.createElement(Box9, { marginTop: 1 }, /* @__PURE__ */ React9.createElement(Text9, { dimColor: true }, "\u2191\u2193 Navigate   PgUp/PgDn Scroll   g Top   G Bottom   Enter Select")));
};

// src/components/multiselect/index.tsx
import React10, { useState as useState7 } from "react";
import { Box as Box10, Text as Text10, useInput as useInput5 } from "ink";
var MultiSelect = ({
  items,
  maxSelect = 0,
  onConfirm,
  showProgress = true
}) => {
  const theme = getTheme();
  const [cursor, setCursor] = useState7(0);
  const [checked, setChecked] = useState7(/* @__PURE__ */ new Set());
  const [confirmed, setConfirmed] = useState7(false);
  useInput5((input, key) => {
    if (key.upArrow) {
      setCursor((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow) {
      setCursor((prev) => Math.min(items.length - 1, prev + 1));
    } else if (input === " ") {
      setChecked((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(cursor)) {
          newSet.delete(cursor);
        } else if (maxSelect === 0 || newSet.size < maxSelect) {
          newSet.add(cursor);
        }
        return newSet;
      });
      setConfirmed(false);
    } else if (input === "a" || input === "A") {
      if (maxSelect === 0) {
        setChecked(new Set(items.map((_, i) => i)));
      }
    } else if (input === "n" || input === "N") {
      setChecked(/* @__PURE__ */ new Set());
    } else if (key.return) {
      setConfirmed(true);
      const selectedValues = items.filter((_, i) => checked.has(i)).map((item) => item.value);
      onConfirm?.(selectedValues);
    }
  });
  const isLimitReached = maxSelect > 0 && checked.size >= maxSelect;
  const checkedCount = checked.size;
  return /* @__PURE__ */ React10.createElement(Box10, { flexDirection: "column" }, maxSelect > 0 && /* @__PURE__ */ React10.createElement(Box10, { marginBottom: 1, borderStyle: theme.borderStyle, borderColor: theme.colors.warning, paddingX: 1 }, /* @__PURE__ */ React10.createElement(Text10, { color: theme.colors.warning }, "\u26A0 Limit: Max ", maxSelect, " items")), /* @__PURE__ */ React10.createElement(Box10, { marginBottom: 1 }, /* @__PURE__ */ React10.createElement(Text10, { dimColor: true }, "Selected: "), /* @__PURE__ */ React10.createElement(Text10, { color: isLimitReached ? theme.colors.error : theme.colors.primary, bold: true }, checkedCount), /* @__PURE__ */ React10.createElement(Text10, { dimColor: true }, " / ", items.length)), showProgress && /* @__PURE__ */ React10.createElement(Box10, { marginBottom: 1 }, (() => {
    const barWidth = 30;
    const filled = Math.round(checkedCount / items.length * barWidth);
    const empty = barWidth - filled;
    return /* @__PURE__ */ React10.createElement(Box10, null, /* @__PURE__ */ React10.createElement(Text10, { dimColor: true }, "["), /* @__PURE__ */ React10.createElement(Text10, { color: theme.colors.primary }, "\u2588".repeat(filled)), /* @__PURE__ */ React10.createElement(Text10, { dimColor: true }, "\u2591".repeat(empty)), /* @__PURE__ */ React10.createElement(Text10, { dimColor: true }, "]"));
  })()), /* @__PURE__ */ React10.createElement(Box10, { marginBottom: 1 }, /* @__PURE__ */ React10.createElement(Text10, { color: theme.colors.border }, "\u2500".repeat(42))), /* @__PURE__ */ React10.createElement(Box10, { flexDirection: "column" }, items.map((item, index) => {
    const isCursor = index === cursor;
    const isChecked = checked.has(index);
    const isDisabled = isLimitReached && !isChecked;
    return /* @__PURE__ */ React10.createElement(Box10, { key: index }, /* @__PURE__ */ React10.createElement(Text10, { color: isCursor ? theme.colors.primary : theme.colors.text, bold: isCursor }, isCursor ? "\u25B8 " : "  "), /* @__PURE__ */ React10.createElement(
      Text10,
      {
        color: isDisabled ? theme.colors.error : isChecked ? theme.colors.success : theme.colors.dimText
      },
      isChecked ? "\u2611" : isDisabled ? "\u2716" : "\u2610"
    ), /* @__PURE__ */ React10.createElement(Text10, null, " "), /* @__PURE__ */ React10.createElement(
      Text10,
      {
        color: isCursor ? "white" : isChecked ? theme.colors.success : theme.colors.text
      },
      item.label.padEnd(18)
    ), /* @__PURE__ */ React10.createElement(Text10, { dimColor: true }, item.desc || ""), isDisabled && /* @__PURE__ */ React10.createElement(Text10, { color: theme.colors.error }, " (Limit reached)"));
  })), /* @__PURE__ */ React10.createElement(Box10, { marginTop: 1 }, /* @__PURE__ */ React10.createElement(Text10, { color: theme.colors.border }, "\u2500".repeat(42))), confirmed && checkedCount > 0 ? /* @__PURE__ */ React10.createElement(Box10, { marginTop: 1 }, /* @__PURE__ */ React10.createElement(Text10, { color: theme.colors.success, bold: true }, "\u2713 Confirmed: ", items.filter((_, i) => checked.has(i)).map((i) => i.label).join(", "))) : confirmed && checkedCount === 0 ? /* @__PURE__ */ React10.createElement(Box10, { marginTop: 1 }, /* @__PURE__ */ React10.createElement(Text10, { color: theme.colors.warning, bold: true }, "\u26A0 Nothing selected")) : /* @__PURE__ */ React10.createElement(Box10, { marginTop: 1 }, /* @__PURE__ */ React10.createElement(Text10, { dimColor: true }, "Press Enter to confirm selection")), /* @__PURE__ */ React10.createElement(Box10, { marginTop: 1 }, /* @__PURE__ */ React10.createElement(Text10, { dimColor: true }, "Space Toggle   ", maxSelect === 0 && "a All   ", "n None   Enter Confirm")));
};

// src/components/registry.tsx
var FileTreePreview = () => /* @__PURE__ */ React11.createElement(
  FileTree,
  {
    data: {
      name: "project",
      type: "dir",
      children: [
        {
          name: "src",
          type: "dir",
          children: [
            { name: "index.tsx", type: "file" },
            { name: "App.tsx", type: "file" }
          ]
        },
        { name: "package.json", type: "file" }
      ]
    }
  }
);
var DataTreePreview = () => /* @__PURE__ */ React11.createElement(
  DataTree,
  {
    data: {
      name: "Root",
      type: "dir",
      children: [
        {
          name: "Branch 1",
          type: "dir",
          children: [{ name: "Leaf 1", type: "file" }]
        }
      ]
    }
  }
);
var TabPreviewContent = () => /* @__PURE__ */ React11.createElement(DashboardTab, null);
var TabsModernPreview = () => /* @__PURE__ */ React11.createElement(
  Tabs,
  {
    tabs: [
      { id: "tab1", label: "Tab 1", content: /* @__PURE__ */ React11.createElement(TabPreviewContent, null) },
      { id: "tab2", label: "Tab 2", content: /* @__PURE__ */ React11.createElement(TabPreviewContent, null) },
      { id: "tab3", label: "Tab 3", content: /* @__PURE__ */ React11.createElement(TabPreviewContent, null) }
    ],
    style: "modern"
  }
);
var TabsRoundedPreview = () => /* @__PURE__ */ React11.createElement(
  Tabs,
  {
    tabs: [
      { id: "tab1", label: "Tab 1", content: /* @__PURE__ */ React11.createElement(TabPreviewContent, null) },
      { id: "tab2", label: "Tab 2", content: /* @__PURE__ */ React11.createElement(TabPreviewContent, null) }
    ],
    style: "rounded"
  }
);
var TabsPillsPreview = () => /* @__PURE__ */ React11.createElement(
  Tabs,
  {
    tabs: [
      { id: "tab1", label: "Tab 1", content: /* @__PURE__ */ React11.createElement(TabPreviewContent, null) },
      { id: "tab2", label: "Tab 2", content: /* @__PURE__ */ React11.createElement(TabPreviewContent, null) }
    ],
    style: "pills"
  }
);
var TablePreview = () => /* @__PURE__ */ React11.createElement(
  Table,
  {
    columns: [
      { key: "name", header: "Name", width: 15 },
      { key: "status", header: "Status", width: 10 }
    ],
    data: [
      { name: "John Doe", status: "Active" },
      { name: "Jane Smith", status: "Pending" }
    ],
    maxVisibleRows: 5
  }
);
var MultiSelectPreview = () => /* @__PURE__ */ React11.createElement(
  MultiSelect,
  {
    items: [
      { value: "react", label: "React", desc: "UI Library" },
      { value: "vue", label: "Vue", desc: "Framework" }
    ],
    maxSelect: 2,
    showProgress: false
  }
);
var componentRegistry = {
  buttons: {
    id: "buttons",
    name: "Buttons",
    description: "Interactive button components with various styles",
    icon: "\u{1F518}",
    variants: [
      {
        id: "simple",
        name: "Simple Button",
        description: "A basic button component",
        preview: SimpleButton,
        installCommand: "npx siddcn add button-simple",
        usage: `import { SimpleButton } from 'siddcn';

<SimpleButton label="Click me" />`,
        props: {
          label: {
            type: "string",
            required: true,
            description: "Button label text"
          }
        }
      },
      {
        id: "primary",
        name: "Primary Button",
        description: "A styled primary action button",
        preview: PrimaryButton,
        installCommand: "npx siddcn add button-primary",
        usage: `import { PrimaryButton } from 'siddcn';

<PrimaryButton label="Submit" />`
      },
      {
        id: "danger",
        name: "Danger Button",
        description: "A button for destructive actions",
        preview: DangerButton,
        installCommand: "npx siddcn add button-danger",
        usage: `import { DangerButton } from 'siddcn';

<DangerButton label="Delete" />`
      }
    ]
  },
  progress: {
    id: "progress",
    name: "Progress Bars",
    description: "Progress indicators and loading states",
    icon: "\u{1F4CA}",
    variants: [
      {
        id: "linear",
        name: "Linear Progress",
        description: "A horizontal progress bar",
        preview: LinearProgress,
        installCommand: "npx siddcn add progress-linear",
        usage: `import { LinearProgress } from 'siddcn';

<LinearProgress value={75} max={100} />`
      },
      {
        id: "circular",
        name: "Circular Progress",
        description: "A circular/spinner progress indicator",
        preview: CircularProgress,
        installCommand: "npx siddcn add progress-circular",
        usage: `import { CircularProgress } from 'siddcn';

<CircularProgress percentage={60} />`
      },
      {
        id: "step",
        name: "Step Progress",
        description: "Multi-step progress indicator",
        preview: StepProgress,
        installCommand: "npx siddcn add progress-step",
        usage: `import { StepProgress } from 'siddcn';

<StepProgress />`
      }
    ]
  },
  badges: {
    id: "badges",
    name: "Badges",
    description: "Status indicators and labels",
    icon: "\u{1F3F7}\uFE0F",
    variants: [
      {
        id: "status",
        name: "Status Badge",
        description: "Display status with color coding",
        preview: StatusBadge,
        installCommand: "npx siddcn add badge-status",
        usage: `import { StatusBadge } from 'siddcn';

<StatusBadge status="success" />`
      },
      {
        id: "count",
        name: "Count Badge",
        description: "Display numerical count",
        preview: CountBadge,
        installCommand: "npx siddcn add badge-count",
        usage: `import { CountBadge } from 'siddcn';

<CountBadge count={42} />`
      },
      {
        id: "dot",
        name: "Dot Badge",
        description: "Simple dot indicator",
        preview: DotBadge,
        installCommand: "npx siddcn add badge-dot",
        usage: `import { DotBadge } from 'siddcn';

<DotBadge color="green" />`
      }
    ]
  },
  charts: {
    id: "charts",
    name: "Charts",
    description: "Data visualization components",
    icon: "\u{1F4C8}",
    variants: [
      {
        id: "bar",
        name: "Bar Chart",
        description: "Display data as vertical bars",
        preview: BarChart,
        installCommand: "npx siddcn add chart-bar",
        usage: `import { BarChart } from 'siddcn';

<BarChart />`
      },
      {
        id: "line",
        name: "Line Chart",
        description: "Display data as a line graph",
        preview: LineChart,
        installCommand: "npx siddcn add chart-line",
        usage: `import { LineChart } from 'siddcn';

<LineChart />`
      }
    ]
  },
  trees: {
    id: "trees",
    name: "Trees",
    description: "Hierarchical data structures",
    icon: "\u{1F333}",
    variants: [
      {
        id: "file",
        name: "File Tree",
        description: "File system hierarchy with vim navigation",
        preview: FileTreePreview,
        installCommand: "npx siddcn add tree-file",
        usage: `import { FileTree } from 'siddcn';

const tree = {
  name: 'project',
  type: 'dir',
  children: [
    { name: 'src', type: 'dir', children: [] }
  ]
};

<FileTree data={tree} />`
      },
      {
        id: "data",
        name: "Data Tree",
        description: "Hierarchical data with expandable nodes",
        preview: DataTreePreview,
        installCommand: "npx siddcn add tree-data",
        usage: `import { DataTree } from 'siddcn';

<DataTree data={treeData} />`
      }
    ]
  },
  tabs: {
    id: "tabs",
    name: "Tabs",
    description: "Tabbed navigation with multiple styles",
    icon: "\u{1F4D1}",
    variants: [
      {
        id: "modern",
        name: "Modern Tabs",
        description: "Clean modern tab interface",
        preview: TabsModernPreview,
        installCommand: "npx siddcn add tabs-modern",
        usage: `import { Tabs } from 'siddcn';

const tabs = [
  { id: 'tab1', label: 'Tab 1', content: <YourContent /> }
];

<Tabs tabs={tabs} style="modern" />`
      },
      {
        id: "rounded",
        name: "Rounded Tabs",
        description: "Tabs with rounded borders",
        preview: TabsRoundedPreview,
        installCommand: "npx siddcn add tabs-rounded",
        usage: `import { Tabs } from 'siddcn';

<Tabs tabs={tabs} style="rounded" />`
      },
      {
        id: "pills",
        name: "Pill Tabs",
        description: "Pill-shaped tab buttons",
        preview: TabsPillsPreview,
        installCommand: "npx siddcn add tabs-pills",
        usage: `import { Tabs } from 'siddcn';

<Tabs tabs={tabs} style="pills" />`
      }
    ]
  },
  table: {
    id: "table",
    name: "Table",
    description: "Scrollable data grid",
    icon: "\u{1F4CB}",
    variants: [
      {
        id: "default",
        name: "Data Table",
        description: "Scrollable table with row selection",
        preview: TablePreview,
        installCommand: "npx siddcn add table",
        usage: `import { Table } from 'siddcn';

const columns = [
  { key: 'name', header: 'Name', width: 20 }
];

<Table columns={columns} data={data} />`
      }
    ]
  },
  multiselect: {
    id: "multiselect",
    name: "Multi-Select",
    description: "Multiple item selection with limits",
    icon: "\u2611\uFE0F",
    variants: [
      {
        id: "default",
        name: "Multi-Select List",
        description: "Select multiple items with optional limits",
        preview: MultiSelectPreview,
        installCommand: "npx siddcn add multiselect",
        usage: `import { MultiSelect } from 'siddcn';

const items = [
  { value: 'opt1', label: 'Option 1', desc: 'Description' }
];

<MultiSelect items={items} maxSelect={2} />`
      }
    ]
  }
};
function getCategories() {
  return Object.values(componentRegistry);
}
function getCategory(categoryId) {
  return componentRegistry[categoryId];
}
function getVariant(categoryId, variantId) {
  const category = getCategory(categoryId);
  return category?.variants.find((v) => v.id === variantId);
}

// src/screens/MainMenuScreen.tsx
var MainMenuScreen = ({ onSelect }) => {
  const categories = getCategories();
  const items = categories.map((category) => ({
    label: `${category.icon}  ${category.name}`,
    value: category.id,
    description: category.description
  }));
  const handleSelect = (item) => {
    onSelect(item.value);
  };
  return /* @__PURE__ */ React12.createElement(Box11, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React12.createElement(Box11, { marginBottom: 1 }, /* @__PURE__ */ React12.createElement(Text11, { color: "cyan", bold: true }, "\u2728 Component Categories")), /* @__PURE__ */ React12.createElement(Box11, { marginBottom: 2 }, /* @__PURE__ */ React12.createElement(Text11, { dimColor: true }, "Navigate with \u2191\u2193 or j/k \u2022 Select with Enter \u2022 Exit with Ctrl+C or q")), /* @__PURE__ */ React12.createElement(Box11, { borderStyle: "round", paddingX: 2, paddingY: 1 }, /* @__PURE__ */ React12.createElement(SelectInput, { items, onSelect: handleSelect })), /* @__PURE__ */ React12.createElement(Box11, { marginTop: 2 }, /* @__PURE__ */ React12.createElement(Text11, { dimColor: true }, "Total categories: ", categories.length)));
};

// src/screens/CategoryScreen.tsx
import React13 from "react";
import { Box as Box12, Text as Text12 } from "ink";
import SelectInput2 from "ink-select-input";
var CategoryScreen = ({
  categoryId,
  onSelect,
  onBack
}) => {
  const category = getCategory(categoryId);
  if (!category) {
    return /* @__PURE__ */ React13.createElement(Box12, { padding: 2 }, /* @__PURE__ */ React13.createElement(Text12, { color: "red" }, "Category not found!"));
  }
  const items = category.variants.map((variant) => ({
    label: variant.name,
    value: variant.id,
    description: variant.description
  }));
  const handleSelect = (item) => {
    onSelect(item.value);
  };
  return /* @__PURE__ */ React13.createElement(Box12, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React13.createElement(Box12, { marginBottom: 1 }, /* @__PURE__ */ React13.createElement(Text12, { color: "cyan", bold: true }, category.icon, "  ", category.name)), /* @__PURE__ */ React13.createElement(Box12, { marginBottom: 1 }, /* @__PURE__ */ React13.createElement(Text12, { dimColor: true }, category.description)), /* @__PURE__ */ React13.createElement(Box12, { marginBottom: 2 }, /* @__PURE__ */ React13.createElement(Text12, { dimColor: true }, "Navigate with \u2191\u2193 or j/k \u2022 Select with Enter \u2022 Back with Esc \u2022 Exit with q")), /* @__PURE__ */ React13.createElement(Box12, { borderStyle: "round", paddingX: 2, paddingY: 1 }, /* @__PURE__ */ React13.createElement(SelectInput2, { items, onSelect: handleSelect })), /* @__PURE__ */ React13.createElement(Box12, { marginTop: 2 }, /* @__PURE__ */ React13.createElement(Text12, { dimColor: true }, category.variants.length, " variant", category.variants.length !== 1 ? "s" : "", " available")));
};

// src/screens/ComponentDetailScreen.tsx
import React14 from "react";
import { Box as Box13, Text as Text13, useInput as useInput6 } from "ink";
var ComponentDetailScreen = ({
  categoryId,
  variantId,
  accordionOpen,
  onToggleAccordion,
  onBack
}) => {
  const variant = getVariant(categoryId, variantId);
  useInput6((input, key) => {
    if (input === "i" || input === "I") {
      onToggleAccordion();
    }
    if (key.escape) {
      onBack();
    }
  });
  if (!variant) {
    return /* @__PURE__ */ React14.createElement(Box13, { padding: 2 }, /* @__PURE__ */ React14.createElement(Text13, { color: "red" }, "Component not found!"));
  }
  const PreviewComponent = variant.preview;
  return /* @__PURE__ */ React14.createElement(Box13, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React14.createElement(Box13, { marginBottom: 1 }, /* @__PURE__ */ React14.createElement(Text13, { color: "cyan", bold: true }, variant.name)), /* @__PURE__ */ React14.createElement(Box13, { marginBottom: 2 }, /* @__PURE__ */ React14.createElement(Text13, { dimColor: true }, variant.description)), /* @__PURE__ */ React14.createElement(
    Box13,
    {
      flexDirection: "column",
      borderStyle: "double",
      borderColor: "cyan",
      paddingX: 2,
      paddingY: 1,
      marginBottom: 2
    },
    /* @__PURE__ */ React14.createElement(Box13, { marginBottom: 1 }, /* @__PURE__ */ React14.createElement(Text13, { color: "green", bold: true }, "Preview")),
    /* @__PURE__ */ React14.createElement(PreviewComponent, null)
  ), /* @__PURE__ */ React14.createElement(Box13, { marginBottom: 1 }, /* @__PURE__ */ React14.createElement(Text13, null, /* @__PURE__ */ React14.createElement(Text13, { color: "yellow" }, "Press 'i'"), /* @__PURE__ */ React14.createElement(Text13, null, " to ", accordionOpen ? "hide" : "show", " installation & usage details"))), accordionOpen && /* @__PURE__ */ React14.createElement(Box13, { flexDirection: "column", borderStyle: "round", paddingX: 2, paddingY: 1, marginBottom: 2 }, /* @__PURE__ */ React14.createElement(Box13, { flexDirection: "column", marginBottom: 2 }, /* @__PURE__ */ React14.createElement(Text13, { color: "green", bold: true }, "\u{1F4E6} Installation"), /* @__PURE__ */ React14.createElement(Box13, { marginTop: 1, paddingX: 1 }, /* @__PURE__ */ React14.createElement(Text13, { backgroundColor: "gray" }, variant.installCommand))), /* @__PURE__ */ React14.createElement(Box13, { flexDirection: "column", marginBottom: 2 }, /* @__PURE__ */ React14.createElement(Text13, { color: "green", bold: true }, "\u{1F4BB} Usage"), /* @__PURE__ */ React14.createElement(Box13, { marginTop: 1, paddingX: 1, flexDirection: "column" }, variant.usage.split("\n").map((line, idx) => /* @__PURE__ */ React14.createElement(Text13, { key: idx, dimColor: line.trim().startsWith("//") }, line)))), variant.props && Object.keys(variant.props).length > 0 && /* @__PURE__ */ React14.createElement(Box13, { flexDirection: "column" }, /* @__PURE__ */ React14.createElement(Text13, { color: "green", bold: true }, "\u2699\uFE0F  Props"), /* @__PURE__ */ React14.createElement(Box13, { marginTop: 1, flexDirection: "column" }, Object.entries(variant.props).map(([propName, propDef], idx) => /* @__PURE__ */ React14.createElement(Box13, { key: idx, marginY: 0, paddingX: 1 }, /* @__PURE__ */ React14.createElement(Text13, { color: "cyan" }, propName), /* @__PURE__ */ React14.createElement(Text13, null, ": "), /* @__PURE__ */ React14.createElement(Text13, { color: "yellow" }, propDef.type), propDef.required && /* @__PURE__ */ React14.createElement(Text13, { color: "red" }, " *"), propDef.default && /* @__PURE__ */ React14.createElement(React14.Fragment, null, /* @__PURE__ */ React14.createElement(Text13, { dimColor: true }, " = "), /* @__PURE__ */ React14.createElement(Text13, { dimColor: true }, propDef.default))))))), /* @__PURE__ */ React14.createElement(Box13, { marginTop: 1 }, /* @__PURE__ */ React14.createElement(Text13, { dimColor: true }, "Press Esc to go back \u2022 Press q to exit")));
};

// src/screens/ThemeSelectorScreen.tsx
import React15 from "react";
import { Box as Box14, Text as Text14 } from "ink";
import SelectInput3 from "ink-select-input";
var ThemeSelectorScreen = ({ onSelect, onBack }) => {
  const theme = getTheme();
  const themes2 = getThemeNames();
  const items = themes2.map((t) => ({
    label: t.name,
    value: t.id
  }));
  const handleSelect = (item) => {
    setTheme(item.value);
    onSelect(item.value);
  };
  return /* @__PURE__ */ React15.createElement(Box14, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React15.createElement(Box14, { marginBottom: 1 }, /* @__PURE__ */ React15.createElement(Text14, { color: theme.colors.primary, bold: true }, "\u{1F3A8} Choose Your Theme")), /* @__PURE__ */ React15.createElement(Box14, { marginBottom: 2 }, /* @__PURE__ */ React15.createElement(Text14, { dimColor: true }, "Select a theme to customize the entire UI")), /* @__PURE__ */ React15.createElement(Box14, { borderStyle: theme.borderStyle, borderColor: theme.colors.border, paddingX: 2, paddingY: 1 }, /* @__PURE__ */ React15.createElement(SelectInput3, { items, onSelect: handleSelect })), /* @__PURE__ */ React15.createElement(Box14, { marginTop: 2 }, /* @__PURE__ */ React15.createElement(Text14, { dimColor: true }, "Navigate with \u2191\u2193 \u2022 Select with Enter \u2022 Back with Esc")));
};

// src/screens/ThemeShowcaseScreen.tsx
import React16, { useState as useState8 } from "react";
import { Box as Box15, Text as Text15, useInput as useInput7 } from "ink";
var ThemeShowcaseScreen = ({ onBack }) => {
  const currentTheme2 = getTheme();
  const themes2 = getAvailableThemes();
  const [selectedThemeIndex, setSelectedThemeIndex] = useState8(
    themes2.findIndex((t) => t.name === currentTheme2.name)
  );
  const [showInstallInfo, setShowInstallInfo] = useState8(false);
  const selectedTheme = themes2[selectedThemeIndex];
  useInput7((input, key) => {
    if (key.upArrow || input === "k") {
      setSelectedThemeIndex((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow || input === "j") {
      setSelectedThemeIndex((prev) => Math.min(themes2.length - 1, prev + 1));
    } else if (key.return || input === " ") {
      setTheme(selectedTheme.name);
    } else if (input === "i" || input === "I") {
      setShowInstallInfo(!showInstallInfo);
    } else if (key.escape || input === "q" || input === "Q") {
      onBack();
    }
  });
  return /* @__PURE__ */ React16.createElement(Box15, { flexDirection: "column", padding: 1 }, /* @__PURE__ */ React16.createElement(Box15, { borderStyle: "double", borderColor: "cyan", paddingX: 2, paddingY: 1, marginBottom: 1 }, /* @__PURE__ */ React16.createElement(Text15, { bold: true, color: "cyan" }, "\u{1F3A8} Theme Showcase & Installer")), /* @__PURE__ */ React16.createElement(Box15, { marginBottom: 1 }, /* @__PURE__ */ React16.createElement(Text15, { dimColor: true }, "Select a theme to preview and install")), /* @__PURE__ */ React16.createElement(Box15, { flexDirection: "row", marginBottom: 2 }, /* @__PURE__ */ React16.createElement(Box15, { flexDirection: "column", width: 30, marginRight: 2 }, /* @__PURE__ */ React16.createElement(Box15, { borderStyle: "round", borderColor: currentTheme2.colors.border, paddingX: 1, marginBottom: 1 }, /* @__PURE__ */ React16.createElement(Text15, { bold: true }, "Available Themes")), themes2.map((theme, index) => {
    const isSelected = index === selectedThemeIndex;
    const isCurrent = theme.name === currentTheme2.name;
    return /* @__PURE__ */ React16.createElement(Box15, { key: theme.name, marginBottom: 0 }, /* @__PURE__ */ React16.createElement(Text15, { color: isSelected ? "cyan" : "white", bold: isSelected }, isSelected ? "\u25B8 " : "  ", theme.name, isCurrent && " \u2713"));
  })), /* @__PURE__ */ React16.createElement(Box15, { flexDirection: "column", borderStyle: "round", borderColor: selectedTheme.colors.border, paddingX: 2, paddingY: 1, flexGrow: 1 }, /* @__PURE__ */ React16.createElement(Box15, { marginBottom: 1 }, /* @__PURE__ */ React16.createElement(Text15, { bold: true, color: selectedTheme.colors.primary }, selectedTheme.name, " Theme Preview")), /* @__PURE__ */ React16.createElement(Box15, { marginBottom: 1 }, /* @__PURE__ */ React16.createElement(Text15, { bold: true }, "Colors:")), /* @__PURE__ */ React16.createElement(Box15, { marginBottom: 1 }, /* @__PURE__ */ React16.createElement(Text15, { color: selectedTheme.colors.primary }, "Primary"), /* @__PURE__ */ React16.createElement(Text15, null, " "), /* @__PURE__ */ React16.createElement(Text15, { color: selectedTheme.colors.secondary }, "Secondary"), /* @__PURE__ */ React16.createElement(Text15, null, " "), /* @__PURE__ */ React16.createElement(Text15, { color: selectedTheme.colors.success }, "Success"), /* @__PURE__ */ React16.createElement(Text15, null, " "), /* @__PURE__ */ React16.createElement(Text15, { color: selectedTheme.colors.warning }, "Warning"), /* @__PURE__ */ React16.createElement(Text15, null, " "), /* @__PURE__ */ React16.createElement(Text15, { color: selectedTheme.colors.error }, "Error")), /* @__PURE__ */ React16.createElement(Box15, { marginBottom: 1 }, /* @__PURE__ */ React16.createElement(Text15, { bold: true }, "Components:")), /* @__PURE__ */ React16.createElement(Box15, { marginBottom: 1 }, /* @__PURE__ */ React16.createElement(SimpleButton, { label: "Button Example" })), /* @__PURE__ */ React16.createElement(Box15, { marginBottom: 1 }, /* @__PURE__ */ React16.createElement(LinearProgress, { value: 75, max: 100, animated: false })), /* @__PURE__ */ React16.createElement(Box15, { marginBottom: 1 }, /* @__PURE__ */ React16.createElement(StatusBadge, { status: "success" }), /* @__PURE__ */ React16.createElement(Text15, null, "  "), /* @__PURE__ */ React16.createElement(StatusBadge, { status: "warning" }), /* @__PURE__ */ React16.createElement(Text15, null, "  "), /* @__PURE__ */ React16.createElement(StatusBadge, { status: "error" })), /* @__PURE__ */ React16.createElement(Box15, { marginTop: 1 }, /* @__PURE__ */ React16.createElement(Text15, { bold: true }, "Border Style: "), /* @__PURE__ */ React16.createElement(Text15, { color: selectedTheme.colors.secondary }, selectedTheme.borderStyle)))), showInstallInfo && /* @__PURE__ */ React16.createElement(Box15, { borderStyle: "round", borderColor: "yellow", paddingX: 2, paddingY: 1, marginBottom: 1, flexDirection: "column" }, /* @__PURE__ */ React16.createElement(Text15, { bold: true, color: "yellow" }, "\u{1F4E6} Installation Instructions"), /* @__PURE__ */ React16.createElement(Box15, { marginTop: 1 }, /* @__PURE__ */ React16.createElement(Text15, { dimColor: true }, "To use this theme in your code:")), /* @__PURE__ */ React16.createElement(Box15, { marginTop: 1, flexDirection: "column" }, /* @__PURE__ */ React16.createElement(Text15, { color: "cyan" }, "import ", "{ setTheme }", " from 'siddcn';"), /* @__PURE__ */ React16.createElement(Text15, { color: "green" }, "setTheme('", selectedTheme.name, "');")), /* @__PURE__ */ React16.createElement(Box15, { marginTop: 1 }, /* @__PURE__ */ React16.createElement(Text15, { dimColor: true }, "Or in your component:")), /* @__PURE__ */ React16.createElement(Box15, { marginTop: 1, flexDirection: "column" }, /* @__PURE__ */ React16.createElement(Text15, { color: "cyan" }, "import ", "{ getTheme }", " from 'siddcn';"), /* @__PURE__ */ React16.createElement(Text15, { color: "green" }, "const theme = getTheme();"), /* @__PURE__ */ React16.createElement(Text15, { color: "magenta" }, "// All components auto-update!"))), /* @__PURE__ */ React16.createElement(Box15, { marginBottom: 1 }, /* @__PURE__ */ React16.createElement(Text15, { dimColor: true }, "Current theme: "), /* @__PURE__ */ React16.createElement(Text15, { bold: true, color: currentTheme2.colors.primary }, currentTheme2.name), /* @__PURE__ */ React16.createElement(Text15, { dimColor: true }, " | Selected: "), /* @__PURE__ */ React16.createElement(Text15, { bold: true, color: selectedTheme.colors.primary }, selectedTheme.name)), /* @__PURE__ */ React16.createElement(Box15, { borderStyle: "single", borderColor: currentTheme2.colors.border, paddingX: 2 }, /* @__PURE__ */ React16.createElement(Text15, { dimColor: true }, "\u2191\u2193 Navigate   Enter Apply   i Install Info   q Back")));
};

// src/App.tsx
var App = ({ onExit }) => {
  const [state, setState] = useState9({
    screen: "loader",
    accordionOpen: false
  });
  useInput8((input, key) => {
    if (input === "q" && state.screen !== "loader") {
      onExit?.();
      process.exit(0);
    }
    if ((input === "t" || input === "T") && state.screen !== "loader" && state.screen !== "theme-showcase") {
      setState((prev) => ({ ...prev, screen: "theme-showcase" }));
    }
    if (key.escape) {
      handleBack();
    }
  });
  const handleLoaderComplete = () => {
    setState((prev) => ({ ...prev, screen: "showcase" }));
  };
  const handleShowcaseSelect = (categoryId) => {
    setState((prev) => ({
      ...prev,
      screen: "category",
      selectedCategory: categoryId
    }));
  };
  const handleThemeShowcaseOpen = () => {
    setState((prev) => ({ ...prev, screen: "theme-showcase" }));
  };
  const handleCategorySelect = (categoryId) => {
    setState((prev) => ({
      ...prev,
      screen: "category",
      selectedCategory: categoryId
    }));
  };
  const handleVariantSelect = (variantId) => {
    setState((prev) => ({
      ...prev,
      screen: "component-detail",
      selectedVariant: variantId,
      accordionOpen: false
    }));
  };
  const handleToggleAccordion = () => {
    setState((prev) => ({
      ...prev,
      accordionOpen: !prev.accordionOpen
    }));
  };
  const handleThemeSelect = (themeName) => {
    setState((prev) => ({ ...prev, screen: "showcase" }));
  };
  const handleBack = () => {
    setState((prev) => {
      switch (prev.screen) {
        case "theme-selector":
          return { ...prev, screen: "showcase" };
        case "theme-showcase":
          return { ...prev, screen: "showcase" };
        case "component-detail":
          return { ...prev, screen: "category", selectedVariant: void 0, accordionOpen: false };
        case "category":
          return { ...prev, screen: "showcase", selectedCategory: void 0 };
        case "showcase":
          return prev;
        // Can't go back from showcase
        default:
          return prev;
      }
    });
  };
  switch (state.screen) {
    case "loader":
      return /* @__PURE__ */ React17.createElement(LoaderScreen, { onComplete: handleLoaderComplete });
    case "showcase":
      return /* @__PURE__ */ React17.createElement(
        ShowcaseMenuScreen,
        {
          onSelect: handleShowcaseSelect,
          onThemeSelect: handleThemeShowcaseOpen
        }
      );
    case "theme-selector":
      return /* @__PURE__ */ React17.createElement(ThemeSelectorScreen, { onSelect: handleThemeSelect, onBack: handleBack });
    case "theme-showcase":
      return /* @__PURE__ */ React17.createElement(ThemeShowcaseScreen, { onBack: handleBack });
    case "main-menu":
      return /* @__PURE__ */ React17.createElement(MainMenuScreen, { onSelect: handleCategorySelect });
    case "category":
      if (!state.selectedCategory) return null;
      return /* @__PURE__ */ React17.createElement(
        CategoryScreen,
        {
          categoryId: state.selectedCategory,
          onSelect: handleVariantSelect,
          onBack: handleBack
        }
      );
    case "component-detail":
      if (!state.selectedCategory || !state.selectedVariant) return null;
      return /* @__PURE__ */ React17.createElement(
        ComponentDetailScreen,
        {
          categoryId: state.selectedCategory,
          variantId: state.selectedVariant,
          accordionOpen: state.accordionOpen,
          onToggleAccordion: handleToggleAccordion,
          onBack: handleBack
        }
      );
    default:
      return null;
  }
};

// src/server.ts
var { Server } = ssh2;
var PORT = process.env.SSH_PORT ? parseInt(process.env.SSH_PORT) : 2222;
var HOST_KEY = process.env.SSH_HOST_KEY || path.join(process.cwd(), "host.key");
var hostKey;
try {
  hostKey = fs.readFileSync(HOST_KEY);
  console.log("\u2705 Loaded existing host key");
} catch (err) {
  hostKey = Buffer.from(`-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA3jKWLqRV8VnKN+GWwqJAWZvP6LWxLfpCWB0aF4yqTcQUzKm5
-----END RSA PRIVATE KEY-----`);
}
var server = new Server(
  {
    hostKeys: [hostKey]
  },
  (client) => {
    console.log("\u{1F4E1} Client connected");
    client.on("authentication", (ctx) => {
      if (ctx.method === "password") {
        ctx.accept();
      } else if (ctx.method === "none") {
        ctx.accept();
      } else {
        ctx.reject();
      }
    }).on("ready", () => {
      console.log("\u2705 Client authenticated");
      client.on("session", (accept) => {
        const session = accept();
        let cols = 80;
        let rows = 24;
        session.once("pty", (accept2, reject, info) => {
          cols = info.cols || 80;
          rows = info.rows || 24;
          accept2?.();
        });
        session.on("shell", (accept2) => {
          console.log("\u{1F41A} Shell requested");
          const stream = accept2();
          const wrapStream = (baseStream) => {
            const wrapped = Object.create(baseStream);
            wrapped.isTTY = true;
            wrapped.columns = cols;
            wrapped.rows = rows;
            wrapped.setRawMode = (mode) => {
              return wrapped;
            };
            wrapped.write = (data, encoding, cb) => {
              let chunk = data;
              if (Buffer.isBuffer(data)) {
                chunk = data.toString("utf8");
              }
              if (typeof chunk === "string") {
                chunk = chunk.replace(/\n/g, "\r\n");
              }
              return baseStream.write(chunk, encoding, cb);
            };
            wrapped.ref = () => wrapped;
            wrapped.unref = () => wrapped;
            return wrapped;
          };
          const stdin = wrapStream(stream);
          const stdout = wrapStream(stream);
          try {
            const inkInstance = render(
              React18.createElement(App, {
                onExit: () => {
                  stream.exit(0);
                  stream.end();
                }
              }),
              {
                stdout,
                stdin,
                stderr: stdout,
                exitOnCtrlC: true,
                patchConsole: false
              }
            );
            session.on("window-change", (accept3, reject, info) => {
              cols = info.cols || 80;
              rows = info.rows || 24;
              stdin.columns = cols;
              stdin.rows = rows;
              stdout.columns = cols;
              stdout.rows = rows;
            });
            stream.on("close", () => {
              console.log("\u{1F50C} Stream closed");
              inkInstance.unmount();
            });
          } catch (error) {
            console.error("Error rendering Ink app:", error);
            stream.exit(1);
            stream.end();
          }
        });
      });
    }).on("end", () => {
      console.log("\u{1F44B} Client disconnected");
    }).on("error", (err) => {
      console.error("\u274C Client error:", err.message);
    });
  }
);
server.listen(PORT, "0.0.0.0", () => {
  console.log(`\u{1F4E1} Listening on port ${PORT}`);
  console.log("");
  console.log("Connect with:");
  console.log(`   ssh localhost -p ${PORT}`);
  console.log("");
  console.log("\u{1F4A1} Tips:");
  console.log("   - Use any username/password (demo mode)");
  console.log("   - Press Ctrl+C or q to exit");
  console.log("   - Navigate with \u2191\u2193 or j/k");
  console.log("");
  console.log("\u26A0\uFE0F  Note: Host key location:", HOST_KEY);
  console.log("");
});
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\u274C Port ${PORT} is already in use`);
    console.error(
      "   Try a different port: SSH_PORT=3333 npm run start:server"
    );
  } else {
    console.error("\u274C Server error:", err.message);
  }
  process.exit(1);
});
process.on("SIGINT", () => {
  console.log("\n\n\u{1F44B} Shutting down SSH server...");
  server.close(() => {
    console.log("\u2705 Server closed");
    process.exit(0);
  });
});
process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
//# sourceMappingURL=server.js.map
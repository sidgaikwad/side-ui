/**
 * screens/tabs.js
 * Tabbed interface component demo.
 * 3 tabs with different content. Switch with ← →.
 * Each tab demonstrates a different kind of content layout.
 */

"use strict";

const { colors, visibleLength } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── TAB DEFINITIONS ──────────────────────────────────────────────────────────

const TABS = [
  {
    label: "Overview",
    icon: "◎",
    renderContent: (cols) => {
      const lines = [];
      lines.push("");

      // A mini summary card
      lines.push(
        centerBlock([colors.bold(colors.white("Project Summary"))], cols)[0],
      );
      lines.push("");

      const summaryItems = [
        { key: "Project", value: "TermUI", color: colors.cyan },
        { key: "Version", value: "v1.0.0", color: colors.green },
        { key: "License", value: "MIT", color: colors.yellow },
        { key: "Runtime", value: "Node.js 18+", color: colors.blue },
        { key: "Protocol", value: "SSH", color: colors.magenta },
        { key: "Components", value: "13", color: colors.cyan },
      ];

      for (const item of summaryItems) {
        const keyPadded = item.key.padEnd(12);
        lines.push(
          centerBlock(
            [
              colors.dim(colors.gray(keyPadded)) +
                item.color(colors.bold(item.value)),
            ],
            cols,
          )[0],
        );
      }

      lines.push("");
      lines.push(
        centerBlock([colors.dim(colors.gray("─".repeat(36)))], cols)[0],
      );
      lines.push("");
      lines.push(
        centerBlock(
          [colors.dim(colors.gray("A terminal UI component library"))],
          cols,
        )[0],
      );
      lines.push(
        centerBlock(
          [colors.dim(colors.gray("accessible via SSH from anywhere."))],
          cols,
        )[0],
      );

      return lines;
    },
  },
  {
    label: "Features",
    icon: "◆",
    renderContent: (cols) => {
      const lines = [];
      lines.push("");

      const features = [
        {
          icon: "✓",
          label: "SSH-based access",
          desc: "Connect from any terminal",
        },
        {
          icon: "✓",
          label: "Multi-user isolation",
          desc: "Each session is independent",
        },
        {
          icon: "✓",
          label: "Animated components",
          desc: "Spinners, progress, charts",
        },
        {
          icon: "✓",
          label: "Interactive inputs",
          desc: "Text fields, selects, trees",
        },
        {
          icon: "✓",
          label: "Responsive layout",
          desc: "Adapts to terminal size",
        },
        {
          icon: "✓",
          label: "Color theming",
          desc: "Rich ANSI 256-color support",
        },
        {
          icon: "✓",
          label: "Zero dependencies*",
          desc: "Only ssh2 package needed",
        },
        { icon: "✓", label: "Cross-platform", desc: "Works on any SSH client" },
      ];

      for (const feat of features) {
        lines.push(
          centerBlock(
            [
              colors.green(colors.bold(feat.icon)) +
                "  " +
                colors.white(feat.label.padEnd(28)) +
                colors.dim(colors.gray(feat.desc)),
            ],
            cols,
          )[0],
        );
        lines.push("");
      }

      lines.push(
        centerBlock(
          [colors.dim(colors.gray("* ssh2 is the only npm dependency"))],
          cols,
        )[0],
      );

      return lines;
    },
  },
  {
    label: "Credits",
    icon: "◉",
    renderContent: (cols) => {
      const lines = [];
      lines.push("");

      lines.push(
        centerBlock([colors.bold(colors.white("Built with"))], cols)[0],
      );
      lines.push("");

      const techs = [
        { name: "Node.js", role: "Runtime", icon: "⬡", color: colors.green },
        { name: "ssh2", role: "SSH Server", icon: "◎", color: colors.cyan },
        {
          name: "ANSI Escapes",
          role: "Terminal Rendering",
          icon: "◈",
          color: colors.magenta,
        },
        {
          name: "EventEmitter",
          role: "Input Events",
          icon: "◌",
          color: colors.yellow,
        },
        {
          name: "setInterval",
          role: "Animation Loop",
          icon: "◐",
          color: colors.blue,
        },
      ];

      for (const tech of techs) {
        lines.push(
          centerBlock(
            [
              tech.color(tech.icon) +
                "  " +
                colors.bold(colors.white(tech.name.padEnd(20))) +
                colors.dim(colors.gray(tech.role)),
            ],
            cols,
          )[0],
        );
      }

      lines.push("");
      lines.push(
        centerBlock([colors.dim(colors.gray("─".repeat(36)))], cols)[0],
      );
      lines.push("");
      lines.push(
        centerBlock(
          [colors.dim(colors.gray("Open source. Built for developers"))],
          cols,
        )[0],
      );
      lines.push(
        centerBlock(
          [colors.dim(colors.gray("who love the terminal."))],
          cols,
        )[0],
      );

      return lines;
    },
  },
];

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      activeTab: 0,
    };
  },

  handleInput(session, event) {
    const state = session.screenState;

    switch (event.type) {
      case "LEFT":
        state.activeTab = Math.max(0, state.activeTab - 1);
        session.render();
        break;

      case "RIGHT":
        state.activeTab = Math.min(TABS.length - 1, state.activeTab + 1);
        session.render();
        break;

      case "TAB":
        // Tab key cycles through tabs
        state.activeTab = (state.activeTab + 1) % TABS.length;
        session.render();
        break;

      case "ESCAPE":
        session.navigate("menu");
        break;

      case "CTRL_C":
        session.destroy();
        break;
    }

    if (event.type === "CHAR" && (event.char === "q" || event.char === "Q")) {
      session.navigate("menu");
    }
  },

  render(session) {
    const { cols } = session;
    const state = session.screenState;
    const lines = [];

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock(
        [colors.bold(colors.cyan("── Tabbed Interface ──"))],
        cols,
      )[0],
    );
    lines.push("");

    // ── Tab Bar ──
    // Build the tab bar as a single line
    let tabBar = "  ";

    for (let i = 0; i < TABS.length; i++) {
      const tab = TABS[i];
      const isActive = i === state.activeTab;

      if (isActive) {
        // Active tab: bold, colored, with underline indicator
        tabBar += colors.bold(colors.cyan(`${tab.icon} ${tab.label}`));
      } else {
        // Inactive tab: dim
        tabBar += colors.dim(colors.gray(`${tab.icon} ${tab.label}`));
      }

      // Separator between tabs
      if (i < TABS.length - 1) {
        tabBar += colors.dim(colors.gray("  │  "));
      }
    }

    lines.push(centerBlock([tabBar], cols)[0]);

    // Tab indicator line (underline under the active tab)
    // Build a line of spaces + underline under the active tab
    let indicatorLine = "  ";
    for (let i = 0; i < TABS.length; i++) {
      const tab = TABS[i];
      const isActive = i === state.activeTab;
      const tabWidth = tab.icon.length + 1 + tab.label.length; // icon + space + label

      if (isActive) {
        indicatorLine += colors.cyan("─".repeat(tabWidth));
      } else {
        indicatorLine += " ".repeat(tabWidth);
      }

      if (i < TABS.length - 1) {
        indicatorLine += "     "; // same width as separator "  │  "
      }
    }

    lines.push(centerBlock([indicatorLine], cols)[0]);
    lines.push("");

    // ── Active Tab Content ──
    const activeTab = TABS[state.activeTab];
    const contentLines = activeTab.renderContent(cols);
    for (const line of contentLines) {
      lines.push(line);
    }

    // ── Footer ──
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(40)))], cols)[0]);
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("← → Switch tabs   Tab Cycle   q Back"))],
        cols,
      )[0],
    );

    return lines.join("\n");
  },
};

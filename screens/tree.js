/**
 * screens/tree.js
 * Collapsible tree view component demo.
 * Simulates a file-system-like hierarchy.
 * Users navigate, expand, and collapse nodes.
 */

"use strict";

const { colors } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── TREE DATA STRUCTURE ──────────────────────────────────────────────────────
// Each node: { name, type: 'dir'|'file', children?, meta? }

const TREE_DATA = {
  name: "my-project",
  type: "dir",
  children: [
    {
      name: "src",
      type: "dir",
      children: [
        {
          name: "components",
          type: "dir",
          children: [
            { name: "App.tsx", type: "file", meta: "2.4 KB" },
            { name: "Header.tsx", type: "file", meta: "1.1 KB" },
            { name: "Footer.tsx", type: "file", meta: "0.8 KB" },
            { name: "Sidebar.tsx", type: "file", meta: "1.6 KB" },
          ],
        },
        {
          name: "hooks",
          type: "dir",
          children: [
            { name: "useAuth.ts", type: "file", meta: "1.2 KB" },
            { name: "useFetch.ts", type: "file", meta: "0.9 KB" },
          ],
        },
        {
          name: "utils",
          type: "dir",
          children: [
            { name: "api.ts", type: "file", meta: "2.1 KB" },
            { name: "helpers.ts", type: "file", meta: "1.4 KB" },
            { name: "constants.ts", type: "file", meta: "0.6 KB" },
          ],
        },
        { name: "index.ts", type: "file", meta: "0.2 KB" },
        { name: "App.css", type: "file", meta: "3.2 KB" },
      ],
    },
    {
      name: "public",
      type: "dir",
      children: [
        { name: "index.html", type: "file", meta: "1.0 KB" },
        { name: "favicon.ico", type: "file", meta: "16 KB" },
        { name: "manifest.json", type: "file", meta: "0.3 KB" },
      ],
    },
    {
      name: "tests",
      type: "dir",
      children: [
        { name: "App.test.tsx", type: "file", meta: "2.8 KB" },
        { name: "setup.ts", type: "file", meta: "0.4 KB" },
      ],
    },
    { name: "package.json", type: "file", meta: "1.8 KB" },
    { name: "tsconfig.json", type: "file", meta: "0.5 KB" },
    { name: "vite.config.ts", type: "file", meta: "0.3 KB" },
    { name: ".env", type: "file", meta: "0.1 KB" },
    { name: "README.md", type: "file", meta: "2.2 KB" },
  ],
};

// ─── TREE FLATTENING ─────────────────────────────────────────────────────────
// We flatten the tree into a visible list based on which nodes are expanded.
// Each flat item carries: { node, depth, isDir, expanded (bool for dirs) }

function flattenTree(node, expandedSet, depth = 0) {
  const result = [];
  const nodeId = getNodeId(node, depth);

  result.push({
    node,
    depth,
    isDir: node.type === "dir",
    expanded: node.type === "dir" && expandedSet.has(nodeId),
    id: nodeId,
  });

  // If this dir is expanded and has children, recurse
  if (node.type === "dir" && expandedSet.has(nodeId) && node.children) {
    for (const child of node.children) {
      const childItems = flattenTree(child, expandedSet, depth + 1);
      result.push(...childItems);
    }
  }

  return result;
}

// Simple ID based on node name + depth (good enough for this demo)
function getNodeId(node, depth) {
  return `${depth}:${node.name}`;
}

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    // Start with the root and first-level dirs expanded
    const expanded = new Set();
    expanded.add(getNodeId(TREE_DATA, 0)); // root
    // Expand 'src' by default
    if (TREE_DATA.children) {
      for (const child of TREE_DATA.children) {
        if (child.name === "src") {
          expanded.add(getNodeId(child, 1));
        }
      }
    }

    return {
      cursor: 0,
      expanded: expanded, // Set of expanded node IDs
    };
  },

  handleInput(session, event) {
    const state = session.screenState;
    const flat = flattenTree(TREE_DATA, state.expanded);

    switch (event.type) {
      case "UP":
        state.cursor = Math.max(0, state.cursor - 1);
        session.render();
        break;

      case "DOWN":
        state.cursor = Math.min(flat.length - 1, state.cursor + 1);
        session.render();
        break;

      case "RIGHT":
        // Expand current node if it's a collapsed dir
        if (
          flat[state.cursor] &&
          flat[state.cursor].isDir &&
          !flat[state.cursor].expanded
        ) {
          state.expanded.add(flat[state.cursor].id);
        }
        session.render();
        break;

      case "LEFT":
        // Collapse current node if it's an expanded dir
        if (
          flat[state.cursor] &&
          flat[state.cursor].isDir &&
          flat[state.cursor].expanded
        ) {
          state.expanded.delete(flat[state.cursor].id);
        } else if (state.cursor > 0) {
          // If it's a file or already collapsed, move cursor up to parent
          state.cursor = Math.max(0, state.cursor - 1);
        }
        session.render();
        break;

      case "ENTER":
        // Toggle expand/collapse on dirs
        if (flat[state.cursor] && flat[state.cursor].isDir) {
          if (state.expanded.has(flat[state.cursor].id)) {
            state.expanded.delete(flat[state.cursor].id);
          } else {
            state.expanded.add(flat[state.cursor].id);
          }
        }
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
    const flat = flattenTree(TREE_DATA, state.expanded);
    const lines = [];

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock([colors.bold(colors.cyan("── Tree View ──"))], cols)[0],
    );
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("Collapsible file system hierarchy"))],
        cols,
      )[0],
    );
    lines.push("");

    // ── Stats ──
    const totalDirs = flat.filter((f) => f.isDir).length;
    const totalFiles = flat.filter((f) => !f.isDir).length;
    lines.push(
      centerBlock(
        [
          colors.dim(colors.gray("Showing ")) +
            colors.cyan(totalDirs) +
            colors.dim(colors.gray(" folders, ")) +
            colors.cyan(totalFiles) +
            colors.dim(colors.gray(" files")),
        ],
        cols,
      )[0],
    );
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(48)))], cols)[0]);
    lines.push("");

    // ── Tree lines ──
    // Determine how many rows we can show
    const maxVisibleRows = Math.max(8, session.rows - 10);
    let scrollTop = 0;
    if (state.cursor >= scrollTop + maxVisibleRows) {
      scrollTop = state.cursor - maxVisibleRows + 1;
    }
    if (state.cursor < scrollTop) {
      scrollTop = state.cursor;
    }

    const endRow = Math.min(flat.length, scrollTop + maxVisibleRows);

    for (let i = scrollTop; i < endRow; i++) {
      const item = flat[i];
      const isSelected = i === state.cursor;
      const depth = item.depth;

      // Indentation with tree guides
      let indent = "";
      // For depth > 0, show connector lines
      // Simple approach: just use spaces + a connector for the current depth
      for (let d = 1; d < depth; d++) {
        indent += colors.dim(colors.gray("│   "));
      }
      if (depth > 0) {
        indent += colors.dim(colors.gray("├── "));
      }

      // Icon
      let icon, name;
      if (item.isDir) {
        if (item.expanded) {
          icon = colors.cyan("▾ "); // open folder
          name = item.node.name;
        } else {
          icon = colors.cyan("▸ "); // closed folder
          name = item.node.name;
        }
      } else {
        icon = colors.dim(colors.gray("  "));
        name = item.node.name;
      }

      // Meta info (file size)
      const meta = item.node.meta
        ? colors.dim(colors.gray("  " + item.node.meta))
        : "";

      // Color by type
      let nameStyled;
      if (item.isDir) {
        nameStyled = isSelected
          ? colors.bold(colors.white(name))
          : colors.cyan(name);
      } else {
        // Color files by extension
        const ext = name.split(".").pop();
        let fileColor;
        switch (ext) {
          case "tsx":
          case "ts":
            fileColor = colors.blue;
            break;
          case "css":
            fileColor = colors.magenta;
            break;
          case "json":
            fileColor = colors.yellow;
            break;
          case "html":
            fileColor = colors.green;
            break;
          case "md":
            fileColor = colors.cyan;
            break;
          case "ico":
            fileColor = colors.red;
            break;
          default:
            fileColor = colors.gray;
        }
        nameStyled = isSelected
          ? colors.bold(colors.white(name))
          : fileColor(name);
      }

      let row;
      if (isSelected) {
        row =
          "  " +
          colors.cyan(colors.bold("> ")) +
          indent +
          icon +
          nameStyled +
          meta;
      } else {
        row = "  " + colors.dim("  ") + indent + icon + nameStyled + meta;
      }

      lines.push(row);
    }

    // ── Footer ──
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(48)))], cols)[0]);

    const currentItem = flat[state.cursor];
    if (currentItem) {
      lines.push(
        centerBlock(
          [
            colors.dim(colors.gray("Selected: ")) +
              (currentItem.isDir
                ? colors.cyan("📁 ")
                : colors.dim(colors.gray("📄 "))) +
              colors.white(currentItem.node.name),
          ],
          cols,
        )[0],
      );
    }

    lines.push("");
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray(
              "↑↓ Navigate   → Expand   ← Collapse   Enter Toggle   q Back",
            ),
          ),
        ],
        cols,
      )[0],
    );

    return lines.join("\n");
  },
};

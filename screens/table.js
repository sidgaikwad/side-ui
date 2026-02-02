/**
 * screens/table.js
 * A scrollable data table component demo.
 * Features: column headers, alternating row shading,
 * selected-row highlight, vertical scrolling.
 */

"use strict";

const { colors, visibleLength, padEnd } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── SAMPLE DATA ──────────────────────────────────────────────────────────────

const COLUMNS = [
  { key: "id", header: "ID", width: 5 },
  { key: "name", header: "Name", width: 18 },
  { key: "lang", header: "Language", width: 12 },
  { key: "stars", header: "Stars", width: 9 },
  { key: "status", header: "Status", width: 12 },
];

const DATA = [
  {
    id: "001",
    name: "express",
    lang: "JavaScript",
    stars: "64.2k",
    status: "active",
  },
  {
    id: "002",
    name: "react",
    lang: "JavaScript",
    stars: "218k",
    status: "active",
  },
  {
    id: "003",
    name: "vue",
    lang: "JavaScript",
    stars: "205k",
    status: "active",
  },
  { id: "004", name: "rust", lang: "Rust", stars: "88.1k", status: "active" },
  {
    id: "005",
    name: "flask",
    lang: "Python",
    stars: "66.3k",
    status: "active",
  },
  {
    id: "006",
    name: "django",
    lang: "Python",
    stars: "77.4k",
    status: "active",
  },
  {
    id: "007",
    name: "spring-boot",
    lang: "Java",
    stars: "72.1k",
    status: "active",
  },
  { id: "008", name: "rails", lang: "Ruby", stars: "56.0k", status: "stable" },
  { id: "009", name: "gin", lang: "Go", stars: "75.2k", status: "active" },
  {
    id: "010",
    name: "next.js",
    lang: "JavaScript",
    stars: "121k",
    status: "active",
  },
  {
    id: "011",
    name: "svelte",
    lang: "JavaScript",
    stars: "77.8k",
    status: "active",
  },
  {
    id: "012",
    name: "fastapi",
    lang: "Python",
    stars: "75.9k",
    status: "active",
  },
  {
    id: "013",
    name: "deno",
    lang: "TypeScript",
    stars: "42.1k",
    status: "beta",
  },
  {
    id: "014",
    name: "elixir",
    lang: "Elixir",
    stars: "24.8k",
    status: "stable",
  },
  {
    id: "015",
    name: "phoenix",
    lang: "Elixir",
    stars: "22.1k",
    status: "stable",
  },
  { id: "016", name: "laravel", lang: "PHP", stars: "77.0k", status: "active" },
  {
    id: "017",
    name: "kotlin",
    lang: "Kotlin",
    stars: "48.2k",
    status: "active",
  },
  {
    id: "018",
    name: "sveltekit",
    lang: "JavaScript",
    stars: "18.3k",
    status: "active",
  },
  {
    id: "019",
    name: "astro",
    lang: "TypeScript",
    stars: "41.5k",
    status: "active",
  },
  { id: "020", name: "bun", lang: "C++", stars: "72.4k", status: "beta" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function statusColor(status) {
  switch (status) {
    case "active":
      return colors.green;
    case "stable":
      return colors.cyan;
    case "beta":
      return colors.yellow;
    default:
      return colors.gray;
  }
}

function statusIcon(status) {
  switch (status) {
    case "active":
      return "● active";
    case "stable":
      return "● stable";
    case "beta":
      return "◐ beta  ";
    default:
      return "○ unknown";
  }
}

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      selected: 0,
      scrollTop: 0,
    };
  },

  handleInput(session, event) {
    const state = session.screenState;
    const maxRows = DATA.length - 1;

    switch (event.type) {
      case "UP":
        if (state.selected > 0) {
          state.selected--;
          // Scroll up if selection goes above visible area
          if (state.selected < state.scrollTop) {
            state.scrollTop = state.selected;
          }
        }
        session.render();
        break;

      case "DOWN":
        if (state.selected < maxRows) {
          state.selected++;
        }
        session.render();
        break;

      case "PAGE_UP":
        state.selected = Math.max(0, state.selected - 8);
        session.render();
        break;

      case "PAGE_DOWN":
        state.selected = Math.min(maxRows, state.selected + 8);
        session.render();
        break;

      case "HOME":
        state.selected = 0;
        state.scrollTop = 0;
        session.render();
        break;

      case "END":
        state.selected = maxRows;
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
    const { cols, rows } = session;
    const state = session.screenState;
    const lines = [];

    // How many data rows can we show? Reserve lines for header, title, footer
    const reservedLines = 7; // title(2) + header(2) + footer(3)
    const visibleRows = Math.max(4, rows - reservedLines);

    // Adjust scrollTop so selected row is always visible
    if (state.selected >= state.scrollTop + visibleRows) {
      state.scrollTop = state.selected - visibleRows + 1;
    }
    if (state.selected < state.scrollTop) {
      state.scrollTop = state.selected;
    }

    // Total table width
    const tableWidth =
      COLUMNS.reduce((sum, col) => sum + col.width, 0) +
      (COLUMNS.length - 1) * 3; // 3 for " │ " separators

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock([colors.bold(colors.cyan("── Data Table ──"))], cols)[0],
    );
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("Scrollable table with row selection"))],
        cols,
      )[0],
    );
    lines.push("");

    // ── Header row ──
    let headerParts = [];
    for (const col of COLUMNS) {
      headerParts.push(colors.bold(colors.cyan(padEnd(col.header, col.width))));
    }
    const headerLine = headerParts.join(colors.dim(colors.gray(" │ ")));

    // Separator
    let sepParts = [];
    for (let i = 0; i < COLUMNS.length; i++) {
      sepParts.push(colors.dim(colors.cyan("─".repeat(COLUMNS[i].width))));
    }
    const sepLine = sepParts.join(colors.dim(colors.cyan("─┼─")));

    lines.push(centerBlock([headerLine], cols)[0]);
    lines.push(centerBlock([sepLine], cols)[0]);

    // ── Data rows ──
    const endRow = Math.min(DATA.length, state.scrollTop + visibleRows);

    for (let i = state.scrollTop; i < endRow; i++) {
      const row = DATA[i];
      const isSelected = i === state.selected;
      const isEven = i % 2 === 0;

      let parts = [];
      for (const col of COLUMNS) {
        let cellValue = row[col.key];

        // Special rendering for status column
        if (col.key === "status") {
          cellValue = statusIcon(row.status);
        }

        const paddedCell = padEnd(cellValue, col.width);

        if (isSelected) {
          // Selected row: bold white
          parts.push(colors.bold(colors.white(paddedCell)));
        } else if (col.key === "status") {
          parts.push(statusColor(row.status)(paddedCell));
        } else if (col.key === "stars") {
          parts.push(colors.yellow(paddedCell));
        } else if (isEven) {
          parts.push(colors.white(paddedCell));
        } else {
          parts.push(colors.dim(colors.gray(paddedCell)));
        }
      }

      let rowLine;
      if (isSelected) {
        // Selected row indicator
        rowLine = colors.cyan("▸ ") + parts.join(colors.dim(" │ "));
      } else {
        rowLine = "  " + parts.join(colors.dim(" │ "));
      }

      lines.push(centerBlock([rowLine], cols)[0]);
    }

    // ── Footer ──
    lines.push("");
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray(
              `Row ${state.selected + 1} of ${DATA.length}  ·  Showing ${state.scrollTop + 1}–${endRow}`,
            ),
          ),
        ],
        cols,
      )[0],
    );
    lines.push("");
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray("↑↓ Navigate   PgUp/PgDn Scroll   Home/End   q Back"),
          ),
        ],
        cols,
      )[0],
    );

    return lines.join("\n");
  },
};

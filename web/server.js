import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const COMPONENTS = [
  {
    id: "buttons",
    name: "Buttons",
    description: "8 button variants with icons and themes",
    category: "Interactive",
    variants: 8,
  },
  {
    id: "progress",
    name: "Progress Bars",
    description: "6 animated progress bar styles",
    category: "Feedback",
    variants: 6,
  },
  {
    id: "spinners",
    name: "Spinners",
    description: "17 different loading animations",
    category: "Feedback",
    variants: 17,
  },
  {
    id: "tables",
    name: "Tables",
    description: "Data grid with sorting and selection",
    category: "Display",
    variants: 4,
  },
  {
    id: "cards",
    name: "Cards",
    description: "Content containers with multiple layouts",
    category: "Display",
    variants: 4,
  },
  {
    id: "badges",
    name: "Badges",
    description: "Status indicators and labels",
    category: "Display",
    variants: 12,
  },
  {
    id: "select",
    name: "Select",
    description: "Single-select dropdown component",
    category: "Forms",
    variants: 1,
  },
  {
    id: "multiselect",
    name: "Multi-Select",
    description: "Checkbox multi-select component",
    category: "Forms",
    variants: 1,
  },
  {
    id: "textinput",
    name: "Text Input",
    description: "Form input with validation",
    category: "Forms",
    variants: 1,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Tabbed interface component",
    category: "Navigation",
    variants: 4,
  },
  {
    id: "tree",
    name: "Tree",
    description: "Collapsible hierarchy view",
    category: "Display",
    variants: 1,
  },
  {
    id: "themes",
    name: "Themes",
    description: "6 color schemes",
    category: "Styling",
    variants: 6,
  },
];

const HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>siddcn - TUI Component Library</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #0a0e27 0%, #1a1a2e 100%);
      color: #e0e0e0;
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      margin-bottom: 60px;
      padding: 40px 20px;
      background: linear-gradient(135deg, #00a8e8, #00d9ff);
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 168, 232, 0.3);
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 10px;
      color: #000;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }

    .subtitle {
      font-size: 1.2rem;
      color: #000;
      opacity: 0.8;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 20px;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #000;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #000;
      opacity: 0.7;
    }

    .filter-bar {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.2);
      color: #e0e0e0;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.95rem;
    }

    .filter-btn:hover {
      background: rgba(0, 168, 232, 0.3);
      border-color: #00a8e8;
      transform: translateY(-2px);
    }

    .filter-btn.active {
      background: #00a8e8;
      color: #000;
      border-color: #00a8e8;
    }

    .components-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 25px;
      margin-bottom: 60px;
    }

    .component-card {
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 25px;
      transition: all 0.3s;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .component-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #00a8e8, #00d9ff);
      transform: scaleX(0);
      transition: transform 0.3s;
    }

    .component-card:hover::before {
      transform: scaleX(1);
    }

    .component-card:hover {
      transform: translateY(-5px);
      border-color: #00a8e8;
      box-shadow: 0 10px 30px rgba(0, 168, 232, 0.2);
    }

    .component-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 15px;
    }

    .component-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #00d9ff;
      margin-bottom: 5px;
    }

    .component-category {
      display: inline-block;
      padding: 5px 12px;
      background: rgba(0, 168, 232, 0.2);
      border-radius: 12px;
      font-size: 0.75rem;
      color: #00d9ff;
      font-weight: 600;
    }

    .component-description {
      color: #b0b0b0;
      line-height: 1.6;
      margin-bottom: 15px;
    }

    .component-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .variants {
      font-size: 0.9rem;
      color: #6BCF7F;
    }

    .install-btn {
      padding: 8px 16px;
      background: linear-gradient(135deg, #00a8e8, #00d9ff);
      color: #000;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.85rem;
    }

    .install-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(0, 168, 232, 0.4);
    }

    .code-snippet {
      background: rgba(0, 0, 0, 0.3);
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
      border-left: 4px solid #00a8e8;
      display: none;
    }

    .code-snippet.show {
      display: block;
    }

    .code {
      font-family: 'Courier New', monospace;
      color: #00ff41;
      font-size: 0.9rem;
    }

    footer {
      text-align: center;
      padding: 40px 20px;
      color: #6c757d;
    }

    footer a {
      color: #00d9ff;
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }

      .stats {
        flex-direction: column;
        gap: 20px;
      }

      .components-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>siddcn</h1>
      <p class="subtitle">Beautiful TUI Components for Terminal Applications</p>
      <div class="stats">
        <div class="stat">
          <div class="stat-number">${COMPONENTS.length}</div>
          <div class="stat-label">Components</div>
        </div>
        <div class="stat">
          <div class="stat-number">${COMPONENTS.reduce((acc, c) => acc + c.variants, 0)}</div>
          <div class="stat-label">Variants</div>
        </div>
        <div class="stat">
          <div class="stat-number">6</div>
          <div class="stat-label">Themes</div>
        </div>
      </div>
    </header>

    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="Interactive">Interactive</button>
      <button class="filter-btn" data-filter="Feedback">Feedback</button>
      <button class="filter-btn" data-filter="Display">Display</button>
      <button class="filter-btn" data-filter="Forms">Forms</button>
      <button class="filter-btn" data-filter="Navigation">Navigation</button>
      <button class="filter-btn" data-filter="Styling">Styling</button>
    </div>

    <div class="components-grid">
      ${COMPONENTS.map(
        (component) => `
        <div class="component-card" data-category="${component.category}">
          <div class="component-header">
            <div>
              <div class="component-name">${component.name}</div>
              <span class="component-category">${component.category}</span>
            </div>
          </div>
          <p class="component-description">${component.description}</p>
          <div class="component-meta">
            <span class="variants">${component.variants} variant${component.variants > 1 ? "s" : ""}</span>
            <button class="install-btn" onclick="showInstall('${component.id}')">
              Install
            </button>
          </div>
          <div class="code-snippet" id="code-${component.id}">
            <div class="code">$ siddcn add ${component.id}</div>
          </div>
        </div>
      `,
      ).join("")}
    </div>

    <footer>
      <p>Built with ❤️ using React Ink • Inspired by <a href="https://ui.shadcn.com" target="_blank">shadcn/ui</a></p>
      <p style="margin-top: 10px;">Run in terminal: <code style="color: #00ff41;">npx siddcn</code></p>
    </footer>
  </div>

  <script>
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.component-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Show install command
    function showInstall(id) {
      const codeBlock = document.getElementById('code-' + id);
      const allCodeBlocks = document.querySelectorAll('.code-snippet');
      
      allCodeBlocks.forEach(block => {
        if (block.id !== 'code-' + id) {
          block.classList.remove('show');
        }
      });
      
      codeBlock.classList.toggle('show');
    }
  </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(HTML_TEMPLATE);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`\n🌐 Web showcase running at http://localhost:${PORT}`);
  console.log(`📦 View all ${COMPONENTS.length} components in your browser\n`);
});

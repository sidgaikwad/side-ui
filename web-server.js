/**
 * web-server.js
 * Web interface for browsing and copying TermUI components
 * Run alongside the SSH server or standalone
 */

"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// ─── COMPONENT METADATA ───────────────────────────────────────────────────────

const COMPONENTS = [
  {
    id: "progress",
    name: "Progress Bar",
    category: "Animated",
    description:
      "Animated progress bars with multiple styles and color transitions",
    files: [
      "src/screens/progress.js",
      "src/ansi.js",
      "src/components/center.js",
    ],
    dependencies: [],
    preview: "[████████░░░░░░░░] 60%",
  },
  {
    id: "spinners",
    name: "Spinners",
    category: "Animated",
    description: "8 different loading spinner animations",
    files: [
      "src/screens/spinners.js",
      "src/ansi.js",
      "src/components/center.js",
    ],
    dependencies: [],
    preview: "⠋ Loading...",
  },
  {
    id: "buttons",
    name: "Buttons",
    category: "Interactive",
    description: "6 styled button variants with press animations",
    files: [
      "src/screens/buttons.js",
      "src/ansi.js",
      "src/components/border.js",
      "src/components/center.js",
    ],
    dependencies: [],
    preview: "[ ◉ Primary ]",
  },
  {
    id: "table",
    name: "Data Table",
    category: "Display",
    description: "Scrollable data table with row selection and sorting",
    files: ["src/screens/table.js", "src/ansi.js", "src/components/center.js"],
    dependencies: [],
    preview: "│ Row 1 │ Data │",
  },
  {
    id: "select",
    name: "Select List",
    category: "Interactive",
    description: "Single-select dropdown list with keyboard navigation",
    files: ["src/screens/select.js", "src/ansi.js", "src/components/center.js"],
    dependencies: [],
    preview: "▸ Option 1",
  },
  {
    id: "multiselect",
    name: "Multi-Select",
    category: "Interactive",
    description: "Checkbox multi-select with select all/none",
    files: [
      "src/screens/multiselect.js",
      "src/ansi.js",
      "src/components/center.js",
    ],
    dependencies: [],
    preview: "☑ Item A",
  },
  {
    id: "textinput",
    name: "Text Input",
    category: "Interactive",
    description: "Live text input field with cursor and validation",
    files: [
      "src/screens/textinput.js",
      "src/ansi.js",
      "src/components/center.js",
    ],
    dependencies: [],
    preview: "│ Type here... ▌",
  },
  {
    id: "tree",
    name: "Tree View",
    category: "Interactive",
    description: "Collapsible file system hierarchy",
    files: ["src/screens/tree.js", "src/ansi.js", "src/components/center.js"],
    dependencies: [],
    preview: "├── folder/",
  },
  {
    id: "chart",
    name: "Bar Chart",
    category: "Animated",
    description: "Live updating ASCII bar chart",
    files: ["src/screens/chart.js", "src/ansi.js", "src/components/center.js"],
    dependencies: [],
    preview: "▄▆█▅▃",
  },
  {
    id: "cards",
    name: "Cards",
    category: "Display",
    description: "Dashboard card/panel layouts",
    files: [
      "src/screens/cards.js",
      "src/ansi.js",
      "src/components/border.js",
      "src/components/center.js",
    ],
    dependencies: [],
    preview: "╭─Card─╮",
  },
  {
    id: "badges",
    name: "Badges",
    category: "Display",
    description: "Status badges and tags in various styles",
    files: [
      "src/screens/badges.js",
      "src/ansi.js",
      "src/components/center.js",
      "src/components/border.js",
    ],
    dependencies: [],
    preview: "[ Active ]",
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Interactive",
    description: "Tabbed interface with multiple content sections",
    files: ["src/screens/tabs.js", "src/ansi.js", "src/components/center.js"],
    dependencies: [],
    preview: "[ Tab 1 ]",
  },
];

// ─── HTTP SERVER ──────────────────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // ── Routes ──
  if (url.pathname === "/") {
    serveHTML(res);
  } else if (url.pathname === "/api/components") {
    serveJSON(res, COMPONENTS);
  } else if (url.pathname.startsWith("/api/component/")) {
    const id = url.pathname.split("/").pop();
    serveComponentCode(res, id);
  } else if (url.pathname.startsWith("/api/install/")) {
    const id = url.pathname.split("/").pop();
    serveInstallCommand(res, id);
  } else if (url.pathname.startsWith("/api/file/")) {
    const filePath = url.pathname.replace("/api/file/", "");
    serveFile(res, filePath);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// ─── HANDLERS ─────────────────────────────────────────────────────────────────

function serveFile(res, filePath) {
  // Basic security: prevent directory traversal
  const safePath = path
    .normalize(decodeURIComponent(filePath))
    .replace(/^(\.\.[\/\\])+/, "");
  const fullPath = path.join(__dirname, safePath);

  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    fs.createReadStream(fullPath).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File not found");
  }
}

function serveHTML(res) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TermUI Component Library</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Source Code Pro', monospace;
      background: linear-gradient(135deg, #0a0e1a 0%, #1a1e2e 100%);
      color: #e2e8f0;
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container { max-width: 1400px; margin: 0 auto; }
    
    header {
      text-align: center;
      margin-bottom: 60px;
      padding: 30px;
      background: rgba(255,255,255,0.03);
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    h1 {
      font-size: 48px;
      font-weight: 700;
      background: linear-gradient(90deg, #00ff88, #00bfff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    .subtitle {
      color: rgba(255,255,255,0.5);
      font-size: 16px;
    }
    
    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
      border-bottom: 2px solid rgba(255,255,255,0.1);
      padding-bottom: 10px;
    }
    .tab {
      padding: 10px 24px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.03);
      border-radius: 8px 8px 0 0;
      cursor: pointer;
      transition: all 0.3s;
      color: rgba(255,255,255,0.5);
    }
    .tab:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); }
    .tab.active {
      background: rgba(0,255,136,0.1);
      border-color: #00ff88;
      color: #00ff88;
      font-weight: 600;
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }
    
    .card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 24px;
      transition: all 0.3s;
      cursor: pointer;
    }
    .card:hover {
      transform: translateY(-4px);
      border-color: #00ff88;
      box-shadow: 0 8px 32px rgba(0,255,136,0.15);
    }
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .card-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,191,255,0.2));
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    .card-title {
      font-size: 20px;
      font-weight: 600;
      color: #fff;
    }
    .card-category {
      font-size: 11px;
      color: #00ff88;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .card-desc {
      color: rgba(255,255,255,0.6);
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .card-preview {
      background: rgba(0,0,0,0.3);
      padding: 12px;
      border-radius: 6px;
      font-family: monospace;
      color: #00ff88;
      font-size: 14px;
      margin-bottom: 16px;
      border: 1px solid rgba(255,255,255,0.05);
    }
    
    .card-actions {
      display: flex;
      gap: 10px;
    }
    .btn {
      flex: 1;
      padding: 10px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.2s;
      font-family: inherit;
    }
    .btn-primary {
      background: #00ff88;
      color: #0a0e1a;
    }
    .btn-primary:hover {
      background: #00cc6f;
      transform: scale(1.02);
    }
    .btn-secondary {
      background: rgba(255,255,255,0.08);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .btn-secondary:hover {
      background: rgba(255,255,255,0.12);
    }
    
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      z-index: 1000;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal.active { display: flex; }
    .modal-content {
      background: #1a1e2e;
      border-radius: 16px;
      padding: 32px;
      max-width: 800px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .modal-title {
      font-size: 24px;
      color: #fff;
    }
    .modal-close {
      background: none;
      border: none;
      color: rgba(255,255,255,0.5);
      font-size: 28px;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
    }
    .modal-close:hover { color: #fff; }
    
    pre {
      background: rgba(0,0,0,0.4);
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      border: 1px solid rgba(255,255,255,0.05);
      margin-bottom: 16px;
    }
    code {
      color: #00ff88;
      font-size: 13px;
      line-height: 1.6;
    }
    
    .ssh-connect {
      background: rgba(0,191,255,0.1);
      border: 1px solid rgba(0,191,255,0.3);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
    }
    .ssh-connect h3 {
      color: #00bfff;
      margin-bottom: 12px;
    }
    .ssh-connect code {
      background: rgba(0,0,0,0.3);
      padding: 12px 24px;
      border-radius: 6px;
      display: inline-block;
      color: #00bfff;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🐋 TermUI Component Library</h1>
      <p class="subtitle">Production-ready terminal UI components • Copy & paste into your project</p>
    </header>
    
    <div class="ssh-connect">
      <h3>Try Live Demo via SSH</h3>
      <code>ssh -p 2222 demo@localhost</code>
    </div>
    
    <br><br>
    
    <div class="tabs">
      <div class="tab active" data-category="all">All Components</div>
      <div class="tab" data-category="Interactive">Interactive</div>
      <div class="tab" data-category="Display">Display</div>
      <div class="tab" data-category="Animated">Animated</div>
    </div>
    
    <div class="grid" id="componentGrid"></div>
  </div>
  
  <div class="modal" id="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="modalTitle"></h2>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <div id="modalBody"></div>
    </div>
  </div>
  
  <script>
    let components = [];
    let activeCategory = 'all';
    
    // Fetch components
    fetch('/api/components')
      .then(r => r.json())
      .then(data => {
        components = data;
        renderGrid();
      });
    
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCategory = tab.dataset.category;
        renderGrid();
      });
    });
    
    function renderGrid() {
      const grid = document.getElementById('componentGrid');
      const filtered = activeCategory === 'all' 
        ? components 
        : components.filter(c => c.category === activeCategory);
      
      grid.innerHTML = filtered.map(comp => \`
        <div class="card" onclick="showComponent('\${comp.id}')">
          <div class="card-category">\${comp.category}</div>
          <div class="card-header">
            <div class="card-icon">\${getIcon(comp.category)}</div>
            <div class="card-title">\${comp.name}</div>
          </div>
          <div class="card-desc">\${comp.description}</div>
          <div class="card-preview">\${comp.preview}</div>
          <div class="card-actions">
            <button class="btn btn-primary" onclick="event.stopPropagation(); showInstall('\${comp.id}')">
              📦 Install
            </button>
            <button class="btn btn-secondary" onclick="event.stopPropagation(); showCode('\${comp.id}')">
              👁 View Code
            </button>
          </div>
        </div>
      \`).join('');
    }
    
    function getIcon(category) {
      const icons = {
        'Interactive': '◉',
        'Display': '◇',
        'Animated': '◌'
      };
      return icons[category] || '◈';
    }
    
    function showComponent(id) {
      showInstall(id);
    }
    
    function showInstall(id) {
      const comp = components.find(c => c.id === id);
      fetch('/api/install/' + id)
        .then(r => r.text())
        .then(installCmd => {
          document.getElementById('modalTitle').textContent = comp.name;
          // FIXED: Used data attribute to pass content to copyFromData
          // This avoids the confusing nested backtick escapes
          document.getElementById('modalBody').innerHTML = \`
            <h3>Installation</h3>
            <p style="color: rgba(255,255,255,0.6); margin-bottom: 16px;">
              Copy this command to install the \${comp.name} component in your project:
            </p>
            <pre><code>\${escapeHtml(installCmd)}</code></pre>
            <button class="btn btn-primary" data-copy="\${escapeHtml(installCmd)}" onclick="copyFromData(this)">
              📋 Copy Command
            </button>
            <br><br>
            <h3>Required Files</h3>
            <ul style="color: rgba(255,255,255,0.6); line-height: 2;">
              \${comp.files.map(f => '<li><code>' + f + '</code></li>').join('')}
            </ul>
          \`;
          document.getElementById('modal').classList.add('active');
        });
    }
    
    function showCode(id) {
      const comp = components.find(c => c.id === id);
      fetch('/api/component/' + id)
        .then(r => r.json())
        .then(data => {
          document.getElementById('modalTitle').textContent = comp.name + ' - Source Code';
          document.getElementById('modalBody').innerHTML = \`
            \${Object.entries(data).map(([file, code]) => \`
              <h3>\${file}</h3>
              <pre><code>\${escapeHtml(code)}</code></pre>
              <button class="btn btn-secondary" data-copy="\${escapeHtml(code)}" onclick="copyFromData(this)">
                📋 Copy Code
              </button>
              <br><br>
            \`).join('')}
          \`;
          document.getElementById('modal').classList.add('active');
        });
    }
    
    function closeModal() {
      document.getElementById('modal').classList.remove('active');
    }
    
    function copyFromData(btn) {
      const text = btn.dataset.copy;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => btn.textContent = originalText, 2000);
      });
    }
    
    function escapeHtml(text) {
      return text.replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m]));
    }
    
    // Close modal on escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
    
    // Close modal on background click
    document.getElementById('modal').addEventListener('click', e => {
      if (e.target.id === 'modal') closeModal();
    });
  </script>
</body>
</html>`;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

function serveJSON(res, data) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function serveComponentCode(res, id) {
  const comp = COMPONENTS.find((c) => c.id === id);
  if (!comp) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Component not found");
    return;
  }

  const code = {};
  for (const file of comp.files) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      code[file] = fs.readFileSync(fullPath, "utf8");
    }
  }

  serveJSON(res, code);
}

function serveInstallCommand(res, id) {
  const comp = COMPONENTS.find((c) => c.id === id);
  if (!comp) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Component not found");
    return;
  }

  // Create dirs flag ensures the target directories exist
  const installCmd = `# Install ${comp.name}
# Run this in your project root:
${comp.files.map((f) => `curl --create-dirs http://localhost:${PORT}/api/file/${f} -o ${f}`).join("\n")}`;

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(installCmd);
}

// ─── START ────────────────────────────────────────────────────────────────────

server.listen(PORT, () => {
  console.log("");
  console.log("  ╔════════════════════════════════════════╗");
  console.log("  ║   TermUI Web Interface                 ║");
  console.log("  ╚════════════════════════════════════════╝");
  console.log("");
  console.log(`  ✓ Running at http://localhost:${PORT}`);
  console.log("");
});

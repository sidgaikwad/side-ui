import { Navigation } from "../components/Navigation";

export default function ThemesPage() {
  const themes = [
    {
      name: "Tokyo Night",
      description: "Dark theme with purple and cyan accents",
      colors: ["#1a1b26", "#7dcfff", "#bb9af7", "#9ece6a"],
    },
    {
      name: "Catppuccin",
      description: "Warm pastel theme with soft colors",
      colors: ["#1e1e2e", "#cba6f7", "#f5c2e7", "#a6e3a1"],
    },
    {
      name: "Dracula",
      description: "Classic dark theme with vibrant accents",
      colors: ["#282a36", "#bd93f9", "#ff79c6", "#50fa7b"],
    },
    {
      name: "Nord",
      description: "Cool, arctic-inspired color palette",
      colors: ["#2e3440", "#88c0d0", "#81a1c1", "#a3be8c"],
    },
    {
      name: "Gruvbox",
      description: "Retro groove theme with warm colors",
      colors: ["#282828", "#fabd2f", "#fe8019", "#b8bb26"],
    },
    {
      name: "One Dark",
      description: "Atom-inspired dark theme",
      colors: ["#282c34", "#61afef", "#c678dd", "#98c379"],
    },
  ];

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Navigation />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white">Themes</h1>
          <p className="mt-4 text-lg text-white/60">
            Siddcn comes with 6 beautiful built-in themes and supports custom theming.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {themes.map((theme) => (
            <div
              key={theme.name}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-white/10 hover:bg-white/[0.04]"
            >
              <h3 className="text-lg font-semibold text-white">{theme.name}</h3>
              <p className="mt-1 text-sm text-white/50">{theme.description}</p>
              <div className="mt-4 flex gap-2">
                {theme.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="h-8 w-8 rounded-lg border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="text-lg font-semibold text-white">Switching Themes</h2>
          <p className="mt-2 text-sm text-white/50">
            Press <kbd className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs text-white">t</kbd> while 
            in the CLI to cycle through themes, or navigate to the Theme Selector from the main menu.
          </p>

          <div className="code-block mt-4 p-4 font-mono text-sm">
            <code className="text-white/60">{"// Programmatic usage"}</code>
            <br />
            <code className="text-emerald-400">{"import { ThemeProvider } from 'siddcn';"}</code>
            <br />
            <br />
            <code className="text-white/60">{"<ThemeProvider theme=\"tokyo-night\">"}</code>
            <br />
            <code className="text-white/60">{"  <YourApp />"}</code>
            <br />
            <code className="text-white/60">{"</ThemeProvider>"}</code>
          </div>
        </div>
      </main>
    </div>
  );
}

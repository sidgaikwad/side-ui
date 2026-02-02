import chalk from "chalk";

// Theme definitions with multiple color schemes
export const themes = {
  ocean: {
    name: "Ocean",
    primary: chalk.hex("#00A8E8"),
    secondary: chalk.hex("#007EA7"),
    success: chalk.hex("#00D9FF"),
    danger: chalk.hex("#FF6B6B"),
    warning: chalk.hex("#FFD93D"),
    info: chalk.hex("#6BCF7F"),
    muted: chalk.hex("#6C757D"),
    text: chalk.hex("#E0E0E0"),
    background: chalk.hex("#1A1A2E"),
    border: chalk.hex("#00D9FF"),
    accent: chalk.hex("#00FFF5"),
  },

  forest: {
    name: "Forest",
    primary: chalk.hex("#2D6A4F"),
    secondary: chalk.hex("#40916C"),
    success: chalk.hex("#52B788"),
    danger: chalk.hex("#FF6B6B"),
    warning: chalk.hex("#F4A261"),
    info: chalk.hex("#95D5B2"),
    muted: chalk.hex("#74C69D"),
    text: chalk.hex("#D8F3DC"),
    background: chalk.hex("#1B4332"),
    border: chalk.hex("#52B788"),
    accent: chalk.hex("#B7E4C7"),
  },

  sunset: {
    name: "Sunset",
    primary: chalk.hex("#FF6B35"),
    secondary: chalk.hex("#F7931E"),
    success: chalk.hex("#6BCF7F"),
    danger: chalk.hex("#C1121F"),
    warning: chalk.hex("#FFC300"),
    info: chalk.hex("#4CC9F0"),
    muted: chalk.hex("#ADB5BD"),
    text: chalk.hex("#FFF3E0"),
    background: chalk.hex("#2B1B17"),
    border: chalk.hex("#FF6B35"),
    accent: chalk.hex("#FFB627"),
  },

  midnight: {
    name: "Midnight",
    primary: chalk.hex("#7209B7"),
    secondary: chalk.hex("#560BAD"),
    success: chalk.hex("#4CC9F0"),
    danger: chalk.hex("#F72585"),
    warning: chalk.hex("#FCA311"),
    info: chalk.hex("#4361EE"),
    muted: chalk.hex("#6C757D"),
    text: chalk.hex("#E0E0E0"),
    background: chalk.hex("#10002B"),
    border: chalk.hex("#B5179E"),
    accent: chalk.hex("#F72585"),
  },

  cyber: {
    name: "Cyber",
    primary: chalk.hex("#00FF41"),
    secondary: chalk.hex("#00D9FF"),
    success: chalk.hex("#39FF14"),
    danger: chalk.hex("#FF073A"),
    warning: chalk.hex("#FFD700"),
    info: chalk.hex("#00FFFF"),
    muted: chalk.hex("#808080"),
    text: chalk.hex("#00FF41"),
    background: chalk.hex("#0A0E27"),
    border: chalk.hex("#00FF41"),
    accent: chalk.hex("#FF10F0"),
  },

  monochrome: {
    name: "Monochrome",
    primary: chalk.hex("#FFFFFF"),
    secondary: chalk.hex("#CCCCCC"),
    success: chalk.hex("#FFFFFF"),
    danger: chalk.hex("#999999"),
    warning: chalk.hex("#BBBBBB"),
    info: chalk.hex("#DDDDDD"),
    muted: chalk.hex("#666666"),
    text: chalk.hex("#FFFFFF"),
    background: chalk.hex("#000000"),
    border: chalk.hex("#888888"),
    accent: chalk.hex("#AAAAAA"),
  },
};

// Current theme (default)
let currentTheme = themes.ocean;

export const setTheme = (themeName) => {
  if (themes[themeName]) {
    currentTheme = themes[themeName];
    return true;
  }
  return false;
};

export const getTheme = () => currentTheme;

export const getThemeNames = () => Object.keys(themes);

// Utility function to apply theme color
export const themed = (colorType, text) => {
  const theme = getTheme();
  return theme[colorType] ? theme[colorType](text) : text;
};

export default {
  themes,
  setTheme,
  getTheme,
  getThemeNames,
  themed,
};

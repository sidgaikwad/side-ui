/**
 * Global Theme System for Siddcn
 * 
 * This allows users to customize colors across all components
 */

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    text: string;
    dimText: string;
    border: string;
    background: string;
  };
  borderStyle: 'single' | 'double' | 'round' | 'bold' | 'classic';
}

export const themes: Record<string, Theme> = {
  default: {
    name: 'Default (Cyan & Green)',
    colors: {
      primary: 'cyan',
      secondary: 'blue',
      success: 'green',
      warning: 'yellow',
      error: 'red',
      info: 'blue',
      text: 'white',
      dimText: 'gray',
      border: 'cyan',
      background: 'black',
    },
    borderStyle: 'round',
  },
  
  ocean: {
    name: 'Ocean (Blue Theme)',
    colors: {
      primary: 'blue',
      secondary: 'cyan',
      success: 'blueBright',
      warning: 'cyanBright',
      error: 'magenta',
      info: 'cyan',
      text: 'white',
      dimText: 'gray',
      border: 'blue',
      background: 'black',
    },
    borderStyle: 'double',
  },
  
  forest: {
    name: 'Forest (Green Theme)',
    colors: {
      primary: 'green',
      secondary: 'greenBright',
      success: 'green',
      warning: 'yellow',
      error: 'red',
      info: 'greenBright',
      text: 'white',
      dimText: 'gray',
      border: 'green',
      background: 'black',
    },
    borderStyle: 'round',
  },
  
  sunset: {
    name: 'Sunset (Orange & Pink)',
    colors: {
      primary: 'magenta',
      secondary: 'yellow',
      success: 'yellow',
      warning: 'magenta',
      error: 'red',
      info: 'magentaBright',
      text: 'white',
      dimText: 'gray',
      border: 'magenta',
      background: 'black',
    },
    borderStyle: 'round',
  },
  
  minimal: {
    name: 'Minimal (White & Gray)',
    colors: {
      primary: 'white',
      secondary: 'gray',
      success: 'white',
      warning: 'white',
      error: 'white',
      info: 'white',
      text: 'white',
      dimText: 'gray',
      border: 'white',
      background: 'black',
    },
    borderStyle: 'single',
  },
  
  cyberpunk: {
    name: 'Cyberpunk (Pink & Cyan)',
    colors: {
      primary: 'magentaBright',
      secondary: 'cyanBright',
      success: 'greenBright',
      warning: 'yellowBright',
      error: 'redBright',
      info: 'cyanBright',
      text: 'white',
      dimText: 'gray',
      border: 'magentaBright',
      background: 'black',
    },
    borderStyle: 'bold',
  },
};

// Current active theme
let currentTheme: Theme = themes.default;

export function setTheme(themeName: string) {
  if (themes[themeName]) {
    currentTheme = themes[themeName];
  }
}

export function getTheme(): Theme {
  return currentTheme;
}

export function getAvailableThemes(): string[] {
  return Object.keys(themes);
}

export function getThemeNames(): Array<{ id: string; name: string }> {
  return Object.entries(themes).map(([id, theme]) => ({
    id,
    name: theme.name,
  }));
}

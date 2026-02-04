import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { getTheme, setTheme, getAvailableThemes, Theme } from '../utils/theme';
import { SimpleButton } from '../components/buttons';
import { LinearProgress } from '../components/progress';
import { StatusBadge } from '../components/badges';

interface ThemeShowcaseScreenProps {
  onBack: () => void;
}

export const ThemeShowcaseScreen: React.FC<ThemeShowcaseScreenProps> = ({ onBack }) => {
  const currentTheme = getTheme();
  const themes = getAvailableThemes();
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(
    themes.findIndex(t => t.name === currentTheme.name)
  );
  const [showInstallInfo, setShowInstallInfo] = useState(false);

  const selectedTheme = themes[selectedThemeIndex];

  useInput((input, key) => {
    if (key.upArrow || input === 'k') {
      setSelectedThemeIndex(prev => Math.max(0, prev - 1));
    } else if (key.downArrow || input === 'j') {
      setSelectedThemeIndex(prev => Math.min(themes.length - 1, prev + 1));
    } else if (key.return || input === ' ') {
      // Apply theme
      setTheme(selectedTheme.name);
    } else if (input === 'i' || input === 'I') {
      setShowInstallInfo(!showInstallInfo);
    } else if (key.escape || input === 'q' || input === 'Q') {
      onBack();
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      {/* Header */}
      <Box borderStyle="double" borderColor="cyan" paddingX={2} paddingY={1} marginBottom={1}>
        <Text bold color="cyan">🎨 Theme Showcase & Installer</Text>
      </Box>

      <Box marginBottom={1}>
        <Text dimColor>Select a theme to preview and install</Text>
      </Box>

      {/* Theme List */}
      <Box flexDirection="row" marginBottom={2}>
        {/* Left: Theme List */}
        <Box flexDirection="column" width={30} marginRight={2}>
          <Box borderStyle="round" borderColor={currentTheme.colors.border} paddingX={1} marginBottom={1}>
            <Text bold>Available Themes</Text>
          </Box>

          {themes.map((theme, index) => {
            const isSelected = index === selectedThemeIndex;
            const isCurrent = theme.name === currentTheme.name;

            return (
              <Box key={theme.name} marginBottom={0}>
                <Text color={isSelected ? 'cyan' : 'white'} bold={isSelected}>
                  {isSelected ? '▸ ' : '  '}
                  {theme.name}
                  {isCurrent && ' ✓'}
                </Text>
              </Box>
            );
          })}
        </Box>

        {/* Right: Theme Preview */}
        <Box flexDirection="column" borderStyle="round" borderColor={selectedTheme.colors.border} paddingX={2} paddingY={1} flexGrow={1}>
          <Box marginBottom={1}>
            <Text bold color={selectedTheme.colors.primary}>
              {selectedTheme.name} Theme Preview
            </Text>
          </Box>

          {/* Color Palette */}
          <Box marginBottom={1}>
            <Text bold>Colors:</Text>
          </Box>
          <Box marginBottom={1}>
            <Text color={selectedTheme.colors.primary}>Primary</Text>
            <Text> </Text>
            <Text color={selectedTheme.colors.secondary}>Secondary</Text>
            <Text> </Text>
            <Text color={selectedTheme.colors.success}>Success</Text>
            <Text> </Text>
            <Text color={selectedTheme.colors.warning}>Warning</Text>
            <Text> </Text>
            <Text color={selectedTheme.colors.error}>Error</Text>
          </Box>

          {/* Component Previews */}
          <Box marginBottom={1}>
            <Text bold>Components:</Text>
          </Box>

          <Box marginBottom={1}>
            <SimpleButton label="Button Example" />
          </Box>

          <Box marginBottom={1}>
            <LinearProgress value={75} max={100} animated={false} />
          </Box>

          <Box marginBottom={1}>
            <StatusBadge status="success" />
            <Text>  </Text>
            <StatusBadge status="warning" />
            <Text>  </Text>
            <StatusBadge status="error" />
          </Box>

          <Box marginTop={1}>
            <Text bold>Border Style: </Text>
            <Text color={selectedTheme.colors.secondary}>{selectedTheme.borderStyle}</Text>
          </Box>
        </Box>
      </Box>

      {/* Installation Info */}
      {showInstallInfo && (
        <Box borderStyle="round" borderColor="yellow" paddingX={2} paddingY={1} marginBottom={1} flexDirection="column">
          <Text bold color="yellow">📦 Installation Instructions</Text>
          <Box marginTop={1}>
            <Text dimColor>To use this theme in your code:</Text>
          </Box>
          <Box marginTop={1} flexDirection="column">
            <Text color="cyan">import {'{ setTheme }'} from 'siddcn';</Text>
            <Text color="green">setTheme('{selectedTheme.name}');</Text>
          </Box>
          <Box marginTop={1}>
            <Text dimColor>Or in your component:</Text>
          </Box>
          <Box marginTop={1} flexDirection="column">
            <Text color="cyan">import {'{ getTheme }'} from 'siddcn';</Text>
            <Text color="green">const theme = getTheme();</Text>
            <Text color="magenta">// All components auto-update!</Text>
          </Box>
        </Box>
      )}

      {/* Current Status */}
      <Box marginBottom={1}>
        <Text dimColor>Current theme: </Text>
        <Text bold color={currentTheme.colors.primary}>{currentTheme.name}</Text>
        <Text dimColor> | Selected: </Text>
        <Text bold color={selectedTheme.colors.primary}>{selectedTheme.name}</Text>
      </Box>

      {/* Controls */}
      <Box borderStyle="single" borderColor={currentTheme.colors.border} paddingX={2}>
        <Text dimColor>
          ↑↓ Navigate   Enter Apply   i Install Info   q Back
        </Text>
      </Box>
    </Box>
  );
};

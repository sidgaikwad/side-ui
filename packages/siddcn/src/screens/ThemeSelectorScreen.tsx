import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { getThemeNames, setTheme, getTheme, themes as themeMap } from '../utils/theme';

interface ThemeSelectorScreenProps {
  onSelect: (themeName: string) => void;
  onBack: () => void;
}

export const ThemeSelectorScreen: React.FC<ThemeSelectorScreenProps> = ({ onSelect, onBack }) => {
  const theme = getTheme();
  const themeEntries = Object.entries(themeMap);
  const [selectedIndex, setSelectedIndex] = useState(
    Math.max(0, themeEntries.findIndex(([_, t]) => t.name === theme.name))
  );

  useInput((input, key) => {
    if (key.upArrow || input === 'k') {
      setSelectedIndex(prev => Math.max(0, prev - 1));
    } else if (key.downArrow || input === 'j') {
      setSelectedIndex(prev => Math.min(themeEntries.length - 1, prev + 1));
    } else if (key.return) {
      const [themeId] = themeEntries[selectedIndex];
      setTheme(themeId);
      onSelect(themeId);
    } else if (key.escape) {
      onBack();
    }
  });

  const [currentSelectedId, currentSelectedTheme] = themeEntries[selectedIndex];

  return (
    <Box flexDirection="column" padding={2}>
      <Box marginBottom={1}>
        <Text color={theme.colors.primary} bold>
          Choose Your Theme
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Text dimColor>
          Select a theme to customize the entire UI
        </Text>
      </Box>

      <Box 
        flexDirection="column" 
        borderStyle={theme.borderStyle} 
        borderColor={theme.colors.border} 
        paddingX={2} 
        paddingY={1}
      >
        {themeEntries.map(([themeId, t], index) => {
          const isSelected = index === selectedIndex;
          const isCurrent = t.name === theme.name;
          
          return (
            <Box key={themeId}>
              <Text 
                color={isSelected ? theme.colors.primary : theme.colors.text}
                bold={isSelected}
              >
                {isSelected ? '> ' : '  '}
                {t.name}
                {isCurrent && <Text color={theme.colors.success}> (current)</Text>}
              </Text>
            </Box>
          );
        })}
      </Box>

      {/* Theme Preview */}
      <Box 
        marginTop={2}
        borderStyle="round" 
        borderColor={currentSelectedTheme.colors.primary}
        paddingX={2}
        paddingY={1}
        flexDirection="column"
      >
        <Text bold color={currentSelectedTheme.colors.primary}>Preview: {currentSelectedTheme.name}</Text>
        <Box marginTop={1}>
          <Text color={currentSelectedTheme.colors.primary}>Primary</Text>
          <Text> </Text>
          <Text color={currentSelectedTheme.colors.success}>Success</Text>
          <Text> </Text>
          <Text color={currentSelectedTheme.colors.warning}>Warning</Text>
          <Text> </Text>
          <Text color={currentSelectedTheme.colors.error}>Error</Text>
        </Box>
      </Box>

      <Box marginTop={2}>
        <Text dimColor>
          Navigate with up/down • Select with Enter • Back with Esc
        </Text>
      </Box>
    </Box>
  );
};

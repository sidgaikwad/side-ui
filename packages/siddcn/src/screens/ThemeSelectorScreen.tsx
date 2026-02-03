import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { getThemeNames, setTheme, getTheme } from '../utils/theme';

interface ThemeSelectorScreenProps {
  onSelect: (themeName: string) => void;
  onBack: () => void;
}

export const ThemeSelectorScreen: React.FC<ThemeSelectorScreenProps> = ({ onSelect, onBack }) => {
  const theme = getTheme();
  const themes = getThemeNames();

  const items = themes.map((t) => ({
    label: t.name,
    value: t.id,
  }));

  const handleSelect = (item: { value: string }) => {
    setTheme(item.value);
    onSelect(item.value);
  };

  return (
    <Box flexDirection="column" padding={2}>
      <Box marginBottom={1}>
        <Text color={theme.colors.primary} bold>
          🎨 Choose Your Theme
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Text dimColor>
          Select a theme to customize the entire UI
        </Text>
      </Box>

      <Box borderStyle={theme.borderStyle} borderColor={theme.colors.border} paddingX={2} paddingY={1}>
        <SelectInput items={items} onSelect={handleSelect} />
      </Box>

      <Box marginTop={2}>
        <Text dimColor>
          Navigate with ↑↓ • Select with Enter • Back with Esc
        </Text>
      </Box>
    </Box>
  );
};

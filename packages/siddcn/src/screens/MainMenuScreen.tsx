import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { getCategories } from '../components/registry';
import type { ComponentCategory } from '../types';

interface MainMenuScreenProps {
  onSelect: (categoryId: string) => void;
}

export const MainMenuScreen: React.FC<MainMenuScreenProps> = ({ onSelect }) => {
  const categories = getCategories();

  const items = categories.map((category: ComponentCategory) => ({
    label: `${category.icon}  ${category.name}`,
    value: category.id,
    description: category.description
  }));

  const handleSelect = (item: { value: string }) => {
    onSelect(item.value);
  };

  return (
    <Box flexDirection="column" padding={2}>
      <Box marginBottom={1}>
        <Text color="cyan" bold>
          ✨ Component Categories
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Text dimColor>
          Navigate with ↑↓ or j/k • Select with Enter • Exit with Ctrl+C or q
        </Text>
      </Box>

      <Box borderStyle="round" paddingX={2} paddingY={1}>
        <SelectInput items={items} onSelect={handleSelect} />
      </Box>

      <Box marginTop={2}>
        <Text dimColor>
          Total categories: {categories.length}
        </Text>
      </Box>
    </Box>
  );
};

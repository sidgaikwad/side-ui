import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { getCategory } from '../components/registry';
import type { ComponentVariant } from '../types';

interface CategoryScreenProps {
  categoryId: string;
  onSelect: (variantId: string) => void;
  onBack: () => void;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ 
  categoryId, 
  onSelect,
  onBack 
}) => {
  const category = getCategory(categoryId);

  if (!category) {
    return (
      <Box padding={2}>
        <Text color="red">Category not found!</Text>
      </Box>
    );
  }

  const items = category.variants.map((variant: ComponentVariant) => ({
    label: variant.name,
    value: variant.id,
    description: variant.description
  }));

  const handleSelect = (item: { value: string }) => {
    onSelect(item.value);
  };

  return (
    <Box flexDirection="column" padding={2}>
      <Box marginBottom={1}>
        <Text color="cyan" bold>
          {category.icon}  {category.name}
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text dimColor>{category.description}</Text>
      </Box>

      <Box marginBottom={2}>
        <Text dimColor>
          Navigate with ↑↓ or j/k • Select with Enter • Back with Esc • Exit with q
        </Text>
      </Box>

      <Box borderStyle="round" paddingX={2} paddingY={1}>
        <SelectInput items={items} onSelect={handleSelect} />
      </Box>

      <Box marginTop={2}>
        <Text dimColor>
          {category.variants.length} variant{category.variants.length !== 1 ? 's' : ''} available
        </Text>
      </Box>
    </Box>
  );
};

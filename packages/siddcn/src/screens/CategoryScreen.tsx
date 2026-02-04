'use client';

import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { getCategory } from '../components/registry';
import { getTheme } from '../utils/theme';
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
  const theme = getTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((input, key) => {
    if (!category) return;
    
    const cols = 2;
    const totalItems = category.variants.length;
    
    if (key.leftArrow || input === 'h') {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.rightArrow || input === 'l') {
      setSelectedIndex((prev) => Math.min(totalItems - 1, prev + 1));
    } else if (key.upArrow || input === 'k') {
      setSelectedIndex((prev) => Math.max(0, prev - cols));
    } else if (key.downArrow || input === 'j') {
      setSelectedIndex((prev) => Math.min(totalItems - 1, prev + cols));
    } else if (key.return) {
      onSelect(category.variants[selectedIndex].id);
    } else if (key.escape) {
      onBack();
    }
  });

  if (!category) {
    return (
      <Box padding={2}>
        <Text color="red">Category not found!</Text>
      </Box>
    );
  }

  const cols = 2;
  const rows = Math.ceil(category.variants.length / cols);

  return (
    <Box flexDirection="column" padding={2}>
      {/* Header */}
      <Box 
        borderStyle={theme.borderStyle} 
        borderColor={theme.colors.border} 
        justifyContent="center" 
        paddingX={2}
        marginBottom={1}
      >
        <Text bold color={theme.colors.primary}>
          {category.icon}  {category.name}
        </Text>
      </Box>

      <Box marginBottom={1} justifyContent="center">
        <Text dimColor>{category.description}</Text>
      </Box>

      <Box marginBottom={2} justifyContent="center">
        <Text dimColor>
          Navigate with Arrow Keys or h/j/k/l | Enter to view | Esc to go back
        </Text>
      </Box>

      {/* Component Grid */}
      <Box flexDirection="column">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Box key={rowIndex} marginBottom={1}>
            {Array.from({ length: cols }).map((_, colIndex) => {
              const index = rowIndex * cols + colIndex;
              if (index >= category.variants.length) {
                return <Box key={colIndex} width={40} />;
              }

              const variant = category.variants[index];
              const isSelected = index === selectedIndex;
              const PreviewComponent = variant.preview;

              return (
                <Box
                  key={colIndex}
                  width={40}
                  marginRight={2}
                  borderStyle={isSelected ? 'bold' : 'single'}
                  borderColor={isSelected ? theme.colors.primary : theme.colors.border}
                  paddingX={2}
                  paddingY={1}
                  flexDirection="column"
                >
                  {/* Variant Name */}
                  <Box marginBottom={1}>
                    <Text color={isSelected ? theme.colors.primary : theme.colors.text} bold>
                      {variant.name}
                    </Text>
                  </Box>

                  {/* Description */}
                  <Box marginBottom={1}>
                    <Text dimColor wrap="truncate-end">
                      {variant.description}
                    </Text>
                  </Box>

                  {/* Preview */}
                  <Box 
                    borderStyle="round" 
                    borderColor={theme.colors.dimText}
                    paddingX={1}
                    paddingY={0}
                    marginTop={1}
                  >
                    <Box height={3}>
                      <PreviewComponent />
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box marginTop={2} justifyContent="space-between">
        <Text dimColor>
          {category.variants.length} variant{category.variants.length !== 1 ? 's' : ''} available
        </Text>
        <Text dimColor>
          Selected: <Text color={theme.colors.primary}>{category.variants[selectedIndex]?.name || 'None'}</Text>
        </Text>
      </Box>
    </Box>
  );
};

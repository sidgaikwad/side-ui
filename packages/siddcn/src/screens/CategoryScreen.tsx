'use client';

import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { getCategory } from '../components/registry';
import { getTheme } from '../utils/theme';
import { AutumnLeaves } from '../components/backgrounds';
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
  const [scrollOffset, setScrollOffset] = useState(0);
  
  // Screen dimensions for full screen background - use full terminal width
  const screenWidth = process.stdout.columns || 120;
  const screenHeight = process.stdout.rows || 30;
  
  // Only 2 columns per page for better component display
  const maxVisibleRows = 2;
  const cols = 2;

  useInput((input, key) => {
    if (!category) return;
    
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

  // Update scroll offset based on selection
  const selectedRow = Math.floor(selectedIndex / cols);
  useEffect(() => {
    if (selectedRow < scrollOffset) {
      setScrollOffset(selectedRow);
    } else if (selectedRow >= scrollOffset + maxVisibleRows) {
      setScrollOffset(selectedRow - maxVisibleRows + 1);
    }
  }, [selectedRow, scrollOffset]);

  if (!category) {
    return (
      <Box padding={2}>
        <Text color="red">Category not found!</Text>
      </Box>
    );
  }

  const totalRows = Math.ceil(category.variants.length / cols);
  const visibleStartRow = scrollOffset;
  const visibleEndRow = Math.min(scrollOffset + maxVisibleRows, totalRows);

  return (
    <Box flexDirection="column" width={screenWidth} minHeight={screenHeight}>
      {/* Full Screen Autumn Leaves Background - Static, no re-renders */}
      <Box position="absolute" marginTop={0} marginLeft={0}>
        <AutumnLeaves 
          width={screenWidth} 
          height={screenHeight} 
          leafCount={18}
        />
      </Box>
      
      {/* Content Layer */}
      <Box flexDirection="column" padding={1} position="relative">
      {/* Header */}
      <Box 
        borderStyle={theme.borderStyle} 
        borderColor={theme.colors.primary} 
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

      <Box marginBottom={1} justifyContent="center" borderStyle="round" borderColor={theme.colors.border} paddingX={2}>
        <Text dimColor>
          Arrow Keys navigate | Enter to select | Esc back
        </Text>
      </Box>

      {/* Scroll indicator - top */}
      {scrollOffset > 0 && (
        <Box justifyContent="center" marginBottom={1}>
          <Text color={theme.colors.primary}>--- More above (k/up) ---</Text>
        </Box>
      )}

      {/* Component Grid with more spacing */}
      <Box flexDirection="column">
        {Array.from({ length: visibleEndRow - visibleStartRow }).map((_, rowOffset) => {
          const rowIndex = visibleStartRow + rowOffset;
          return (
            <Box key={rowIndex} marginBottom={2}>
              {Array.from({ length: cols }).map((_, colIndex) => {
                const index = rowIndex * cols + colIndex;
                if (index >= category.variants.length) {
                  return <Box key={colIndex} width={Math.floor((screenWidth - 10) / 2)} />;
                }

                const variant = category.variants[index];
                const isSelected = index === selectedIndex;
                const PreviewComponent = variant.preview;
                
                // Calculate dynamic column width based on screen size
                const colWidth = Math.floor((screenWidth - 10) / 2);

                return (
                  <Box
                    key={colIndex}
                    width={colWidth}
                    marginRight={2}
                    borderStyle={isSelected ? 'double' : 'single'}
                    borderColor={isSelected ? theme.colors.primary : theme.colors.border}
                    paddingX={2}
                    paddingY={1}
                    flexDirection="column"
                  >
                    {/* Variant Name with selection indicator */}
                    <Box>
                      <Text 
                        color={isSelected ? theme.colors.primary : theme.colors.text} 
                        bold={isSelected}
                      >
                        {isSelected ? '> ' : '  '}{variant.name}
                      </Text>
                    </Box>

                    {/* Description */}
                    <Box marginTop={1}>
                      <Text dimColor wrap="truncate-end">
                        {variant.description}
                      </Text>
                    </Box>

                    {/* Preview */}
                    <Box 
                      borderStyle="round" 
                      borderColor={isSelected ? theme.colors.secondary : theme.colors.dimText}
                      paddingX={1}
                      marginTop={1}
                    >
                      <Box height={2}>
                        <PreviewComponent />
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      {/* Scroll indicator - bottom */}
      {scrollOffset + maxVisibleRows < totalRows && (
        <Box justifyContent="center" marginTop={1}>
          <Text color={theme.colors.primary}>--- More below (j/down) ---</Text>
        </Box>
      )}

      {/* Footer with current selection info and scrollbar indicator */}
      <Box marginTop={1} borderStyle="single" borderColor={theme.colors.border} paddingX={2}>
        <Box flexGrow={1}>
          <Text dimColor>
            {category.variants.length} variant{category.variants.length !== 1 ? 's' : ''} | 
          </Text>
          <Text dimColor> Selected: </Text>
          <Text color={theme.colors.primary} bold>
            {category.variants[selectedIndex]?.name || 'None'}
          </Text>
        </Box>
        <Text dimColor>
          [{selectedIndex + 1}/{category.variants.length}] Row {Math.floor(selectedIndex / cols) + 1}/{totalRows}
        </Text>
      </Box>
      </Box>
    </Box>
  );
};

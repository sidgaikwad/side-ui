'use client';

import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { getVariant } from '../components/registry';
import { getTheme, setTheme, getThemeNames } from '../utils/theme';

interface ComponentDetailScreenProps {
  categoryId: string;
  variantId: string;
  accordionOpen: boolean;
  onToggleAccordion: () => void;
  onBack: () => void;
}

export const ComponentDetailScreen: React.FC<ComponentDetailScreenProps> = ({
  categoryId,
  variantId,
  accordionOpen,
  onToggleAccordion,
  onBack
}) => {
  const variant = getVariant(categoryId, variantId);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const themes = getThemeNames();
  const theme = getTheme();

  useInput((input, key) => {
    if (input === 'i' || input === 'I') {
      onToggleAccordion();
    }
    if (input === 't' || input === 'T') {
      setShowThemeSelector(prev => !prev);
    }
    if (key.escape) {
      if (showThemeSelector) {
        setShowThemeSelector(false);
      } else {
        onBack();
      }
    }
    
    // Theme selection controls when theme selector is open
    if (showThemeSelector) {
      if (key.upArrow || input === 'k') {
        setCurrentThemeIndex(prev => Math.max(0, prev - 1));
      } else if (key.downArrow || input === 'j') {
        setCurrentThemeIndex(prev => Math.min(themes.length - 1, prev + 1));
      } else if (key.return) {
        setTheme(themes[currentThemeIndex].id);
        setShowThemeSelector(false);
      }
    }
  });

  if (!variant) {
    return (
      <Box padding={2}>
        <Text color="red">Component not found!</Text>
      </Box>
    );
  }

  const PreviewComponent = variant.preview;

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
          {variant.name}
        </Text>
      </Box>

      <Box marginBottom={2} justifyContent="center">
        <Text dimColor>{variant.description}</Text>
      </Box>

      {/* Theme Selector Panel */}
      {showThemeSelector && (
        <Box 
          flexDirection="column" 
          borderStyle="double" 
          borderColor={theme.colors.primary}
          paddingX={2} 
          paddingY={1}
          marginBottom={2}
        >
          <Box marginBottom={1}>
            <Text color={theme.colors.primary} bold>Select Theme</Text>
          </Box>
          
          <Box flexDirection="column">
            {themes.map((t, idx) => (
              <Box key={t.id}>
                <Text 
                  color={idx === currentThemeIndex ? theme.colors.primary : theme.colors.text}
                  bold={idx === currentThemeIndex}
                >
                  {idx === currentThemeIndex ? '▸ ' : '  '}{t.name}
                </Text>
              </Box>
            ))}
          </Box>
          
          <Box marginTop={1}>
            <Text dimColor>↑↓ Navigate | Enter to apply | Esc to close</Text>
          </Box>
        </Box>
      )}

      {/* Component Preview */}
      <Box 
        flexDirection="column" 
        borderStyle="double" 
        borderColor={theme.colors.primary}
        paddingX={2} 
        paddingY={1}
        marginBottom={2}
      >
        <Box marginBottom={1} justifyContent="space-between">
          <Text color={theme.colors.success} bold>Preview</Text>
          <Text dimColor>Theme: <Text color={theme.colors.primary}>{theme.name}</Text></Text>
        </Box>
        <Box minHeight={5}>
          <PreviewComponent />
        </Box>
      </Box>

      {/* Controls */}
      <Box marginBottom={1} flexDirection="row" gap={2}>
        <Box borderStyle="round" borderColor={theme.colors.border} paddingX={2}>
          <Text>
            <Text color="yellow">'i'</Text>
            <Text> {accordionOpen ? 'Hide' : 'Show'} Install Info</Text>
          </Text>
        </Box>
        <Box borderStyle="round" borderColor={theme.colors.border} paddingX={2}>
          <Text>
            <Text color="magenta">'t'</Text>
            <Text> Change Theme</Text>
          </Text>
        </Box>
      </Box>

      {/* Accordion Content */}
      {accordionOpen && (
        <Box flexDirection="column" borderStyle="round" borderColor={theme.colors.border} paddingX={2} paddingY={1} marginBottom={2}>
          {/* Installation */}
          <Box flexDirection="column" marginBottom={2}>
            <Text color={theme.colors.success} bold>Installation</Text>
            <Box marginTop={1} paddingX={1}>
              <Text backgroundColor="gray" color="white"> {variant.installCommand} </Text>
            </Box>
          </Box>

          {/* Usage */}
          <Box flexDirection="column" marginBottom={2}>
            <Text color={theme.colors.success} bold>Usage</Text>
            <Box marginTop={1} paddingX={1} flexDirection="column">
              {variant.usage.split('\n').map((line, idx) => (
                <Text key={idx} dimColor={line.trim().startsWith('//')}>{line}</Text>
              ))}
            </Box>
          </Box>

          {/* Props (if available) */}
          {variant.props && Object.keys(variant.props).length > 0 && (
            <Box flexDirection="column">
              <Text color={theme.colors.success} bold>Props</Text>
              <Box marginTop={1} flexDirection="column">
                {Object.entries(variant.props).map(([propName, propDef], idx) => (
                  <Box key={idx} marginY={0} paddingX={1}>
                    <Text color={theme.colors.primary}>{propName}</Text>
                    <Text>: </Text>
                    <Text color="yellow">{propDef.type}</Text>
                    {propDef.required && <Text color="red"> *</Text>}
                    {propDef.default && (
                      <>
                        <Text dimColor> = </Text>
                        <Text dimColor>{propDef.default}</Text>
                      </>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Navigation hints */}
      <Box marginTop={1}>
        <Text dimColor>
          Press Esc to go back | Press q to exit
        </Text>
      </Box>
    </Box>
  );
};

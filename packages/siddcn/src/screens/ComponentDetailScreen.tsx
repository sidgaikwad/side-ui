'use client';

import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { getVariant } from '../components/registry';
import { getTheme, setTheme, themes as themeMap } from '../utils/theme';
import { TwinklingStars } from '../components/backgrounds';

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
  const themeEntries = Object.entries(themeMap);
  const theme = getTheme();
  const [currentThemeIndex, setCurrentThemeIndex] = useState(
    Math.max(0, themeEntries.findIndex(([_, t]) => t.name === theme.name))
  );
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [copied, setCopied] = useState(false);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useInput((input, key) => {
    if (input === 'i' || input === 'I') {
      onToggleAccordion();
    }
    if (input === 't' || input === 'T') {
      setShowThemeSelector(prev => !prev);
    }
    if (input === 'c' || input === 'C') {
      // Signal that install command was "copied"
      setCopied(true);
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
        setCurrentThemeIndex(prev => Math.min(themeEntries.length - 1, prev + 1));
      } else if (key.return) {
        const [themeId] = themeEntries[currentThemeIndex];
        setTheme(themeId);
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
    <Box flexDirection="column" padding={1}>
      {/* Stars decoration */}
      <TwinklingStars width={70} density={0.1} />
      
      {/* Header */}
      <Box 
        borderStyle="double" 
        borderColor={theme.colors.primary} 
        justifyContent="center" 
        paddingX={2}
        marginBottom={1}
      >
        <Text bold color={theme.colors.primary}>
          {variant.name}
        </Text>
      </Box>

      <Box marginBottom={1} justifyContent="center">
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
            {themeEntries.map(([themeId, t], idx) => (
              <Box key={themeId}>
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

      {/* Accordion Content - Installation Info */}
      {accordionOpen && (
        <Box flexDirection="column" borderStyle="round" borderColor={theme.colors.success} paddingX={2} paddingY={1} marginBottom={2}>
          {/* Quick Install */}
          <Box flexDirection="column" marginBottom={2}>
            <Box>
              <Text color={theme.colors.success} bold>Quick Install</Text>
              {copied && <Text color={theme.colors.warning}> (Copied!)</Text>}
            </Box>
            <Box marginTop={1} borderStyle="single" borderColor={theme.colors.border} paddingX={1}>
              <Text color={theme.colors.primary}>{variant.installCommand}</Text>
            </Box>
            <Box marginTop={1}>
              <Text dimColor>Press 'c' to copy command</Text>
            </Box>
          </Box>

          {/* Usage Example */}
          <Box flexDirection="column" marginBottom={2}>
            <Text color={theme.colors.info} bold>Usage Example</Text>
            <Box marginTop={1} paddingX={1} flexDirection="column" borderStyle="single" borderColor={theme.colors.border}>
              {variant.usage.split('\n').map((line, idx) => (
                <Text 
                  key={idx} 
                  color={
                    line.trim().startsWith('//') ? theme.colors.dimText :
                    line.trim().startsWith('import') ? theme.colors.primary :
                    line.trim().startsWith('<') ? theme.colors.success :
                    theme.colors.text
                  }
                >
                  {line}
                </Text>
              ))}
            </Box>
          </Box>

          {/* Props (if available) */}
          {variant.props && Object.keys(variant.props).length > 0 && (
            <Box flexDirection="column">
              <Text color={theme.colors.warning} bold>Props</Text>
              <Box marginTop={1} flexDirection="column" borderStyle="single" borderColor={theme.colors.border} paddingX={1}>
                {Object.entries(variant.props).map(([propName, propDef], idx) => (
                  <Box key={idx}>
                    <Text color={theme.colors.primary} bold>{propName}</Text>
                    <Text>: </Text>
                    <Text color={theme.colors.secondary}>{propDef.type}</Text>
                    {propDef.required && <Text color={theme.colors.error}> (required)</Text>}
                    {propDef.default && (
                      <>
                        <Text dimColor> = </Text>
                        <Text dimColor>"{propDef.default}"</Text>
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
      <Box marginTop={1} borderStyle="single" borderColor={theme.colors.border} paddingX={2}>
        <Text dimColor>
          Esc back | 'i' toggle install | 't' theme | 'c' copy | 'q' quit
        </Text>
      </Box>
      
      {/* Bottom stars */}
      <TwinklingStars width={70} density={0.08} />
    </Box>
  );
};

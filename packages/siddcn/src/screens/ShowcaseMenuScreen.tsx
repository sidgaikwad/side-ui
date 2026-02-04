'use client';

import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { getTheme } from '../utils/theme';
import { SimpleButton } from '../components/buttons';
import { LinearProgress } from '../components/progress';
import { StatusBadge } from '../components/badges';

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  preview: React.ReactNode;
}

interface ShowcaseMenuScreenProps {
  onSelect: (categoryId: string) => void;
  onThemeSelect?: () => void;
}

export const ShowcaseMenuScreen: React.FC<ShowcaseMenuScreenProps> = ({ onSelect, onThemeSelect }) => {
  const theme = getTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items: ShowcaseItem[] = [
    {
      id: 'buttons',
      title: 'Buttons',
      subtitle: '[ Primary ]\nStyled variants',
      icon: '◉',
      preview: <SimpleButton label="Primary" />,
    },
    {
      id: 'themes',
      title: 'Themes',
      subtitle: '🎨 Preview\n& Install',
      icon: '🎨',
      preview: <Text color={theme.colors.primary}>6 Themes</Text>,
    },
    {
      id: 'select',
      title: 'Select',
      subtitle: '▸ Option 1\nSingle-select',
      icon: '▸',
      preview: <Text>▸ <Text color={theme.colors.primary}>Option 1</Text></Text>,
    },
    {
      id: 'multi-select',
      title: 'Multi-Select',
      subtitle: '☑ Item A\nCheckboxes',
      icon: '☑',
      preview: <Text><Text color={theme.colors.primary}>☑</Text> Item A\n<Text dimColor>☐</Text> Item B</Text>,
    },
    {
      id: 'text-input',
      title: 'Text Input',
      subtitle: '│ Type... █\nLive typing',
      icon: '✎',
      preview: <Text dimColor>│ Type... <Text color={theme.colors.primary}>█</Text></Text>,
    },
    {
      id: 'trees',
      title: 'Tree',
      subtitle: '├─ folder/\nHierarchy',
      icon: '🌳',
      preview: <Text>├─ <Text color={theme.colors.primary}>folder/</Text></Text>,
    },
    {
      id: 'tabs',
      title: 'Tabs',
      subtitle: '[ Tab 1 ]\nTab interface',
      icon: '⊟',
      preview: <Text>[ <Text color={theme.colors.primary} bold>Tab 1</Text> ]</Text>,
    },
    {
      id: 'table',
      title: 'Table',
      subtitle: '│ Row 1 │\nData grid',
      icon: '▦',
      preview: <Text dimColor>│ Row 1 │</Text>,
    },
    {
      id: 'cards',
      title: 'Cards',
      subtitle: '┌─Card─┐\nPanel layout',
      icon: '◈',
      preview: <Text dimColor>┌─Card─┐</Text>,
    },
    {
      id: 'badges',
      title: 'Badges',
      subtitle: '[ Active ]\nStatus tags',
      icon: '♦',
      preview: <StatusBadge status="success" />,
    },
    {
      id: 'progress',
      title: 'Progress',
      subtitle: '[████░] 60%\nProgress bars',
      icon: '▪',
      preview: <LinearProgress value={60} max={100} animated={false} />,
    },
    {
      id: 'spinners',
      title: 'Spinners',
      subtitle: '⠋ Loading...\nAnimations',
      icon: '○',
      preview: <Text><Text color={theme.colors.primary}>⠋</Text> Loading...</Text>,
    },
    {
      id: 'charts',
      title: 'Chart',
      subtitle: '▂▃▅▇▆▄▂\nLive data',
      icon: '▤',
      preview: <Text color={theme.colors.primary}>▂▃▅▇▆▄▂</Text>,
    },
  ];

  useInput((input, key) => {
    if (key.leftArrow || input === 'h') {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.rightArrow || input === 'l') {
      setSelectedIndex((prev) => Math.min(items.length - 1, prev + 1));
    } else if (key.upArrow || input === 'k') {
      setSelectedIndex((prev) => Math.max(0, prev - 3));
    } else if (key.downArrow || input === 'j') {
      setSelectedIndex((prev) => Math.min(items.length - 1, prev + 3));
    } else if (input === 't' || input === 'T') {
      // Quick access to themes
      onThemeSelect?.();
    } else if (key.return) {
      const selectedItem = items[selectedIndex];
      if (selectedItem.id === 'themes') {
        onThemeSelect?.();
      } else {
        onSelect(selectedItem.id);
      }
    }
  });

  // Calculate grid position
  const cols = 3;
  const selectedRow = Math.floor(selectedIndex / cols);
  const selectedCol = selectedIndex % cols;

  return (
    <Box flexDirection="column" padding={2}>
      {/* Title */}
      <Box
        borderStyle={theme.borderStyle}
        borderColor={theme.colors.border}
        justifyContent="center"
        paddingX={2}
        marginBottom={1}
      >
        <Text bold color={theme.colors.primary}>
          siddcn Component Library Showcase
        </Text>
      </Box>

      <Box marginBottom={2} justifyContent="center">
        <Text dimColor>
          Navigate the grid with arrow keys · Enter to explore
        </Text>
      </Box>

      <Box marginBottom={2} justifyContent="center" borderStyle="round" borderColor="yellow" paddingX={2}>
        <Text bold color="yellow">💡 Press 'T' anytime for Theme Showcase (6 themes available)</Text>
      </Box>

      {/* Grid */}
      <Box flexDirection="column">
        {[0, 1, 2, 3].map((row) => (
          <Box key={row} marginBottom={1}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              if (index >= items.length) {
                return <Box key={col} width={30} />;
              }

              const item = items[index];
              const isSelected = index === selectedIndex;

              return (
                <Box
                  key={col}
                  width={30}
                  marginRight={2}
                  borderStyle={isSelected ? 'bold' : 'single'}
                  borderColor={isSelected ? theme.colors.primary : theme.colors.border}
                  paddingX={1}
                  paddingY={1}
                  flexDirection="column"
                >
                  {/* Title with icon */}
                  <Box marginBottom={0}>
                    <Text color={isSelected ? theme.colors.primary : theme.colors.text}>
                      {item.icon}  <Text bold>{item.title}</Text>
                    </Text>
                  </Box>

                  {/* Subtitle/Description */}
                  <Box marginTop={0}>
                    <Text dimColor>{item.subtitle}</Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box marginTop={2} justifyContent="center">
        <Text dimColor>
          {items.length} components · Arrow keys navigate · Enter select · Ctrl+C quit
        </Text>
      </Box>
    </Box>
  );
};

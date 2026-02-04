'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Text, useInput } from 'ink';
import { getTheme } from '../utils/theme';
import { SimpleButton } from '../components/buttons';
import { LinearProgress } from '../components/progress';
import { StatusBadge } from '../components/badges';
import { AutumnLeaves } from '../components/backgrounds';

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
  const [scrollOffset, setScrollOffset] = useState(0);
  
  // Screen dimensions for full screen background - use full terminal width
  const screenWidth = process.stdout.columns || 120;
  const screenHeight = process.stdout.rows || 30;
  
  // Only 2 columns per page for better component display
  const maxVisibleRows = 3;
  const cols = 2;

  const items: ShowcaseItem[] = [
    {
      id: 'buttons',
      title: 'Buttons',
      subtitle: 'Interactive\nStyled variants',
      icon: '◉',
      preview: <SimpleButton label="Primary" />,
    },
    {
      id: 'themes',
      title: 'Themes',
      subtitle: 'Preview &\nCustomize',
      icon: '◐',
      preview: <Text color={theme.colors.primary}>6 Themes</Text>,
    },
    {
      id: 'select',
      title: 'Select',
      subtitle: 'Single &\nMulti-select',
      icon: '▸',
      preview: <Text>▸ <Text color={theme.colors.primary}>Option 1</Text></Text>,
    },
    {
      id: 'multiselect',
      title: 'Multi-Select',
      subtitle: 'Checkboxes\nWith limits',
      icon: '☑',
      preview: <Text><Text color={theme.colors.primary}>☑</Text> Item A</Text>,
    },
    {
      id: 'textinput',
      title: 'Text Input',
      subtitle: 'Forms &\nSearch',
      icon: '✎',
      preview: <Text dimColor>Type... <Text color={theme.colors.primary}>█</Text></Text>,
    },
    {
      id: 'trees',
      title: 'Tree',
      subtitle: 'File &\nData trees',
      icon: '├',
      preview: <Text>├─ <Text color={theme.colors.primary}>folder/</Text></Text>,
    },
    {
      id: 'tabs',
      title: 'Tabs',
      subtitle: 'Navigation\nMulti-style',
      icon: '⊟',
      preview: <Text>[ <Text color={theme.colors.primary} bold>Tab 1</Text> ]</Text>,
    },
    {
      id: 'table',
      title: 'Table',
      subtitle: 'Data grid\nScrollable',
      icon: '▦',
      preview: <Text dimColor>│ Row 1 │</Text>,
    },
    {
      id: 'cards',
      title: 'Cards',
      subtitle: 'Containers\nAnimated',
      icon: '◈',
      preview: <Text dimColor>┌─Card─┐</Text>,
    },
    {
      id: 'badges',
      title: 'Badges',
      subtitle: 'Status &\nCounts',
      icon: '♦',
      preview: <StatusBadge status="success" />,
    },
    {
      id: 'progress',
      title: 'Progress',
      subtitle: 'Bars &\nSteps',
      icon: '▪',
      preview: <LinearProgress value={60} max={100} animated={false} />,
    },
    {
      id: 'spinners',
      title: 'Spinners',
      subtitle: 'Loading\nAnimations',
      icon: '⟳',
      preview: <Text><Text color={theme.colors.primary}>⠋</Text> Loading...</Text>,
    },
    {
      id: 'charts',
      title: 'Charts',
      subtitle: 'Bar &\nLine charts',
      icon: '▤',
      preview: <Text color={theme.colors.primary}>▂▃▅▇▆▄▂</Text>,
    },
    {
      id: 'backgrounds',
      title: 'Backgrounds',
      subtitle: 'Animated\nEffects',
      icon: '✧',
      preview: <Text color={theme.colors.primary}>*  . +  *</Text>,
    },
    {
      id: 'animatedtext',
      title: 'Animated Text',
      subtitle: 'Typewriter\n& Effects',
      icon: 'A',
      preview: <Text color={theme.colors.primary}>Typing...</Text>,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Toasts &\nAlerts',
      icon: '!',
      preview: <Text color={theme.colors.success}>[+] Done</Text>,
    },
    {
      id: 'dashboards',
      title: 'Dashboards',
      subtitle: 'System\nMonitors',
      icon: '~',
      preview: <Text color={theme.colors.primary}>CPU [|||| ]</Text>,
    },
  ];

  // Calculate total rows
  const totalRows = Math.ceil(items.length / cols);

  useInput((input, key) => {
    if (key.leftArrow || input === 'h') {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.rightArrow || input === 'l') {
      setSelectedIndex((prev) => Math.min(items.length - 1, prev + 1));
    } else if (key.upArrow || input === 'k') {
      setSelectedIndex((prev) => Math.max(0, prev - cols));
    } else if (key.downArrow || input === 'j') {
      setSelectedIndex((prev) => Math.min(items.length - 1, prev + cols));
    } else if (input === 't' || input === 'T') {
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

  // Update scroll offset based on selected index
  const selectedRow = Math.floor(selectedIndex / cols);
  useEffect(() => {
    if (selectedRow < scrollOffset) {
      setScrollOffset(selectedRow);
    } else if (selectedRow >= scrollOffset + maxVisibleRows) {
      setScrollOffset(selectedRow - maxVisibleRows + 1);
    }
  }, [selectedRow, scrollOffset]);

  // Calculate visible rows
  const visibleStartRow = scrollOffset;
  const visibleEndRow = Math.min(scrollOffset + maxVisibleRows, totalRows);

  return (
    <Box flexDirection="column" width={screenWidth} minHeight={screenHeight}>
      {/* Full Screen Autumn Leaves Background - Static, no re-renders */}
      <Box position="absolute" marginTop={0} marginLeft={0}>
        <AutumnLeaves 
          width={screenWidth} 
          height={screenHeight} 
          leafCount={20}
        />
      </Box>
      
      {/* Content Layer */}
      <Box flexDirection="column" padding={2} position="relative">
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
          Navigate the grid with arrow keys - Enter to explore
        </Text>
      </Box>

      <Box marginBottom={2} justifyContent="center" borderStyle="round" borderColor="yellow" paddingX={2}>
        <Text bold color="yellow">Press 'T' anytime for Theme Showcase (6 themes available)</Text>
      </Box>

      {/* Scroll indicator - top */}
      {scrollOffset > 0 && (
        <Box justifyContent="center" marginBottom={1}>
          <Text color={theme.colors.primary}>--- Scroll up for more (k/up) ---</Text>
        </Box>
      )}

      {/* Scrollable Grid with more spacing - 2 columns, full width */}
      <Box flexDirection="column">
        {Array.from({ length: visibleEndRow - visibleStartRow }).map((_, rowOffset) => {
          const row = visibleStartRow + rowOffset;
          // Calculate dynamic column width based on screen size
          const colWidth = Math.floor((screenWidth - 12) / 2);
          return (
            <Box key={row} marginBottom={2}>
              {[0, 1].map((col) => {
                const index = row * cols + col;
                if (index >= items.length) {
                  return <Box key={col} width={colWidth} />;
                }

                const item = items[index];
                const isSelected = index === selectedIndex;

                return (
                  <Box
                    key={col}
                    width={colWidth}
                    marginRight={2}
                    borderStyle={isSelected ? 'double' : 'single'}
                    borderColor={isSelected ? theme.colors.primary : theme.colors.border}
                    paddingX={2}
                    paddingY={1}
                    flexDirection="column"
                  >
                    {/* Title with icon */}
                    <Box>
                      <Text color={isSelected ? theme.colors.primary : theme.colors.text}>
                        {isSelected ? '> ' : '  '}{item.icon} <Text bold>{item.title}</Text>
                      </Text>
                    </Box>

                    {/* Subtitle/Description */}
                    <Box marginTop={1}>
                      <Text dimColor wrap="truncate">{item.subtitle.split('\n')[0]}</Text>
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
          <Text color={theme.colors.primary}>--- Scroll down for more (j/down) ---</Text>
        </Box>
      )}

      {/* Footer with scroll indicator */}
      <Box marginTop={2} justifyContent="space-between" borderStyle="single" borderColor={theme.colors.border} paddingX={2}>
        <Text dimColor>
          {items.length} components - Arrow keys navigate - Enter select - Ctrl+C quit
        </Text>
        <Text dimColor>
          [{selectedIndex + 1}/{items.length}] Row {Math.floor(selectedIndex / cols) + 1}/{totalRows}
        </Text>
      </Box>
      </Box>
    </Box>
  );
};

#!/usr/bin/env node
import React from 'react';
import { render, Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

const App = () => {
  const items = [
    { label: '📊 Dashboard Demo', value: 'dashboard' },
    { label: '📝 Form Demo', value: 'form' },
    { label: '⏳ Progress Demo', value: 'progress' },
    { label: '🎮 Component Playground', value: 'playground' },
  ];

  const handleSelect = (item: { value: string }) => {
    console.log(`\nRun: pnpm --filter examples dev:${item.value}`);
    process.exit(0);
  };

  return (
    <Box flexDirection="column" padding={2}>
      <Box marginBottom={2}>
        <Text bold color="cyan">
          🎨 Siddcn Examples
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Text dimColor>
          Select an example to see the run command:
        </Text>
      </Box>

      <Box borderStyle="round" paddingX={2} paddingY={1}>
        <SelectInput items={items} onSelect={handleSelect} />
      </Box>

      <Box marginTop={2}>
        <Text dimColor>
          Or run directly: pnpm --filter examples dev:[name]
        </Text>
      </Box>
    </Box>
  );
};

render(<App />);

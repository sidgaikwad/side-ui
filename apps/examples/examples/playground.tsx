#!/usr/bin/env node
import React, { useState } from 'react';
import { render, Box, Text, useInput } from 'ink';
import { 
  SimpleButton, 
  PrimaryButton, 
  DangerButton,
  LinearProgress,
  StatusBadge,
  CountBadge,
  FileTree,
  BarChart
} from 'siddcn';

const Playground = () => {
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [progress, setProgress] = useState(75);

  const components = [
    'Buttons',
    'Progress',
    'Badges',
    'Trees',
    'Charts',
  ];

  useInput((input, key) => {
    if (key.upArrow || input === 'k') {
      setSelectedComponent((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow || input === 'j') {
      setSelectedComponent((prev) => Math.min(components.length - 1, prev + 1));
    } else if (input === '+') {
      setProgress((prev) => Math.min(100, prev + 10));
    } else if (input === '-') {
      setProgress((prev) => Math.max(0, prev - 10));
    }
  });

  const renderComponent = () => {
    switch (selectedComponent) {
      case 0:
        return (
          <Box flexDirection="column" gap={1}>
            <SimpleButton label="Simple Button" />
            <Box marginTop={1}>
              <PrimaryButton label="Primary Button" />
            </Box>
            <Box marginTop={1}>
              <DangerButton label="Danger Button" />
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box flexDirection="column">
            <LinearProgress value={progress} max={100} animated={false} />
            <Box marginTop={1}>
              <Text dimColor>Use +/- to adjust progress</Text>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box flexDirection="column" gap={1}>
            <Box>
              <StatusBadge status="success" />
              <Text>  </Text>
              <StatusBadge status="warning" />
              <Text>  </Text>
              <StatusBadge status="error" />
            </Box>
            <Box marginTop={1}>
              <CountBadge count={42} />
              <Text>  </Text>
              <CountBadge count={99} />
            </Box>
          </Box>
        );
      case 3:
        return <FileTree />;
      case 4:
        return <BarChart />;
      default:
        return null;
    }
  };

  return (
    <Box flexDirection="column" padding={2}>
      <Box borderStyle="double" borderColor="cyan" paddingX={2} paddingY={1} marginBottom={2}>
        <Text bold color="cyan">
          🎮 Component Playground
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Box width={30} flexDirection="column" borderStyle="round" paddingX={2} paddingY={1} marginRight={2}>
          <Text bold marginBottom={1}>Components</Text>
          {components.map((comp, idx) => (
            <Box key={idx}>
              <Text color={idx === selectedComponent ? 'cyan' : 'white'}>
                {idx === selectedComponent ? '▶ ' : '  '}
                {comp}
              </Text>
            </Box>
          ))}
        </Box>

        <Box flex={1} flexDirection="column" borderStyle="round" paddingX={2} paddingY={1}>
          <Text bold marginBottom={1}>Preview</Text>
          {renderComponent()}
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text dimColor>
          ↑↓ or j/k to navigate • +/- for progress • Ctrl+C to exit
        </Text>
      </Box>
    </Box>
  );
};

render(<Playground />);

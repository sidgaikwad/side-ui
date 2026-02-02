import React from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';

export interface ProgressProps {
  value?: number;
  max?: number;
  percentage?: number;
}

export const LinearProgress: React.FC<ProgressProps> = ({ value = 75, max = 100 }) => {
  const percentage = Math.round((value / max) * 100);
  const filled = Math.round((percentage / 100) * 30);
  const empty = 30 - filled;

  return (
    <Box flexDirection="column">
      <Text>
        <Text color="green">{'█'.repeat(filled)}</Text>
        <Text dimColor>{'░'.repeat(empty)}</Text>
        {' '}
        <Text color="cyan">{percentage}%</Text>
      </Text>
      <Text dimColor>Linear Progress Bar</Text>
    </Box>
  );
};

export const CircularProgress: React.FC<ProgressProps> = ({ percentage = 60 }) => {
  return (
    <Box flexDirection="column">
      <Box>
        <Text color="green">
          <Spinner type="dots" />
        </Text>
        <Text> </Text>
        <Text color="cyan">{percentage}%</Text>
      </Box>
      <Text dimColor>Circular Progress Indicator</Text>
    </Box>
  );
};

export const StepProgress: React.FC = () => {
  return (
    <Box flexDirection="column">
      <Box>
        <Text color="green">✓</Text>
        <Text> ━━ </Text>
        <Text color="green">✓</Text>
        <Text> ━━ </Text>
        <Text color="cyan">●</Text>
        <Text dimColor> ━━ </Text>
        <Text dimColor>○</Text>
      </Box>
      <Box marginTop={1}>
        <Text color="green">Step 1</Text>
        <Text>    </Text>
        <Text color="green">Step 2</Text>
        <Text>    </Text>
        <Text color="cyan" bold>Step 3</Text>
        <Text>    </Text>
        <Text dimColor>Step 4</Text>
      </Box>
      <Text dimColor marginTop={1}>Multi-step Progress</Text>
    </Box>
  );
};

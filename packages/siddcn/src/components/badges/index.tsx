import React from 'react';
import { Box, Text } from 'ink';

export interface BadgeProps {
  status?: 'success' | 'warning' | 'error' | 'info';
  count?: number;
  color?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status = 'success' }) => {
  const colors = {
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue'
  };

  const labels = {
    success: 'Active',
    warning: 'Pending',
    error: 'Error',
    info: 'Info'
  };

  return (
    <Box>
      <Box borderStyle="round" paddingX={1}>
        <Text color={colors[status]}>{labels[status]}</Text>
      </Box>
    </Box>
  );
};

export const CountBadge: React.FC<BadgeProps> = ({ count = 42 }) => {
  return (
    <Box>
      <Box borderStyle="round" paddingX={1}>
        <Text color="cyan" bold>{count}</Text>
      </Box>
    </Box>
  );
};

export const DotBadge: React.FC<BadgeProps> = ({ color = 'green' }) => {
  return (
    <Box>
      <Text color={color}>●</Text>
      <Text> Online</Text>
    </Box>
  );
};

import React from 'react';
import { Box, Text } from 'ink';
import { getTheme } from '../../utils/theme';

export interface BadgeProps {
  status?: 'success' | 'warning' | 'error' | 'info';
  count?: number;
  color?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status = 'success' }) => {
  const theme = getTheme();
  
  const colors = {
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
    info: theme.colors.info
  };

  const labels = {
    success: 'Active',
    warning: 'Pending',
    error: 'Error',
    info: 'Info'
  };

  return (
    <Box>
      <Box borderStyle={theme.borderStyle} borderColor={colors[status]} paddingX={1}>
        <Text color={colors[status]}>{labels[status]}</Text>
      </Box>
    </Box>
  );
};

export const CountBadge: React.FC<BadgeProps> = ({ count = 42 }) => {
  const theme = getTheme();
  return (
    <Box>
      <Box borderStyle={theme.borderStyle} borderColor={theme.colors.primary} paddingX={1}>
        <Text color={theme.colors.primary} bold>{count}</Text>
      </Box>
    </Box>
  );
};

export const DotBadge: React.FC<BadgeProps> = ({ color }) => {
  const theme = getTheme();
  const dotColor = color || theme.colors.success;
  return (
    <Box>
      <Text color={dotColor}>●</Text>
      <Text> Online</Text>
    </Box>
  );
};

import React from 'react';
import { Box, Text } from 'ink';
import { getTheme } from '../../utils/theme';

export interface ButtonProps {
  label?: string;
  onPress?: () => void;
}

export const SimpleButton: React.FC<ButtonProps> = ({ label = 'Button' }) => {
  const theme = getTheme();
  return (
    <Box borderStyle={theme.borderStyle} borderColor={theme.colors.border} paddingX={2}>
      <Text color={theme.colors.text}>{label}</Text>
    </Box>
  );
};

export const PrimaryButton: React.FC<ButtonProps> = ({ label = 'Primary' }) => {
  const theme = getTheme();
  return (
    <Box borderStyle="double" borderColor={theme.colors.primary} paddingX={2}>
      <Text bold color={theme.colors.primary}>{label}</Text>
    </Box>
  );
};

export const DangerButton: React.FC<ButtonProps> = ({ label = 'Delete' }) => {
  const theme = getTheme();
  return (
    <Box borderStyle={theme.borderStyle} borderColor={theme.colors.error} paddingX={2}>
      <Text bold color={theme.colors.error}>{label}</Text>
    </Box>
  );
};

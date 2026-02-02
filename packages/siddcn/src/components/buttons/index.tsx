import React from 'react';
import { Box, Text } from 'ink';

export interface ButtonProps {
  label?: string;
  onPress?: () => void;
}

export const SimpleButton: React.FC<ButtonProps> = ({ label = 'Button' }) => {
  return (
    <Box borderStyle="single" paddingX={2}>
      <Text>{label}</Text>
    </Box>
  );
};

export const PrimaryButton: React.FC<ButtonProps> = ({ label = 'Primary' }) => {
  return (
    <Box borderStyle="double" paddingX={2}>
      <Text bold color="blue">{label}</Text>
    </Box>
  );
};

export const DangerButton: React.FC<ButtonProps> = ({ label = 'Delete' }) => {
  return (
    <Box borderStyle="single" paddingX={2}>
      <Text bold color="red">{label}</Text>
    </Box>
  );
};

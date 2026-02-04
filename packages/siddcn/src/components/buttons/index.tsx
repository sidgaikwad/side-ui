import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { getTheme } from '../../utils/theme';

export interface ButtonProps {
  label?: string;
  onPress?: () => void;
  loading?: boolean;
}

export const SimpleButton: React.FC<ButtonProps> = ({ label = 'Button' }) => {
  const theme = getTheme();
  return (
    <Box borderStyle={theme.borderStyle} borderColor={theme.colors.border} paddingX={2}>
      <Text color={theme.colors.text}>{label}</Text>
    </Box>
  );
};

export const PrimaryButton: React.FC<ButtonProps> = ({ label = 'Primary', loading }) => {
  const theme = getTheme();
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 200);
    return () => clearInterval(timer);
  }, [loading]);

  return (
    <Box borderStyle="double" borderColor={theme.colors.primary} paddingX={2}>
      <Text bold color={theme.colors.primary}>
        {loading ? `Loading${dots}` : label}
      </Text>
    </Box>
  );
};

export const DangerButton: React.FC<ButtonProps> = ({ label = 'Delete' }) => {
  const theme = getTheme();
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlash(f => !f);
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box borderStyle={theme.borderStyle} borderColor={theme.colors.error} paddingX={2}>
      <Text bold={flash} color={theme.colors.error}>{label}</Text>
    </Box>
  );
};

// New animated button variants
export const GlowButton: React.FC<ButtonProps> = ({ label = 'Glow' }) => {
  const theme = getTheme();
  const [borderIdx, setBorderIdx] = useState(0);
  const borders: ('single' | 'double' | 'round' | 'bold')[] = ['single', 'double', 'round', 'bold'];

  useEffect(() => {
    const timer = setInterval(() => {
      setBorderIdx(i => (i + 1) % borders.length);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box borderStyle={borders[borderIdx]} borderColor={theme.colors.primary} paddingX={2}>
      <Text bold color={theme.colors.primary}>{label}</Text>
    </Box>
  );
};

export const PulseButton: React.FC<ButtonProps> = ({ label = 'Pulse' }) => {
  const theme = getTheme();
  const [bright, setBright] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setBright(b => !b);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box 
      borderStyle={theme.borderStyle} 
      borderColor={bright ? theme.colors.primary : theme.colors.border} 
      paddingX={2}
    >
      <Text bold={bright} color={bright ? theme.colors.primary : theme.colors.dimText}>
        {label}
      </Text>
    </Box>
  );
};

export const IconButton: React.FC<ButtonProps & { icon?: string }> = ({ 
  label = 'Action', 
  icon = '>' 
}) => {
  const theme = getTheme();
  
  return (
    <Box borderStyle={theme.borderStyle} borderColor={theme.colors.primary} paddingX={2}>
      <Text color={theme.colors.primary}>{icon} </Text>
      <Text bold color={theme.colors.text}>{label}</Text>
    </Box>
  );
};

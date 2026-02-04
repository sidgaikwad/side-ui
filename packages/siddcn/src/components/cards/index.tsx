import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { getTheme } from '../../utils/theme';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'outline' | 'filled' | 'gradient';
  footer?: React.ReactNode;
}

export const BasicCard: React.FC<CardProps> = ({
  title = 'Card Title',
  subtitle,
  children,
  footer,
}) => {
  const theme = getTheme();

  return (
    <Box 
      flexDirection="column" 
      borderStyle={theme.borderStyle} 
      borderColor={theme.colors.border}
      paddingX={2}
      paddingY={1}
    >
      <Text color={theme.colors.primary} bold>{title}</Text>
      {subtitle && <Text dimColor>{subtitle}</Text>}
      {children && <Box marginTop={1}>{children}</Box>}
      {footer && (
        <Box marginTop={1} borderStyle="single" borderColor={theme.colors.dimText} borderTop borderBottom={false} borderLeft={false} borderRight={false} paddingTop={1}>
          {footer}
        </Box>
      )}
    </Box>
  );
};

export const InfoCard: React.FC<CardProps> = ({
  title = 'Information',
  children,
}) => {
  const theme = getTheme();

  return (
    <Box 
      flexDirection="column" 
      borderStyle="double" 
      borderColor={theme.colors.info}
      paddingX={2}
      paddingY={1}
    >
      <Box>
        <Text color={theme.colors.info}>i </Text>
        <Text color={theme.colors.info} bold>{title}</Text>
      </Box>
      {children && <Box marginTop={1}>{children}</Box>}
    </Box>
  );
};

export const WarningCard: React.FC<CardProps> = ({
  title = 'Warning',
  children,
}) => {
  const theme = getTheme();
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlash(f => !f);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box 
      flexDirection="column" 
      borderStyle="bold" 
      borderColor={theme.colors.warning}
      paddingX={2}
      paddingY={1}
    >
      <Box>
        <Text color={theme.colors.warning}>{flash ? '!' : ' '} </Text>
        <Text color={theme.colors.warning} bold>{title}</Text>
      </Box>
      {children && <Box marginTop={1}>{children}</Box>}
    </Box>
  );
};

export const SuccessCard: React.FC<CardProps> = ({
  title = 'Success',
  children,
}) => {
  const theme = getTheme();

  return (
    <Box 
      flexDirection="column" 
      borderStyle="round" 
      borderColor={theme.colors.success}
      paddingX={2}
      paddingY={1}
    >
      <Box>
        <Text color={theme.colors.success}>+ </Text>
        <Text color={theme.colors.success} bold>{title}</Text>
      </Box>
      {children && <Box marginTop={1}>{children}</Box>}
    </Box>
  );
};

export const ErrorCard: React.FC<CardProps> = ({
  title = 'Error',
  children,
}) => {
  const theme = getTheme();
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlash(f => !f);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box 
      flexDirection="column" 
      borderStyle="bold" 
      borderColor={theme.colors.error}
      paddingX={2}
      paddingY={1}
    >
      <Box>
        <Text color={theme.colors.error}>{flash ? 'x' : ' '} </Text>
        <Text color={theme.colors.error} bold>{title}</Text>
      </Box>
      {children && <Box marginTop={1}>{children}</Box>}
    </Box>
  );
};

export const StatsCard: React.FC<{
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
}> = ({ label, value, change, positive }) => {
  const theme = getTheme();

  return (
    <Box 
      flexDirection="column" 
      borderStyle={theme.borderStyle} 
      borderColor={theme.colors.border}
      paddingX={2}
      paddingY={1}
    >
      <Text dimColor>{label}</Text>
      <Text color={theme.colors.primary} bold>{value}</Text>
      {change && (
        <Text color={positive ? theme.colors.success : theme.colors.error}>
          {positive ? '+' : ''}{change}
        </Text>
      )}
    </Box>
  );
};

// Animated gradient border card
export const GlowCard: React.FC<CardProps> = ({
  title = 'Glowing Card',
  children,
}) => {
  const theme = getTheme();
  const [borderChar, setBorderChar] = useState(0);
  const borders: ('single' | 'double' | 'round' | 'bold')[] = ['single', 'double', 'round', 'bold'];

  useEffect(() => {
    const timer = setInterval(() => {
      setBorderChar(c => (c + 1) % borders.length);
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box 
      flexDirection="column" 
      borderStyle={borders[borderChar]} 
      borderColor={theme.colors.primary}
      paddingX={2}
      paddingY={1}
    >
      <Text color={theme.colors.primary} bold>{title}</Text>
      {children && <Box marginTop={1}>{children}</Box>}
    </Box>
  );
};

// Preview component for registry
export const CardPreview: React.FC = () => {
  const theme = getTheme();

  return (
    <Box 
      borderStyle={theme.borderStyle} 
      borderColor={theme.colors.border}
      paddingX={2}
      paddingY={1}
      flexDirection="column"
    >
      <Text color={theme.colors.primary} bold>Card Title</Text>
      <Text dimColor>Content here...</Text>
    </Box>
  );
};

import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { getTheme } from '../../utils/theme';

export interface NotificationProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
}

// Toast notification
export const Toast: React.FC<NotificationProps> = ({
  type = 'info',
  title,
  message = 'Notification message',
  duration = 3000,
  onClose,
}) => {
  const theme = getTheme();
  const [visible, setVisible] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Fade in effect
    setTimeout(() => setFadeIn(true), 50);
    
    // Auto dismiss
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  const colors = {
    info: theme.colors.info,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
  };

  const icons = {
    info: 'i',
    success: '+',
    warning: '!',
    error: 'x',
  };

  const borderColor = colors[type];

  return (
    <Box 
      flexDirection="column"
      borderStyle={fadeIn ? 'round' : 'single'}
      borderColor={borderColor}
      paddingX={2}
      paddingY={0}
    >
      <Box>
        <Text color={borderColor} bold>[{icons[type]}] </Text>
        <Text color={borderColor} bold>{title || type.charAt(0).toUpperCase() + type.slice(1)}</Text>
      </Box>
      <Box>
        <Text>{message}</Text>
      </Box>
    </Box>
  );
};

// Banner notification
export const Banner: React.FC<NotificationProps> = ({
  type = 'info',
  message = 'This is a banner notification',
}) => {
  const theme = getTheme();
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    if (type === 'warning' || type === 'error') {
      const timer = setInterval(() => {
        setFlash(f => !f);
      }, 800);
      return () => clearInterval(timer);
    }
  }, [type]);

  const colors = {
    info: theme.colors.info,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
  };

  const icons = {
    info: '>>',
    success: '++',
    warning: '!!',
    error: 'XX',
  };

  return (
    <Box paddingX={2} paddingY={0}>
      <Text color={colors[type]} bold={flash}>
        {icons[type]} {message}
      </Text>
    </Box>
  );
};

// Inline notification
export const InlineNotification: React.FC<NotificationProps> = ({
  type = 'info',
  message = 'Inline notification',
}) => {
  const theme = getTheme();

  const colors = {
    info: theme.colors.info,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
  };

  const prefixes = {
    info: '[i]',
    success: '[ok]',
    warning: '[!]',
    error: '[x]',
  };

  return (
    <Box>
      <Text color={colors[type]} bold>{prefixes[type]} </Text>
      <Text color={colors[type]}>{message}</Text>
    </Box>
  );
};

// Progress notification
export const ProgressNotification: React.FC<{
  title?: string;
  progress?: number;
  status?: string;
}> = ({
  title = 'Processing',
  progress = 0,
  status = 'In progress...',
}) => {
  const theme = getTheme();
  const barWidth = 20;
  const filled = Math.round((progress / 100) * barWidth);
  const empty = barWidth - filled;

  return (
    <Box 
      flexDirection="column"
      borderStyle="round"
      borderColor={theme.colors.primary}
      paddingX={2}
      paddingY={0}
    >
      <Text color={theme.colors.primary} bold>{title}</Text>
      <Box>
        <Text color={theme.colors.success}>{'█'.repeat(filled)}</Text>
        <Text dimColor>{'░'.repeat(empty)}</Text>
        <Text> {progress}%</Text>
      </Box>
      <Text dimColor>{status}</Text>
    </Box>
  );
};

// Animated notification stack
export const NotificationStack: React.FC<{
  notifications: NotificationProps[];
}> = ({ notifications }) => {
  return (
    <Box flexDirection="column">
      {notifications.map((notif, idx) => (
        <Box key={idx} marginBottom={1}>
          <Toast {...notif} />
        </Box>
      ))}
    </Box>
  );
};

// Preview for registry
export const NotificationPreview: React.FC = () => {
  const theme = getTheme();
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlash(f => !f);
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box 
      borderStyle="round"
      borderColor={theme.colors.success}
      paddingX={1}
    >
      <Text color={theme.colors.success} bold={flash}>[+] Success</Text>
    </Box>
  );
};

import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { getTheme } from '../../utils/theme';

export interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  label?: string;
  mask?: boolean;
}

export const BasicInput: React.FC<TextInputProps> = ({
  placeholder = 'Type here...',
  value: controlledValue,
  onChange,
  onSubmit,
  label,
}) => {
  const theme = getTheme();
  const [value, setValue] = useState(controlledValue || '');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timer = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onSubmit?.(value);
      return;
    }
    if (key.backspace || key.delete) {
      const newValue = value.slice(0, -1);
      setValue(newValue);
      onChange?.(newValue);
      return;
    }
    if (input && !key.ctrl && !key.meta) {
      const newValue = value + input;
      setValue(newValue);
      onChange?.(newValue);
    }
  });

  return (
    <Box flexDirection="column">
      {label && (
        <Box marginBottom={1}>
          <Text color={theme.colors.primary} bold>{label}</Text>
        </Box>
      )}
      <Box 
        borderStyle={theme.borderStyle} 
        borderColor={theme.colors.border} 
        paddingX={1}
      >
        <Text>
          {value || <Text dimColor>{placeholder}</Text>}
          <Text color={theme.colors.primary}>{cursorVisible ? '█' : ' '}</Text>
        </Text>
      </Box>
    </Box>
  );
};

export const PasswordInput: React.FC<TextInputProps> = ({
  placeholder = 'Enter password...',
  value: controlledValue,
  onChange,
  onSubmit,
  label = 'Password',
}) => {
  const theme = getTheme();
  const [value, setValue] = useState(controlledValue || '');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onSubmit?.(value);
      return;
    }
    if (key.backspace || key.delete) {
      const newValue = value.slice(0, -1);
      setValue(newValue);
      onChange?.(newValue);
      return;
    }
    if (input && !key.ctrl && !key.meta) {
      const newValue = value + input;
      setValue(newValue);
      onChange?.(newValue);
    }
  });

  const masked = '•'.repeat(value.length);

  return (
    <Box flexDirection="column">
      {label && (
        <Box marginBottom={1}>
          <Text color={theme.colors.primary} bold>{label}</Text>
        </Box>
      )}
      <Box 
        borderStyle={theme.borderStyle} 
        borderColor={theme.colors.border} 
        paddingX={1}
      >
        <Text>
          {masked || <Text dimColor>{placeholder}</Text>}
          <Text color={theme.colors.primary}>{cursorVisible ? '█' : ' '}</Text>
        </Text>
      </Box>
    </Box>
  );
};

export const SearchInput: React.FC<TextInputProps> = ({
  placeholder = 'Search...',
  value: controlledValue,
  onChange,
  onSubmit,
}) => {
  const theme = getTheme();
  const [value, setValue] = useState(controlledValue || '');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onSubmit?.(value);
      return;
    }
    if (key.backspace || key.delete) {
      const newValue = value.slice(0, -1);
      setValue(newValue);
      onChange?.(newValue);
      return;
    }
    if (input && !key.ctrl && !key.meta) {
      const newValue = value + input;
      setValue(newValue);
      onChange?.(newValue);
    }
  });

  return (
    <Box flexDirection="column">
      <Box 
        borderStyle="round" 
        borderColor={theme.colors.primary} 
        paddingX={1}
      >
        <Text color={theme.colors.primary}>/ </Text>
        <Text>
          {value || <Text dimColor>{placeholder}</Text>}
          <Text color={theme.colors.primary}>{cursorVisible ? '█' : ' '}</Text>
        </Text>
      </Box>
    </Box>
  );
};

// Preview component for registry
export const TextInputPreview: React.FC = () => {
  const theme = getTheme();
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box 
      borderStyle={theme.borderStyle} 
      borderColor={theme.colors.border} 
      paddingX={1}
    >
      <Text dimColor>Type here... </Text>
      <Text color={theme.colors.primary}>{cursorVisible ? '█' : ' '}</Text>
    </Box>
  );
};

import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import { getTheme } from '../../utils/theme';

export interface ProgressProps {
  value?: number;
  max?: number;
  percentage?: number;
  animated?: boolean;
}

export const LinearProgress: React.FC<ProgressProps> = ({ value, max = 100, animated = true }) => {
  const theme = getTheme();
  const [currentValue, setCurrentValue] = useState(value || 0);

  useEffect(() => {
    if (!animated) {
      setCurrentValue(value || 75);
      return;
    }

    // Animate from 0 to target value
    const targetValue = value || 75;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCurrentValue(targetValue);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [value, animated]);

  const percentage = Math.round((currentValue / max) * 100);
  const filled = Math.round((percentage / 100) * 30);
  const empty = 30 - filled;

  return (
    <Box flexDirection="column">
      <Text>
        <Text color={theme.colors.success}>{'█'.repeat(filled)}</Text>
        <Text dimColor>{'░'.repeat(empty)}</Text>
        {' '}
        <Text color={theme.colors.primary}>{percentage}%</Text>
      </Text>
      <Text dimColor>Linear Progress Bar (Animated)</Text>
    </Box>
  );
};

export const CircularProgress: React.FC<ProgressProps> = ({ percentage, animated = true }) => {
  const theme = getTheme();
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    if (!animated) {
      setCurrentPercentage(percentage || 60);
      return;
    }

    const targetPercentage = percentage || 60;
    const duration = 2000;
    const steps = 60;
    const increment = targetPercentage / steps;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetPercentage) {
        setCurrentPercentage(targetPercentage);
        clearInterval(timer);
      } else {
        setCurrentPercentage(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [percentage, animated]);

  return (
    <Box flexDirection="column">
      <Box>
        <Text color={theme.colors.success}>
          <Spinner type="dots" />
        </Text>
        <Text> </Text>
        <Text color={theme.colors.primary}>{currentPercentage}%</Text>
      </Box>
      <Text dimColor>Circular Progress (Animated)</Text>
    </Box>
  );
};

export const StepProgress: React.FC = () => {
  const theme = getTheme();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const steps = [0, 1, 2, 3];
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 3) return 0;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const stepIcons = ['○', '●', '✓', '✓'];
  const stepColors = [
    theme.colors.dimText,
    theme.colors.primary,
    theme.colors.success,
    theme.colors.success,
  ];

  return (
    <Box flexDirection="column">
      <Box>
        {[0, 1, 2, 3].map((step, idx) => (
          <React.Fragment key={step}>
            {idx > 0 && (
              <Text color={step <= currentStep ? theme.colors.success : theme.colors.dimText}>
                {' ━━ '}
              </Text>
            )}
            <Text color={step <= currentStep ? stepColors[step] : theme.colors.dimText}>
              {step < currentStep ? '✓' : step === currentStep ? '●' : '○'}
            </Text>
          </React.Fragment>
        ))}
      </Box>
      <Box marginTop={1}>
        {['Step 1', 'Step 2', 'Step 3', 'Step 4'].map((label, idx) => (
          <Text
            key={idx}
            color={idx <= currentStep ? (idx < currentStep ? theme.colors.success : theme.colors.primary) : theme.colors.dimText}
            bold={idx === currentStep}
          >
            {label}
            {idx < 3 && '    '}
          </Text>
        ))}
      </Box>
      <Text dimColor marginTop={1}>Multi-step Progress (Animated)</Text>
    </Box>
  );
};

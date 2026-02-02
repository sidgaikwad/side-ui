import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import gradient from 'gradient-string';
import { nanoid } from 'nanoid';

interface LoaderScreenProps {
  onComplete: () => void;
}

export const LoaderScreen: React.FC<LoaderScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    const steps = [
      { delay: 300, progress: 20, status: 'Loading components...' },
      { delay: 500, progress: 50, status: 'Building registry...' },
      { delay: 400, progress: 75, status: 'Preparing navigation...' },
      { delay: 300, progress: 100, status: 'Ready!' }
    ];

    let currentStep = 0;

    const runNextStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setTimeout(() => {
          setProgress(step.progress);
          setStatus(step.status);
          currentStep++;
          
          if (currentStep === steps.length) {
            setTimeout(onComplete, 500);
          } else {
            runNextStep();
          }
        }, step.delay);
      }
    };

    runNextStep();
  }, [onComplete]);

  const barLength = 40;
  const filled = Math.round((progress / 100) * barLength);
  const empty = barLength - filled;

  return (
    <Box flexDirection="column" padding={2}>
      <Box justifyContent="center" marginBottom={2}>
        <Text>
          {gradient.pastel.multiline(`
███████╗██╗██████╗ ██████╗  ██████╗███╗   ██╗
██╔════╝██║██╔══██╗██╔══██╗██╔════╝████╗  ██║
███████╗██║██║  ██║██║  ██║██║     ██╔██╗ ██║
╚════██║██║██║  ██║██║  ██║██║     ██║╚██╗██║
███████║██║██████╔╝██████╔╝╚██████╗██║ ╚████║
╚══════╝╚═╝╚═════╝ ╚═════╝  ╚═════╝╚═╝  ╚═══╝
          `)}
        </Text>
      </Box>

      <Box justifyContent="center" marginBottom={1}>
        <Text color="cyan" bold>Terminal UI Component Library</Text>
      </Box>

      <Box justifyContent="center" marginBottom={2}>
        <Text dimColor>Press Ctrl+C to exit anytime</Text>
      </Box>

      <Box flexDirection="column" borderStyle="round" paddingX={2} paddingY={1}>
        <Box marginBottom={1}>
          <Text color="green">
            <Spinner type="dots" />
          </Text>
          <Text> </Text>
          <Text>{status}</Text>
        </Box>

        <Box>
          <Text color="cyan">[</Text>
          <Text color="green">{'█'.repeat(filled)}</Text>
          <Text dimColor>{'░'.repeat(empty)}</Text>
          <Text color="cyan">]</Text>
          <Text> </Text>
          <Text color="yellow">{progress}%</Text>
        </Box>
      </Box>
    </Box>
  );
};

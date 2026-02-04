import React, { useState, useEffect } from "react";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";
import gradient from "gradient-string";
import { StaticDiagonalPattern } from '../components/backgrounds';

interface LoaderScreenProps {
  onComplete: () => void;
}

export const LoaderScreen: React.FC<LoaderScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing...");
  
  // Screen dimensions for full screen background
  const screenWidth = 100;
  const screenHeight = 30;

  useEffect(() => {
    let isMounted = true;

    const steps = [
      { delay: 300, progress: 20, status: "Loading components..." },
      { delay: 500, progress: 50, status: "Building registry..." },
      { delay: 400, progress: 75, status: "Preparing navigation..." },
      { delay: 300, progress: 100, status: "Ready!" },
    ];

    const runSequence = async () => {
      // Iterate through steps sequentially
      for (const step of steps) {
        if (!isMounted) return;

        // Wait for the specific step delay
        await new Promise((resolve) => setTimeout(resolve, step.delay));

        if (isMounted) {
          setProgress(step.progress);
          setStatus(step.status);
        }
      }

      // Small pause at 100% before triggering completion
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (isMounted) {
        onComplete();
      }
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, []);

  const barLength = 40;
  const filled = Math.round((progress / 100) * barLength);
  const empty = barLength - filled;

  return (
    <Box flexDirection="column" width={screenWidth} minHeight={screenHeight}>
      {/* Full Screen Static Background Pattern - No animation to prevent rerenders */}
      <Box position="absolute" marginTop={0} marginLeft={0}>
        <StaticDiagonalPattern 
          width={screenWidth} 
          height={screenHeight} 
          density={0.06}
        />
      </Box>
      
      {/* Content Layer */}
      <Box flexDirection="column" padding={2} alignItems="center" width="100%" position="relative">
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
        <Text color="cyan" bold>
          Terminal UI Component Library
        </Text>
      </Box>

      <Box justifyContent="center" marginBottom={2}>
        <Text dimColor>Press Ctrl+C to exit anytime</Text>
      </Box>

      {/* Fixed width container to prevent jitter */}
      <Box
        flexDirection="column"
        borderStyle="round"
        borderColor="gray"
        paddingX={2}
        paddingY={1}
        width={60}
      >
        <Box marginBottom={1}>
          <Text color="green">
            <Spinner type="dots" />
          </Text>
          <Text> </Text>
          <Text>{status}</Text>
        </Box>

        <Box>
          <Text color="cyan">[</Text>
          <Text color="green">{"█".repeat(filled)}</Text>
          <Text dimColor>{"░".repeat(empty)}</Text>
          <Text color="cyan">]</Text>
          <Text> </Text>
          <Text color="yellow">{progress}%</Text>
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

import React, { useState, useEffect } from "react";
import { Box, Text } from "ink";
import Spinner from "../components/spinner.js";
import gradient from "gradient-string";

export const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("Initializing");

  const stages = [
    "Initializing siddcn",
    "Loading Components",
    "Setting up Themes",
    "Preparing Interface",
    "Ready!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;

        const stageIndex = Math.floor((next / 100) * (stages.length - 1));
        setStage(stages[stageIndex]);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const title = `
  ███████╗██╗██████╗ ██████╗  ██████╗███╗   ██╗
  ██╔════╝██║██╔══██╗██╔══██╗██╔════╝████╗  ██║
  ███████╗██║██║  ██║██║  ██║██║     ██╔██╗ ██║
  ╚════██║██║██║  ██║██║  ██║██║     ██║╚██╗██║
  ███████║██║██████╔╝██████╔╝╚██████╗██║ ╚████║
  ╚══════╝╚═╝╚═════╝ ╚═════╝  ╚═════╝╚═╝  ╚═══╝
  `;

  const barWidth = 50;
  const filledWidth = Math.floor((progress / 100) * barWidth);
  const bar = "█".repeat(filledWidth) + "░".repeat(barWidth - filledWidth);

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={20}
    >
      <Text color="#00A8E8">{title}</Text>

      <Box marginBottom={1} marginTop={1}>
        <Text color="#FFD700" bold>
          Terminal UI Component Library
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Spinner style="dots2" color="#00A8E8" />
        <Box marginLeft={1}>
          <Text>{stage}</Text>
        </Box>
      </Box>

      <Box marginBottom={1}>
        <Text>[</Text>
        <Text color="#00A8E8">{bar.slice(0, filledWidth)}</Text>
        <Text dimColor>{bar.slice(filledWidth)}</Text>
        <Text>] </Text>
        <Text color="#FFD700" bold>
          {progress}%
        </Text>
      </Box>

      <Box marginTop={2}>
        <Text dimColor color="#6C757D">
          Version 1.0.0 • Inspired by shadcn/ui
        </Text>
      </Box>
    </Box>
  );
};

export default Loader;

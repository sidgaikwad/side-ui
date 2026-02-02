import React from "react";
import { Box, Text } from "ink";
import { getTheme } from "../themes/index.js";
import BoxComponent from "../utils/Box.js";

export const InstallationAccordion = ({ componentName, isOpen }) => {
  const theme = getTheme();

  if (!isOpen) {
    return (
      <Box marginTop={1}>
        <Text color="#00FFFF">
          Press{" "}
          <Text bold color="#FFD700">
            i
          </Text>{" "}
          for installation instructions
        </Text>
      </Box>
    );
  }

  return (
    <Box marginTop={1}>
      <BoxComponent
        title="Installation & Usage"
        borderStyle="rounded"
        width={70}
      >
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text color="#FFD700" bold>
              Step 1:{" "}
            </Text>
            <Text>Install the siddcn CLI</Text>
          </Box>
          <Box marginLeft={2} marginBottom={1}>
            <Text color="#00FF41">$ npm install -g siddcn</Text>
          </Box>

          <Box marginBottom={1}>
            <Text color="#FFD700" bold>
              Step 2:{" "}
            </Text>
            <Text>Initialize your project (if not already done)</Text>
          </Box>
          <Box marginLeft={2} marginBottom={1}>
            <Text color="#00FF41">$ siddcn init</Text>
          </Box>

          <Box marginBottom={1}>
            <Text color="#FFD700" bold>
              Step 3:{" "}
            </Text>
            <Text>Add the {componentName} component</Text>
          </Box>
          <Box marginLeft={2} marginBottom={1}>
            <Text color="#00FF41">
              $ siddcn add {componentName.toLowerCase()}
            </Text>
          </Box>

          <Box
            marginTop={1}
            borderStyle="single"
            borderColor="gray"
            paddingX={1}
          >
            <Text dimColor>
              Press{" "}
              <Text bold color="#FFD700">
                i
              </Text>{" "}
              again to close • Visit siddcn.dev for docs
            </Text>
          </Box>
        </Box>
      </BoxComponent>
    </Box>
  );
};

export default InstallationAccordion;

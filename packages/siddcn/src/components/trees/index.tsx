import React from 'react';
import { Box, Text } from 'ink';

export const FileTree: React.FC = () => {
  return (
    <Box flexDirection="column">
      <Text color="cyan" bold>File Tree</Text>
      <Box marginTop={1} flexDirection="column">
        <Text>📁 project/</Text>
        <Text>  ├─ 📁 src/</Text>
        <Text>  │  ├─ 📄 index.ts</Text>
        <Text>  │  ├─ 📄 app.tsx</Text>
        <Text>  │  └─ 📁 components/</Text>
        <Text>  │     └─ 📄 Button.tsx</Text>
        <Text>  ├─ 📄 package.json</Text>
        <Text>  └─ 📄 README.md</Text>
      </Box>
    </Box>
  );
};

export const DataTree: React.FC = () => {
  return (
    <Box flexDirection="column">
      <Text color="cyan" bold>Data Tree</Text>
      <Box marginTop={1} flexDirection="column">
        <Text color="green">● Root Node</Text>
        <Text>  ├─ <Text color="yellow">● Child 1</Text></Text>
        <Text>  │  ├─ <Text dimColor>○ Leaf 1.1</Text></Text>
        <Text>  │  └─ <Text dimColor>○ Leaf 1.2</Text></Text>
        <Text>  ├─ <Text color="yellow">● Child 2</Text></Text>
        <Text>  │  └─ <Text dimColor>○ Leaf 2.1</Text></Text>
        <Text>  └─ <Text color="yellow">● Child 3</Text></Text>
      </Box>
    </Box>
  );
};

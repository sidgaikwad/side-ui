import React from 'react';
import { Box, Text, useInput } from 'ink';
import { getVariant } from '../components/registry';

interface ComponentDetailScreenProps {
  categoryId: string;
  variantId: string;
  accordionOpen: boolean;
  onToggleAccordion: () => void;
  onBack: () => void;
}

export const ComponentDetailScreen: React.FC<ComponentDetailScreenProps> = ({
  categoryId,
  variantId,
  accordionOpen,
  onToggleAccordion,
  onBack
}) => {
  const variant = getVariant(categoryId, variantId);

  useInput((input, key) => {
    if (input === 'i' || input === 'I') {
      onToggleAccordion();
    }
    if (key.escape) {
      onBack();
    }
  });

  if (!variant) {
    return (
      <Box padding={2}>
        <Text color="red">Component not found!</Text>
      </Box>
    );
  }

  const PreviewComponent = variant.preview;

  return (
    <Box flexDirection="column" padding={2}>
      <Box marginBottom={1}>
        <Text color="cyan" bold>
          {variant.name}
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Text dimColor>{variant.description}</Text>
      </Box>

      {/* Component Preview */}
      <Box 
        flexDirection="column" 
        borderStyle="double" 
        borderColor="cyan"
        paddingX={2} 
        paddingY={1}
        marginBottom={2}
      >
        <Box marginBottom={1}>
          <Text color="green" bold>Preview</Text>
        </Box>
        <PreviewComponent />
      </Box>

      {/* Accordion Toggle Hint */}
      <Box marginBottom={1}>
        <Text>
          <Text color="yellow">Press 'i'</Text>
          <Text> to {accordionOpen ? 'hide' : 'show'} installation & usage details</Text>
        </Text>
      </Box>

      {/* Accordion Content */}
      {accordionOpen && (
        <Box flexDirection="column" borderStyle="round" paddingX={2} paddingY={1} marginBottom={2}>
          {/* Installation */}
          <Box flexDirection="column" marginBottom={2}>
            <Text color="green" bold>📦 Installation</Text>
            <Box marginTop={1} paddingX={1}>
              <Text backgroundColor="gray">{variant.installCommand}</Text>
            </Box>
          </Box>

          {/* Usage */}
          <Box flexDirection="column" marginBottom={2}>
            <Text color="green" bold>💻 Usage</Text>
            <Box marginTop={1} paddingX={1} flexDirection="column">
              {variant.usage.split('\n').map((line, idx) => (
                <Text key={idx} dimColor={line.trim().startsWith('//')}>{line}</Text>
              ))}
            </Box>
          </Box>

          {/* Props (if available) */}
          {variant.props && Object.keys(variant.props).length > 0 && (
            <Box flexDirection="column">
              <Text color="green" bold>⚙️  Props</Text>
              <Box marginTop={1} flexDirection="column">
                {Object.entries(variant.props).map(([propName, propDef], idx) => (
                  <Box key={idx} marginY={0} paddingX={1}>
                    <Text color="cyan">{propName}</Text>
                    <Text>: </Text>
                    <Text color="yellow">{propDef.type}</Text>
                    {propDef.required && <Text color="red"> *</Text>}
                    {propDef.default && (
                      <>
                        <Text dimColor> = </Text>
                        <Text dimColor>{propDef.default}</Text>
                      </>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Navigation hints */}
      <Box marginTop={1}>
        <Text dimColor>
          Press Esc to go back • Press q to exit
        </Text>
      </Box>
    </Box>
  );
};

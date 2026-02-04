import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { getTheme } from "../../utils/theme";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const BasicSelect: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  const theme = getTheme();
  const [selectedIndex, setSelectedIndex] = useState(
    value ? options.findIndex((o) => o.value === value) : 0,
  );

  useInput((input, key) => {
    if (key.upArrow || input === "k") {
      setSelectedIndex((prev) => {
        let newIndex = Math.max(0, prev - 1);
        // Skip disabled options
        while (newIndex > 0 && options[newIndex].disabled) {
          newIndex--;
        }
        return newIndex;
      });
    } else if (key.downArrow || input === "j") {
      setSelectedIndex((prev) => {
        let newIndex = Math.min(options.length - 1, prev + 1);
        // Skip disabled options
        while (newIndex < options.length - 1 && options[newIndex].disabled) {
          newIndex++;
        }
        return newIndex;
      });
    } else if (key.return) {
      if (!options[selectedIndex].disabled) {
        onChange?.(options[selectedIndex].value);
      }
    }
  });

  return (
    <Box flexDirection="column">
      {label && (
        <Box marginBottom={1}>
          <Text color={theme.colors.primary} bold>
            {label}
          </Text>
        </Box>
      )}
      <Box
        flexDirection="column"
        borderStyle={theme.borderStyle}
        borderColor={theme.colors.border}
        paddingX={1}
      >
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          return (
            <Box key={option.value}>
              <Text
                color={
                  option.disabled
                    ? theme.colors.dimText
                    : isSelected
                      ? theme.colors.primary
                      : theme.colors.text
                }
                bold={isSelected}
              >
                {isSelected ? "> " : "  "}
                {option.label}
                {option.disabled && " (disabled)"}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export const RadioSelect: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  const theme = getTheme();
  const [selectedIndex, setSelectedIndex] = useState(
    value ? options.findIndex((o) => o.value === value) : 0,
  );
  const [confirmedIndex, setConfirmedIndex] = useState(-1);

  useInput((input, key) => {
    if (key.upArrow || input === "k") {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow || input === "j") {
      setSelectedIndex((prev) => Math.min(options.length - 1, prev + 1));
    } else if (key.return || input === " ") {
      setConfirmedIndex(selectedIndex);
      onChange?.(options[selectedIndex].value);
    }
  });

  return (
    <Box flexDirection="column">
      {label && (
        <Box marginBottom={1}>
          <Text color={theme.colors.primary} bold>
            {label}
          </Text>
        </Box>
      )}
      <Box flexDirection="column">
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          const isConfirmed = index === confirmedIndex;
          return (
            <Box key={option.value}>
              <Text
                color={isSelected ? theme.colors.primary : theme.colors.text}
              >
                {isConfirmed ? "(*)" : "( )"}
              </Text>
              <Text
                color={isSelected ? theme.colors.primary : theme.colors.text}
                bold={isSelected}
              >
                {" "}
                {option.label}
              </Text>
              {option.description && (
                <Text dimColor> - {option.description}</Text>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export const DropdownSelect: React.FC<SelectProps & { isOpen?: boolean }> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option...",
}) => {
  const theme = getTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    value ? options.findIndex((o) => o.value === value) : -1,
  );
  const [hoverIndex, setHoverIndex] = useState(Math.max(0, selectedIndex));

  useInput((input, key) => {
    if (key.return) {
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setSelectedIndex(hoverIndex);
        onChange?.(options[hoverIndex].value);
        setIsOpen(false);
      }
    } else if (key.escape) {
      setIsOpen(false);
    } else if (isOpen) {
      if (key.upArrow || input === "k") {
        setHoverIndex((prev) => Math.max(0, prev - 1));
      } else if (key.downArrow || input === "j") {
        setHoverIndex((prev) => Math.min(options.length - 1, prev + 1));
      }
    }
  });

  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;

  return (
    <Box flexDirection="column">
      {label && (
        <Box marginBottom={1}>
          <Text color={theme.colors.primary} bold>
            {label}
          </Text>
        </Box>
      )}

      {/* Dropdown trigger */}
      <Box
        borderStyle={theme.borderStyle}
        borderColor={isOpen ? theme.colors.primary : theme.colors.border}
        paddingX={1}
      >
        <Text color={selectedOption ? theme.colors.text : theme.colors.dimText}>
          {selectedOption?.label || placeholder}
        </Text>
        <Text color={theme.colors.dimText}> {isOpen ? "^" : "v"}</Text>
      </Box>

      {/* Dropdown menu */}
      {isOpen && (
        <Box
          flexDirection="column"
          borderStyle="single"
          borderColor={theme.colors.primary}
          marginTop={0}
        >
          {options.map((option, index) => {
            const isHovered = index === hoverIndex;
            return (
              <Box key={option.value} paddingX={1}>
                <Text
                  color={isHovered ? theme.colors.primary : theme.colors.text}
                  bold={isHovered}
                >
                  {isHovered ? "> " : "  "}
                  {option.label}
                </Text>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

// Preview component
export const SelectPreview: React.FC = () => {
  const theme = getTheme();

  return (
    <Box flexDirection="column">
      <Box>
        <Text color={theme.colors.primary}> </Text>
        <Text bold>Option 1</Text>
      </Box>
      <Box>
        <Text> Option 2</Text>
      </Box>
    </Box>
  );
};

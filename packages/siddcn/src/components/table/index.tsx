import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { getTheme } from '../../utils/theme';

export interface TableColumn {
  key: string;
  header: string;
  width: number;
}

export interface TableRow {
  [key: string]: string | number;
}

export interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  maxVisibleRows?: number;
  onSelect?: (row: TableRow, index: number) => void;
}

export const Table: React.FC<TableProps> = ({ 
  columns, 
  data,
  maxVisibleRows = 10,
  onSelect
}) => {
  const theme = getTheme();
  const [selected, setSelected] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useInput((input, key) => {
    if (key.upArrow) {
      const newSelected = Math.max(0, selected - 1);
      setSelected(newSelected);
      if (newSelected < scrollTop) {
        setScrollTop(newSelected);
      }
    } else if (key.downArrow) {
      const newSelected = Math.min(data.length - 1, selected + 1);
      setSelected(newSelected);
      if (newSelected >= scrollTop + maxVisibleRows) {
        setScrollTop(newSelected - maxVisibleRows + 1);
      }
    } else if (key.pageUp) {
      setSelected(prev => Math.max(0, prev - 8));
    } else if (key.pageDown) {
      setSelected(prev => Math.min(data.length - 1, prev + 8));
    } else if (input === 'g') {
      setSelected(0);
      setScrollTop(0);
    } else if (input === 'G') {
      setSelected(data.length - 1);
    } else if (key.return) {
      onSelect?.(data[selected], selected);
    }
  });

  const endRow = Math.min(data.length, scrollTop + maxVisibleRows);

  return (
    <Box flexDirection="column">
      {/* Header row */}
      <Box>
        {columns.map((col, index) => (
          <Text 
            key={col.key}
            color={theme.colors.primary} 
            bold
          >
            {col.header.padEnd(col.width)}
            {index < columns.length - 1 && ' │ '}
          </Text>
        ))}
      </Box>

      {/* Separator */}
      <Box>
        {columns.map((col, index) => (
          <Text key={col.key} color={theme.colors.border}>
            {'─'.repeat(col.width)}
            {index < columns.length - 1 && '─┼─'}
          </Text>
        ))}
      </Box>

      {/* Data rows */}
      <Box flexDirection="column">
        {data.slice(scrollTop, endRow).map((row, displayIndex) => {
          const actualIndex = scrollTop + displayIndex;
          const isSelected = actualIndex === selected;
          const isEven = actualIndex % 2 === 0;

          return (
            <Box key={actualIndex}>
              <Text color={isSelected ? theme.colors.primary : theme.colors.text} bold={isSelected}>
                {isSelected ? '▸ ' : '  '}
              </Text>
              {columns.map((col, colIndex) => {
                const cellValue = String(row[col.key] || '').padEnd(col.width);
                return (
                  <Text 
                    key={col.key}
                    color={
                      isSelected ? 'white' :
                      isEven ? theme.colors.text : 
                      theme.colors.dimText
                    }
                  >
                    {cellValue.slice(0, col.width)}
                    {colIndex < columns.length - 1 && ' │ '}
                  </Text>
                );
              })}
            </Box>
          );
        })}
      </Box>

      {/* Footer */}
      <Box marginTop={1}>
        <Text dimColor>
          Row {selected + 1} of {data.length}  ·  Showing {scrollTop + 1}–{endRow}
        </Text>
      </Box>

      <Box marginTop={1}>
        <Text dimColor>
          ↑↓ Navigate   PgUp/PgDn Scroll   g Top   G Bottom   Enter Select
        </Text>
      </Box>
    </Box>
  );
};

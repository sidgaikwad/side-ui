import React from 'react';
import { Box, Text } from 'ink';

export interface ChartData {
  label: string;
  value: number;
}

export const BarChart: React.FC = () => {
  const data: ChartData[] = [
    { label: 'Jan', value: 30 },
    { label: 'Feb', value: 45 },
    { label: 'Mar', value: 60 },
    { label: 'Apr', value: 40 }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Box flexDirection="column">
      <Text color="cyan" bold>Bar Chart</Text>
      <Box marginTop={1} flexDirection="column">
        {data.map((item, idx) => {
          const barLength = Math.round((item.value / maxValue) * 20);
          return (
            <Box key={idx}>
              <Text>{item.label}: </Text>
              <Text color="green">{'█'.repeat(barLength)}</Text>
              <Text> {item.value}</Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export const LineChart: React.FC = () => {
  const data = [10, 20, 15, 30, 25, 35, 32];

  return (
    <Box flexDirection="column">
      <Text color="cyan" bold>Line Chart</Text>
      <Box marginTop={1}>
        <Text color="green">
          {data.map((val, idx) => {
            const prev = idx > 0 ? data[idx - 1] : val;
            if (val > prev) return '╱';
            if (val < prev) return '╲';
            return '─';
          }).join('')}
        </Text>
      </Box>
      <Box>
        <Text dimColor>
          {data.map(val => ` ${val}`).join(' ')}
        </Text>
      </Box>
    </Box>
  );
};

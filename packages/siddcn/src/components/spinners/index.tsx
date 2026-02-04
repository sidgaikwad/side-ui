import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import { getTheme } from '../../utils/theme';

export interface SpinnerProps {
  text?: string;
  type?: 'dots' | 'line' | 'pipe' | 'bounce' | 'arc' | 'clock' | 'moon' | 'runner' | 'pong';
}

// Custom spinner frames for different styles
const SPINNER_FRAMES = {
  dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  line: ['-', '\\', '|', '/'],
  pipe: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'],
  bounce: ['⠁', '⠂', '⠄', '⠂'],
  arc: ['◜', '◠', '◝', '◞', '◡', '◟'],
  clock: ['◷', '◶', '◵', '◴'],
  moon: ['◑', '◒', '◐', '◓'],
  runner: ['🏃', '🏃', '🏃‍', '🏃‍'],
  pong: ['▐⠂       ▌', '▐⠈       ▌', '▐ ⠂      ▌', '▐ ⠠      ▌', '▐  ⡀     ▌', '▐  ⠠     ▌', '▐   ⠂    ▌', '▐   ⠈    ▌', '▐    ⠂   ▌', '▐    ⠠   ▌', '▐     ⡀  ▌', '▐     ⠠  ▌', '▐      ⠂ ▌', '▐      ⠈ ▌', '▐       ⠂▌', '▐       ⠠▌', '▐       ⡀▌', '▐      ⠠ ▌', '▐      ⠂ ▌', '▐     ⠈  ▌', '▐     ⠂  ▌', '▐    ⠠   ▌', '▐    ⡀   ▌', '▐   ⠠    ▌', '▐   ⠂    ▌', '▐  ⠈     ▌', '▐  ⠂     ▌', '▐ ⠠      ▌', '▐ ⡀      ▌', '▐⠠       ▌'],
};

export const DotsSpinner: React.FC<SpinnerProps> = ({ text = 'Loading...' }) => {
  const theme = getTheme();
  
  return (
    <Box>
      <Text color={theme.colors.primary}>
        <Spinner type="dots" />
      </Text>
      <Text> {text}</Text>
    </Box>
  );
};

export const BouncingSpinner: React.FC<SpinnerProps> = ({ text = 'Processing...' }) => {
  const theme = getTheme();
  const [frame, setFrame] = useState(0);
  const frames = SPINNER_FRAMES.bounce;

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(f => (f + 1) % frames.length);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      <Text color={theme.colors.success} bold>{frames[frame]}</Text>
      <Text> {text}</Text>
    </Box>
  );
};

export const PulseSpinner: React.FC<SpinnerProps> = ({ text = 'Working...' }) => {
  const theme = getTheme();
  const [pulse, setPulse] = useState(0);
  const pulseFrames = ['○', '◔', '◑', '◕', '●', '◕', '◑', '◔'];

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(p => (p + 1) % pulseFrames.length);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      <Text color={theme.colors.warning}>{pulseFrames[pulse]}</Text>
      <Text> {text}</Text>
    </Box>
  );
};

export const ClockSpinner: React.FC<SpinnerProps> = ({ text = 'Timing...' }) => {
  const theme = getTheme();
  const [frame, setFrame] = useState(0);
  const frames = SPINNER_FRAMES.clock;

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(f => (f + 1) % frames.length);
    }, 250);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      <Text color={theme.colors.info}>{frames[frame]}</Text>
      <Text> {text}</Text>
    </Box>
  );
};

export const BarSpinner: React.FC<{ width?: number }> = ({ width = 20 }) => {
  const theme = getTheme();
  const [pos, setPos] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setPos(p => {
        const newPos = p + direction;
        if (newPos >= width - 3) {
          setDirection(-1);
          return width - 3;
        }
        if (newPos <= 0) {
          setDirection(1);
          return 0;
        }
        return newPos;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [width, direction]);

  const bar = '░'.repeat(pos) + '███' + '░'.repeat(Math.max(0, width - pos - 3));

  return (
    <Box flexDirection="column">
      <Box>
        <Text dimColor>[</Text>
        <Text color={theme.colors.primary}>{bar}</Text>
        <Text dimColor>]</Text>
      </Box>
      <Text dimColor>Animated Bar Spinner</Text>
    </Box>
  );
};

export const WaveSpinner: React.FC = () => {
  const theme = getTheme();
  const [offset, setOffset] = useState(0);
  const width = 10;

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset(o => (o + 1) % width);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const heights = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  
  return (
    <Box flexDirection="column">
      <Box>
        {Array.from({ length: width }).map((_, i) => {
          const phase = (i + offset) % width;
          const heightIdx = Math.floor(Math.abs(Math.sin(phase * 0.6) * (heights.length - 1)));
          return (
            <Text key={i} color={theme.colors.primary}>
              {heights[heightIdx]}
            </Text>
          );
        })}
      </Box>
      <Text dimColor>Wave Animation</Text>
    </Box>
  );
};

// Combined spinner preview for the registry
export const SpinnerShowcase: React.FC = () => {
  const theme = getTheme();
  
  return (
    <Box flexDirection="column">
      <DotsSpinner text="Loading" />
    </Box>
  );
};

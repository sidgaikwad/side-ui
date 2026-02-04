import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { getTheme } from '../../utils/theme';

export interface AnimatedTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

// Typewriter effect
export const TypewriterText: React.FC<AnimatedTextProps> = ({ 
  text, 
  speed = 50,
  onComplete 
}) => {
  const theme = getTheme();
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  // Blinking cursor
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <Box>
      <Text color={theme.colors.primary}>{displayedText}</Text>
      <Text color={theme.colors.secondary}>{cursorVisible ? '|' : ' '}</Text>
    </Box>
  );
};

// Gradient cycling text
export const GradientText: React.FC<{ text: string }> = ({ text }) => {
  const theme = getTheme();
  const [colorIndex, setColorIndex] = useState(0);
  const colors = [
    theme.colors.primary,
    theme.colors.secondary,
    theme.colors.success,
    theme.colors.warning,
    theme.colors.info,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setColorIndex(i => (i + 1) % colors.length);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      {text.split('').map((char, i) => (
        <Text key={i} color={colors[(colorIndex + i) % colors.length]} bold>
          {char}
        </Text>
      ))}
    </Box>
  );
};

// Pulsing text
export const PulsingText: React.FC<{ text: string }> = ({ text }) => {
  const theme = getTheme();
  const [bright, setBright] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setBright(b => !b);
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <Text color={bright ? theme.colors.primary : theme.colors.dimText} bold={bright}>
      {text}
    </Text>
  );
};

// Blinking text
export const BlinkingText: React.FC<{ text: string; speed?: number }> = ({ 
  text, 
  speed = 500 
}) => {
  const theme = getTheme();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(v => !v);
    }, speed);
    return () => clearInterval(timer);
  }, [speed]);

  return (
    <Text color={theme.colors.warning}>
      {visible ? text : ' '.repeat(text.length)}
    </Text>
  );
};

// Bouncing text
export const BouncingText: React.FC<{ text: string }> = ({ text }) => {
  const theme = getTheme();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset(o => (o + 1) % text.length);
    }, 100);
    return () => clearInterval(timer);
  }, [text.length]);

  return (
    <Box>
      {text.split('').map((char, i) => {
        const distance = Math.abs((offset - i + text.length) % text.length);
        const isBounced = distance < 3;
        return (
          <Text 
            key={i} 
            color={isBounced ? theme.colors.primary : theme.colors.text}
            bold={isBounced}
          >
            {char}
          </Text>
        );
      })}
    </Box>
  );
};

// Loading dots animation
export const LoadingDots: React.FC<{ text?: string }> = ({ text = 'Loading' }) => {
  const theme = getTheme();
  const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      <Text color={theme.colors.primary}>{text}</Text>
      <Text color={theme.colors.secondary}>{dots.padEnd(3, ' ')}</Text>
    </Box>
  );
};

// Scrolling marquee text
export const MarqueeText: React.FC<{ text: string; width?: number }> = ({ 
  text, 
  width = 20 
}) => {
  const theme = getTheme();
  const [offset, setOffset] = useState(0);
  const paddedText = text + '   ' + text; // Duplicate for seamless scrolling

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset(o => (o + 1) % (text.length + 3));
    }, 150);
    return () => clearInterval(timer);
  }, [text.length]);

  const displayText = paddedText.slice(offset, offset + width);

  return (
    <Box borderStyle="single" borderColor={theme.colors.border} paddingX={1}>
      <Text color={theme.colors.primary}>{displayText}</Text>
    </Box>
  );
};

// Preview for registry
export const AnimatedTextPreview: React.FC = () => {
  const theme = getTheme();
  const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      <Text color={theme.colors.primary}>Typing</Text>
      <Text color={theme.colors.secondary}>{dots.padEnd(3, ' ')}</Text>
    </Box>
  );
};

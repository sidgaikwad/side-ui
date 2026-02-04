import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { getTheme } from '../../utils/theme';

export interface Star {
  x: number;
  y: number;
  char: string;
  speed: number;
  brightness: 'bright' | 'dim' | 'faint';
}

export interface AnimatedStarsProps {
  width?: number;
  height?: number;
  starCount?: number;
  fps?: number;
}

const STAR_CHARS = ['*', '.', '+', 'o', '`', "'", ','];
const BRIGHT_CHARS = ['*', '+', 'o'];
const DIM_CHARS = ['.', '`'];
const FAINT_CHARS = ["'", ','];

function createStar(width: number, height: number, fromTop = false): Star {
  const charType = Math.random();
  let char: string;
  let brightness: 'bright' | 'dim' | 'faint';
  
  if (charType < 0.2) {
    char = BRIGHT_CHARS[Math.floor(Math.random() * BRIGHT_CHARS.length)];
    brightness = 'bright';
  } else if (charType < 0.5) {
    char = DIM_CHARS[Math.floor(Math.random() * DIM_CHARS.length)];
    brightness = 'dim';
  } else {
    char = FAINT_CHARS[Math.floor(Math.random() * FAINT_CHARS.length)];
    brightness = 'faint';
  }

  return {
    x: Math.floor(Math.random() * width),
    y: fromTop ? 0 : Math.floor(Math.random() * height),
    char,
    speed: 0.1 + Math.random() * 0.3, // Variable falling speed
    brightness,
  };
}

export const AnimatedStars: React.FC<AnimatedStarsProps> = ({
  width = 80,
  height = 24,
  starCount = 30,
  fps = 10,
}) => {
  const theme = getTheme();
  const [stars, setStars] = useState<Star[]>(() => 
    Array.from({ length: starCount }, () => createStar(width, height))
  );
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => f + 1);
      setStars(prevStars => 
        prevStars.map(star => {
          const newY = star.y + star.speed;
          // If star falls off screen, create a new one at the top
          if (newY >= height) {
            return createStar(width, height, true);
          }
          return { ...star, y: newY };
        })
      );
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [width, height, fps]);

  // Create a 2D grid for rendering
  const grid: (Star | null)[][] = Array.from({ length: height }, () => 
    Array.from({ length: width }, () => null)
  );

  // Place stars on the grid
  stars.forEach(star => {
    const y = Math.floor(star.y);
    const x = Math.floor(star.x);
    if (y >= 0 && y < height && x >= 0 && x < width) {
      grid[y][x] = star;
    }
  });

  const getStarColor = (star: Star) => {
    switch (star.brightness) {
      case 'bright':
        return theme.colors.primary;
      case 'dim':
        return theme.colors.secondary;
      case 'faint':
        return theme.colors.dimText;
    }
  };

  return (
    <Box flexDirection="column" position="absolute" marginTop={0} marginLeft={0}>
      {grid.map((row, rowIndex) => (
        <Box key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Text 
              key={colIndex} 
              color={cell ? getStarColor(cell) : undefined}
              dimColor={!cell}
            >
              {cell ? cell.char : ' '}
            </Text>
          ))}
        </Box>
      ))}
    </Box>
  );
};

// Simpler falling stars that work better in terminal
export const FallingStars: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  const theme = getTheme();
  const [starLine, setStarLine] = useState('');

  useEffect(() => {
    if (!enabled) return;

    const updateStars = () => {
      const width = 60;
      const line = Array.from({ length: width }, () => {
        const rand = Math.random();
        if (rand < 0.03) return { char: '*', color: 'bright' };
        if (rand < 0.06) return { char: '.', color: 'dim' };
        if (rand < 0.08) return { char: '+', color: 'accent' };
        return { char: ' ', color: 'none' };
      });
      setStarLine(line.map(s => s.char).join(''));
    };

    updateStars();
    const interval = setInterval(updateStars, 300);
    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <Box>
      <Text dimColor>{starLine}</Text>
    </Box>
  );
};

// Matrix-style falling characters
export const MatrixRain: React.FC<{ width?: number; height?: number }> = ({ 
  width = 60, 
  height = 5 
}) => {
  const theme = getTheme();
  const [columns, setColumns] = useState<number[]>(() => 
    Array.from({ length: width }, () => Math.floor(Math.random() * height))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setColumns(prev => 
        prev.map(y => (y + 1) % height)
      );
    }, 150);
    return () => clearInterval(interval);
  }, [height]);

  const chars = '01';

  return (
    <Box flexDirection="column">
      {Array.from({ length: height }).map((_, row) => (
        <Box key={row}>
          {columns.map((activeRow, col) => {
            const isActive = row === activeRow;
            const isFading = row === (activeRow - 1 + height) % height;
            return (
              <Text 
                key={col}
                color={isActive ? theme.colors.primary : isFading ? theme.colors.success : theme.colors.dimText}
                bold={isActive}
              >
                {isActive || isFading ? chars[Math.floor(Math.random() * chars.length)] : ' '}
              </Text>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

// Twinkling stars (static position, varying brightness)
export const TwinklingStars: React.FC<{ width?: number; density?: number }> = ({ 
  width = 60, 
  density = 0.15 
}) => {
  const theme = getTheme();
  const [stars, setStars] = useState<{ char: string; bright: boolean }[]>([]);

  useEffect(() => {
    // Initialize stars
    const initialStars = Array.from({ length: width }, () => {
      if (Math.random() < density) {
        return { 
          char: STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)], 
          bright: Math.random() > 0.5 
        };
      }
      return { char: ' ', bright: false };
    });
    setStars(initialStars);

    // Twinkle effect
    const interval = setInterval(() => {
      setStars(prev => prev.map(star => {
        if (star.char !== ' ') {
          return { ...star, bright: Math.random() > 0.3 };
        }
        return star;
      }));
    }, 400);

    return () => clearInterval(interval);
  }, [width, density]);

  return (
    <Box>
      {stars.map((star, i) => (
        <Text 
          key={i}
          color={star.bright ? theme.colors.primary : theme.colors.dimText}
          bold={star.bright}
        >
          {star.char}
        </Text>
      ))}
    </Box>
  );
};

import React, { useState, useEffect } from "react";
import { Box, Text } from "ink";
import { animations } from "../utils/animations.js";

export const SpinnerStyles = {
  DOTS: "dots",
  LINE: "line",
  DOTS2: "dots2",
  DOTS3: "dots3",
  ARROW: "arrow",
  BOUNCING_BAR: "bouncingBar",
  BOUNCING_BALL: "bouncingBall",
  PONG: "pong",
  STAR: "star",
  FLIP: "flip",
  HAMBURGER: "hamburger",
  GROW_VERTICAL: "growVertical",
  GROW_HORIZONTAL: "growHorizontal",
  HEARTS: "hearts",
  CLOCK: "clock",
  EARTH: "earth",
  MOON: "moon",
};

export const Spinner = ({
  style = SpinnerStyles.DOTS,
  label,
  color = "#00A8E8",
  speed = 80,
}) => {
  const [frame, setFrame] = useState(0);
  const frames = animations.spinners[style] || animations.spinners.dots;

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, speed);

    return () => clearInterval(interval);
  }, [frames.length, speed]);

  return (
    <Box>
      <Text color={color}>{frames[frame]}</Text>
      {label && (
        <Box marginLeft={1}>
          <Text>{label}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Spinner;

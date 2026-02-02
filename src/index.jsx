#!/usr/bin/env node

import React, { useState } from "react";
import { render } from "ink";
import Loader from "./screens/loader.js";
import MainMenu from "./screens/mainMenu.js";
import ButtonsScreen from "./screens/ButtonsScreen.js";
import ProgressScreen from "./screens/ProgressScreen.js";
import SpinnersScreen from "./screens/SpinnersScreen.js";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState("menu");

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handleScreenSelect = (screenKey) => {
    setCurrentScreen(screenKey);
  };

  const handleBack = () => {
    setCurrentScreen("menu");
  };

  if (isLoading) {
    return <Loader onComplete={handleLoadComplete} />;
  }

  // Screen routing
  const screens = {
    menu: <MainMenu onSelect={handleScreenSelect} />,
    buttons: <ButtonsScreen onBack={handleBack} />,
    progress: <ProgressScreen onBack={handleBack} />,
    spinners: <SpinnersScreen onBack={handleBack} />,
    // Add more screens here as you create them
  };

  return screens[currentScreen] || screens.menu;
};

render(<App />);

#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './App.js';

// Render the app
const { waitUntilExit } = render(<App />);

// Handle exit
waitUntilExit().then(() => {
  console.log('\n👋 Thanks for using siddcn!\n');
  process.exit(0);
});

/**
 * screens/registry.js
 * Central registry of all screens.
 * Each screen is an object with:
 *   - initState(session)     → returns initial state object
 *   - onMount(session)       → called when screen is navigated to (optional)
 *   - onUnmount(session)     → called when leaving screen (optional)
 *   - handleInput(session, event) → processes a key event
 *   - render(session)        → returns the full ANSI frame string
 */

"use strict";

const registry = {
  menu: require("./menu"),
  buttons: require("./buttons"),
  table: require("./table"),
  progress: require("./progress"),
  spinners: require("./spinners"),
  select: require("./select"),
  multiselect: require("./multiselect"),
  textinput: require("./textinput"),
  cards: require("./cards"),
  tree: require("./tree"),
  chart: require("./chart"),
  badges: require("./badges"),
  tabs: require("./tabs"),
};

module.exports = registry;

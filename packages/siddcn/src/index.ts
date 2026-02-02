/**
 * Siddcn - Terminal UI Component Library
 * Main export file
 */

// Export all component types
export * from './components/buttons';
export * from './components/progress';
export * from './components/badges';
export * from './components/charts';
export * from './components/trees';

// Export registry utilities
export { componentRegistry, getCategories, getCategory, getVariant } from './components/registry';

// Export types
export type {
  ComponentVariant,
  ComponentCategory,
  ComponentRegistry,
  NavigationScreen,
  NavigationState,
  AppState
} from './types';

// Export main App component for embedding
export { App } from './App';

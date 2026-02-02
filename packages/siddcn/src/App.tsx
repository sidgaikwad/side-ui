import React, { useState } from 'react';
import { useInput } from 'ink';
import { LoaderScreen } from './screens/LoaderScreen';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { ComponentDetailScreen } from './screens/ComponentDetailScreen';
import type { NavigationScreen } from './types';

interface AppState {
  screen: NavigationScreen;
  selectedCategory?: string;
  selectedVariant?: string;
  accordionOpen: boolean;
}

interface AppProps {
  onExit?: () => void;
}

export const App: React.FC<AppProps> = ({ onExit }) => {
  const [state, setState] = useState<AppState>({
    screen: 'loader',
    accordionOpen: false
  });

  // Global keyboard shortcuts
  useInput((input, key) => {
    // Exit on Ctrl+C (handled by Ink automatically) or 'q'
    if (input === 'q' && state.screen !== 'loader') {
      onExit?.();
      process.exit(0);
    }

    // Back navigation with Escape
    if (key.escape) {
      handleBack();
    }
  });

  const handleLoaderComplete = () => {
    setState(prev => ({ ...prev, screen: 'main-menu' }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setState(prev => ({
      ...prev,
      screen: 'category',
      selectedCategory: categoryId
    }));
  };

  const handleVariantSelect = (variantId: string) => {
    setState(prev => ({
      ...prev,
      screen: 'component-detail',
      selectedVariant: variantId,
      accordionOpen: false
    }));
  };

  const handleToggleAccordion = () => {
    setState(prev => ({
      ...prev,
      accordionOpen: !prev.accordionOpen
    }));
  };

  const handleBack = () => {
    setState(prev => {
      switch (prev.screen) {
        case 'component-detail':
          return { ...prev, screen: 'category', selectedVariant: undefined, accordionOpen: false };
        case 'category':
          return { ...prev, screen: 'main-menu', selectedCategory: undefined };
        default:
          return prev;
      }
    });
  };

  // Render current screen
  switch (state.screen) {
    case 'loader':
      return <LoaderScreen onComplete={handleLoaderComplete} />;

    case 'main-menu':
      return <MainMenuScreen onSelect={handleCategorySelect} />;

    case 'category':
      if (!state.selectedCategory) return null;
      return (
        <CategoryScreen
          categoryId={state.selectedCategory}
          onSelect={handleVariantSelect}
          onBack={handleBack}
        />
      );

    case 'component-detail':
      if (!state.selectedCategory || !state.selectedVariant) return null;
      return (
        <ComponentDetailScreen
          categoryId={state.selectedCategory}
          variantId={state.selectedVariant}
          accordionOpen={state.accordionOpen}
          onToggleAccordion={handleToggleAccordion}
          onBack={handleBack}
        />
      );

    default:
      return null;
  }
};

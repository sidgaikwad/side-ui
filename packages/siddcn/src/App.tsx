import React, { useState } from 'react';
import { useInput } from 'ink';
import { LoaderScreen } from './screens/LoaderScreen';
import { ShowcaseMenuScreen } from './screens/ShowcaseMenuScreen';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { ComponentDetailScreen } from './screens/ComponentDetailScreen';
import { ThemeSelectorScreen } from './screens/ThemeSelectorScreen';
import { ThemeShowcaseScreen } from './screens/ThemeShowcaseScreen';
import type { NavigationScreen } from './types';

interface AppState {
  screen: NavigationScreen | 'showcase' | 'theme-selector' | 'theme-showcase';
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
    // Exit on 'q' (but not in loader)
    if (input === 'q' && state.screen !== 'loader') {
      onExit?.();
      process.exit(0);
    }

    // Theme showcase on 'T' (uppercase) or 't' (lowercase)
    if ((input === 't' || input === 'T') && state.screen !== 'loader' && state.screen !== 'theme-showcase') {
      setState(prev => ({ ...prev, screen: 'theme-showcase' as any }));
    }

    // Back navigation with Escape
    if (key.escape) {
      handleBack();
    }
  });

  const handleLoaderComplete = () => {
    setState(prev => ({ ...prev, screen: 'showcase' as any }));
  };

  const handleShowcaseSelect = (categoryId: string) => {
    setState(prev => ({
      ...prev,
      screen: 'category',
      selectedCategory: categoryId
    }));
  };

  const handleThemeShowcaseOpen = () => {
    setState(prev => ({ ...prev, screen: 'theme-showcase' as any }));
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

  const handleThemeSelect = (themeName: string) => {
    // Theme is already set in ThemeSelectorScreen
    setState(prev => ({ ...prev, screen: 'showcase' as any }));
  };

  const handleBack = () => {
    setState(prev => {
      switch (prev.screen) {
        case 'theme-selector':
          return { ...prev, screen: 'showcase' as any };
        case 'theme-showcase':
          return { ...prev, screen: 'showcase' as any };
        case 'component-detail':
          return { ...prev, screen: 'category', selectedVariant: undefined, accordionOpen: false };
        case 'category':
          return { ...prev, screen: 'showcase' as any, selectedCategory: undefined };
        case 'showcase':
          return prev; // Can't go back from showcase
        default:
          return prev;
      }
    });
  };

  // Render current screen
  switch (state.screen) {
    case 'loader':
      return <LoaderScreen onComplete={handleLoaderComplete} />;

    case 'showcase':
      return (
        <ShowcaseMenuScreen 
          onSelect={handleShowcaseSelect} 
          onThemeSelect={handleThemeShowcaseOpen}
        />
      );

    case 'theme-selector':
      return <ThemeSelectorScreen onSelect={handleThemeSelect} onBack={handleBack} />;

    case 'theme-showcase':
      return <ThemeShowcaseScreen onBack={handleBack} />;

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

/**
 * Core type definitions for the siddcn component library
 */

export interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  preview: React.ComponentType;
  installCommand: string;
  usage: string;
  props?: Record<string, PropDefinition>;
}

export interface PropDefinition {
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  variants: ComponentVariant[];
}

export interface ComponentRegistry {
  [categoryId: string]: ComponentCategory;
}

export type NavigationScreen = 
  | 'loader'
  | 'main-menu'
  | 'category'
  | 'component-detail';

export interface NavigationState {
  screen: NavigationScreen;
  selectedCategory?: string;
  selectedVariant?: string;
  history: NavigationScreen[];
}

export interface AppState {
  navigation: NavigationState;
  accordionOpen: boolean;
}

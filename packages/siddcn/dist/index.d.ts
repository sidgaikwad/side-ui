import React$1 from 'react';

interface ButtonProps {
    label?: string;
    onPress?: () => void;
}
declare const SimpleButton: React$1.FC<ButtonProps>;
declare const PrimaryButton: React$1.FC<ButtonProps>;
declare const DangerButton: React$1.FC<ButtonProps>;

interface ProgressProps {
    value?: number;
    max?: number;
    percentage?: number;
    animated?: boolean;
}
declare const LinearProgress: React$1.FC<ProgressProps>;
declare const CircularProgress: React$1.FC<ProgressProps>;
declare const StepProgress: React$1.FC;

interface BadgeProps {
    status?: 'success' | 'warning' | 'error' | 'info';
    count?: number;
    color?: string;
}
declare const StatusBadge: React$1.FC<BadgeProps>;
declare const CountBadge: React$1.FC<BadgeProps>;
declare const DotBadge: React$1.FC<BadgeProps>;

interface ChartData {
    label: string;
    value: number;
}
declare const BarChart: React$1.FC;
declare const LineChart: React$1.FC;

interface TreeNode {
    name: string;
    type: 'dir' | 'file';
    children?: TreeNode[];
    meta?: string;
}
interface TreeProps {
    data: TreeNode;
    onSelect?: (node: TreeNode) => void;
}
declare const FileTree: React$1.FC<TreeProps>;
declare const DataTree: React$1.FC<TreeProps>;

interface Tab {
    id: string;
    label: string;
    icon?: string;
    content: React$1.ReactNode;
}
interface TabsProps {
    tabs: Tab[];
    defaultTab?: number;
    onTabChange?: (index: number) => void;
    style?: 'modern' | 'rounded' | 'underline' | 'pills' | 'blocks';
}
declare const Tabs: React$1.FC<TabsProps>;
declare const DashboardTab: React$1.FC;
declare const AnalyticsTab: React$1.FC;
declare const SettingsTab: React$1.FC;

interface SelectItem {
    value: string;
    label: string;
    desc?: string;
}
interface MultiSelectProps {
    items: SelectItem[];
    maxSelect?: number;
    onConfirm?: (selected: string[]) => void;
    showProgress?: boolean;
}
declare const MultiSelect: React$1.FC<MultiSelectProps>;

interface TableColumn {
    key: string;
    header: string;
    width: number;
}
interface TableRow {
    [key: string]: string | number;
}
interface TableProps {
    columns: TableColumn[];
    data: TableRow[];
    maxVisibleRows?: number;
    onSelect?: (row: TableRow, index: number) => void;
}
declare const Table: React$1.FC<TableProps>;

/**
 * Core type definitions for the siddcn component library
 */
interface ComponentVariant {
    id: string;
    name: string;
    description: string;
    preview: React.ComponentType;
    installCommand: string;
    usage: string;
    props?: Record<string, PropDefinition>;
}
interface PropDefinition {
    type: string;
    required: boolean;
    default?: string;
    description: string;
}
interface ComponentCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
    variants: ComponentVariant[];
}
interface ComponentRegistry {
    [categoryId: string]: ComponentCategory;
}
type NavigationScreen = 'loader' | 'main-menu' | 'category' | 'component-detail';
interface NavigationState {
    screen: NavigationScreen;
    selectedCategory?: string;
    selectedVariant?: string;
    history: NavigationScreen[];
}
interface AppState {
    navigation: NavigationState;
    accordionOpen: boolean;
}

/**
 * Component Registry - COMPLETE & FIXED
 *
 * This is the central registry for all TUI components.
 */

declare const componentRegistry: ComponentRegistry;
declare function getCategories(): ComponentCategory[];
declare function getCategory(categoryId: string): ComponentCategory | undefined;
declare function getVariant(categoryId: string, variantId: string): ComponentVariant | undefined;

interface AppProps {
    onExit?: () => void;
}
declare const App: React$1.FC<AppProps>;

export { AnalyticsTab, App, type AppState, type BadgeProps, BarChart, type ButtonProps, type ChartData, CircularProgress, type ComponentCategory, type ComponentRegistry, type ComponentVariant, CountBadge, DangerButton, DashboardTab, DataTree, DotBadge, FileTree, LineChart, LinearProgress, MultiSelect, type MultiSelectProps, type NavigationScreen, type NavigationState, PrimaryButton, type ProgressProps, type SelectItem, SettingsTab, SimpleButton, StatusBadge, StepProgress, type Tab, Table, type TableColumn, type TableProps, type TableRow, Tabs, type TabsProps, type TreeNode, type TreeProps, componentRegistry, getCategories, getCategory, getVariant };

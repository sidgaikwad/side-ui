import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { getTheme } from '../../utils/theme';

// Tree Node Structure
export interface TreeNode {
  name: string;
  type: 'dir' | 'file';
  children?: TreeNode[];
  meta?: string;
}

interface FlatTreeItem {
  node: TreeNode;
  depth: number;
  isDir: boolean;
  expanded: boolean;
  id: string;
}

export interface TreeProps {
  data: TreeNode;
  onSelect?: (node: TreeNode) => void;
}

function getNodeId(node: TreeNode, depth: number): string {
  return `${depth}:${node.name}`;
}

function flattenTree(
  node: TreeNode, 
  expandedSet: Set<string>, 
  depth = 0
): FlatTreeItem[] {
  const result: FlatTreeItem[] = [];
  const nodeId = getNodeId(node, depth);
  const isExpanded = node.type === 'dir' && expandedSet.has(nodeId);

  result.push({
    node,
    depth,
    isDir: node.type === 'dir',
    expanded: isExpanded,
    id: nodeId,
  });

  if (node.type === 'dir' && isExpanded && node.children) {
    for (const child of node.children) {
      result.push(...flattenTree(child, expandedSet, depth + 1));
    }
  }

  return result;
}

function getFileIcon(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'tsx':
    case 'ts':
      return '◈';
    case 'jsx':
    case 'js':
      return '◇';
    case 'css':
      return '◆';
    case 'json':
      return '◉';
    case 'md':
      return '◎';
    default:
      return '○';
  }
}

function getFileColor(filename: string, theme: any): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'tsx':
    case 'ts':
      return theme.colors.primary;
    case 'jsx':
    case 'js':
      return theme.colors.secondary;
    case 'json':
      return theme.colors.warning;
    case 'md':
      return theme.colors.info;
    default:
      return theme.colors.dimText;
  }
}

export const FileTree: React.FC<TreeProps> = ({ data, onSelect }) => {
  const theme = getTheme();
  const [cursor, setCursor] = useState(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set([getNodeId(data, 0)]));

  const flatList = flattenTree(data, expanded);

  useInput((input, key) => {
    if (key.upArrow || input === 'k') {
      setCursor(prev => Math.max(0, prev - 1));
    } else if (key.downArrow || input === 'j') {
      setCursor(prev => Math.min(flatList.length - 1, prev + 1));
    } else if (key.rightArrow || input === 'l') {
      const item = flatList[cursor];
      if (item && item.isDir && !item.expanded) {
        setExpanded(prev => new Set([...prev, item.id]));
      }
    } else if (key.leftArrow || input === 'h') {
      const item = flatList[cursor];
      if (item && item.isDir && item.expanded) {
        setExpanded(prev => {
          const newSet = new Set(prev);
          newSet.delete(item.id);
          return newSet;
        });
      }
    } else if (key.return) {
      const item = flatList[cursor];
      if (item?.isDir) {
        setExpanded(prev => {
          const newSet = new Set(prev);
          if (newSet.has(item.id)) {
            newSet.delete(item.id);
          } else {
            newSet.add(item.id);
          }
          return newSet;
        });
      }
      onSelect?.(item.node);
    }
  });

  const totalDirs = flatList.filter(f => f.isDir).length;
  const totalFiles = flatList.filter(f => !f.isDir).length;

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text dimColor>Showing </Text>
        <Text color={theme.colors.primary}>{totalDirs}</Text>
        <Text dimColor> folders, </Text>
        <Text color={theme.colors.primary}>{totalFiles}</Text>
        <Text dimColor> files</Text>
      </Box>

      <Box marginBottom={1}>
        <Text color={theme.colors.border}>{'─'.repeat(48)}</Text>
      </Box>

      <Box flexDirection="column">
        {flatList.map((item, index) => {
          const isSelected = index === cursor;
          let indent = '';
          for (let d = 1; d < item.depth; d++) {
            indent += '│   ';
          }
          if (item.depth > 0) {
            indent += '├── ';
          }

          let icon: string;
          let nameColor: string;

          if (item.isDir) {
            icon = item.expanded ? '▾ ' : '▸ ';
            nameColor = theme.colors.primary;
          } else {
            icon = getFileIcon(item.node.name) + ' ';
            nameColor = getFileColor(item.node.name, theme);
          }

          return (
            <Box key={item.id}>
              <Text color={isSelected ? theme.colors.primary : theme.colors.text} bold={isSelected}>
                {isSelected ? '> ' : '  '}
              </Text>
              <Text dimColor>{indent}</Text>
              <Text color={nameColor}>{icon}</Text>
              <Text 
                color={isSelected ? 'white' : item.isDir ? nameColor : theme.colors.text}
                bold={isSelected}
              >
                {item.node.name}
              </Text>
              {item.node.meta && (
                <Text dimColor>  {item.node.meta}</Text>
              )}
            </Box>
          );
        })}
      </Box>

      <Box marginTop={1}>
        <Text color={theme.colors.border}>{'─'.repeat(48)}</Text>
      </Box>

      {flatList[cursor] && (
        <Box marginTop={1}>
          <Text dimColor>Selected: </Text>
          <Text color={theme.colors.primary}>
            {flatList[cursor].isDir ? '📁 ' : '📄 '}
            {flatList[cursor].node.name}
          </Text>
        </Box>
      )}

      <Box marginTop={1}>
        <Text dimColor>
          ↑↓ Navigate   → Expand   ← Collapse   Enter Toggle
        </Text>
      </Box>
    </Box>
  );
};

export const DataTree: React.FC<TreeProps> = ({ data, onSelect }) => {
  const theme = getTheme();
  const [cursor, setCursor] = useState(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set([getNodeId(data, 0)]));

  const flatList = flattenTree(data, expanded);

  useInput((input, key) => {
    if (key.upArrow) {
      setCursor(prev => Math.max(0, prev - 1));
    } else if (key.downArrow) {
      setCursor(prev => Math.min(flatList.length - 1, prev + 1));
    } else if (key.rightArrow) {
      const item = flatList[cursor];
      if (item?.isDir && !item.expanded) {
        setExpanded(prev => new Set([...prev, item.id]));
      }
    } else if (key.leftArrow) {
      const item = flatList[cursor];
      if (item?.isDir && item.expanded) {
        setExpanded(prev => {
          const newSet = new Set(prev);
          newSet.delete(item.id);
          return newSet;
        });
      }
    } else if (key.return) {
      const item = flatList[cursor];
      if (item?.isDir) {
        setExpanded(prev => {
          const newSet = new Set(prev);
          if (newSet.has(item.id)) {
            newSet.delete(item.id);
          } else {
            newSet.add(item.id);
          }
          return newSet;
        });
      }
      onSelect?.(item.node);
    }
  });

  return (
    <Box flexDirection="column">
      {flatList.map((item, index) => {
        const isSelected = index === cursor;
        const indent = '  '.repeat(item.depth);

        return (
          <Box key={item.id}>
            <Text color={isSelected ? theme.colors.primary : theme.colors.text}>
              {isSelected ? '● ' : '○ '}
            </Text>
            <Text>{indent}</Text>
            <Text 
              color={item.isDir ? theme.colors.primary : theme.colors.text}
              bold={isSelected}
            >
              {item.isDir && (item.expanded ? '▾ ' : '▸ ')}
              {item.node.name}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

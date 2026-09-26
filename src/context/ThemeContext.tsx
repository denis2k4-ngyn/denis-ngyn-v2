import React from 'react';
import { useWorkspaceTheme, ThemeProvider } from '../data/ThemeContext';
import { ThemeConfig, WORKSPACE_THEMES } from '../data/theme';
import { WorkspaceTheme } from '../types';

export { ThemeProvider, useWorkspaceTheme };

export const useTheme = () => {
  const ctx = useWorkspaceTheme();
  return {
    ...ctx,
    isDark: !ctx.themeConfig.isLight,
    isLight: !!ctx.themeConfig.isLight,
  };
};

export type { ThemeConfig, WorkspaceTheme };

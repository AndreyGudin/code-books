import { useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext
} from '../lib/ThemeContext';

const defaultTheme =
  localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === null
    ? Theme.LIGHT
    : localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  initialTheme
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    initialTheme ?? (defaultTheme as Theme)
  );

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme
    }),
    [theme]
  );
  document.body.className = theme;
  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

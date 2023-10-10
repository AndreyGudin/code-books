import { useEffect, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  initialTheme
}: ThemeProviderProps) => {
  const { theme: defaultTheme } = useJsonSettings();

  const [theme, setTheme] = useState<Theme>(
    initialTheme ?? defaultTheme ?? Theme.LIGHT
  );
  const [isThemeInited, setThemeInited] = useState(false);
  useEffect(() => {
    if (!isThemeInited && defaultTheme) {
      setTheme(defaultTheme);
      setThemeInited(true);
    }
  }, [defaultTheme, isThemeInited]);

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

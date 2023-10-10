import { useContext } from 'react';
import { ThemeContext } from '../lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';

interface UseThemeResult {
  toggleTheme: (saveTheme?: (them: Theme) => void) => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = (saveTheme?: (them: Theme) => void): void => {
    let newTheme: Theme;
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;
      case Theme.LIGHT:
        newTheme = Theme.GREEN;
        break;
      case Theme.GREEN:
        newTheme = Theme.DARK;
        break;
      default:
        newTheme = Theme.LIGHT;
    }
    if (theme && typeof setTheme === 'function') setTheme(newTheme);
    document.body.className = newTheme;
    // localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    if (saveTheme !== undefined) saveTheme(newTheme);
  };

  return { theme: theme ?? Theme.LIGHT, toggleTheme };
}

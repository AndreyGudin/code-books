/* eslint-disable andrey-gudin-forprod/layer-imports */
import type { Decorator } from '@storybook/react';
import '@/app/styles/index.scss';
import { ThemeProvider } from '@/app/providers/ThemeProviders';
import { Theme } from '@/shared/const/theme';

export const ThemeDecorator: (theme: Theme) => Decorator =
  (theme: Theme) => (StoryComponent) =>
    (
      <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}> {<StoryComponent />}</div>
      </ThemeProvider>
    );

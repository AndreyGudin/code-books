import type { Decorator } from '@storybook/react';
import { ThemeProvider } from 'app/providers/ThemeProviders';
import type { Theme } from 'app/providers/ThemeProviders';
import 'app/styles/index.scss';

export const ThemeDecorator: (theme: Theme) => Decorator =
  (theme: Theme) => (StoryComponent) =>
    (
      <ThemeProvider>
        <div className={`app ${theme}`}> {<StoryComponent />}</div>
      </ThemeProvider>
    );

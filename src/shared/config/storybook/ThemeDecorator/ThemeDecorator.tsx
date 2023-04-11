import { Decorator, Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProviders';
import 'app/styles/index.scss';

export const ThemeDecorator: (theme: Theme) => Decorator =
  (theme: Theme) => (StoryComponent) =>
    <div className={`app ${theme}`}> {<StoryComponent />}</div>;

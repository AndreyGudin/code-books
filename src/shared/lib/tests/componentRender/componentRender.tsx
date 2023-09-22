import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import type { ReducersMapObject } from '@reduxjs/toolkit';

import i18n from '@/shared/config/i18n/i18ForTests';
import { StoreProvider } from '@/app/providers/StoreProvider';
import type { StateSchema } from '@/app/providers/StoreProvider';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line andrey-gudin-forprod/layer-imports
import '@/app/styles/index.scss';
// eslint-disable-next-line andrey-gudin-forprod/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProviders';

interface componentRenderProps {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

interface TestProviderProps {
  children: ReactNode;
  options?: componentRenderProps;
  theme?: Theme;
}

export function TestProvider({
  children,
  options = {},
  theme = Theme.LIGHT
}: TestProviderProps): JSX.Element {
  const { route = '/', initialState, asyncReducers } = options;
  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider
        asyncReducers={asyncReducers}
        initialState={initialState as StateSchema}
      >
        <I18nextProvider i18n={i18n}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

export const componentRender = (
  component: ReactNode,
  options: componentRenderProps = {}
): ReturnType<typeof render> => {
  return render(<TestProvider options={options}>{component}</TestProvider>);
};

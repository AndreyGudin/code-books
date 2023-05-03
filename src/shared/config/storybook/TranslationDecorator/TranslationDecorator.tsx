import { I18nextProvider } from 'react-i18next';
import type { Decorator } from '@storybook/react';
import i18n from 'shared/config/i18n/i18n';

import 'app/styles/index.scss';
import { Suspense } from 'react';

export const TranslationDecorator: Decorator = (story) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback="">{story()}</Suspense>
    </I18nextProvider>
  );
};

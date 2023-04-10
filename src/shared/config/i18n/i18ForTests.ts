import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    fallbackLng: 'ru',

    // have a common namespace used around the full app
    defaultNS: 'translationsNS',

    debug: false,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    resources: { ru: { translations: {} } }
  })
  .catch((e) => {
    console.warn(e);
  });

export default i18n;

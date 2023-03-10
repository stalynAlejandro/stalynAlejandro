import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import es from './locales/es';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    defaultNS: 'common',
    fallbackLng: ['es'],
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    ns: ['common', 'comments', 'violations'],
    react: {
      useSuspense: false
    },
    resources: {
      es
    }
  });

export default i18n;

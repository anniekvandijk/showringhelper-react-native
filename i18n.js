import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { AsyncStorage } from 'react-native';
import translationEn from './locales/en/translation.json';
import translationNl from './locales/nl/translation.json';

const resources = {
  en: {
    translation: translationEn
  },
  nl: {
    translation: translationNl
  }
};

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: async (callback) => {
    const savedDataJSON = await AsyncStorage.getItem('i18n');
    const lng = (savedDataJSON) ? JSON.parse(savedDataJSON) : null;
    const selectLanguage = lng || Localization.locale.split('-')[0];
    callback(selectLanguage);
  },
  cacheUserLanguage: () => {}
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    react: {
      wait: true
    },
    resources,
    fallbackLng: 'en',
    keySeparator: '.', // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;

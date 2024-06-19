import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import arTranslation from './locales/ar/translation.json';
import heTranslation from './locales/he/translation.json';

const availableLanguages = ['ar', 'he']

const option = {
    order:['navigator', 'htmlTag', 'path', 'subdomail'],
    checkWhitelist:true
};

i18n
    .use(initReactI18next)
    .init({
        resources: {
            he: {
                translation: heTranslation,
            },
            ar: {
                translation: arTranslation,
            }
        },

        fallbackLng: 'ar',
        debug: true,
        whitelist:availableLanguages,
        detection:option,
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;
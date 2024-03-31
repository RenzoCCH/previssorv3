import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_us from "../translation/en_us.json";
import es_lt from "../translation/es_lt.json";

const resources = {
  en: {
    translation: en_us,
  },
  es: {
    translation: es_lt,
  },
};

i18n.use(initReactI18next).init({
  resources,
  debug: false,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;

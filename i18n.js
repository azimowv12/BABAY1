import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "./public/localization/uz/global.json"
import en from "./public/localization/en/global.json"
import ru from "./public/localization/ru/global.json"

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: "uz",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;

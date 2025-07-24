import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  et: {
    translation: {
      login: "Sisselogimine",
      password: "Parool",
      dashboard: "Töölaud",
    },
  },
  en: {
    translation: {
      login: "Login",
      password: "Password",
      dashboard: "Dashboard",
    },
  },
  ru: {
    translation: {
      login: "Вход",
      password: "Пароль",
      dashboard: "Панель",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "et",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

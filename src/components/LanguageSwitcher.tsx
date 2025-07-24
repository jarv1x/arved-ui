import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLang("et")} className="mx-1">
        ET
      </button>
      <button onClick={() => changeLang("en")} className="mx-1">
        EN
      </button>
      <button onClick={() => changeLang("ru")} className="mx-1">
        RU
      </button>
    </div>
  );
}

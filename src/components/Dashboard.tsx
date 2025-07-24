import React from "react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <h2 className="text-xl">{t("dashboard")}</h2>
      <p>Welcome! This is a placeholder dashboard.</p>
    </div>
  );
}

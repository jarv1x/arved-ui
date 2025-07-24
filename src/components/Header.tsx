import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Arved ja Naabrid</h1>
      <LanguageSwitcher />
    </header>
  );
}

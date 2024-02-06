"use client";
import { useState } from "react";

import Header from "@/src/components/Header";
import metadata from "@/src/components/Metadata";

import ThemeButtons from "../components/ThemeButtons";

import "../assets/scss/main.scss";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("day");

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };
  return (
    <html lang="en" className={theme}>
      <body>
        <ThemeButtons onThemeChange={handleThemeChange} />
        <Header />
        <main className="o-container">{children}</main>
      </body>
    </html>
  );
};

RootLayout.metadata = metadata;

export default RootLayout;

"use client";
import React, { useState } from "react";
import { CiRainbow } from "react-icons/ci";
import { MdOutlineNightlight } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";

interface ThemeButtonsProps {
  onThemeChange: (theme: string) => void;
}

const ThemeButtons = ({ onThemeChange }: ThemeButtonsProps) => {
  const [theme, setTheme] = useState("day");

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <div className="c-theme-buttons">
      <WiDaySunny onClick={() => handleThemeChange("day")} />
      <MdOutlineNightlight onClick={() => handleThemeChange("night")} />
      <CiRainbow onClick={() => handleThemeChange("rainbow")} />
    </div>
  );
};

export default ThemeButtons;

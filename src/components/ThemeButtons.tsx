"use client";
import React, { useState } from "react";
import { CiRainbow } from "react-icons/ci";
import { GiBigWave, GiTreeBranch } from "react-icons/gi";
import { MdOutlineNightlight } from "react-icons/md";
import { TbSunset2 } from "react-icons/tb";
import { WiDaySunny } from "react-icons/wi";

interface ThemeButtonsProps {
  onThemeChange: (theme: string) => void;
}

const themes = [
  { id: "sunnyDaydream", icon: <WiDaySunny /> },
  { id: "mysticNight", icon: <MdOutlineNightlight /> },
  { id: "rainbowSplash", icon: <CiRainbow /> },
  { id: "oceanBreeze", icon: <GiBigWave /> },
  { id: "autumnGlow", icon: <GiTreeBranch /> },
  { id: "summerSunset", icon: <TbSunset2 /> },
];

const ThemeButtons = ({ onThemeChange }: ThemeButtonsProps) => {
  const [activeTheme, setActiveTheme] = useState(themes[0].id);

  const handleThemeChange = (newTheme: string) => {
    setActiveTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <div className="c-theme-buttons">
      {themes.map(({ id, icon }) => (
        <div
          key={id}
          className={`${activeTheme === id ? "active" : ""}`}
          onClick={() => handleThemeChange(id)}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};

export default ThemeButtons;

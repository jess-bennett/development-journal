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

const ThemeButtons = ({ onThemeChange }: ThemeButtonsProps) => {
  const [theme, setTheme] = useState("sunnyDaydream");

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <div className="c-theme-buttons">
      <WiDaySunny onClick={() => handleThemeChange("sunnyDaydream")} />
      <MdOutlineNightlight onClick={() => handleThemeChange("mysticNight")} />
      <CiRainbow onClick={() => handleThemeChange("rainbowSplash")} />
      <GiBigWave onClick={() => handleThemeChange("oceanBreeze")} />
      <GiTreeBranch onClick={() => handleThemeChange("autumnGlow")} />
      <TbSunset2 onClick={() => handleThemeChange("summerSunset")} />
    </div>
  );
};

export default ThemeButtons;

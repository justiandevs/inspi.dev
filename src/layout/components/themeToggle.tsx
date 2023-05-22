"use client";

import {ReactElement} from "react";
import {useTheme} from "next-themes";
import {FaSun, FaMoon} from "react-icons/fa";

export const ThemeToggle = (): ReactElement => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
      className="transition duration hover:text-indigo-700 hover:dark:text-indigo-500"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  )
}

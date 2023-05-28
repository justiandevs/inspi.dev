"use client";

import {ReactElement} from "react";
import {useTheme} from "next-themes";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = (): ReactElement => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
      className="transition duration-200 hover:text-indigo-600 hover:dark:text-indigo-400"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20}/>}
    </button>
  )
}

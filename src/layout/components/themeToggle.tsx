"use client";

import {ReactElement} from "react";
import {useTheme} from "next-themes";

export const ThemeToggle = (): ReactElement => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
      className="bg-yellow-400 dark:bg-yellow-900 p-4"
    >
      Toggle Mode
    </button>
  )
}

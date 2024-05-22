import React, { useEffect } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("theme", "dark");

  // biome-ignore lint/correctness/useExhaustiveDependencies: Initialize theme from local storage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      document.documentElement.setAttribute(
        "data-theme",
        prevTheme === "dark" ? "light" : "dark",
      );
      return prevTheme === "dark" ? "light" : "dark";
    });
  };

  return (
    <div className="">
      <button type="button" className="btn btn-circle" onClick={toggleTheme}>
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </div>
  );
}



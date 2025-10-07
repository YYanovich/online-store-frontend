import { createContext, useContext, useState, useEffect } from "react";
import { type ReactNode } from "react";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export type ThemeMode = "light" | "dark";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const localStoredTheme = localStorage.getItem(
    "theme-key"
  ) as ThemeMode | null;
  if (localStoredTheme) {
    return localStoredTheme;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    return "dark";
  }

  return "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme-key", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === "light" ? "dark" : "light";
    });
  };

  const value = {
    theme: theme,
    toggleTheme: toggleTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

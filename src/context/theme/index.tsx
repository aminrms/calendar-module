import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
} from "react";
import type {
  ThemeContextHookReturnType,
  ThemeContextProviderProps,
  ThemeContextType,
  ThemeModeUnion,
} from "./ThemContext.types";
import { getLocalStorage, setLocalStorage } from "../../utils/storage";

const ThemeContext = createContext<ThemeContextType>({});

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeModeUnion>("light");
  const themeContextProviderValues: ThemeContextType = {
    mode,
    setMode,
  };
  const theme_mode_saved = useMemo(() => getLocalStorage("them_mode"), []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    setLocalStorage("them_mode", mode);
  }, [mode]);

  useEffect(() => {
    const isDarkPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (theme_mode_saved) {
      setMode(theme_mode_saved);
    } else {
      setMode(isDarkPreference ? "dark" : "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={themeContextProviderValues}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeHook = (): ThemeContextHookReturnType => {
  const { mode, setMode } = useContext(ThemeContext);
  return { mode, setMode };
};

export const getThemeMode = (): ThemeModeUnion => {
  return getLocalStorage("theme_mode") ?? "light";
};

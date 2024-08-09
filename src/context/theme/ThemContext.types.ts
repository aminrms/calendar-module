import type { PropsWithChildren, SetStateAction } from "react";
import type React from "react";

export type ThemeModeUnion = "dark" | "light";
export type SetModeFnType = React.Dispatch<SetStateAction<ThemeModeUnion>>;

export interface ThemeContextType {
  mode?: ThemeModeUnion;
  setMode?: SetModeFnType;
}

export interface ThemeContextProviderProps extends PropsWithChildren {}

export type ThemeContextHookReturnType = ThemeContextType;

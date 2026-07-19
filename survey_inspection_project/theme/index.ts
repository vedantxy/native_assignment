import { lightThemeColors, darkThemeColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const theme = {
  light: {
    colors: lightThemeColors,
    typography,
    spacing,
  },
  dark: {
    colors: darkThemeColors,
    typography,
    spacing,
  }
};

export type Theme = typeof theme.light;

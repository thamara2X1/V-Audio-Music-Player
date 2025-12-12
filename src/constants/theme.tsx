/**
 * Theme Configuration
 * Spacing, fonts, and other design tokens
 */

import COLORS from './colors';

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface FontSizes {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface FontWeights {
  regular: '400';
  medium: '500';
  semibold: '600';
  bold: '700';
}

export interface BorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  round: number;
}

export interface Shadow {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  small: Shadow;
  medium: Shadow;
  large: Shadow;
}

export interface Theme {
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
  };
  spacing: Spacing;
  fontSizes: FontSizes;
  fontWeights: FontWeights;
  borderRadius: BorderRadius;
  shadows: Shadows;
}

export const SPACING: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES: FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const FONT_WEIGHTS: FontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const BORDER_RADIUS: BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

export const SHADOWS: Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
};

// Theme helper function
export const getTheme = (isDarkMode: boolean): Theme => ({
  colors: {
    background: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight,
    card: isDarkMode ? COLORS.cardDark : COLORS.cardLight,
    text: isDarkMode ? COLORS.textPrimary : COLORS.textDark,
    textSecondary: isDarkMode ? COLORS.textSecondary : COLORS.textLight,
    border: isDarkMode ? COLORS.border : COLORS.borderLight,
    primary: COLORS.primary,
  },
  spacing: SPACING,
  fontSizes: FONT_SIZES,
  fontWeights: FONT_WEIGHTS,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
});

export default {
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
  getTheme,
};
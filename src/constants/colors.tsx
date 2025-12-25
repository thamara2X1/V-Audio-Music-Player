/**
 * Color Constants
 * Centralized color palette for the app - Modern Dark Theme
 */

export interface ColorPalette {
  // Primary Colors
  primary: string;
  primaryDark: string;
  primaryLight: string;

  // Background Colors - Dark gradient theme
  backgroundDark: string;
  backgroundDarker: string;
  backgroundGradientStart: string;
  backgroundGradientEnd: string;
  cardDark: string;
  cardLight: string;

  // Text Colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDark: string;
  textLight: string;

  // UI Colors
  border: string;
  borderLight: string;
  success: string;
  error: string;
  warning: string;
  info: string;

  // Player Colors
  progressBar: string;
  progressFill: string;
  
  // Glass/Blur effects
  glassBackground: string;
  glassBorder: string;
  
  // Transparent
  transparent: string;
  overlay: string;
  overlayLight: string;
}

export const COLORS: ColorPalette = {
  // Primary Colors - Modern green accent
  primary: '#1ED760',
  primaryDark: '#1DB954',
  primaryLight: '#1FDF64',

  // Background Colors - Deep black theme
  backgroundDark: '#000000',
  backgroundDarker: '#0A0A0A',
  backgroundGradientStart: '#1A1A1A',
  backgroundGradientEnd: '#000000',
  cardDark: 'rgba(255, 255, 255, 0.05)',
  cardLight: '#F5F5F5',

  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textTertiary: '#808080',
  textDark: '#000000',
  textLight: '#666666',

  // UI Colors
  border: 'rgba(255, 255, 255, 0.1)',
  borderLight: '#E0E0E0',
  success: '#1ED760',
  error: '#E22134',
  warning: '#FFA500',
  info: '#1E90FF',

  // Player Colors
  progressBar: 'rgba(255, 255, 255, 0.2)',
  progressFill: '#1ED760',
  
  // Glass/Blur effects
  glassBackground: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  
  // Transparent
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.4)',
};

export default COLORS;
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';
export type ThemeType = 'standard' | 'eco';

export type ThemeColors = {
  // Base
  primary: string;
  primaryHover?: string;
  primaryActive?: string;
  primaryDisabled?: string;
  secondary: string;
  secondaryHover?: string;
  secondaryActive?: string;
  background: string;
  surface: string;
  surfaceAlt?: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted?: string;
  textOnPrimary?: string;

  // Grays
  grayLight: string;
  grayMedium: string;
  grayDark?: string;
  border?: string;

  // Status
  success: string;
  successBg?: string;
  error: string;
  errorBg?: string;
  warning: string;
  warningBg?: string;
  info?: string;
  infoBg?: string;

  // Accent
  accent?: string;
  accentHover?: string;
};

export const lightColors: ThemeColors = {
  // Base
  primary: '#0096C7',
  primaryHover: '#0077A3',
  primaryActive: '#005F82',
  primaryDisabled: '#7FC7DE',

  secondary: '#48CAE4',
  secondaryHover: '#2BB3D6',
  secondaryActive: '#1E9CBF',

  background: '#F8FBFD',
  surface: '#FFFFFF',
  surfaceAlt: '#EDF6FA',

  // Texto
  textPrimary: '#023E8A',
  textSecondary: '#0B5FA5',
  textMuted: '#6B7280',
  textOnPrimary: '#FFFFFF',

  // Grises (UI)
  grayLight: '#F2F2F2',
  grayMedium: '#C2C2C2',
  grayDark: '#6B7280',
  border: '#E5E7EB',

  // Estados
  success: '#16A34A',
  successBg: '#DCFCE7',

  error: '#DC2626',
  errorBg: '#FEE2E2',

  warning: '#F59E0B',
  warningBg: '#FEF3C7',

  info: '#0284C7',
  infoBg: '#E0F2FE',

  // Acento
  accent: '#90E0EF',
  accentHover: '#6DD3E8'
};

export const darkColors: ThemeColors = {
  // Base
  primary: '#38BDF8',
  primaryHover: '#0EA5E9',
  primaryActive: '#0284C7',
  primaryDisabled: '#1E3A5F',

  secondary: '#67E8F9',
  secondaryHover: '#22D3EE',
  secondaryActive: '#06B6D4',

  background: '#0B1724',
  surface: '#0F1F33',
  surfaceAlt: '#13263D',

  // Texto
  textPrimary: '#E0F2FE',
  textSecondary: '#BAE6FD',
  textMuted: '#94A3B8',
  textOnPrimary: '#022C43',

  // Grises (UI)
  grayLight: '#1E293B',
  grayMedium: '#C2C2C2',
  grayDark: '#64748B',
  border: '#1F2A44',

  // Estados
  success: '#22C55E',
  successBg: '#052E1C',

  error: '#EF4444',
  errorBg: '#3B0A0A',

  warning: '#F59E0B',
  warningBg: '#3A2A05',

  info: '#38BDF8',
  infoBg: '#082F49',

  // Acento
  accent: '#67E8F9',
  accentHover: '#22D3EE'
};

export const ecoLightColors: ThemeColors = {
  primary: '#0F6D6D',
  primaryHover: '#0C5C5C',
  primaryActive: '#094B4B',
  primaryDisabled: '#7FB3B3',

  secondary: '#2A9D9D',
  secondaryHover: '#238383',
  secondaryActive: '#1B6B6B',

  background: '#F4FBFB',
  surface: '#FFFFFF',
  surfaceAlt: '#E6F4F4',

  textPrimary: '#0B3C3C',
  textSecondary: '#145757',
  textMuted: '#6B7280',
  textOnPrimary: '#FFFFFF',

  grayLight: '#F2F2F2',
  grayMedium: '#C2C2C2',
  grayDark: '#6B7280',
  border: '#E5E7EB',

  success: '#15803D',
  successBg: '#DCFCE7',

  error: '#DC2626',
  errorBg: '#FEE2E2',

  warning: '#F59E0B',
  warningBg: '#FEF3C7',

  info: '#0EA5A5',
  infoBg: '#E0F7F7',

  accent: '#5CCFCF',
  accentHover: '#3DBABA'
};

export const ecoDarkColors: ThemeColors = {
    primary: '#2A9D9D',
  primaryHover: '#238383',
  primaryActive: '#1B6B6B',
  primaryDisabled: '#0B3C3C',

  secondary: '#5CCFCF',
  secondaryHover: '#3DBABA',
  secondaryActive: '#2A9D9D',

  background: '#071A1A',
  surface: '#0B2626',
  surfaceAlt: '#103333',

  textPrimary: '#D9F3F3',
  textSecondary: '#A7DCDC',
  textMuted: '#94A3B8',
  textOnPrimary: '#071A1A',

  grayLight: '#1E293B',
  grayMedium: '#C2C2C2',
  grayDark: '#64748B',
  border: '#1F2A44',

  success: '#22C55E',
  successBg: '#052E1C',

  error: '#EF4444',
  errorBg: '#3B0A0A',

  warning: '#F59E0B',
  warningBg: '#3A2A05',

  info: '#22D3EE',
  infoBg: '#083344',

  accent: '#5CCFCF',
  accentHover: '#3DBABA'
};

const STORAGE_KEY_MODE = 'cuidatuagua-theme-mode';
const STORAGE_KEY_TYPE = 'cuidatuagua-theme-type';

type ThemeContextValue = {
  mode: ThemeMode;
  themeType: ThemeType;
  colors: ThemeColors;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeType: (type: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  themeType: 'standard',
  colors: lightColors,
  toggleTheme: () => {},
  setThemeMode: () => {},
  setThemeType: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const system = Appearance.getColorScheme();
    return system === 'dark' ? 'dark' : 'light';
  });
  const [themeType, setThemeType] = useState<ThemeType>('standard');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(STORAGE_KEY_MODE);
        if (savedMode === 'light' || savedMode === 'dark') {
          setMode(savedMode);
        }
        const savedType = await AsyncStorage.getItem(STORAGE_KEY_TYPE);
        if (savedType === 'standard' || savedType === 'eco') {
          setThemeType(savedType);
        }
      } catch (error) {
        // ignore
      } finally {
        setIsReady(true);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem(STORAGE_KEY_MODE, mode).catch(() => {});
    }
  }, [mode, isReady]);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem(STORAGE_KEY_TYPE, themeType).catch(() => {});
    }
  }, [themeType, isReady]);

  const toggleTheme = () => {
    setMode((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const colors = themeType === 'standard'
    ? (mode === 'light' ? lightColors : darkColors)
    : (mode === 'light' ? ecoLightColors : ecoDarkColors);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ mode, themeType, colors, toggleTheme, setThemeMode: setMode, setThemeType }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

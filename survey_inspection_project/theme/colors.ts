export const lightThemeColors = {
  primary: '#4F46E5', // Indigo 600
  primaryLight: '#EEF2FF', // Indigo 50
  primaryDark: '#3730A3', // Indigo 800

  background: '#F8FAFC', // Slate 50
  surface: '#FFFFFF',
  
  text: '#0F172A', // Slate 900
  textMuted: '#64748B', // Slate 500
  
  border: '#E2E8F0', // Slate 200
  
  success: '#10B981', // Emerald 500
  successLight: '#D1FAE5', // Emerald 100
  
  warning: '#F59E0B', // Amber 500
  warningLight: '#FEF3C7', // Amber 100
  
  danger: '#EF4444', // Red 500
  dangerLight: '#FEE2E2', // Red 100
  
  info: '#3B82F6', // Blue 500
  infoLight: '#DBEAFE', // Blue 100
  
  cardShadow: '#0F172A',
  shadowOpacity: 0.05,
};

export const darkThemeColors = {
  primary: '#6366F1', // Indigo 500
  primaryLight: '#312E81', // Indigo 900
  primaryDark: '#4338CA', // Indigo 700

  background: '#0F172A', // Slate 900
  surface: '#1E293B', // Slate 800
  
  text: '#F8FAFC', // Slate 50
  textMuted: '#94A3B8', // Slate 400
  
  border: '#334155', // Slate 700
  
  success: '#34D399', // Emerald 400
  successLight: '#064E3B', // Emerald 900
  
  warning: '#FBBF24', // Amber 400
  warningLight: '#78350F', // Amber 900
  
  danger: '#F87171', // Red 400
  dangerLight: '#7F1D1D', // Red 900
  
  info: '#60A5FA', // Blue 400
  infoLight: '#1E3A8A', // Blue 900
  
  cardShadow: '#000000',
  shadowOpacity: 0.3,
};

export type Colors = typeof lightThemeColors;

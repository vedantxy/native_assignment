import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export interface AvatarProps {
  name: string;
  size?: number;
  style?: ViewStyle;
}

export function Avatar({ name, size = 40, style }: AvatarProps) {
  const { theme } = useTheme();

  // Simple hash to pick a color
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const bgColors = [
    theme.colors.primaryLight,
    theme.colors.successLight,
    theme.colors.warningLight,
    theme.colors.infoLight,
    theme.colors.dangerLight,
  ];
  const textColors = [
    theme.colors.primary,
    theme.colors.success,
    theme.colors.warning,
    theme.colors.info,
    theme.colors.danger,
  ];

  const colorIndex = hash % bgColors.length;

  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColors[colorIndex],
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColors[colorIndex],
            fontSize: size * 0.4,
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

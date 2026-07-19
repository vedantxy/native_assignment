import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export interface AppCardProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
  elevation?: 'low' | 'medium' | 'high';
}

export function AppCard({ style, children, elevation = 'medium', ...props }: AppCardProps) {
  const { theme } = useTheme();

  const getElevationStyles = () => {
    switch (elevation) {
      case 'low':
        return {
          shadowColor: theme.colors.cardShadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.03,
          shadowRadius: 4,
          elevation: 2,
        };
      case 'medium':
        return {
          shadowColor: theme.colors.cardShadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: theme.colors.shadowOpacity || 0.05,
          shadowRadius: 8,
          elevation: 4,
        };
      case 'high':
        return {
          shadowColor: theme.colors.cardShadow,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 15,
          elevation: 8,
        };
      default:
        return {};
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        getElevationStyles(),
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
});

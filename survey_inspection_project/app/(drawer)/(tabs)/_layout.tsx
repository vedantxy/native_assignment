import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: [styles.tabBar, { backgroundColor: theme.colors.surface }],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen 
        name="dashboard" 
        options={{ 
          title: 'Dashboard', 
          tabBarIcon: ({color,size,focused}) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
            </View>
          ) 
        }} 
      />
      <Tabs.Screen 
        name="new_survey" 
        options={{ 
          title: 'New Survey', 
          tabBarIcon: ({color,size,focused}) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={22} color={color} />
            </View>
          ) 
        }} 
      />
      <Tabs.Screen 
        name="history" 
        options={{ 
          title: 'History', 
          tabBarIcon: ({color,size,focused}) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name={focused ? "time" : "time-outline"} size={22} color={color} />
            </View>
          ) 
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile', 
          tabBarIcon: ({color,size,focused}) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name={focused ? "person" : "person-outline"} size={22} color={color} />
            </View>
          ) 
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    right: 16,
    elevation: 10,
    borderRadius: 24,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderTopWidth: 0,
    paddingBottom: 0,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },
  tabBarItem: {
    paddingTop: 8,
  },
  iconContainer: {
    padding: 6,
    borderRadius: 12,
  },
});
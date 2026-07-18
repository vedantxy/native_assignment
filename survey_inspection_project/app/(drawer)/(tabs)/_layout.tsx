import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard', tabBarIcon: ({color,size}) => <Ionicons name="home" size={size} color={color} /> }} />
      <Tabs.Screen name="new_survey" options={{ title: 'New Survey', tabBarIcon: ({color,size}) => <Ionicons name="add-circle" size={size} color={color} /> }} />
      <Tabs.Screen name="history" options={{ title: 'History', tabBarIcon: ({color,size}) => <Ionicons name="time" size={size} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({color,size}) => <Ionicons name="person" size={size} color={color} /> }} />
    </Tabs>
  );
}
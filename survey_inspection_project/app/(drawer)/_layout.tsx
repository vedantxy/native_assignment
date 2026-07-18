import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomDrawerContent(props: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <DrawerContentScrollView 
        {...props} 
        bounces={false}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* Profile Header without Avatar */}
        <View style={[styles.drawerHeader, { paddingTop: insets.top + 30 }]}>
          <Text style={styles.profileName}>Jane Doe</Text>
          <Text style={styles.profileId}>ID: CS-2024-001</Text>
        </View>

        {/* Drawer Items */}
        <View style={styles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      
      {/* Footer / Logout */}
      <View style={[styles.drawerFooter, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <Pressable 
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && { backgroundColor: '#FEE2E2' }
          ]} 
          onPress={() => {
             // Handle logout
          }}
        >
          <Ionicons name="log-out-outline" size={26} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ 
          headerShown: false,
          drawerActiveBackgroundColor: '#E2E8F0', // Light gray background for active item
          drawerActiveTintColor: '#374151',     // Dark slate text for active
          drawerInactiveTintColor: '#4B5563',   // Dark slate text for inactive
          drawerItemStyle: {
            borderRadius: 12,
            marginVertical: 4,
            paddingVertical: 2,
          },
          drawerLabelStyle: {
            marginLeft: -15,
            fontSize: 18,
            fontWeight: '600',
          },
          drawerStyle: {
            width: '75%',
          }
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Dashboard',
            title: 'Dashboard',
            drawerItemStyle: { display: 'none' }, // Hiding Dashboard from sidebar
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size + 2} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="camera"
          options={{
            drawerLabel: 'Camera',
            title: 'Camera',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="camera-outline" size={size + 2} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="survey"
          options={{
            drawerLabel: 'Survey',
            title: 'Survey',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document-text-outline" size={size + 2} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="location"
          options={{
            drawerLabel: 'Location',
            title: 'Location',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="location-outline" size={size + 2} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="contacts"
          options={{
            drawerLabel: 'Contacts',
            title: 'Contacts',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size + 2} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="clipboard"
          options={{
            drawerLabel: 'Clipboard',
            title: 'Clipboard',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="clipboard-outline" size={size + 2} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size + 2} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#4F46E5', // Matches screenshot blue header
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  profileName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  profileId: {
    color: '#E0E7FF',
    fontSize: 16,
    fontWeight: '600',
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 18,
    marginLeft: 12,
    color: '#EF4444',
    fontWeight: '700',
  }
});
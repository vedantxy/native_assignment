import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppContext } from '@/context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

function CustomDrawerContent(props: any) {
  const insets = useSafeAreaInsets();
  const { profile } = useAppContext();

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
      <DrawerContentScrollView 
        {...props} 
        bounces={false}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <LinearGradient
          colors={['#5B4FE9', '#4338CA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.headerGradient, { paddingTop: insets.top + 40 }]}
        >
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileId}>ID: {profile.employeeId}</Text>
        </LinearGradient>

        <View style={styles.menuContainer}>
          {props.state.routes.map((route: any, index: number) => {
            const isFocused = props.state.index === index;
            const { options } = props.descriptors[route.key];
            const label = options.drawerLabel !== undefined 
              ? options.drawerLabel 
              : options.title !== undefined 
                ? options.title 
                : route.name;
            
            let iconName = 'ellipse-outline';
            if (route.name === '(tabs)') iconName = 'grid-outline';
            if (route.name === 'survey') iconName = 'document-text-outline';
            if (route.name === 'camera') iconName = 'camera-outline';
            if (route.name === 'location') iconName = 'location-outline';
            if (route.name === 'contacts') iconName = 'people-outline';
            if (route.name === 'clipboard') iconName = 'clipboard-outline';
            if (route.name === 'settings') iconName = 'settings-outline';

            return (
              <Pressable
                key={route.key}
                onPress={() => props.navigation.navigate(route.name)}
                style={({ pressed }) => [
                  styles.menuItem,
                  isFocused && styles.menuItemActive,
                  pressed && { opacity: 0.7 }
                ]}
              >
                <View style={styles.menuItemContent}>
                  <View style={[
                    styles.iconContainer,
                    isFocused ? styles.iconContainerActive : styles.iconContainerInactive
                  ]}>
                    <Ionicons 
                      name={iconName as any} 
                      size={18} 
                      color={isFocused ? '#fff' : '#4338CA'} 
                    />
                  </View>
                  <Text style={[
                    styles.menuLabel,
                    isFocused && styles.menuLabelActive
                  ]}>
                    {label}
                  </Text>
                </View>
                {isFocused && <View style={styles.activeIndicator} />}
              </Pressable>
            );
          })}
        </View>
      </DrawerContentScrollView>
      
      <View style={[styles.drawerFooter, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <Pressable 
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && { opacity: 0.7 }
          ]} 
          onPress={() => {
             // Handle logout
          }}
        >
          <Ionicons name="log-out-outline" size={22} color="#E53935" />
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
          drawerStyle: {
            width: '80%',
          }
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Dashboard',
            title: 'Dashboard'
          }}
        />
        <Drawer.Screen
          name="survey"
          options={{
            drawerLabel: 'Survey',
            title: 'Survey'
          }}
        />
        <Drawer.Screen
          name="camera"
          options={{
            drawerLabel: 'Camera',
            title: 'Camera'
          }}
        />
        <Drawer.Screen
          name="location"
          options={{
            drawerLabel: 'Location',
            title: 'Location'
          }}
        />
        <Drawer.Screen
          name="contacts"
          options={{
            drawerLabel: 'Contacts',
            title: 'Contacts'
          }}
        />
        <Drawer.Screen
          name="clipboard"
          options={{
            drawerLabel: 'Clipboard',
            title: 'Clipboard'
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings'
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileId: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
  },
  menuContainer: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemActive: {
    backgroundColor: '#EDEBFF',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconContainerInactive: {
    backgroundColor: '#F0EEFF',
  },
  iconContainerActive: {
    backgroundColor: '#4338CA',
  },
  menuLabel: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  menuLabelActive: {
    color: '#4338CA',
    fontWeight: 'bold',
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4338CA',
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53935',
    marginLeft: 15,
  }
});
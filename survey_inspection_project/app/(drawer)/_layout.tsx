import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppContext } from '@/context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

function CustomDrawerContent(props: any) {
  const insets = useSafeAreaInsets();
  const { profile } = useAppContext();
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <DrawerContentScrollView 
        {...props} 
        bounces={false}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.headerGradient, { paddingTop: insets.top + 40, shadowColor: theme.colors.primary }]}
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
                  isFocused && { backgroundColor: theme.colors.primaryLight },
                  pressed && { opacity: 0.7 }
                ]}
              >
                <View style={styles.menuItemContent}>
                  <View style={[
                    styles.iconContainer,
                    isFocused ? { backgroundColor: theme.colors.primary } : { backgroundColor: theme.colors.surface }
                  ]}>
                    <Ionicons 
                      name={iconName as any} 
                      size={18} 
                      color={isFocused ? '#fff' : theme.colors.primary} 
                    />
                  </View>
                  <Text style={[
                    styles.menuLabel,
                    { color: theme.colors.textMuted },
                    isFocused && { color: theme.colors.primary, fontWeight: 'bold' }
                  ]}>
                    {label}
                  </Text>
                </View>
                {isFocused && <View style={[styles.activeIndicator, { backgroundColor: theme.colors.primary }]} />}
              </Pressable>
            );
          })}
        </View>
      </DrawerContentScrollView>
      
      <View style={[styles.drawerFooter, { borderTopColor: theme.colors.border, paddingBottom: Math.max(insets.bottom, 20) }]}>
        <Pressable 
          style={({ pressed }) => [
            styles.logoutButton,
            { backgroundColor: theme.colors.dangerLight },
            pressed && { opacity: 0.7 }
          ]} 
          onPress={() => {
             // Handle logout
          }}
        >
          <Ionicons name="log-out-outline" size={22} color={theme.colors.danger} />
          <Text style={[styles.logoutText, { color: theme.colors.danger }]}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  const { theme } = useTheme();
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ 
          headerShown: false,
          drawerStyle: {
            width: '80%',
            backgroundColor: theme.colors.background
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
    borderBottomRightRadius: 30,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  avatarText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  profileId: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14,
    fontWeight: '500',
  },
  menuContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  drawerFooter: {
    borderTopWidth: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  }
});
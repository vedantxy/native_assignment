import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Pressable,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/context/AppContext';

export default function SettingsScreen() {
  const { settings, updateSettings } = useAppContext();

  const setNotifications = (val: boolean) => updateSettings({ ...settings, notifications: val });
  const setDarkMode = (val: boolean) => updateSettings({ ...settings, darkMode: val });
  const setLocationServices = (val: boolean) => updateSettings({ ...settings, locationServices: val });

  const SettingRow = ({ icon, label, type, value, onToggle, onPress, color = '#4F46E5' }: any) => (
    <Pressable style={styles.settingRow} onPress={onPress} disabled={type === 'switch'}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {type === 'switch' ? (
        <Switch 
          value={value} 
          onValueChange={onToggle}
          trackColor={{ false: '#D1D5DB', true: color }}
          thumbColor="#fff"
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Preferences & account management</Text>
        </View>

        <Text style={styles.sectionTitle}>App Preferences</Text>
        <View style={styles.sectionCard}>
          <SettingRow 
            icon="notifications" 
            label="Push Notifications" 
            type="switch" 
            value={settings.notifications}
            onToggle={setNotifications}
            color="#3B82F6"
          />
          <View style={styles.divider} />
          <SettingRow 
            icon="moon" 
            label="Dark Mode" 
            type="switch" 
            value={settings.darkMode}
            onToggle={setDarkMode}
            color="#6366F1"
          />
          <View style={styles.divider} />
          <SettingRow 
            icon="location" 
            label="Location Services" 
            type="switch" 
            value={settings.locationServices}
            onToggle={setLocationServices}
            color="#10B981"
          />
        </View>

        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.sectionCard}>
          <SettingRow 
            icon="lock-closed" 
            label="Change Password" 
            type="link" 
            color="#F59E0B"
          />
          <View style={styles.divider} />
          <SettingRow 
            icon="shield-checkmark" 
            label="Privacy Policy" 
            type="link" 
            color="#14B8A6"
          />
          <View style={styles.divider} />
          <SettingRow 
            icon="document-text" 
            label="Terms of Service" 
            type="link" 
            color="#8B5CF6"
          />
        </View>

        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <View style={styles.sectionCard}>
          <Pressable style={styles.dangerRow}>
            <Ionicons name="trash" size={20} color="#EF4444" style={{ marginRight: 15 }} />
            <Text style={styles.dangerText}>Delete Account</Text>
          </Pressable>
        </View>

        <Text style={styles.versionText}>App Version 1.0.0 (Build 42)</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 10,
    marginLeft: 5,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 5,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 70,
  },
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  dangerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  versionText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 13,
    marginTop: 10,
  }
});

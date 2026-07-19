import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/context/AppContext';
import { useTheme } from '../../../context/ThemeContext';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { AppCard } from '../../../components/AppCard';
import { AppInput } from '../../../components/AppInput';
import { AppButton } from '../../../components/AppButton';
import { SectionHeader } from '../../../components/SectionHeader';
import { Avatar } from '../../../components/Avatar';

export default function ProfileScreen() {
  const { profile, updateProfile } = useAppContext();
  const { theme } = useTheme();
  
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);

  // Sync state if context changes externally
  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
  }, [profile]);

  const handleSave = () => {
    updateProfile({
      ...profile,
      name,
      email,
      phone
    });
    Alert.alert("Success", "Profile updated successfully!");
  };

  return (
    <ScreenContainer scrollable>
      <SectionHeader 
        title="My Profile" 
        subtitle="Manage your personal information" 
      />

      <View style={styles.avatarSection}>
        <View style={styles.avatarWrapper}>
          <Avatar name={profile.name} size={100} />
          <Pressable style={[styles.editAvatarBtn, { backgroundColor: theme.colors.primary, borderColor: theme.colors.background }]}>
            <Ionicons name="camera" size={16} color="#fff" />
          </Pressable>
        </View>
        <Text style={[styles.userName, { color: theme.colors.text }]}>{profile.name}</Text>
        <Text style={[styles.userRole, { color: theme.colors.textMuted }]}>Field Inspector</Text>
      </View>

      <AppCard elevation="low">
        <AppInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.textMuted} />}
        />

        <AppInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.textMuted} />}
        />

        <AppInput
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          leftIcon={<Ionicons name="call-outline" size={20} color={theme.colors.textMuted} />}
        />

        <AppInput
          label="Employee ID"
          value={profile.employeeId}
          editable={false}
          leftIcon={<Ionicons name="id-card-outline" size={20} color={theme.colors.textMuted} />}
          style={{ color: theme.colors.textMuted }}
        />
      </AppCard>

      <AppButton
        title="Save Changes"
        onPress={handleSave}
        size="large"
        style={{ marginTop: 10, marginBottom: 40 }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  userRole: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
});

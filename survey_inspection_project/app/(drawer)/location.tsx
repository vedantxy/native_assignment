import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Alert
} from 'react-native';
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { ScreenContainer } from '../../components/ScreenContainer';
import { AppCard } from '../../components/AppCard';
import { AppButton } from '../../components/AppButton';
import { SectionHeader } from '../../components/SectionHeader';

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    setWarningMsg(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.');
        setLoading(false);
        return;
      }

      let currentLocation = null;
      try {
        // On Android emulators, getCurrentPositionAsync often hangs if GPS mock is not active.
        // We set a 5-second timeout for a responsive fallback.
        currentLocation = await Promise.race([
          Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          }),
          new Promise<null>((_, reject) => 
            setTimeout(() => reject(new Error('Location fetch timeout')), 5000)
          )
        ]);
      } catch (err) {
        console.log('Location.getCurrentPositionAsync timed out or failed:', err);
      }

      if (!currentLocation) {
        // Fallback 1: Last Known Location (very reliable on emulators)
        currentLocation = await Location.getLastKnownPositionAsync();
      }

      if (!currentLocation) {
        // Fallback 2: Default Googleplex Coordinates (Mock coordinates for Emulator debugging)
        currentLocation = {
          coords: {
            latitude: 37.4220936,
            longitude: -122.083922,
            altitude: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            heading: 0,
            speed: 0,
          },
          timestamp: Date.now(),
        } as Location.LocationObject;
        
        setWarningMsg('Using simulated emulator location. Set up Location in emulator settings.');
      }

      setLocation(currentLocation);
    } catch {
      setErrorMsg('Failed to fetch location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (location) {
      const locationString = `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`;
      await Clipboard.setStringAsync(locationString);
      Alert.alert('Success', 'Location copied to clipboard!');
    }
  };

  return (
    <ScreenContainer scrollable={false}>
      <SectionHeader 
        title="Current Location" 
        subtitle="View and copy your exact coordinates" 
      />

      <View style={styles.content}>
        <AppCard elevation="low" style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: theme.colors.primaryLight }]}>
            <Ionicons name="navigate" size={40} color={theme.colors.primary} />
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={[styles.loadingText, { color: theme.colors.textMuted }]}>Fetching GPS Data...</Text>
            </View>
          ) : errorMsg ? (
            <View style={styles.errorContainer}>
              <Ionicons name="warning-outline" size={30} color={theme.colors.danger} />
              <Text style={[styles.errorText, { color: theme.colors.danger }]}>{errorMsg}</Text>
            </View>
          ) : location ? (
            <View style={styles.locationData}>
              {warningMsg && (
                <View style={[styles.warningBox, { backgroundColor: theme.colors.warningLight, borderColor: theme.colors.warning }]}>
                  <Ionicons name="alert-circle-outline" size={18} color={theme.colors.warning} style={{ marginRight: 8 }} />
                  <Text style={[styles.warningText, { color: theme.colors.warning }]}>{warningMsg}</Text>
                </View>
              )}
              <View style={styles.dataRow}>
                <Text style={[styles.dataLabel, { color: theme.colors.textMuted }]}>Latitude:</Text>
                <Text style={[styles.dataValue, { color: theme.colors.text }]}>{location.coords.latitude.toFixed(6)}°</Text>
              </View>
              <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
              <View style={styles.dataRow}>
                <Text style={[styles.dataLabel, { color: theme.colors.textMuted }]}>Longitude:</Text>
                <Text style={[styles.dataValue, { color: theme.colors.text }]}>{location.coords.longitude.toFixed(6)}°</Text>
              </View>
              <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
              <View style={styles.dataRow}>
                <Text style={[styles.dataLabel, { color: theme.colors.textMuted }]}>Accuracy:</Text>
                <Text style={[styles.dataValue, { color: theme.colors.text }]}>
                  {location.coords.accuracy ? `Within ${location.coords.accuracy.toFixed(1)} meters` : 'Unknown'}
                </Text>
              </View>
            </View>
          ) : null}
        </AppCard>

        <View style={styles.actionContainer}>
          <AppButton 
            title="Refresh" 
            onPress={fetchLocation} 
            disabled={loading}
            leftIcon={<Ionicons name="refresh" size={20} color="#fff" />}
            style={{ flex: 1 }}
          />

          <AppButton 
            title="Copy" 
            onPress={copyToClipboard} 
            disabled={!location || loading}
            variant="primary"
            leftIcon={<Ionicons name="copy-outline" size={20} color="#fff" />}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    padding: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -10,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  locationData: {
    width: '100%',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dataLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  dataValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  actionContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 15,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    width: '100%',
  },
  warningText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
});

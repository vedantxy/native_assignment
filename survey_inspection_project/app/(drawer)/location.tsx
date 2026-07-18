import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  ActivityIndicator, 
  Alert,
  SafeAreaView
} from 'react-native';
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.');
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced
      });
      setLocation(currentLocation);
    } catch (err) {
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Current Location</Text>
          <Text style={styles.headerSubtitle}>View and copy your exact coordinates</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="navigate" size={40} color="#4F46E5" />
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4F46E5" />
              <Text style={styles.loadingText}>Fetching GPS Data...</Text>
            </View>
          ) : errorMsg ? (
            <View style={styles.errorContainer}>
              <Ionicons name="warning-outline" size={30} color="#EF4444" />
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : location ? (
            <View style={styles.locationData}>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Latitude:</Text>
                <Text style={styles.dataValue}>{location.coords.latitude.toFixed(6)}°</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Longitude:</Text>
                <Text style={styles.dataValue}>{location.coords.longitude.toFixed(6)}°</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Accuracy:</Text>
                <Text style={styles.dataValue}>
                  {location.coords.accuracy ? `Within ${location.coords.accuracy.toFixed(1)} meters` : 'Unknown'}
                </Text>
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.actionContainer}>
          <Pressable 
            style={[styles.button, styles.refreshButton]} 
            onPress={fetchLocation}
            disabled={loading}
          >
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.buttonText}>Refresh</Text>
          </Pressable>

          <Pressable 
            style={[
              styles.button, 
              styles.copyButton, 
              (!location || loading) && styles.buttonDisabled
            ]} 
            onPress={copyToClipboard}
            disabled={!location || loading}
          >
            <Ionicons name="copy-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Copy</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 30,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
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
    color: '#666',
    fontWeight: '500',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    marginTop: 10,
    color: '#EF4444',
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
    color: '#666',
    fontWeight: '600',
  },
  dataValue: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    width: '100%',
  },
  actionContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 15,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  refreshButton: {
    backgroundColor: '#4F46E5',
  },
  copyButton: {
    backgroundColor: '#10B981',
  },
  buttonDisabled: {
    backgroundColor: '#A7F3D0',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

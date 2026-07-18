import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Image,
  Alert,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SurveyPreviewScreen() {
  const router = useRouter();

  // Mock data for the survey preview
  const surveyData = {
    siteName: 'Downtown Commercial Plaza',
    clientName: 'Acme Corp',
    contact: '+1 (555) 987-6543',
    location: 'Lat: 40.7128, Lon: -74.0060',
    priority: 'High',
    date: new Date().toISOString().split('T')[0],
    notes: 'The main entrance lobby shows signs of water damage near the west wall. Needs immediate maintenance scheduling. Structural integrity seems fine otherwise.',
    photoUri: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };

  const handleEdit = () => {
    // Navigate back to the creation form (assuming it's in the tabs)
    router.push('/(drawer)/(tabs)/new_survey');
  };

  const handleSubmit = () => {
    Alert.alert(
      'Survey Submitted',
      'The survey inspection has been successfully uploaded to the server.',
      [
        { 
          text: 'OK', 
          onPress: () => router.push('/(drawer)/(tabs)') // Go to dashboard
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Survey Preview</Text>
          <Text style={styles.headerSubtitle}>Review details before submission</Text>
        </View>

        {/* Site & Client Details */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="business" size={20} color="#4F46E5" />
            <Text style={styles.cardTitle}>Site Details</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Site Name:</Text>
            <Text style={styles.value}>{surveyData.siteName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Client:</Text>
            <Text style={styles.value}>{surveyData.clientName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{surveyData.date}</Text>
          </View>
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={styles.label}>Priority:</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{surveyData.priority}</Text>
            </View>
          </View>
        </View>

        {/* Location & Contact */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="map" size={20} color="#10B981" />
            <Text style={styles.cardTitle}>Location & Contact</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{surveyData.location}</Text>
          </View>
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.value}>{surveyData.contact}</Text>
          </View>
        </View>

        {/* Inspection Photo */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="camera" size={20} color="#F59E0B" />
            <Text style={styles.cardTitle}>Inspection Photo</Text>
          </View>
          <View style={styles.divider} />
          <Image 
            source={{ uri: surveyData.photoUri }} 
            style={styles.previewImage}
          />
        </View>

        {/* Notes */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="document-text" size={20} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Notes / Findings</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.notesText}>{surveyData.notes}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="create-outline" size={20} color="#4F46E5" />
            <Text style={styles.editButtonText}>Edit Survey</Text>
          </Pressable>

          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.submitButtonText}>Submit Survey</Text>
          </Pressable>
        </View>

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
    marginBottom: 25,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  label: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: 'bold',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
  },
  notesText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 15,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  editButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

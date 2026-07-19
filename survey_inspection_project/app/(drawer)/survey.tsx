import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { ScreenContainer } from '../../components/ScreenContainer';
import { AppCard } from '../../components/AppCard';
import { SectionHeader } from '../../components/SectionHeader';
import { AppBadge } from '../../components/AppBadge';
import { AppButton } from '../../components/AppButton';
import { EmptyState } from '../../components/EmptyState';

export default function SurveyPreviewScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { surveys } = useAppContext();
  const { theme } = useTheme();

  // Find the selected survey, or default to the first one if navigated directly without an id
  const surveyData = surveys.find(s => s.id === id) || surveys[0];

  const handleEdit = () => {
    Alert.alert("Coming Soon", "Edit functionality will be available in a future update.");
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

  if (!surveyData) {
    return (
      <ScreenContainer scrollable={false}>
        <View style={styles.emptyStateContainer}>
          <EmptyState 
            title="No survey data found" 
            message="We couldn't find the survey you're looking for." 
            icon="document-text-outline"
          />
          <AppButton 
            title="Go Back" 
            onPress={() => router.back()} 
            style={{ marginTop: 20, alignSelf: 'center' }}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <SectionHeader 
        title="Survey Preview" 
        subtitle="Review details before submission" 
      />

      {/* Site & Client Details */}
      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="business" size={20} color={theme.colors.primary} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Site Details</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
        <View style={[styles.row, { borderBottomColor: theme.colors.surface }]}>
          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Site Name:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{surveyData.siteName}</Text>
        </View>
        <View style={[styles.row, { borderBottomColor: theme.colors.surface }]}>
          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Client:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{surveyData.clientName}</Text>
        </View>
        <View style={[styles.row, { borderBottomColor: theme.colors.surface }]}>
          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Date:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{surveyData.date}</Text>
        </View>
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Priority:</Text>
          <AppBadge 
            label={surveyData.priority} 
            variant={
              surveyData.priority === 'High' ? 'danger' :
              surveyData.priority === 'Medium' ? 'warning' : 'success'
            } 
          />
        </View>
      </AppCard>

      {/* Inspection Photo */}
      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="camera" size={20} color={theme.colors.warning} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Inspection Photo</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
        {surveyData.photoUri ? (
          <Image 
            source={{ uri: surveyData.photoUri }} 
            style={[styles.previewImage, { backgroundColor: theme.colors.surface }]}
          />
        ) : (
          <View style={[styles.noPhotoContainer, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
            <Ionicons name="image-outline" size={40} color={theme.colors.border} />
            <Text style={[styles.noPhotoText, { color: theme.colors.textMuted }]}>No photo attached</Text>
          </View>
        )}
      </AppCard>

      {/* Notes */}
      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="document-text" size={20} color={theme.colors.success} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Notes / Findings</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
        <Text style={[styles.notesText, { color: theme.colors.text }]}>{surveyData.description}</Text>
      </AppCard>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <AppButton 
          title="Edit Survey" 
          onPress={handleEdit} 
          variant="outline"
          leftIcon={<Ionicons name="create-outline" size={20} color={theme.colors.primary} />}
          style={{ flex: 1 }}
        />

        <AppButton 
          title="Submit Survey" 
          onPress={handleSubmit} 
          variant="primary"
          leftIcon={<Ionicons name="checkmark-circle" size={20} color="#fff" />}
          style={{ flex: 1 }}
        />
      </View>
      
      <View style={{ height: 40 }} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    letterSpacing: -0.2,
  },
  divider: {
    height: 1,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    textAlign: 'right',
    paddingLeft: 20,
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  noPhotoContainer: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPhotoText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
  },
  notesText: {
    fontSize: 16,
    lineHeight: 26,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 15,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

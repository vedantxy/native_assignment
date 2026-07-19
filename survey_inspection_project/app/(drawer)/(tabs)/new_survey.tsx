import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { AppCard } from '../../../components/AppCard';
import { AppInput } from '../../../components/AppInput';
import { AppButton } from '../../../components/AppButton';
import { SectionHeader } from '../../../components/SectionHeader';

export default function NewSurveyScreen() {
  const router = useRouter();
  const { addSurvey } = useAppContext();
  const { theme } = useTheme();

  // Form State
  const [siteName, setSiteName] = useState('');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium'); // Default
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Animation
  const shakeOffset = useSharedValue(0);

  const shakeAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeOffset.value }],
    };
  });

  const triggerShake = () => {
    shakeOffset.value = withSequence(
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors: Record<string, string> = {};

    if (!siteName.trim()) {
      newErrors.siteName = 'Site Name is required';
      isValid = false;
    }
    if (!clientName.trim()) {
      newErrors.clientName = 'Client Name is required';
      isValid = false;
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    if (!date.trim()) {
      newErrors.date = 'Date is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const isFormValid = siteName.trim() !== '' && clientName.trim() !== '' && description.trim() !== '' && date.trim() !== '';

  const handleSubmit = () => {
    if (validateForm()) {
      addSurvey({
        id: Math.random().toString(36).substring(2, 11),
        siteName,
        clientName,
        date,
        priority: priority as 'High' | 'Medium' | 'Low',
        description,
        photoUri: photoUri || undefined,
      });

      Alert.alert(
        'Success',
        'Survey has been created successfully!',
        [
          { 
            text: 'OK', 
            onPress: () => {
              setSiteName('');
              setClientName('');
              setDescription('');
              setPriority('Medium');
              setPhotoUri(null);
              setErrors({});
              router.push('/(drawer)/(tabs)/dashboard');
            } 
          }
        ]
      );
    } else {
      triggerShake();
    }
  };

  const PriorityButton = ({ level, color }: { level: string, color: string }) => (
    <Pressable
      style={[
        styles.priorityButton,
        priority === level && { backgroundColor: color, borderColor: color }
      ]}
      onPress={() => setPriority(level)}
    >
      <Text 
        style={[
          styles.priorityText, 
          { color: priority === level ? '#fff' : theme.colors.textMuted }
        ]}
      >
        {level}
      </Text>
    </Pressable>
  );

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Refused", "You've refused to allow this app to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Refused", "You've refused to allow this app to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: theme.colors.background }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenContainer scrollable>
        <SectionHeader 
          title="Create New Survey" 
          subtitle="Fill out the inspection details below"
        />

        <Animated.View style={shakeAnimation}>
          <AppCard elevation="low">
            <AppInput
              label="Site Name *"
              placeholder="Enter site name"
              value={siteName}
              onChangeText={(text) => {
                setSiteName(text);
                if (errors.siteName) setErrors({...errors, siteName: ''});
              }}
              error={errors.siteName}
              leftIcon={<Ionicons name="business-outline" size={20} color={theme.colors.textMuted} />}
            />

            <AppInput
              label="Client Name *"
              placeholder="Enter client name"
              value={clientName}
              onChangeText={(text) => {
                setClientName(text);
                if (errors.clientName) setErrors({...errors, clientName: ''});
              }}
              error={errors.clientName}
              leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.textMuted} />}
            />

            <AppInput
              label="Date *"
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={(text) => {
                setDate(text);
                if (errors.date) setErrors({...errors, date: ''});
              }}
              error={errors.date}
              leftIcon={<Ionicons name="calendar-outline" size={20} color={theme.colors.textMuted} />}
            />

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.textMuted }]}>Priority *</Text>
              <View style={[styles.priorityContainer, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
                <PriorityButton level="Low" color={theme.colors.success} />
                <PriorityButton level="Medium" color={theme.colors.warning} />
                <PriorityButton level="High" color={theme.colors.danger} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.textMuted }]}>Inspection Photo</Text>
              {photoUri ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: photoUri }} style={styles.previewImage} />
                  <Pressable style={styles.removeImageButton} onPress={() => setPhotoUri(null)}>
                    <Ionicons name="close-circle" size={24} color={theme.colors.danger} />
                  </Pressable>
                </View>
              ) : (
                <View style={styles.photoButtonsContainer}>
                  <AppButton 
                    title="Take Photo" 
                    onPress={takePhoto} 
                    variant="outline" 
                    leftIcon={<Ionicons name="camera-outline" size={20} color={theme.colors.primary} />}
                    style={styles.photoButton}
                  />
                  <AppButton 
                    title="Gallery" 
                    onPress={pickImage} 
                    variant="outline" 
                    leftIcon={<Ionicons name="image-outline" size={20} color={theme.colors.primary} />}
                    style={styles.photoButton}
                  />
                </View>
              )}
            </View>

            <AppInput
              label="Description *"
              placeholder="Describe the inspection findings..."
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                if (errors.description) setErrors({...errors, description: ''});
              }}
              error={errors.description}
              multiline
              numberOfLines={4}
              style={{ minHeight: 100, textAlignVertical: 'top' }}
            />

            <AppButton
              title="Create Survey"
              onPress={handleSubmit}
              disabled={!isFormValid}
              rightIcon={<Ionicons name="arrow-forward" size={20} color="#fff" />}
              style={{ marginTop: 10 }}
              size="large"
            />
          </AppCard>
        </Animated.View>
        <View style={{ height: 100 }} />
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    padding: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  priorityButton: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  priorityText: {
    fontSize: 15,
    fontWeight: '600',
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  photoButton: {
    flex: 1,
  },
  imagePreviewContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F5F9',
  },
  removeImageButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 2,
  }
});

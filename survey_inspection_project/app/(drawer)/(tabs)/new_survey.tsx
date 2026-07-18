import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  Pressable, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NewSurveyScreen() {
  const router = useRouter();

  // Form State
  const [siteName, setSiteName] = useState('');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium'); // Default
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = () => {
    if (validateForm()) {
      // Logic to submit survey would go here
      Alert.alert(
        'Success',
        'Survey has been created successfully!',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Reset form or navigate away
              setSiteName('');
              setClientName('');
              setDescription('');
              setPriority('Medium');
              setErrors({});
              router.push('/(drawer)/(tabs)/dashboard');
            } 
          }
        ]
      );
    } else {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
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
          priority === level && styles.priorityTextActive
        ]}
      >
        {level}
      </Text>
    </Pressable>
  );

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create New Survey</Text>
          <Text style={styles.headerSubtitle}>Fill out the inspection details below</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Site Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Site Name *</Text>
            <View style={[styles.inputWrapper, errors.siteName ? styles.inputError : null]}>
              <Ionicons name="business-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter site name"
                value={siteName}
                onChangeText={(text) => {
                  setSiteName(text);
                  if (errors.siteName) setErrors({...errors, siteName: ''});
                }}
              />
            </View>
            {errors.siteName ? <Text style={styles.errorText}>{errors.siteName}</Text> : null}
          </View>

          {/* Client Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Client Name *</Text>
            <View style={[styles.inputWrapper, errors.clientName ? styles.inputError : null]}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter client name"
                value={clientName}
                onChangeText={(text) => {
                  setClientName(text);
                  if (errors.clientName) setErrors({...errors, clientName: ''});
                }}
              />
            </View>
            {errors.clientName ? <Text style={styles.errorText}>{errors.clientName}</Text> : null}
          </View>

          {/* Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date *</Text>
            <View style={[styles.inputWrapper, errors.date ? styles.inputError : null]}>
              <Ionicons name="calendar-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={date}
                onChangeText={(text) => {
                  setDate(text);
                  if (errors.date) setErrors({...errors, date: ''});
                }}
              />
            </View>
            {errors.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}
          </View>

          {/* Priority */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Priority *</Text>
            <View style={styles.priorityContainer}>
              <PriorityButton level="Low" color="#4CAF50" />
              <PriorityButton level="Medium" color="#FF9800" />
              <PriorityButton level="High" color="#F44336" />
            </View>
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <View style={[styles.textAreaWrapper, errors.description ? styles.inputError : null]}>
              <TextInput
                style={styles.textArea}
                placeholder="Describe the inspection findings..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  if (errors.description) setErrors({...errors, description: ''});
                }}
              />
            </View>
            {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
          </View>

          {/* Submit Button */}
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Survey</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
    flexGrow: 1,
  },
  header: {
    marginBottom: 25,
    marginTop: 10,
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
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E4E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 52,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
  },
  textAreaWrapper: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E4E7EB',
    borderRadius: 12,
    padding: 15,
  },
  textArea: {
    fontSize: 15,
    color: '#1A1A1A',
    minHeight: 100,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#E4E7EB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  priorityTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    flexDirection: 'row',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
    marginRight: 8,
  },
});

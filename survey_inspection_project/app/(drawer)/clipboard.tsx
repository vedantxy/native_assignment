import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  TextInput, 
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

export default function ClipboardScreen() {
  const [clipboardContent, setClipboardContent] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const isFocused = useIsFocused();

  // Read clipboard when screen focuses
  useEffect(() => {
    if (isFocused) {
      readClipboard();
    }
  }, [isFocused]);

  const readClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setClipboardContent(text);
  };

  const handleCopy = async (type: string, text: string) => {
    await Clipboard.setStringAsync(text);
    setClipboardContent(text);
    Alert.alert('Success', `${type} copied to clipboard!`);
  };

  const handlePasteNotes = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) {
      setNotes((prev) => (prev ? prev + '\n' + text : text));
    } else {
      Alert.alert('Empty', 'Clipboard is currently empty.');
    }
  };

  const handleClearClipboard = async () => {
    await Clipboard.setStringAsync(''); // Expo clipboard clears by setting empty string
    setClipboardContent('');
    Alert.alert('Cleared', 'Clipboard data has been cleared.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Clipboard Manager</Text>
            <Text style={styles.headerSubtitle}>Manage copied text and notes</Text>
          </View>

          {/* Quick Copy Actions */}
          <Text style={styles.sectionTitle}>Quick Copy</Text>
          <View style={styles.actionGrid}>
            <Pressable 
              style={styles.actionCard} 
              onPress={() => handleCopy('Survey ID', 'SRV-2024-883A')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#EEF2FF' }]}>
                <Ionicons name="document-text" size={24} color="#4F46E5" />
              </View>
              <Text style={styles.actionText}>Survey ID</Text>
            </Pressable>

            <Pressable 
              style={styles.actionCard} 
              onPress={() => handleCopy('Contact Number', '+1 (555) 123-4567')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="call" size={24} color="#10B981" />
              </View>
              <Text style={styles.actionText}>Contact</Text>
            </Pressable>

            <Pressable 
              style={styles.actionCard} 
              onPress={() => handleCopy('Location', 'Lat: 40.7128, Lon: -74.0060')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#FFF7ED' }]}>
                <Ionicons name="navigate" size={24} color="#F97316" />
              </View>
              <Text style={styles.actionText}>Location</Text>
            </Pressable>
          </View>

          {/* Current Clipboard Content (Empty State Handling) */}
          <Text style={styles.sectionTitle}>Current Clipboard Data</Text>
          <View style={styles.clipboardViewer}>
            {clipboardContent ? (
              <View style={styles.activeStateContainer}>
                <Text style={styles.clipboardText}>{clipboardContent}</Text>
                <Pressable style={styles.clearButton} onPress={handleClearClipboard}>
                  <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  <Text style={styles.clearButtonText}>Clear</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.emptyStateContainer}>
                <Ionicons name="clipboard-outline" size={48} color="#CBD5E1" />
                <Text style={styles.emptyStateTitle}>Clipboard is Empty</Text>
                <Text style={styles.emptyStateSubtitle}>Copy something to see it here.</Text>
                <Pressable style={styles.refreshBtn} onPress={readClipboard}>
                  <Ionicons name="refresh" size={16} color="#4F46E5" />
                  <Text style={styles.refreshBtnText}>Refresh</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Paste Notes Area */}
          <View style={styles.notesHeader}>
            <Text style={styles.sectionTitle}>Notes Pad</Text>
            <Pressable style={styles.pasteButton} onPress={handlePasteNotes}>
              <Ionicons name="download-outline" size={18} color="#fff" />
              <Text style={styles.pasteButtonText}>Paste Clipboard</Text>
            </Pressable>
          </View>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Type or paste notes here..."
              placeholderTextColor="#94A3B8"
              multiline
              textAlignVertical="top"
              value={notes}
              onChangeText={setNotes}
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionCard: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  clipboardViewer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    minHeight: 140,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  emptyStateContainer: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 15,
    marginBottom: 5,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 15,
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  refreshBtnText: {
    color: '#4F46E5',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  activeStateContainer: {
    padding: 20,
  },
  clipboardText: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 24,
    marginBottom: 20,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  clearButtonText: {
    color: '#EF4444',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  pasteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pasteButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 13,
  },
  textAreaContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  textArea: {
    height: 150,
    padding: 15,
    fontSize: 16,
    color: '#1A1A1A',
  },
});

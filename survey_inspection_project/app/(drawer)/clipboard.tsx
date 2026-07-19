import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { ScreenContainer } from '../../components/ScreenContainer';
import { AppCard } from '../../components/AppCard';
import { SectionHeader } from '../../components/SectionHeader';
import { AppInput } from '../../components/AppInput';
import { AppButton } from '../../components/AppButton';

export default function ClipboardScreen() {
  const [clipboardContent, setClipboardContent] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const isFocused = useIsFocused();
  const { theme } = useTheme();

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
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: theme.colors.background }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenContainer scrollable>
        <SectionHeader 
          title="Clipboard Manager" 
          subtitle="Manage copied text and notes" 
        />

        {/* Quick Copy Actions */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Copy</Text>
        <View style={styles.actionGrid}>
          <Pressable 
            style={[styles.actionCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]} 
            onPress={() => handleCopy('Survey ID', 'SRV-2024-883A')}
          >
            <View style={[styles.iconCircle, { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name="document-text" size={24} color={theme.colors.primary} />
            </View>
            <Text style={[styles.actionText, { color: theme.colors.text }]}>Survey ID</Text>
          </Pressable>

          <Pressable 
            style={[styles.actionCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]} 
            onPress={() => handleCopy('Contact Number', '+1 (555) 123-4567')}
          >
            <View style={[styles.iconCircle, { backgroundColor: theme.colors.successLight }]}>
              <Ionicons name="call" size={24} color={theme.colors.success} />
            </View>
            <Text style={[styles.actionText, { color: theme.colors.text }]}>Contact</Text>
          </Pressable>

          <Pressable 
            style={[styles.actionCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]} 
            onPress={() => handleCopy('Location', 'Lat: 40.7128, Lon: -74.0060')}
          >
            <View style={[styles.iconCircle, { backgroundColor: theme.colors.warningLight }]}>
              <Ionicons name="navigate" size={24} color={theme.colors.warning} />
            </View>
            <Text style={[styles.actionText, { color: theme.colors.text }]}>Location</Text>
          </Pressable>
        </View>

        {/* Current Clipboard Content (Empty State Handling) */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Current Clipboard Data</Text>
        <AppCard elevation="low" style={{ marginBottom: 30, padding: 0, overflow: 'hidden' }}>
          {clipboardContent ? (
            <View style={styles.activeStateContainer}>
              <Text style={[styles.clipboardText, { color: theme.colors.text }]}>{clipboardContent}</Text>
              <Pressable style={[styles.clearButton, { backgroundColor: theme.colors.dangerLight }]} onPress={handleClearClipboard}>
                <Ionicons name="trash-outline" size={18} color={theme.colors.danger} />
                <Text style={[styles.clearButtonText, { color: theme.colors.danger }]}>Clear</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Ionicons name="clipboard-outline" size={48} color={theme.colors.border} />
              <Text style={[styles.emptyStateTitle, { color: theme.colors.textMuted }]}>Clipboard is Empty</Text>
              <Text style={[styles.emptyStateSubtitle, { color: theme.colors.textMuted }]}>Copy something to see it here.</Text>
              <Pressable style={[styles.refreshBtn, { backgroundColor: theme.colors.primaryLight }]} onPress={readClipboard}>
                <Ionicons name="refresh" size={16} color={theme.colors.primary} />
                <Text style={[styles.refreshBtnText, { color: theme.colors.primary }]}>Refresh</Text>
              </Pressable>
            </View>
          )}
        </AppCard>

        {/* Paste Notes Area */}
        <View style={styles.notesHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 0 }]}>Notes Pad</Text>
          <AppButton 
            title="Paste Clipboard" 
            onPress={handlePasteNotes}
            size="small"
            leftIcon={<Ionicons name="download-outline" size={16} color="#fff" />}
          />
        </View>
        <AppInput
          placeholder="Type or paste notes here..."
          value={notes}
          onChangeText={setNotes}
          multiline
          style={{ minHeight: 150, textAlignVertical: 'top' }}
        />
        <View style={{ height: 40 }} />
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionCard: {
    width: '31%',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
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
    textAlign: 'center',
  },
  emptyStateContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    marginBottom: 15,
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  refreshBtnText: {
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  activeStateContainer: {
    padding: 20,
  },
  clipboardText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  clearButtonText: {
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
});

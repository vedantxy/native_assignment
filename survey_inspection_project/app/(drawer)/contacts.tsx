import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable, 
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SectionHeader } from '../../components/SectionHeader';
import { AppInput } from '../../components/AppInput';
import { Avatar } from '../../components/Avatar';
import { EmptyState } from '../../components/EmptyState';
import { AppButton } from '../../components/AppButton';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    
    if (status === 'granted') {
      setPermissionGranted(true);
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
        sort: Contacts.SortTypes.FirstName,
      });

      if (data.length > 0) {
        setContacts(data);
        setFilteredContacts(data);
      }
    } else {
      setPermissionGranted(false);
    }
    setInitialLoading(false);
  };

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = contacts.filter((c) => 
        c.name?.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [contacts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadContacts();
    // Re-apply search query if there is one
    if (searchQuery) {
      handleSearch(searchQuery);
    }
    setRefreshing(false);
  }, [searchQuery, handleSearch]);

  const copyPhoneNumber = async (number: string, name: string) => {
    await Clipboard.setStringAsync(number);
    Alert.alert('Success', `Copied ${name}'s number to clipboard!`);
  };

  const renderContact = ({ item }: { item: Contacts.Contact }) => {
    const hasNumber = item.phoneNumbers && item.phoneNumbers.length > 0;
    const phoneNumber = hasNumber ? item.phoneNumbers![0].number : 'No Number';

    return (
      <View style={[styles.contactCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <View style={styles.contactLeft}>
          <Avatar name={item.name || 'Unknown'} size={50} style={{ marginRight: 15 }} />
          <View style={styles.contactInfo}>
            <Text style={[styles.contactName, { color: theme.colors.text }]}>{item.name || 'Unknown Contact'}</Text>
            <Text style={[styles.contactNumber, { color: theme.colors.textMuted }, !hasNumber && { fontStyle: 'italic', color: theme.colors.border }]}>
              {phoneNumber}
            </Text>
          </View>
        </View>

        {hasNumber && (
          <Pressable 
            style={[styles.copyButton, { backgroundColor: theme.colors.primaryLight }]}
            onPress={() => copyPhoneNumber(phoneNumber!, item.name || 'Contact')}
          >
            <Ionicons name="copy-outline" size={20} color={theme.colors.primary} />
          </Pressable>
        )}
      </View>
    );
  };

  if (initialLoading) {
    return (
      <SafeAreaView style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textMuted }]}>Loading contacts...</Text>
      </SafeAreaView>
    );
  }

  if (permissionGranted === false) {
    return (
      <SafeAreaView style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <Ionicons name="people-circle-outline" size={60} color={theme.colors.danger} />
        <Text style={[styles.errorTitle, { color: theme.colors.text }]}>Permission Denied</Text>
        <Text style={[styles.errorSubtitle, { color: theme.colors.textMuted }]}>We need access to your contacts to show them here.</Text>
        <AppButton title="Grant Permission" onPress={loadContacts} />
      </SafeAreaView>
    );
  }

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.header}>
        <SectionHeader 
          title="My Contacts" 
          subtitle="View and manage your contacts" 
          style={{ marginBottom: 0 }}
        />
        <Text style={[styles.contactCounter, { color: theme.colors.textMuted }]}>
          {filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'}
        </Text>
      </View>

      <AppInput
        placeholder="Search by name..."
        value={searchQuery}
        onChangeText={handleSearch}
        leftIcon={<Ionicons name="search" size={20} color={theme.colors.textMuted} />}
        rightIcon={
          searchQuery.length > 0 ? (
            <Pressable onPress={() => handleSearch('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color={theme.colors.textMuted} />
            </Pressable>
          ) : undefined
        }
        containerStyle={{ marginBottom: 15 }}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item, index) => (item as any).id || index.toString()}
        renderItem={renderContact}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[theme.colors.primary]} 
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <EmptyState 
            title="No contacts found" 
            message="No contacts match your search." 
            icon="search-outline"
          />
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
  },
  errorSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  contactCounter: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  clearButton: {
    padding: 5,
    justifyContent: 'center',
  },
  listContainer: {
    paddingBottom: 40,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 14,
  },
  copyButton: {
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
});

import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  Pressable, 
  ActivityIndicator,
  Alert,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadContacts();
    // Re-apply search query if there is one
    if (searchQuery) {
      handleSearch(searchQuery);
    }
    setRefreshing(false);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
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
  };

  const copyPhoneNumber = async (number: string, name: string) => {
    await Clipboard.setStringAsync(number);
    Alert.alert('Success', `Copied ${name}'s number to clipboard!`);
  };

  const getInitials = (name: string) => {
    if (!name) return '#';
    return name.charAt(0).toUpperCase();
  };

  const renderContact = ({ item }: { item: Contacts.Contact }) => {
    const hasNumber = item.phoneNumbers && item.phoneNumbers.length > 0;
    const phoneNumber = hasNumber ? item.phoneNumbers![0].number : 'No Number';

    return (
      <View style={styles.contactCard}>
        <View style={styles.contactLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{item.name || 'Unknown Contact'}</Text>
            <Text style={[styles.contactNumber, !hasNumber && styles.noNumber]}>
              {phoneNumber}
            </Text>
          </View>
        </View>

        {hasNumber && (
          <Pressable 
            style={styles.copyButton}
            onPress={() => copyPhoneNumber(phoneNumber!, item.name || 'Contact')}
          >
            <Ionicons name="copy-outline" size={20} color="#4F46E5" />
          </Pressable>
        )}
      </View>
    );
  };

  if (initialLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    );
  }

  if (permissionGranted === false) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="people-circle-outline" size={60} color="#EF4444" />
        <Text style={styles.errorTitle}>Permission Denied</Text>
        <Text style={styles.errorSubtitle}>We need access to your contacts to show them here.</Text>
        <Pressable style={styles.retryButton} onPress={loadContacts}>
          <Text style={styles.retryButtonText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Contacts</Text>
        <Text style={styles.contactCounter}>
          {filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => handleSearch('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item, index) => (item as any).id || index.toString()}
        renderItem={renderContact}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#4F46E5']} 
            tintColor="#4F46E5"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No contacts found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 15,
  },
  errorSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  contactCounter: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E7EB',
    height: 50,
  },
  searchIcon: {
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    height: '100%',
  },
  clearButton: {
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4F46E5',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 14,
    color: '#666',
  },
  noNumber: {
    fontStyle: 'italic',
    color: '#A0AEC0',
  },
  copyButton: {
    padding: 10,
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    marginLeft: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 15,
  }
});

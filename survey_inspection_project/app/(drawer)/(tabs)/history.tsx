import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable, 
  Alert,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppContext, Survey } from '@/context/AppContext';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { AppCard } from '../../../components/AppCard';
import { AppBadge } from '../../../components/AppBadge';
import { AppInput } from '../../../components/AppInput';
import { SectionHeader } from '../../../components/SectionHeader';
import { EmptyState } from '../../../components/EmptyState';

export default function HistoryScreen() {
  const router = useRouter();
  const { surveys, deleteSurvey } = useAppContext();
  const { theme } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');

  // Computed filtered list
  const filteredSurveys = useMemo(() => {
    let result = surveys;

    // Filter by Priority
    if (selectedPriority !== 'All') {
      result = result.filter(s => s.priority === selectedPriority);
    }

    // Search by text (Site Name or Client Name)
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        s => 
          s.siteName.toLowerCase().includes(lowerQuery) || 
          s.clientName.toLowerCase().includes(lowerQuery)
      );
    }

    return result;
  }, [surveys, searchQuery, selectedPriority]);

  const handleDelete = (id: string, siteName: string) => {
    Alert.alert(
      'Delete Survey',
      `Are you sure you want to delete the survey for "${siteName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            deleteSurvey(id);
          }
        }
      ]
    );
  };

  const handleViewDetails = (id: string) => {
    router.push({ pathname: '/(drawer)/survey', params: { id } });
  };

  const renderSurveyItem = ({ item, index }: { item: Survey, index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
      <Pressable onPress={() => handleViewDetails(item.id)}>
        <AppCard elevation="low">
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Ionicons name="business" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
              <Text style={[styles.siteName, { color: theme.colors.text }]} numberOfLines={1}>{item.siteName}</Text>
            </View>
            <AppBadge 
              label={item.priority} 
              variant={item.priority === 'High' ? 'danger' : (item.priority === 'Medium' ? 'warning' : 'success')} 
            />
          </View>

          <View style={styles.cardBody}>
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={16} color={theme.colors.textMuted} style={{ marginRight: 6 }} />
              <Text style={[styles.infoText, { color: theme.colors.textMuted }]}>{item.clientName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={16} color={theme.colors.textMuted} style={{ marginRight: 6 }} />
              <Text style={[styles.infoText, { color: theme.colors.textMuted }]}>{item.date}</Text>
            </View>
          </View>

          <View style={[styles.cardFooter, { borderTopColor: theme.colors.border }]}>
            <Pressable 
              style={[styles.viewButton, { backgroundColor: theme.colors.primaryLight }]} 
              onPress={() => handleViewDetails(item.id)}
            >
              <Text style={[styles.viewButtonText, { color: theme.colors.primary }]}>View Details</Text>
            </Pressable>
            <Pressable 
              style={[styles.deleteButton, { backgroundColor: theme.colors.dangerLight }]} 
              onPress={() => handleDelete(item.id, item.siteName)}
            >
              <Ionicons name="trash-outline" size={20} color={theme.colors.danger} />
            </Pressable>
          </View>
        </AppCard>
      </Pressable>
    </Animated.View>
  );

  return (
    <ScreenContainer scrollable={false}>
      {/* Header */}
      <SectionHeader 
        title="Survey History" 
        subtitle="View and manage past inspections"
      />

      {/* Search Bar */}
      <AppInput
        placeholder="Search by site or client..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={<Ionicons name="search" size={20} color={theme.colors.textMuted} />}
        rightIcon={
          searchQuery.length > 0 ? (
            <Pressable onPress={() => setSearchQuery('')} style={{ padding: 5 }}>
              <Ionicons name="close-circle" size={20} color={theme.colors.textMuted} />
            </Pressable>
          ) : undefined
        }
        containerStyle={{ marginBottom: 12 }}
      />

      {/* Priority Filter */}
      <View style={styles.filterContainer}>
        <Text style={[styles.filterLabel, { color: theme.colors.text }]}>Filter:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {['All', 'High', 'Medium', 'Low'].map((prio) => (
            <Pressable
              key={prio}
              style={[
                styles.filterPill,
                { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                selectedPriority === prio && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
              ]}
              onPress={() => setSelectedPriority(prio)}
            >
              <Text style={[
                styles.filterPillText,
                { color: theme.colors.textMuted },
                selectedPriority === prio && { color: '#fff' }
              ]}>
                {prio}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* List of Surveys */}
      <FlatList
        data={filteredSurveys}
        keyExtractor={(item) => item.id}
        renderItem={renderSurveyItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState 
            title="No surveys found" 
            message="You haven't added any surveys that match your search criteria." 
            icon="document-text-outline"
          />
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 10,
  },
  filterScroll: {
    gap: 10,
    paddingRight: 20,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 100,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  siteName: {
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
  },
  cardBody: {
    marginBottom: 15,
    gap: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
});

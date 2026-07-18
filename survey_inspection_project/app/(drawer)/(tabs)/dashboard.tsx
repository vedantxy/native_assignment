import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useAppContext } from '@/context/AppContext';

export default function DashboardScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { surveys, profile } = useAppContext();
  
  const highPriorityCount = surveys.filter(s => s.priority === 'High').length;
  const recentSurveys = surveys.slice(0, 2);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Custom App Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.headerTitle}>Welcome Back 👋</Text>
          </View>
          <Pressable 
            style={styles.menuButton} 
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          >
            <Ionicons name="menu" size={28} color="#333" />
          </Pressable>
        </View>

        {/* Student Details Card */}
        <View style={styles.studentCard}>
          <View style={styles.studentIconContainer}>
            <Ionicons name="person" size={32} color="#fff" />
          </View>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{profile.name}</Text>
            <Text style={styles.studentDetails}>ID: {profile.employeeId}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
            <Ionicons name="document-text" size={32} color="#1E88E5" />
            <Text style={styles.statNumber}>{surveys.length}</Text>
            <Text style={styles.statLabel}>Total Surveys</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FFEBEE' }]}>
            <Ionicons name="alert-circle" size={32} color="#E53935" />
            <Text style={styles.statNumber}>{highPriorityCount}</Text>
            <Text style={styles.statLabel}>High Priority</Text>
          </View>
        </View>

        {/* Quick Action Cards */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <Pressable 
            style={styles.actionCard} 
            onPress={() => router.push('/(drawer)/(tabs)/new_survey')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="add-circle" size={28} color="#F57C00" />
            </View>
            <Text style={styles.actionText}>New Survey</Text>
          </Pressable>

          <Pressable 
            style={styles.actionCard} 
            onPress={() => router.push('/(drawer)/(tabs)/history')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="time" size={28} color="#8E24AA" />
            </View>
            <Text style={styles.actionText}>History</Text>
          </Pressable>

          <Pressable 
            style={styles.actionCard} 
            onPress={() => router.push('/(drawer)/camera')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E0F7FA' }]}>
              <Ionicons name="camera" size={28} color="#00ACC1" />
            </View>
            <Text style={styles.actionText}>Camera</Text>
          </Pressable>

          <Pressable 
            style={styles.actionCard} 
            onPress={() => router.push('/(drawer)/location')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FFEBEE' }]}>
              <Ionicons name="location" size={28} color="#E53935" />
            </View>
            <Text style={styles.actionText}>Location</Text>
          </Pressable>
        </View>

        {/* Recent Survey Summary */}
        <Text style={styles.sectionTitle}>Recent Surveys</Text>
        <View style={styles.recentContainer}>
          {recentSurveys.length > 0 ? recentSurveys.map(survey => (
            <View key={survey.id} style={styles.recentItem}>
              <View style={styles.recentIcon}>
                <Ionicons name="map" size={24} color="#666" />
              </View>
              <View style={styles.recentDetails}>
                <Text style={styles.recentTitle}>{survey.siteName}</Text>
                <Text style={styles.recentDate}>{survey.date}</Text>
              </View>
              <View style={survey.priority === 'High' ? styles.statusBadgePending : styles.statusBadge}>
                <Text style={survey.priority === 'High' ? styles.statusTextPending : styles.statusText}>
                  {survey.priority}
                </Text>
              </View>
            </View>
          )) : (
            <Text style={{ textAlign: 'center', color: '#666', padding: 10 }}>No recent surveys.</Text>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  studentCard: {
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  studentIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studentDetails: {
    color: '#E0E7FF',
    fontSize: 13,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'flex-start',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A1A1A',
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  recentContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recentIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentDetails: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  recentDate: {
    fontSize: 12,
    color: '#888',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#43A047',
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadgePending: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusTextPending: {
    color: '#F57C00',
    fontSize: 12,
    fontWeight: '600',
  },
});

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useAppContext } from '@/context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../context/ThemeContext';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { AppCard } from '../../../components/AppCard';
import { SectionHeader } from '../../../components/SectionHeader';
import { AppBadge } from '../../../components/AppBadge';

export default function DashboardScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { surveys, profile } = useAppContext();
  const { theme } = useTheme();
  
  const highPriorityCount = surveys.filter(s => s.priority === 'High').length;
  const recentSurveys = surveys.slice(0, 3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 18) return 'Good Afternoon,';
    return 'Good Evening,';
  };

  return (
    <ScreenContainer scrollable>
      {/* Custom App Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.colors.textMuted }]}>{getGreeting()}</Text>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Welcome Back 👋</Text>
        </View>
        <Pressable 
          style={[styles.menuButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]} 
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        >
          <Ionicons name="menu" size={28} color={theme.colors.text} />
        </Pressable>
      </View>

      {/* Inspector Details Card */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.inspectorCard}
      >
        <View style={styles.inspectorIconContainer}>
          <Ionicons name="shield-checkmark" size={32} color="#fff" />
        </View>
        <View style={styles.inspectorInfo}>
          <Text style={styles.inspectorName}>{profile.name}</Text>
          <Text style={styles.inspectorDetails}>Inspector ID: {profile.employeeId}</Text>
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <AppCard style={[styles.statCard, { backgroundColor: theme.colors.infoLight, borderColor: theme.colors.info, borderWidth: 1 }]} elevation="low">
          <View style={[styles.statIconWrapper, { backgroundColor: '#fff' }]}>
            <Ionicons name="document-text" size={24} color={theme.colors.info} />
          </View>
          <Text style={[styles.statNumber, { color: theme.colors.info }]}>{surveys.length}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>Total Surveys</Text>
        </AppCard>

        <AppCard style={[styles.statCard, { backgroundColor: theme.colors.dangerLight, borderColor: theme.colors.danger, borderWidth: 1 }]} elevation="low">
          <View style={[styles.statIconWrapper, { backgroundColor: '#fff' }]}>
            <Ionicons name="alert-circle" size={24} color={theme.colors.danger} />
          </View>
          <Text style={[styles.statNumber, { color: theme.colors.danger }]}>{highPriorityCount}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>High Priority</Text>
        </AppCard>
      </View>

      {/* Quick Action Cards */}
      <SectionHeader title="Quick Actions" />
      <View style={styles.actionsContainer}>
        <Pressable 
          style={[styles.actionCard, { backgroundColor: theme.colors.surface }]} 
          onPress={() => router.push('/(drawer)/(tabs)/new_survey')}
        >
          <View style={[styles.actionIcon, { backgroundColor: theme.colors.warningLight }]}>
            <Ionicons name="add-circle" size={28} color={theme.colors.warning} />
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>New Survey</Text>
        </Pressable>

        <Pressable 
          style={[styles.actionCard, { backgroundColor: theme.colors.surface }]} 
          onPress={() => router.push('/(drawer)/(tabs)/history')}
        >
          <View style={[styles.actionIcon, { backgroundColor: theme.colors.primaryLight }]}>
            <Ionicons name="time" size={28} color={theme.colors.primary} />
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>History</Text>
        </Pressable>

        <Pressable 
          style={[styles.actionCard, { backgroundColor: theme.colors.surface }]} 
          onPress={() => router.push('/(drawer)/camera')}
        >
          <View style={[styles.actionIcon, { backgroundColor: theme.colors.infoLight }]}>
            <Ionicons name="camera" size={28} color={theme.colors.info} />
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>Camera</Text>
        </Pressable>

        <Pressable 
          style={[styles.actionCard, { backgroundColor: theme.colors.surface }]} 
          onPress={() => router.push('/(drawer)/location')}
        >
          <View style={[styles.actionIcon, { backgroundColor: theme.colors.dangerLight }]}>
            <Ionicons name="location" size={28} color={theme.colors.danger} />
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>Location</Text>
        </Pressable>
      </View>

      {/* Recent Survey Summary */}
      <SectionHeader title="Recent Surveys" />
      <AppCard style={styles.recentContainer} elevation="low">
        {recentSurveys.length > 0 ? recentSurveys.map((survey, index) => (
          <View 
            key={survey.id} 
            style={[
              styles.recentItem,
              { borderBottomColor: theme.colors.border },
              index === recentSurveys.length - 1 && { borderBottomWidth: 0, paddingBottom: 0 }
            ]}
          >
            <View style={[styles.recentIcon, { backgroundColor: theme.colors.background }]}>
              <Ionicons name="map" size={20} color={theme.colors.textMuted} />
            </View>
            <View style={styles.recentDetails}>
              <Text style={[styles.recentTitle, { color: theme.colors.text }]}>{survey.siteName}</Text>
              <Text style={[styles.recentDate, { color: theme.colors.textMuted }]}>{survey.date}</Text>
            </View>
            <AppBadge 
              label={survey.priority} 
              variant={survey.priority === 'High' ? 'danger' : (survey.priority === 'Medium' ? 'warning' : 'success')} 
            />
          </View>
        )) : (
          <Text style={{ textAlign: 'center', color: theme.colors.textMuted, padding: 10 }}>No recent surveys.</Text>
        )}
      </AppCard>
      
      <View style={{ height: 80 }} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  menuButton: {
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
  },
  inspectorCard: {
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  inspectorIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  inspectorInfo: {
    flex: 1,
  },
  inspectorName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  inspectorDetails: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'flex-start',
    padding: 20,
    marginBottom: 0,
  },
  statIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '900',
    marginTop: 16,
    marginBottom: 4,
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    width: '48%',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
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
  },
  recentContainer: {
    padding: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginBottom: 4,
  },
  recentDate: {
    fontSize: 12,
  },
});

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Survey = {
  id: string;
  siteName: string;
  clientName: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  photoUri?: string;
};

export type ProfileData = {
  name: string;
  email: string;
  phone: string;
  employeeId: string;
};

export type SettingsData = {
  notifications: boolean;
  darkMode: boolean;
  locationServices: boolean;
};

type AppContextType = {
  surveys: Survey[];
  addSurvey: (survey: Survey) => void;
  deleteSurvey: (id: string) => void;
  profile: ProfileData;
  updateProfile: (profile: ProfileData) => void;
  settings: SettingsData;
  updateSettings: (settings: SettingsData) => void;
};

const MOCK_SURVEYS: Survey[] = [
  { id: '1', siteName: 'Downtown Commercial Plaza', clientName: 'Acme Corp', date: '2024-03-12', priority: 'High', description: 'Initial review.' },
  { id: '2', siteName: 'Westside Warehouse', clientName: 'Global Logistics', date: '2024-03-10', priority: 'Medium', description: 'Initial review.' },
  { id: '3', siteName: 'Riverside Complex', clientName: 'Urban Development', date: '2024-03-08', priority: 'Low', description: 'Initial review.' },
  { id: '4', siteName: 'Northpark Office Tower', clientName: 'Tech Solutions', date: '2024-03-05', priority: 'High', description: 'Initial review.' },
  { id: '5', siteName: 'East End Factory', clientName: 'Manufacture Inc.', date: '2024-03-01', priority: 'Medium', description: 'Initial review.' },
];

const DEFAULT_PROFILE: ProfileData = {
  name: 'Vedant patel',
  email: 'jane.doe@example.com',
  phone: '+1 (555) 000-1234',
  employeeId: '108708'
};

const DEFAULT_SETTINGS: SettingsData = {
  notifications: true,
  darkMode: false,
  locationServices: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [surveys, setSurveys] = useState<Survey[]>(MOCK_SURVEYS);
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedSurveys = await AsyncStorage.getItem('surveys');
        const storedProfile = await AsyncStorage.getItem('profile');
        const storedSettings = await AsyncStorage.getItem('settings');

        if (storedSurveys) setSurveys(JSON.parse(storedSurveys));
        if (storedProfile) setProfile(JSON.parse(storedProfile));
        if (storedSettings) setSettings(JSON.parse(storedSettings));
      } catch (e) {
        console.error('Failed to load data', e);
      } finally {
        setIsReady(true);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem('surveys', JSON.stringify(surveys));
    }
  }, [surveys, isReady]);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem('profile', JSON.stringify(profile));
    }
  }, [profile, isReady]);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem('settings', JSON.stringify(settings));
    }
  }, [settings, isReady]);

  const addSurvey = (survey: Survey) => {
    setSurveys((prev) => [survey, ...prev]);
  };

  const deleteSurvey = (id: string) => {
    setSurveys((prev) => prev.filter(s => s.id !== id));
  };

  const updateProfile = (newProfile: ProfileData) => {
    setProfile(newProfile);
  };

  const updateSettings = (newSettings: SettingsData) => {
    setSettings(newSettings);
  };

  return (
    <AppContext.Provider 
      value={{
        surveys, addSurvey, deleteSurvey,
        profile, updateProfile,
        settings, updateSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

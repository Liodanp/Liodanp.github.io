import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { AppSettings } from '../types';

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

const initialSettings: AppSettings = {
  currency: '$',
  theme: 'light',
  minStockAlert: 5,
  maxStockAlert: 100,
  phonePrefix: '+1',
};

type SettingsAction =
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'RESET_SETTINGS' };

const settingsReducer = (state: AppSettings, action: SettingsAction): AppSettings => {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return { ...state, ...action.payload };
    case 'RESET_SETTINGS':
      return initialSettings;
    default:
      return state;
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings) as AppSettings;
        dispatch({ type: 'UPDATE_SETTINGS', payload: parsedSettings });
      } catch (error) {
        localStorage.removeItem('appSettings');
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string, country: string) => Promise<void>;
  logout: () => void;
  verifyEmail: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'VERIFY_EMAIL_SUCCESS' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return { user: action.payload, isLoading: false, error: null };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { user: null, isLoading: false, error: null };
    case 'VERIFY_EMAIL_SUCCESS':
      return state.user 
        ? { ...state, user: { ...state.user, isEmailVerified: true } } 
        : state;
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Check for saved auth state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser) as User;
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      // This would be replaced with actual API call
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: 'user_123',
        name: 'Demo User',
        email,
        phone: '123-456-7890',
        country: 'United States',
        role: 'admin',
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Update state
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid email or password' });
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string,
    phone: string,
    country: string
  ) => {
    dispatch({ type: 'REGISTER_REQUEST' });
    
    try {
      // This would be replaced with actual API call
      // For demo purposes, we'll simulate a successful registration
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        phone,
        country,
        role: 'user',
        isEmailVerified: false,
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Update state
      dispatch({ type: 'REGISTER_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ 
        type: 'REGISTER_FAILURE', 
        payload: 'Registration failed. Please try again.' 
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const verifyEmail = async () => {
    // This would be replaced with actual API call
    // For demo purposes, we'll simulate a successful verification
    if (authState.user) {
      dispatch({ type: 'VERIFY_EMAIL_SUCCESS' });
      
      // Update localStorage
      const updatedUser = { ...authState.user, isEmailVerified: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, verifyEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
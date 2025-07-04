"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  profilePhoto?: string;
  studentId?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  notificationSettings?: {
    email: boolean;
    sms: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@grademe.com',
    role: 'admin',
    notificationSettings: { email: true, sms: false }
  },
  {
    id: '2',
    name: 'Kasun Perera',
    email: 'kasun@student.com',
    role: 'student',
    studentId: 'ST001',
    notificationSettings: { email: true, sms: true }
  },
  {
    id: '3',
    name: 'Nimali Silva',
    email: 'nimali@student.com',
    role: 'student',
    studentId: 'ST002',
    notificationSettings: { email: false, sms: true }
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('grademe-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Login attempt:', { email, password });
    
    // Mock authentication - in real app, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('grademe-user', JSON.stringify(foundUser));
      console.log('Login successful:', foundUser);
      return true;
    }
    
    console.log('Login failed: Invalid credentials');
    return false;
  };

  const logout = () => {
    console.log('User logged out');
    setUser(null);
    localStorage.removeItem('grademe-user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('grademe-user', JSON.stringify(updatedUser));
      console.log('Profile updated:', updates);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
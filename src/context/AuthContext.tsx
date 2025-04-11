
import React, { createContext, useContext, useState } from 'react';
import { UserRole, User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

// Mock user data for demonstration
const mockUsers = {
  driver: {
    id: 'd1',
    name: 'Jean Dupont',
    email: 'jean@trajetly.com',
    role: 'driver' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    memberSince: '2022-05-15',
  },
  passenger: {
    id: 'p1',
    name: 'Marie Laurent',
    email: 'marie@trajetly.com',
    role: 'passenger' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.3,
    memberSince: '2023-03-21',
  },
  admin: {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@trajetly.com',
    role: 'admin' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    memberSince: '2021-01-10',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);

  const login = (role: UserRole) => {
    if (role === 'driver') {
      setUser(mockUsers.driver);
    } else if (role === 'passenger') {
      setUser(mockUsers.passenger);
    } else if (role === 'admin') {
      setUser(mockUsers.admin);
    }
    setUserRole(role);
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        userRole,
        login,
        logout,
        setUserRole,
      }}
    >
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

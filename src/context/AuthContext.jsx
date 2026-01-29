import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

// Mock admin credentials
const ADMIN_CREDENTIALS = {
  email: import.meta.env.VITE_ADMIN_URL,
  password:import.meta.env.VITE_ADMIN_PASSWORD
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    // Check for existing session
    const savedAuth = localStorage.getItem('luxuryJewelryAdmin');
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        setIsAuthenticated(parsed.isAuthenticated);
        setAdminUser(parsed.user);
      } catch (e) {
        console.error('Error loading auth:', e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const user = { email, name: 'Admin' };
      setIsAuthenticated(true);
      setAdminUser(user);
      localStorage.setItem('luxuryJewelryAdmin', JSON.stringify({
        isAuthenticated: true,
        user
      }));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('luxuryJewelryAdmin');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        adminUser,
        login,
        logout
      }}
    >
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

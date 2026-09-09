import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('shopsphere-user', null);

  const login = (email, password) => {
    // Demo login logic
    if (email && password) {
      setUser({
        name: email.split('@')[0],
        email,
        id: 'user-' + Date.now()
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = (name, email, password) => {
    if (name && email && password) {
      setUser({
        name,
        email,
        id: 'user-' + Date.now()
      });
      return { success: true };
    }
    return { success: false, error: 'All fields are required' };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data) => {
    setUser({ ...user, ...data });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

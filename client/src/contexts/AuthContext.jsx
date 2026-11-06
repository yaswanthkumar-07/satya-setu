
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getStoredAuth,
  loginUser as loginRequest,
  registerUser as registerRequest,
  logoutUser as logoutRequest,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore the login when the page is refreshed
  useEffect(() => {
    const savedAuth = getStoredAuth();

    if (savedAuth?.token && savedAuth?.user) {
      setUser(savedAuth.user);
    }

    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    const loggedInUser = await loginRequest(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  // Register
  const register = async (name, email, password) => {
    const newUser = await registerRequest(name, email, password);
    setUser(newUser);
    return newUser;
  };

  // Logout
  const logout = () => {
    logoutRequest();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}

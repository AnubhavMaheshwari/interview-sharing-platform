import React, { createContext, useState, useEffect } from 'react';
import API from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in URL (from Google redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, "/");
      loadUser();
    } else {
      // Check if token exists in localStorage
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        loadUser();
      } else {
        setLoading(false);
      }
    }
  }, []);

  const loadUser = async () => {
    try {
      const res = await API.get('/auth/user');
      setUser(res.data);
    } catch (error) {
      console.error('Error loading user:', error);
      localStorage.removeItem('token');
    }
    setLoading(false);
  };

const login = () => {
    window.location.href = 'https://interview-sharing-platform-1.onrender.com/auth/google';
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

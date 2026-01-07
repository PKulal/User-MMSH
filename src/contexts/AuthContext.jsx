import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for session
    const storedUser = localStorage.getItem('mmsh_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock Login Logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject('All fields are required');
          return;
        }

        // Mock success
        const mockUser = {
          email,
          name: email.split('@')[0],
          id: 'user_' + Math.random().toString(36).substr(2, 9)
        };

        setUser(mockUser);
        localStorage.setItem('mmsh_user', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mmsh_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'fudomore_user_id';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userId, setUserIdState] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setUserIdState(stored);
  }, []);

  const setUserId = (id) => {
    setUserIdState(id);
    if (id != null) {
      localStorage.setItem(STORAGE_KEY, id);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}

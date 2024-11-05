import React, { createContext, useState } from 'react';

// Create UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [myEmail, setMyEmail] = useState('');

  const updateUser = (newEmail) => {
    setMyEmail(newEmail);
  };

  return (
    <UserContext.Provider value={{ myEmail, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

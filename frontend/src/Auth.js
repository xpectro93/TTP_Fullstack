import React, { useEffect, useState } from "react";
import firebase from "./firebase.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    //cb funtion that returns the current user, then state is set
    firebase.auth().onAuthStateChanged(setCurrentUser);  
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
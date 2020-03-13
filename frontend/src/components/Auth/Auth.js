import React, { useEffect, useState, createContext, useCallback } from "react";
import firebase from "./firebase.js";
import { setUpUser } from '../../util/util.js'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [user, setUser]= useState({})
 
  const refreshUser = useCallback(
    async () => {
      await firebase.auth().onAuthStateChanged(async (users)=>{
            if (users) {
              let userInfo =  await setUpUser(users.uid);
            
              setUser (userInfo)
              users.info = user
              setCurrentUser(users)
            } else {
              setCurrentUser(users)
            }
            
          }); 
    },[user]
  )
  useEffect(() => {
    refreshUser()
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
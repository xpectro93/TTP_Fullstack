import React, { useEffect, useState, createContext } from "react";
import firebase from "./firebase.js";
import { setUpUser } from '../../util/util.js'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [ userI, setUser ] =useState({})
  const refreshUser = async() => {
    await firebase.auth().onAuthStateChanged(async (user)=>{
      if (user) {
        let userInfo =  await setUpUser(user.uid);
        user.info = userInfo

        setUser(userInfo)
        setCurrentUser(user)

      } else {
        setCurrentUser(user)
      }
      
    }); 
  }
  useEffect(() => {
    refreshUser();

  },[]);

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
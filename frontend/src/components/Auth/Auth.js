import React, { useEffect, useState, createContext } from "react";
import firebase from "./firebase.js";
import { setUpUser } from '../../util/util.js'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [ userI, setUser ] =useState({used:false})
  const refreshUser = async() => {
    await firebase.auth().onAuthStateChanged(async (user)=>{
      if (user) {
        let userInfo =  await setUpUser(user.uid);
        user.info = userInfo

        setUser(userInfo)
        userI.used = true
        setCurrentUser(user)

      } else {
        setCurrentUser(user)
      }
      
    }); 
  }
  useEffect(() => {
    const refreshUser = async() => {
    await firebase.auth().onAuthStateChanged(async (user)=>{
      if (user) {
        let userInfo =  await setUpUser(user.uid);
        user.info = userInfo

        setUser(userInfo)
        userI.used = true
        setCurrentUser(user)

      } else {
        setCurrentUser(user)
      }
      
    }); 
  }

    refreshUser();
console.log('fires')
  },[userI.used]);

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
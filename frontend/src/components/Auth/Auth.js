import React, { useEffect, useState, createContext, useCallback } from "react";
import firebase from "./firebase.js";
import { setUpUser } from '../../util/util.js'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [ update, setUpdate] = useState(0);
  const refreshUser = useCallback(() => {
    firebase.auth().onAuthStateChanged(async (user)=>{
      try {
        let userInfo =  await setUpUser(user.uid);
        user.info = userInfo
        setUpdate(prev => prev + 1);
        setCurrentUser(user);
      } catch (err) {
        setCurrentUser(null);
        console.log(err,update);
      }
        
      
    }); 
  },[update])
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user)=>{
      if(user){
        try {
          let userInfo =  await setUpUser(user.uid);
          user.info = userInfo
          setCurrentUser(user);
        } catch (err) {
          setCurrentUser(null);
          console.log(err);
        }
      }else {
        setCurrentUser(null);
      }
      
        
      
    });
  },[]);

  return (
    <AuthContext.Provider
      value={{
        currentUser, refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
import React, { useEffect, useState } from "react";
import firebase from "./firebase.js";
import { setUpUser } from '../../util/util.js'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    //cb funtion that returns the current user, then state is set
    firebase.auth().onAuthStateChanged(async (user)=>{
      if (user) {
        let userInfo =  await setUpUser(user.uid);
        user.info = userInfo
        setCurrentUser(user)
      } else {
        setCurrentUser(user)
      }
      
    });  
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
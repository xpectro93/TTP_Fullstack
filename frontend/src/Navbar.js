import React, { useContext } from 'react';
import { AuthContext } from "./components/Auth/Auth.js";

export const Navbar = () =>{
  const { currentUser } = useContext(AuthContext);
   return currentUser ? <h1>I AM NAVBAR</h1> : null
}
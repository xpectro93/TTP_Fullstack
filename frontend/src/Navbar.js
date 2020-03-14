import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { AuthContext } from "./components/Auth/Auth.js";
import firebase from "./components/Auth/firebase";

export const Navbar = () =>{
  const { currentUser } = useContext(AuthContext);
   return currentUser ? (
   <ul>
     <button onClick={() => firebase.auth().signOut()}>Sign out</button>
    <NavLink to='/transactions'><li>Transactions</li></NavLink>
    <NavLink to='/portfolio'><li>Portfolio</li></NavLink>
    </ul>
   ) : null
}
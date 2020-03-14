import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { AuthContext } from "./components/Auth/Auth.js";
import firebase from "./components/Auth/firebase";
import './CSS/Auth.css'

export const Navbar = () =>{
  const { currentUser } = useContext(AuthContext);
   return currentUser ? (
    <nav>
      <button className={"logoutbtn"}onClick={() => firebase.auth().signOut()}>Sign out</button>
      <NavLink to='/transactions'><h2>Transactions</h2></NavLink>
      <NavLink to='/portfolio'><h2>Portfolio</h2></NavLink>
    </nav>
   ) : null
}
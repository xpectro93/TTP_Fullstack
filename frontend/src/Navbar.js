import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { AuthContext } from "./components/Auth/Auth.js";

export const Navbar = () =>{
  const { currentUser } = useContext(AuthContext);
   return currentUser ? (
   <ul>
    <NavLink to='/transactions'><li>Transactions</li></NavLink>
    <NavLink to='/portfolio'><li>Portfolio</li></NavLink>
    </ul>
   ) : null
}
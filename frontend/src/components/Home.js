import React, {useState, useEffect, useContext} from "react";
import firebase from "../firebase";
import { AuthContext } from "../Auth.js";
import axios from 'axios';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const getUser = async userId => {
    const user = await axios.get(`/api/users/${userId}`);
    console.log(user)
  }

  useEffect(()=> {
    getUser(currentUser.uid)
  },[currentUser])
  
  return (

    <>
      <div id='main'>
      <h1>My Stonks</h1>
              <button onClick={() => firebase.auth().signOut()}>Sign out</button>

      </div>
    </>

      
      
      
  )};




export default Home;
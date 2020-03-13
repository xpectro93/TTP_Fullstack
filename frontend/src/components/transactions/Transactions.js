import React, {useState, useEffect, useContext} from "react";
import { Redirect } from 'react-router'
import firebase from "../Auth/firebase";
import { AuthContext } from "../Auth/Auth.js";
import axios from 'axios';
const secret = require('../../secret.json')

const Transactions = () => {
  const { currentUser } = useContext(AuthContext);
  let [ user, setUser ] = useState();

  //retrieves current user from backend;
  const getUser = async userId => {
    let token = await firebase.auth().currentUser.getIdToken(false)
    token = {token:token}
    const userResponse = await axios.post(`/api/users/${userId}`, token);
    console.log(userResponse)
    setUser(userResponse.data.user)
  }
  const testApi = async ticker => {
    let resp = await axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${secret.apiToken}`);
    console.log('thisker', resp)
  }
//keys of interest high, low,
  useEffect(()=> {
    getUser(currentUser.uid)
    testApi('FNB')
  },[currentUser])
  if(user){
    return (
      <>
        <h1>{user.username}</h1>
        <h2>{user.uid}</h2>
        <h2>{user.email}</h2>
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </>
    )
  }else {
    return <Redirect to="/login" />;
  }
  
};




export default Transactions;
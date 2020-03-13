import React, {useState, useEffect, useContext} from "react";
import { Redirect } from 'react-router'
import firebase from "../Auth/firebase";
import { AuthContext } from "../Auth/Auth.js";
import axios from 'axios';
import PurchaseForm from './PurchaseForm.js'
const secret = require('../../secret.json')

const Portfolio = () => {
  const { currentUser } = useContext(AuthContext);
  const [ user, setUser ] = useState();

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
//keys of interest 
// high, low,close, open, companyName, symbol, latestPrice, volume
  useEffect(()=> {
    getUser(currentUser.uid)
    testApi('FNB')
  },[currentUser])
  if(user){
    return (
      <>
    <h1>{user.username}</h1>
    <h2>{user.email}</h2>
    <PurchaseForm balance={user.balance}/>
    <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </>
    )
  } else {
    return <Redirect to="/portfolio" />;
  }
  
};




export default Portfolio;
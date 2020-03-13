import React, {useEffect, useContext} from "react";
import { Redirect } from 'react-router'
import firebase from "../Auth/firebase";
import { AuthContext } from "../Auth/Auth.js";
import axios from 'axios';
import PurchaseForm from './PurchaseForm.js'
const secret = require('../../secret.json')

const Portfolio = () => {
  const { currentUser } = useContext(AuthContext);

  const testApi = async ticker => {
    let resp = await axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${secret.apiToken}`);
    console.log('thisker', resp)
  }
//keys of interest 
// high, low,close, open, companyName, symbol, latestPrice, volume
  useEffect(()=> {
    testApi('FNB')
  },[currentUser]);

  if(currentUser){
    return (
      <>
    <h1>{currentUser.info.username}</h1>
    <h2>{currentUser.info.email}</h2>
    <PurchaseForm balance={currentUser.info.balance}/>
    <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </>
    )
  } else {
    return <Redirect to="/login" />;
  }
  
};




export default Portfolio;
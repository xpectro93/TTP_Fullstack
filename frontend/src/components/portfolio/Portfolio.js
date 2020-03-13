import React, { useContext} from "react";
import { Redirect } from 'react-router'
import firebase from "../Auth/firebase";
import { AuthContext } from "../Auth/Auth.js";
import PurchaseForm from './PurchaseForm.js'


const Portfolio = () => {
  const { currentUser } = useContext(AuthContext);
  const { refreshUser } = useContext(AuthContext);
 
//keys of interest 
// high, low,close, open, companyName, symbol, latestPrice, volume
  if(currentUser){
    return (
      <>
    <h1>{currentUser.info.username}</h1>
    <h2>{currentUser.info.email}</h2>
    <PurchaseForm balance={currentUser.info.balance} uid={currentUser.uid} refreshUser={refreshUser} />
    <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </>
    )
  } else {
    return <Redirect to="/login" />;
  }
  
};




export default Portfolio;
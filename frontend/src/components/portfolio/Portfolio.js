import React, { useContext} from "react";
import { Redirect } from 'react-router'
import firebase from "../Auth/firebase";
import { AuthContext } from "../Auth/Auth.js";
import PurchaseForm from './PurchaseForm.js'


const Portfolio = () => {
  const { currentUser } = useContext(AuthContext);

 
//keys of interest 
// high, low,close, open, companyName, symbol, latestPrice, volume
  // useEffect(()=> {
  //   testApi('FNB')
  // },[currentUser]);

  if(currentUser){
    return (
      <>
    <h1>{currentUser.info.username}</h1>
    <h2>{currentUser.info.email}</h2>
    <PurchaseForm balance={200} uid={currentUser.uid}/>
    <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </>
    )
  } else {
    return <Redirect to="/login" />;
  }
  
};




export default Portfolio;
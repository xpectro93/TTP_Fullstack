import React, { useContext, useState, useEffect} from "react";
import { Redirect } from 'react-router'
import firebase from "../Auth/firebase";
import { AuthContext } from "../Auth/Auth.js";
import { getAllTransactions } from "../../util/util";
import PurchaseForm from './PurchaseForm.js'



const Portfolio = () => {
  const { currentUser } = useContext(AuthContext);
  const { refreshUser } = useContext(AuthContext);
  const [portfolio , setPortfolio ] = useState([]);

  const setUpTransactions = async () => {
    let transactionList = await getAllTransactions(currentUser.info.uid);
    let transactionObj = {}
      transactionList.data.transactions.forEach(transaction => {
        if(transactionObj[transaction.ticker_symbol]){
          transactionObj[transaction.ticker_symbol]['shares']+= transaction.shares
        }else {
          transactionObj[transaction.ticker_symbol] = {
            shares  :transaction.shares,
            price:transaction.price
          }
        }
        
      });
      setPortfolio(transactionObj)

  }


  useEffect(()=> {
    setUpTransactions(currentUser.info.uid)
  },[currentUser.info.balance])
  if(currentUser.info && currentUser.info.uid){
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
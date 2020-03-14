import React, { useContext, useState, useEffect} from "react";
import { Redirect } from 'react-router'
import firebase from "../Auth/firebase";
import { AuthContext } from "../Auth/Auth.js";
import { getAllTransactions , getSymbolPrices } from "../../util/util";
import PurchaseForm from './PurchaseForm.js'
import { PortfolioList } from './PortfolioList.js'



const Portfolio = () => {
  const { currentUser } = useContext(AuthContext);
  const { refreshUser } = useContext(AuthContext);
  const [portfolio , setPortfolio ] = useState({});


  const setUpTransactions = async () => {
    let transactionObj = {}
    try {
      let transactionList = await getAllTransactions(currentUser.info.uid);
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
      let arr = Object.keys(transactionObj);
      let latestPrices = await getSymbolPrices(arr);
      latestPrices.forEach(stock => {
        let currentKey = transactionObj[stock.data.symbol]
        console.log(stock)
        currentKey['latestPrice'] = stock.data.latestPrice
        currentKey['open'] = stock.data.open
        
      })

      setPortfolio(transactionObj)
    } catch (err) {
      console.log(err)
    }
    
     
  }
  


  useEffect(()=> {
    setUpTransactions(currentUser.info.uid)
  },[currentUser.info.balance])
  if(currentUser.info && currentUser.info.uid){
    return (
      <>
    <h1>{currentUser.info.username}</h1>
    <h2>{currentUser.info.email}</h2>
    <PortfolioList portfolio={portfolio} />
    <PurchaseForm balance={currentUser.info.balance} uid={currentUser.uid} refreshUser={refreshUser} />

    <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </>
    )
  } else {
    return <Redirect to="/login" />;
  }
  
};




export default Portfolio;
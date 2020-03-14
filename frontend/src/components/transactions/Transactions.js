import React, {useEffect,useState, useContext} from "react";
import TransactionItem from './TransactionItem';
import { Redirect } from 'react-router';
import { getAllTransactions } from '../../util/util.js'

import { AuthContext } from "../Auth/Auth.js";


const Transactions = () => {
  const { currentUser } = useContext(AuthContext);
  const [ transactions, setTransactions ] = useState([])
  const setUpTransactions = async () => {

    let transactionsResponse = await getAllTransactions(currentUser.info.uid,);
    setTransactions(transactionsResponse.data.transactions)
   }
  useEffect(()=> {
    setUpTransactions()
  },[currentUser])
  if(transactions.length){
    let showTransactions = transactions.map( (stonks,i) => {

      return <TransactionItem key={`${stonks.symbol}-${i}`}symbol={stonks.ticker_symbol} shares={stonks.shares} price={stonks.price}/>
    })
    return (
      <>
        <h1>Transactions</h1>
        {showTransactions}
      </>
    )
  }else {
    return <h1>WTF</h1>
  }
  
};




export default Transactions;
import React, {useEffect,useState, useContext} from "react";
import { Redirect } from 'react-router';
import { getAllTransactions } from '../../util/util.js'

import { AuthContext } from "../Auth/Auth.js";


const Transactions = () => {
  const { currentUser } = useContext(AuthContext);
  const [ transations, setTransactions ] = useState([])
  useEffect(()=> {
    const setUpTransactions =async () => {

     let transactionsResponse = await getAllTransactions(currentUser.info.uid);
     setTransactions(transactionsResponse)
    }
    setUpTransactions()

  },[currentUser])
  if(currentUser){
    return (
      <>
        <h1>Transactions</h1>
        
      </>
    )
  }else {
    return <Redirect to="/login" />;
  }
  
};




export default Transactions;
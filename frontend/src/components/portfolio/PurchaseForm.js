import React, {useState, useContext, useEffect} from 'react';
import { useInput } from '../../util/customHooks.js'
import { getTickerInfo , postNewTransaction } from '../../util/util.js'

import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';


import { AuthContext } from '../Auth/Auth.js'
const PurchaseForm = ({balance, uid}) => {
  const { refreshUser, currentUser } = useContext(AuthContext);
  const shares = useInput('');
  const tickerSymbol = useInput("");
  const [hasError, setHasError ] = useState(false);
  const [errorList, setErrorList ] = useState([])

  //check valid input
  const handleSubmitCheck = async e => {
    e.preventDefault();
    let errorArray = [];
    let tickerInfo ={};
    try {
      setHasError(false)
      let info = await getTickerInfo(tickerSymbol.value);
      // check if number
      if(isNaN(shares.value)){
        errorArray.push("Enter a  number")
      }else{
        // check if int
        if(!Number.isInteger(Number(shares.value))){
          errorArray.push("Cannot buy fractions of  a share")
        }
         tickerInfo.price = info.data.latestPrice
         tickerInfo.cost = tickerInfo.price * shares.value;

        //check if enough balance
        if(balance - tickerInfo.cost <= 0){
          errorArray.push("Not enough cash")
        }
      }
      
    } catch (err) {
      setHasError(true);
      errorArray.push("Invalid Symbol")
    }
    finally{
      //if error array length is 0 then make req
      if(!errorArray.length){
        postTransaction(tickerInfo)
      }else{
        //else display errors
        setHasError(true)
        setErrorList(errorArray)
      }
    }
    
  }
  //transaction request
  const postTransaction = async(info) => {
    
    let newBal = balance - info.cost;
    newBal = newBal.toFixed(2);
    let transactionObj = {
      newBalance: Number(newBal) ,
      uid:uid,
      ticker_symbol:tickerSymbol.value.toUpperCase(),
      transaction_type:'BUY',
      shares: shares.value,
      price:info.price
    }
    try {
       await postNewTransaction(transactionObj);
       await refreshUser()
    } catch (err) {
      console.log(err)
    }
    
  }

 
  const displayErrors = () => {
    return errorList.map((error, i) => {
      return <li key={`error-${i}`}>{error}</li>
    })
  }
  useEffect(()=> {

  },[currentUser])
  return (
  <>
    <div className="container">
    <form onSubmit={handleSubmitCheck}>
      <h1>Cash: {balance}</h1>
          {/* <input 
            type="text"
            placeholder="Enter Ticker Symbol"
            {...tickerSymbol}
          /> */}
          <TextField  {...tickerSymbol} id="outlined-basic" label="Enter Ticker Symbol" variant="filled" />


        {/* <input 
          type="text"
          placeholder="Enter Quantity"
          {...shares}
        /> */}
      

      <TextField {...shares} id="outlined-basic" label="Enter Quantity" variant="filled" />

      { hasError ? <ul>{displayErrors()}</ul>: null }
      {/* <Button color="secondary" type={"submit"} value={`Buy`}>Buy </Button> */}
      <input type ={'submit'} value={`Buy`} />
    </form>
    </div>
  </>)
}

export default PurchaseForm;
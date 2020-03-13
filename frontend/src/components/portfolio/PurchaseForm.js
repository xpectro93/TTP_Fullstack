import React, {useState, useEffect} from 'react';
import { useInput } from '../../util/customHooks.js'
import { getTickerInfo } from '../../util/util.js'
import axios from 'axios';
const PurchaseForm = ({balance}) => {
  const shares = useInput(0);
  const tickerSymbol = useInput("aapl");
  const [hasError, setHasError ] = useState(false);
  const [errorList, setErrorList ] = useState([])
  const handleSubmit = async e => {
    e.preventDefault();
    let errorArray = [];
    ;
    try {
      setHasError(false)
      let info = await getTickerInfo(tickerSymbol.value);

      if(isNaN(shares.value)){
        errorArray.push("Enter a  number")
      }else{
        if(!Number.isInteger(Number(shares.value))){
          errorArray.push("Cannot buy fractions of  a share")
        }
        const price = info.data.latestPrice
        const cost = price * shares.value;
        if(balance - cost <= 0){
          errorArray.push("Not enough cash")
        }
      }
      
    } catch (err) {
      setHasError(true);
      errorArray.push("Invalid Symbol")
    }
    finally{
      console.log('b',hasError)
      if(!errorArray.length){
        console.log(hasError)
        postTransaction()
      }else{
        setHasError(true)
        setErrorList(errorArray)
      }
    }
    
  }
  const postTransaction = async() => {
    console.log('we here')
    let transactionObj = {
      newBalance: 1,
      uid:0,
      ticker_symbol:'symbol',
      transaction_type:'BUY',
      shares:'shares',
      price:'1000'
    }
    // let transaction = await axios.post()
  }

 
  const displayErrors = () => {
    return errorList.map((error, i) => {
      return <li key={`error-${i}`}>{error}</li>
    })
  }

  return (
  <>
    <form onSubmit={handleSubmit}>
      <h1>Cash: {balance}</h1>
      <label>
          Ticker Symbol
          <input 
            type="text"
            placeholder="Ticker"
            {...tickerSymbol}
          />
      </label>
      <label>
        Quantity
        <input 
          type="text"
          placeholder="Qty"
          {...shares}
        />
      </label>
      { hasError ? <ul>{displayErrors()}</ul>: null }
      <input type ={'submit'} />
    </form>
  </>)
}

export default PurchaseForm;
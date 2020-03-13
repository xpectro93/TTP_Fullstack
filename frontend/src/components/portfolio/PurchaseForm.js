import React, {useState} from 'react';
import { useInput } from '../../util/customHooks.js'
import { getTickerInfo } from '../../util/util.js'
const PurchaseForm = ({balance}) => {
  const shares = useInput(0);
  const tickerSymbol = useInput("aapl");
  const [hasError, setHasError ] = useState(false);
  const [errorList, setErrorList ] = useState([])
  const handleSubmit = async e => {
    e.preventDefault();
    setErrorList([])
    if(!checkHasError()){
      console.log('You did it')
    }
    
  }
  const checkHasError = async() => {
    
    try {
      let info = await getTickerInfo(tickerSymbol.value);

      if(isNaN(shares.value)){
        setHasError(true);
        setErrorList([...errorList, "Enter a Valid Number"])
      }
      if(!Number.isInteger(+shares.value)){
        setHasError(true);
        setErrorList([...errorList, "Cannot buy fractions of a share"])
      }
      const price = info.data.latestPrice
      const cost = price * shares.value;
      if(balance - cost <= 0){
        setHasError(true);
        setErrorList([...errorList, "Not Enough Cash"])
      }
      return hasError
    } catch (err) {
      setHasError(true);
      setErrorList([...errorList, "Invalid Symbol"])
    }
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
      { hasError ? displayErrors(): null }
      <input type ={'submit'} />
    </form>
  </>)
}

export default PurchaseForm;
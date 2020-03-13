import React from 'react';
import { useInput } from '../../util/customHooks.js'
const PurchaseForm = props => {
  const shares = useInput(0);
  const tickerSymbol = useInput("");
  console.log(shares.value, tickerSymbol.value)
  return (<>
<form>
  <h1>Cash: {props.balance}</h1>
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
 
</form>
  </>)
}

export default PurchaseForm;
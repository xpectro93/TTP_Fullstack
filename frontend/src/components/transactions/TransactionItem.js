import React from 'react';

const TransactionItem = ({symbol, shares, price}) => {
  let string = `${symbol}: Shares ${shares}    @`
  let cost = `$ ${price}`
return (
<div className={"transactionItem"}>
<h2>{string}</h2> 
<h2>{cost}</h2>
</div>
)
}
export default TransactionItem;
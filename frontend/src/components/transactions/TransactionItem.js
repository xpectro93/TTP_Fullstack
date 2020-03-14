import React from 'react';

const TransactionItem = ({symbol, shares, price}) => {
return (
<h1>{symbol}:{shares} @ {price}</h1>
)
}
export default TransactionItem;
import React from 'react';

const colorAssigner = (open, current) => {
  if(current < open) {
    return 'red'
  }else if(current > open){
    return 'green'
  } else {
    return 'gray'
  }
}
const StockItem = ({open, latestPrice, symbol, shares}) => {
  let roundVal = latestPrice * shares
  roundVal = roundVal.toFixed(2)
  return (
    <div className={'stock-item'}>
      <h2> {symbol} - {shares} Shares </h2>
      <h2> $
        <span className={colorAssigner(open,latestPrice)}>
        {roundVal}
        </span></h2>
    </div>
   )
}
export default StockItem;
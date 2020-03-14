import React, { useEffect } from 'react';
import { getSymbolPrices } from '../../util/util.js'
//import helper function 
export const PortfolioList =({ portfolio}) => {
  let stonks = [];
 
    for(const symbol in portfolio){
      let shares = portfolio[symbol]['shares'];
      let price = portfolio[symbol]['price'];
      let latestPrice = portfolio[symbol]['latestPrice']
     stonks.push(<h1 key={symbol}>{symbol}:{shares} @ {price} {latestPrice}  </h1>)
  }

  return stonks.length ? (
    <div>
      {stonks}
    </div>
  ) : <h1>No stonks purchased yet</h1>
}
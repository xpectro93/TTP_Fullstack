import React from 'react';
import StockItem  from './StockItem.js'

export const PortfolioList =({ portfolio}) => {
  let stonks = [];
  for(const symbol in portfolio){
      const current = portfolio[symbol];

      const shares = current['shares'];
      const latestPrice = current['latestPrice']
      const open = current['open']
     stonks.push(<StockItem key={symbol}
                  open={open}
                  latestPrice={latestPrice}
                  symbol={symbol}
                  shares={shares} 
                  />)
  }

  return stonks.length ? (
    <div id={'portfolioList'}>
      <div id={'stonksContainer'}>
      {stonks}
      </div>
    </div>
  ) :(<div id={'portfolioList'}>
      <h1>No Stocks Bought Yet</h1>
    </div> )
}
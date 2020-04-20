import React, { useContext, useState, useEffect} from "react";
import { Redirect } from 'react-router'
import { AuthContext } from "../Auth/Auth.js";
import { getAllTransactions , getSymbolPrices } from "../../util/util";
import PurchaseForm from './PurchaseForm.js'
import { PortfolioList } from './PortfolioList.js'
import '../../CSS/Portfolio.css'



const Portfolio = () => {
  const { currentUser, update } = useContext(AuthContext);

  const [portfolio , setPortfolio ] = useState({});

  useEffect(()=> {
    const setUpTransactions = async () => {
      let transactionObj = {}
      try {
        let transactionList = await getAllTransactions(currentUser.info.uid);
        transactionList.data.transactions.forEach(transaction => {
          if(transactionObj[transaction.ticker_symbol]){
            transactionObj[transaction.ticker_symbol]['shares']+= transaction.shares
          }else {
            transactionObj[transaction.ticker_symbol] = {
              shares  :transaction.shares,
              price:transaction.price
            }
          }
          
        });
        let arr = Object.keys(transactionObj);
        let latestPrices = await getSymbolPrices(arr);
        latestPrices.forEach(stock => {
          let currentKey = transactionObj[stock.data.symbol]
          currentKey['latestPrice'] = stock.data.latestPrice
          currentKey['open'] = stock.data.open
          
        })
  
        setPortfolio(transactionObj)
      } catch (err) {
        console.log(err)
      }
      
       
    }
    setUpTransactions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[update])
  if(currentUser.info && currentUser.info.uid){
    return (
      <>
    <div className={'portfolioDiv'}>
      <PortfolioList portfolio={portfolio} />
      <PurchaseForm balance={currentUser.info.balance} uid={currentUser.uid} />
    </div>
      </>
    )
  } else {
    return <Redirect to="/login" />;
  }
  
};




export default Portfolio;
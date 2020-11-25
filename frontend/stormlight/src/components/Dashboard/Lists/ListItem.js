import React from 'react'
import { useSelector } from 'react-redux';
import { currentPrice } from '../../../utils';

async function ListItem({ intraDayData, ticker }) {
    const stocks = useSelector(state => state.stocks)
    let stockTicker = ticker[0]
    // let price = await currentPrice(stockTicker)

    return (
        <div>
            <h4>{stockTicker}</h4>
        </div>
    )
}

export default ListItem

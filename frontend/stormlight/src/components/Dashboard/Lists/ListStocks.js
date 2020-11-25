import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import ListItem from './ListItem'

function ListStocks() {
    const intraday = useSelector(state => state.intraday)
    // console.log(intraday)
    const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
`
    let tickers;
    let intradayObject = {};
    if (intraday.length) tickers = intraday.flatMap(el => {
        const tickerArr = Object.keys(el)
        const tick = tickerArr[0]
        Object.assign(intradayObject, { [tick]: { ...Object.values(el)[0] } })
        return tick
    })
    return (
        <ListContainer>
            {tickers && tickers.length && tickers.map((el) => <li key={el}><ListItem ticker={el} dailyData={intradayObject[el]} /></li>)}
        </ListContainer>
    )
}

export default ListStocks

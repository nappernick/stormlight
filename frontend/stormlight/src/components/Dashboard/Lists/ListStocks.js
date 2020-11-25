import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import ListItem from './ListItem'

function ListStocks() {
    const stocks = useSelector(state => state.stock)
    const intraday = useSelector(state => state.intraday)
    const [toggle, setToggle] = useState(false)
    // console.log(intraday)
    const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
`
    let tickers;
    let intradayObject = {};

    useEffect(() => {
        if (intraday.length) tickers = intraday.flatMap(el => {
            const tickerArr = Object.keys(el)
            const tick = tickerArr[0]
            Object.assign(intradayObject, { [tick]: { ...Object.values(el)[0] } })
            return tick
        })
    }, [stocks, intraday])
    debugger
    return (
        <ListContainer>
            {stocks && Object.values(stocks) && Object.keys(stocks).map((el) =>
                <li key={el}><ListItem toggle={toggle} setToggle={setToggle} ticker={el} dailyData={intradayObject[el]} /></li>)}
        </ListContainer>
    )
}

export default ListStocks

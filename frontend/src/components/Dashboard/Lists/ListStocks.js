import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import PurchaseModal from '../../PurchasePage/PurchaseModal';
import ListItem from './ListItem'

function ListStocks() {
    const stocks = useSelector(state => state.stock)
    const intraday = useSelector(state => state.intraday)
    const [stocksLen, setStocksLen] = useState(0)
    const [stocksTickerArr, setStocksTickerArr] = useState([])
    const [intradayLen, setIntradayLen] = useState(0)


    const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    width: 220px;
    box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
    padding: 20px 20px 25px 20px;
    font-family: 'DM Sans', sans-serif;
    `

    const ListHeader = styled.h3`
    margin-bottom: 10px;
    color: #5a6571;
    font-size: 1.3em;
    `
    const HorizontalLine = styled.hr`
    width: 200px
    `
    const PurchaseModalDiv = styled.div`
    margin-top: 15px;
    `
    useEffect(() => {
        setStocksLen(Object.values(stocks).length)
        setStocksTickerArr(Object.keys(stocks))
        setIntradayLen(intraday.length)
    }, [stocks, intraday])
    return (
        <ListContainer>
            <ListHeader>Current Portfolio Stock Data</ListHeader>
            <HorizontalLine />
            {stocksLen && Object.values(stocks) && intradayLen && stocksTickerArr.map((el) => {
                return <li key={el}><ListItem ticker={el} test={intradayLen} /></li>
            }) || ""}
            {stocksLen === 0 && "Buy a stock!"}

            <PurchaseModalDiv>
                <PurchaseModal />
            </PurchaseModalDiv>
        </ListContainer>
    )
}

export default ListStocks

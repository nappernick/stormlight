import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import PurchaseModal from '../../PurchasePage/PurchaseModal';
import ListItem from './ListItem'

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    width: 220px;
    box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
    padding: 10px 10px 15px 10px;
    font-family: 'DM Sans', sans-serif;
    `

const ListHeader = styled.h3`
    margin: 0px 0 0 10px;
    color: #5a6571;
    font-size: 1.3em;
    display: flex;
    align-self: flex-start;
    width: 200px;
    border-bottom: 1px solid lightgray;
    `
const HorizontalLine = styled.hr`
    width: 200px
    `
const HorizontalLineLight = styled.hr`
    width: 200px;
    background-color: #d3d3d3;
    height: 1px;
    border: none;
    `
const PurchaseModalDiv = styled.div`
    margin-top: 0px;
    `

const NoStocks = styled.div`
    margin: 10px;
    color: #5a6571;
    text-align: center;
    `

function ListStocks() {
    const stocks = useSelector(state => state.stock)
    const intraday = useSelector(state => state.intraday)
    const watchlist = useSelector(store => store.watchlist)
    const [stocksLen, setStocksLen] = useState(0)
    const [stocksTickerArr, setStocksTickerArr] = useState([])
    const [intradayLen, setIntradayLen] = useState(0)

    useEffect(() => {
        setStocksLen(Object.values(stocks).length)
        setStocksTickerArr(Object.keys(stocks))
        setIntradayLen(intraday.length)
    }, [stocks, intraday])
    return (
        <ListContainer>
            <ListHeader>STOCKS</ListHeader>
            {stocksLen ? Object.values(stocks) && intradayLen && stocksTickerArr.map((el) => {
                return (
                    <li key={el}>
                        <ListItem ticker={el} test={intradayLen} />
                    </li>
                )
            }) || "" : <NoStocks>Search stocks & buy them to view here</NoStocks>}
            {stocksLen === 0 && "Buy a stock!"}
            <ListHeader>WATCH</ListHeader>
            {watchlist.length ? watchlist.map((el) => {
                return (
                    <li key={el.id}>
                        <ListItem ticker={el.ticker} />
                    </li>
                )
            }) || "" : <NoStocks>Search stocks & watch them to view here</NoStocks>}
            {stocksLen === 0 && "Buy a stock!"}
            <PurchaseModalDiv>
                <PurchaseModal />
            </PurchaseModalDiv>
        </ListContainer>
    )
}

export default ListStocks

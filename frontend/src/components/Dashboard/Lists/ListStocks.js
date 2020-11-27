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

    const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    width: 220px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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
    return (
        <ListContainer>
            <ListHeader>Current Portfolio Stock Data</ListHeader>
            <HorizontalLine />
            {Object.values(stocks).length && Object.values(stocks) && intraday.length && Object.keys(stocks).map((el) => {
                return <li key={el}><ListItem ticker={el} /></li>
            }) || ""}
            {Object.values(stocks).length === 0 && "Buy a stock!"}

            <PurchaseModalDiv>
                <PurchaseModal />
            </PurchaseModalDiv>
        </ListContainer>
    )
}

export default ListStocks

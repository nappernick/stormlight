import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import ListItem from './ListItem'

function ListStocks() {
    const stocks = useSelector(state => state.stock)
    const intraday = useSelector(state => state.intraday)
    
    const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
`
    return (
        <ListContainer>
            {stocks && Object.values(stocks) && intraday.length && Object.keys(stocks).map((el) =>
                <li key={el}><ListItem ticker={el} /></li>)}
        </ListContainer>
    )
}

export default ListStocks

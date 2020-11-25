import React from 'react'
import { useSelector } from 'react-redux';
import LineGraph from './LineGraph';

function ListItem() {
    const stocks = useSelector(state => state.stocks)
    
    return (
        <div>
            <h4></h4>
        </div>
    )
}

export default ListItem

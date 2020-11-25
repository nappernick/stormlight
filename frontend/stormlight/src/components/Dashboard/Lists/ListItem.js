import React from 'react'
import { useSelector } from 'react-redux';

function ListItem({ intraDayData }) {
    const stocks = useSelector(state => state.stocks)
    console.log(intraDayData)
    return (
        <div>
            <h4>Hi</h4>
        </div>
    )
}

export default ListItem

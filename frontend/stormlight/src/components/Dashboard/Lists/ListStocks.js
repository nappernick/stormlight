import React from 'react'
import { useSelector } from 'react-redux'

function ListStocks() {
    const intraDay = useSelector(state => state.intraday)
    return (
        <div>
            {intraDay.forEach(el => {
                <ListItem />
            })}
        </div>
    )
}

export default ListStocks

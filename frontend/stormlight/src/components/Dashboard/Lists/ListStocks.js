import React from 'react'
import { intradayDataContext } from "../DashboardPage"
import List from './List'

function ListStocks() {
    return (
        <intradayDataContext.Consumer>
            {(value) => <List intraDayData={value} />}
        </intradayDataContext.Consumer>
    )
}

export default ListStocks

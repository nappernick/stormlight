import React from 'react'
import { intradayDataContext } from "../DashboardPage"
import ListItem from './ListItem'

function ListStocks() {
    return (
        <div>
            <intradayDataContext.Consumer>
                {(value) => {
                < ListItem intraDayData={value} />}}
            </intradayDataContext.Consumer>
        </div>
    )
}

export default ListStocks

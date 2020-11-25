import React from 'react'
import LineGraph from './LineGraph';
import { intradayDataContext } from "../DashboardPage"


function PortofolioLineGraph() {
    return (
        <div>
            <intradayDataContext.Consumer>
                {(value) => <LineGraph intraDayData={value} />}
            </intradayDataContext.Consumer>
        </div>
    )
}

export default PortofolioLineGraph

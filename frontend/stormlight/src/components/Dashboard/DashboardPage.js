import React from 'react'
import { useSelector } from 'react-redux'
import PurchaseModal from '../PurchasePage/PurchaseModal'
import PortofolioLineGraph from './Graphs/PortofolioLineGraph'
import "./Dashboard.css"
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const intradayDataContext = createContext()

function DashboardPage() {
    const sessionUser = useSelector(state => state.session.user)
    const stocks = useSelector(state => state.stock)
    const intraDay = useSelector(state => state.intraday)
    const [intraDayData, setIntraDayData] = useState({})
    console.log(intraDayData)

    const normalizeData = (checkObj, closeObj, tickers) => {
        let countTickers = tickers.length
        for (let key in checkObj) {
            if (checkObj[key] !== countTickers) delete closeObj[key]
        }
        return closeObj
    }

    const getCloseData = async () => {
        let stockArr = intraDay
        let closeObj = {}
        let checkObj = {}
        let tickers = []

        stockArr && stockArr.forEach(ele => {
            for (let key in ele) {
                let ticker = key
                if (!tickers.includes(ticker)) tickers.push(ticker)
                for (let innerKey in ele[key]) {
                    let inner = parseInt(ele[key][innerKey]["4. close"], 10)
                    let stockPrice = stocks[ticker]['numStock']
                    let stockTotal = inner * stockPrice
                    if (closeObj[innerKey]) closeObj[innerKey] += stockTotal
                    else closeObj[innerKey] = stockTotal;
                    // below here is the check for data completeness
                    if (checkObj[innerKey]) checkObj[innerKey]++
                    else checkObj[innerKey] = 1
                }

            }

        })
        normalizeData(checkObj, closeObj, tickers)
        if (Object.values(closeObj)) return closeObj

    }
    useEffect(() => {
        async function updateIntraDayData() { setIntraDayData(await getCloseData()) }
        updateIntraDayData()
    }, [stocks, intraDay])
    if (!sessionUser) return null
    return (
        <div className="page-container">
            <intradayDataContext.Provider value={this.intraDayData}>
                <div className="modals-container">
                    <div className="purchaseModal">
                        <PurchaseModal />
                    </div>
                    <div className="addFundsModal">
                        {/* create table of acounts & in modal link to account creation */}
                    </div>
                </div>
                <div className="portofolioLineGraph">
                    <PortofolioLineGraph />
                </div>
                <div className="portofolioPieChart">
                    {/* create piechart of each stock's total, updates every minute */}
                </div>
                <div className="listStocks">
                    {/* list of stocks with mini chart & current prices */}
                </div>
            </intradayDataContext.Provider>
        </div>
    )
}

export default DashboardPage

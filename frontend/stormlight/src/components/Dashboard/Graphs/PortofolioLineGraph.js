import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { intraDayFetch } from '../../../utils';
import LineGraph from './LineGraph';

function PortofolioLineGraph() {
    const stocks = useSelector(state => state.stock)
    // let stockObjLen = Object.values(stocks).length
    // const [intraDay, setIntraDay] = useState([])
    const intraDay = useSelector(state => state.intraday)

    // const [loading, setLoading] = useState(true)
    const [intraDayData, setIntraDayData] = useState({})

    const normalizeData = (checkObj, closeObj, tickers) => {
        //get count of tickers
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

    // const getIntraDay = async (interval) => {
    //     if (!interval) interval = "15min"
    //     const stockObj = stocks
    //     let stockArr = []
    //     for (let ticker in stockObj) {
    //         const res = await intraDayFetch(ticker, interval)
    //         stockArr.push({ [ticker]: res[`Time Series (${interval})`] })
    //     }
    //     if (stockArr.length) return stockArr
    // }

    // useEffect(() => {
    //     async function updateIntraday() {
    //         setIntraDay(await getIntraDay())
    //     }
    //     updateIntraday();
    // }, [stocks])
    useEffect(() => {
        async function updateIntraDayData() { setIntraDayData(await getCloseData()) }
        updateIntraDayData()
    }, [stocks, intraDay])
    
    return (
        <div>
            <LineGraph intraDayData={intraDayData} />
        </div>
    )
}

export default PortofolioLineGraph

import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { fetch } from '../../../store/csrf';
import { intraDayFetch } from '../../../utils';
import LineGraph from './LineGraph';

function PortofolioLineGraph() {
    const [stocks, setStocks] = useState({})
    const [intraDay, setIntraDay] = useState([])
    const [intraDayData, setIntraDayData] = useState({})
    const userId = useSelector(state => state.session.user.id)

    const normalizeData = (checkObj, closeObj, tickers) => {
        //get count of tickers
        let countTickers = tickers.length
        for (let key in checkObj) {
            if (checkObj[key] !== countTickers) delete closeObj[key]
        }
        return closeObj
    }

    const getSetStocks = async () => {
        const stocksFetch = await fetch(`/api/stocks/${userId}`)
        if (stocksFetch.ok) {
            let res = stocksFetch.data.stock
            let obj = {}
            for (let key in res) {
                let ele = res[key]
                let { ticker } = ele
                Object.assign(obj, { [ticker]: { ...ele } })
            }
            setStocks(obj)
        }

    }

    const getCloseData = async () => {
        let stockArr = intraDay
        let closeObj = {}
        let checkObj = {}
        let tickers = []
        stockArr.forEach(ele => {
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
        if (Object.values(closeObj)) setIntraDayData(closeObj)
    }

    const getIntraDay = async (interval) => {
        if (!interval) interval = "15min"
        let stockArr = []
        for (let ticker in stocks) {
            const res = await intraDayFetch(ticker, interval)
            stockArr.push({ [ticker]: res[`Time Series (${interval})`] })
        }
        setIntraDay(stockArr)

    }

    useEffect(() => {
        getSetStocks();
    }, [])
    useEffect(() => {
        getIntraDay();
    }, [stocks])
    useEffect(() => {
        getCloseData()
    }, [intraDay])
    return (
        <div>
            <LineGraph intraDay={intraDay} intraDayData={intraDayData} />
        </div>
    )
}

export default PortofolioLineGraph

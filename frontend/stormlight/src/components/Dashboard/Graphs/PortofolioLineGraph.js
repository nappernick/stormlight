import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { intraDayFetch } from '../../../utils';
import LineGraph from './LineGraph';

function PortofolioLineGraph() {
    const stocks = useSelector(state => state.stock)
    let stockObjLen = Object.values(stocks).length
    const [intraDay, setIntraDay] = useState([])
    const [loading, setLoading] = useState(true)
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
        const stockObj = stocks
        let stockArr = []
        for (let ticker in stockObj) {
            const res = await intraDayFetch(ticker, interval)
            stockArr.push({ [ticker]: res[`Time Series (${interval})`] })
        }
        if (stockArr.length) setIntraDay(stockArr)
    }

    useEffect(() => {
        if (stockObjLen) getIntraDay()
    }, [stockObjLen])
    useEffect(() => {
        if (stockObjLen) getCloseData()
    })
    debugger
    if (!stockObjLen && loading) return null
    debugger
    return (
        <div>
            <LineGraph stocks={stocks} intraDay={intraDay} intraDayData={intraDayData} />
        </div>
    )
}

export default PortofolioLineGraph


// const [stocks, setStocks] = useState({})
    // const getSetStocks = async () => {
    //     const stocksFetch = await fetch(`/api/stocks/${userId}`)
    //     if (stocksFetch.ok) {
    //         let res = stocksFetch.data.stock
    //         let obj = {}
    //         for (let key in res) {
    //             let ele = res[key]
    //             let { ticker } = ele
    //             Object.assign(obj, { [ticker]: { ...ele } })
    //         }
    //         setStocks(obj)
    //     }

    // }

    // useEffect(() => {
    //     getSetStocks();
    // }, [])
    // useEffect(() => {
    //     getIntraDay();
    // }, [])


    // useEffect(() => {
    //     getIntraDay();
    //     if (Object.values(stocks)) setLoading(false);

    // }, [stocks, getIntraDay])
    // useEffect(() => {
    //     getCloseData()
    // }, [intraDay, getCloseData])
    // let stocksArr = Object.values(stocks)

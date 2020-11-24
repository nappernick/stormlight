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
        stockArr.forEach(ele => {
            for (let key in ele) {
                let ticker = key
                for (let innerKey in ele[key]) {
                    let inner = parseInt(ele[key][innerKey]["4. close"], 10)
                    let stock = stocks[ticker]['numStock']
                    let stockTotal = inner * stock
                    if (closeObj[innerKey]) closeObj[innerKey] += stockTotal
                    else closeObj[innerKey] = stockTotal;
                }
            }
        })

        if (Object.values(closeObj)) setIntraDayData(closeObj)
        // normalizeData()
    }

    const getIntraDay = async () => {
        let stockArr = []
        for (let ticker in stocks) {
            const res = await intraDayFetch(ticker)
            stockArr.push({ [ticker]: res["Time Series (5min)"] })
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
            <LineGraph stocks={stocks} intraDay={intraDay} intraDayData={intraDayData} />
        </div>
    )
}

export default PortofolioLineGraph

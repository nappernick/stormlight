import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Line } from "react-chartjs-2"
import { useSelector } from 'react-redux';
import { fetch } from '../../../store/csrf';
import { dailyCandle, intraDayFetch } from '../../../utils';

function PortofolioLineGraph() {
    const [chartData, setChartData] = useState({});
    const [stocks, setStocks] = useState([])
    const [intraDay, setIntraDay] = useState([])
    const userId = useSelector(state => state.session.user.id)

    const getSetStocks = async () => {
        const stocksFetch = await fetch(`/api/stocks/${userId}`)
        if (stocksFetch.ok) {
            setStocks(stocksFetch.data.stock)
        }
        
    }

    const getIntraDay = async () => {
        let stockArr = []
        stocks.forEach(async (stock) => {
            const { ticker } = stock
            const res = await intraDayFetch(ticker)
            stockArr.push({ [ticker]: res["Time Series (5min)"] })
        })
        console.log(stockArr)
    }
    const chart = () => {
        setChartData({

        })
    }

    useEffect(() => {
        getSetStocks();
    }, [])
    useEffect(() => {
        getIntraDay()
    }, [stocks])
    return (
        <div>
            {stocks.map(stock => {
                <li key={stock.id}>{stock.ticker}</li>
            })}
        </div>
    )
}

export default PortofolioLineGraph

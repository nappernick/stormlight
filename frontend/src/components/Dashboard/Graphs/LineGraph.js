import React from 'react'
import { Line } from "react-chartjs-2"
import { useState } from 'react'
import { useEffect } from 'react'
import "./Graph.css"
import { useSelector } from 'react-redux'

function LineGraph() {
    const stocks = useSelector(state => state.stock)
    const intraDay = useSelector(state => state.intraday)
    const [intraDayData, setIntraDayData] = useState({})

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

    const data = {
        labels: Object.keys(intraDayData).reverse(),
        datasets: [
            {
                data: Object.values(intraDayData).reverse(),
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
        ]
    }
    const options = {
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value) {
                        return '$' + value;
                    }
                }
            }],
        }
    }
    return (
        <div className="graph-container">
            {intraDayData && <Line data={data} options={options} height={250} />}
        </div>
    )
}

export default LineGraph

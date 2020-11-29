import React from 'react'
import { Line } from "react-chartjs-2"
import { useState } from 'react'
import { useEffect } from 'react'
import "./Graph.css"
import { useSelector } from 'react-redux'
import styled from "styled-components"

function LineGraph({ setCurrValue }) {
    const stocks = useSelector(state => state.stock)
    const intraDay = useSelector(state => state.intraday)
    const [intraDayData, setIntraDayData] = useState({})
    setCurrValue(Object.values(intraDayData)[0])

    //Removing times from data set where API doesn't have data for all stocks
    const normalizeData = (checkObj, closeObj, tickers) => {
        let countTickers = tickers.length
        for (let key in checkObj) {
            if (checkObj[key] !== countTickers) delete closeObj[key]
        }
        return closeObj
    }

    // Building the close data object, which sets the intraDatData slice of state
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


    // Formatting the date & time labels
    const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const labelsRev = Object.keys(intraDayData).reverse()
    const formattedLabels = labelsRev.map(label => {
        const dateTimeFormatted = new Date(label + " UTC")
        const dateString = dateTimeFormatted.toString()
        const time = formatAMPM(dateTimeFormatted)
        const dayMonth = dateString.slice(4, 10)
        return `${dayMonth} at ${time}`
    })

    const data = {
        labels: formattedLabels,
        datasets: [
            {
                data: Object.values(intraDayData).reverse(),
                fill: false,
                backgroundColor: "rgba(32, 120, 121,0.2)",
                borderColor: "#3399FF"
            },
        ]
    }
    const options = {
        legend: {
            display: false,
            labels: {
            },
        },
        bezierCurve: false,
        tooltips: {
            mode: 'x'
        },
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value) {
                        return '$' + value;
                    },
                    fontColor: "#215C8A",
                    fontFamily: 'DM Sans',
                },
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
            }],
            xAxes: [{
                // display: false,
            }]
        }
    }
    return (
        <div className="graph-container">
            {intraDayData && <Line data={data} options={options} height={250} />}
        </div>
    )
}

export default LineGraph

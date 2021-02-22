import React from 'react'
import { Line } from "react-chartjs-2"
import { useState } from 'react'
import { useEffect } from 'react'
import "./Graph.css"
import { useDispatch, useSelector } from 'react-redux'
import { createIntradaData } from '../../../store/intradayData'
import { fetchCoData, formatAMPM } from '../../../utils'
import { useParams } from 'react-router-dom'

function LineGraph({ setIntraDayEnd, companyIntraDayData }) {
    const dispatch = useDispatch()
    const stocks = useSelector(state => state.stock)
    const intraDay = useSelector(state => state.intraday)
    const intraDayData = useSelector(state => state.intradayData)
    const [numOfStocks, setNumOfStocks] = useState(null)


    useEffect(() => {
        if (numOfStocks && (Object.keys(numOfStocks).length === intraDay.length)) dispatch(createIntradaData(intraDay, numOfStocks))
    }, [dispatch, stocks, intraDay, numOfStocks])

    useEffect(() => {
        const numStocksObj = {}
        if (!companyIntraDayData && (Object.keys(stocks).length === intraDay.length)) {
            for (let stock in stocks) {
                let ele = stocks[stock]
                let ticker = ele["ticker"]
                let numStocks = ele["numStock"]
                numStocksObj[ticker] = numStocks
            }
            setNumOfStocks(numStocksObj)
        }
    }, [stocks, intraDay, companyIntraDayData, setNumOfStocks])


    // Formatting the date & time labels
    const labelsRev = companyIntraDayData && Object.keys(companyIntraDayData).length ? Object.keys(companyIntraDayData).reverse() : Object.keys(intraDayData).reverse()
    const formattedLabels = labelsRev.map(label => {
        const dateTimeFormatted = new Date(label + " UTC")
        const dateString = dateTimeFormatted.toString()
        const time = formatAMPM(dateTimeFormatted)
        const dayMonth = dateString.slice(4, 10)
        return `${dayMonth} ${time}`
    })

    const data = {
        labels: formattedLabels,
        datasets: [
            {
                data: companyIntraDayData && Object.values(companyIntraDayData).length ? Object.values(companyIntraDayData).reverse() : Object.values(intraDayData).reverse(),
                fill: false,
                backgroundColor: "rgba(0, 0, 0,0)",
                borderColor: "#3399FF",
                pointHitRadius: 10,
            },
        ]
    }

    const options = {
        tooltips: {
            enabled: true,
            mode: 'index',
            axis: "x",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    var value = data.datasets[0].data[tooltipItem.index];
                    setIntraDayEnd(parseFloat(value))
                    return ""
                    // if (parseInt(value) >= 1000) {
                    //     return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    // } else {
                    //     return '$' + value;
                    // }
                }
            },
            yPadding: "12",
            titleFontColor: '#5a6571',
            bodyFontColor: '#5a6571',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            // Removes the color square from tooltip
            displayColors: false,
        },
        hover: {
            mode: 'index',
            intersect: false
        },
        elements: {
            // Make the circles on the graph disappear
            point: {
                radius: 0
            },
            // Make the lines straight, instead of curved
            line: {
                tension: 0
            }
        },
        legend: {
            display: false,
            labels: {
            },
        },
        // Make the lines straight, instead of curved
        bezierCurve: false,
        scales: {
            yAxes: [{
                display: false,
            }],
            xAxes: [{
                display: false,
            }]
        }
    }
    return (
        <div className="graph-container">
            {(intraDayData || companyIntraDayData) && <Line data={data} options={options} />}
        </div>
    )
}

export default LineGraph

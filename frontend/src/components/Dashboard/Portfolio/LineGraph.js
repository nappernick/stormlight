import React from 'react'
import { Line } from "react-chartjs-2"
import { useState } from 'react'
import { useEffect } from 'react'
import "./Graph.css"
import { useDispatch, useSelector } from 'react-redux'
import { createIntradaData } from '../../../store/intradayData'

function LineGraph({ setIntraDayEnd }) {
    const dispatch = useDispatch()
    const stocks = useSelector(state => state.stock)
    const intraDay = useSelector(state => state.intraday)
    const intraDayData = useSelector(state => state.intradayData)
    const [numOfStocks, setNumOfStocks] = useState({})
    useEffect(() => {
        if (Object.keys(numOfStocks).length) dispatch(createIntradaData(intraDay, numOfStocks))
    }, [dispatch, stocks, intraDay])



    useEffect(() => {
        for (let stock in stocks) {
            let ele = stocks[stock]
            let ticker = ele["ticker"]
            let numStocks = ele["numStock"]
            setNumOfStocks({
                ...numOfStocks,
                [ticker]: numStocks,
            })
        }
    }, [stocks, setNumOfStocks])


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
        return `${dayMonth} ${time}`
    })

    const data = {
        labels: formattedLabels,
        datasets: [
            {
                data: Object.values(intraDayData).reverse(),
                fill: false,
                backgroundColor: "rgba(32, 120, 121,0.2)",
                borderColor: "#3399FF",
                pointHitRadius: 10,
            },
        ]
    }

    const options = {
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                label: function (tooltipItem, data) {
                    var value = data.datasets[0].data[tooltipItem.index];
                    setIntraDayEnd(parseFloat(value))
                    if (parseInt(value) >= 1000) {
                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
                        return '$' + value;
                    }
                }
            }
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
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value) {
                        return '$' + value;
                    },
                    fontColor: "#215C8A",
                    fontFamily: 'DM Sans',
                },
                gridLines: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
            }],
            xAxes: [{
                display: false,
            }]
        }
    }
    return (
        <div className="graph-container">
            {intraDayData && <Line data={data} options={options} />}
        </div>
    )
}

export default LineGraph

import React from 'react'
import { Doughnut } from "react-chartjs-2"
import { useSelector } from 'react-redux'

function PieChart() {
    const stocks = useSelector(state => state.stock)
    const intraday = useSelector(state => state.intraday)

    let tickers = [];
    let totals = [];

    if (intraday.length) intraday.forEach(el => {
        let ticker = Object.keys(el)[0]
        tickers.push(Object.keys(el)[0])
        for (let key in el) {
            let subtotal = stocks[ticker]["numStock"] * parseFloat(Object.values(el[key])[0]["4. close"])
            totals.push(subtotal)
        }
    })

    const data = {
        labels: tickers,
        datasets: [
            {
                data: totals,
                backgroundColor: [
                    "dodgerblue",
                    "rgb(33, 92, 138)",
                    "#C1DA39",
                    "rgb(0, 78, 171)",
                    "#4A6577",
                    "#A4BACE",
                    "rgb(153, 102, 255)",
                    "rgb(155, 49, 146)",
                ],
            },
        ],
    }

    const options = {
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                label: function (tooltipItem, data) {
                    // console.log(data.labels[tooltipItem.index])
                    let value = data.datasets[0].data[tooltipItem.index];
                    if (parseInt(value) >= 1000) {
                        // Using an array allows for multiline text - each item
                        // in the array is a line
                        return [
                            data.labels[tooltipItem.index] + ": " + '$' + value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                            `${stocks[data.labels[tooltipItem.index]]["numStock"]} Stocks Owned`
                        ];
                    } else {
                        return [
                            data.labels[tooltipItem.index] + ": " + '$' + value.toFixed(2),
                            `${stocks[data.labels[tooltipItem.index]]["numStock"]} Stocks Owned`
                        ];
                    }
                }
            },
            // Removes the color square from tooltip
            displayColors: false,
        },
    }

    return (
        <div className="pie-container">
            <Doughnut data={data} options={options} />
        </div>
    )
}

export default PieChart

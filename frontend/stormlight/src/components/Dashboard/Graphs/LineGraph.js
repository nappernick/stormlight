import React from 'react'
import { Line } from "react-chartjs-2"
import "./Graph.css"

function LineGraph({ intraDayData }) {

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
            <Line data={data} options={options} height={250} />
        </div>
    )
}

export default LineGraph

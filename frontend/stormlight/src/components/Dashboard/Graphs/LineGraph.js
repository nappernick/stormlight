import React from 'react'
import { Line } from "react-chartjs-2"
import "./Graph.css"

function LineGraph({ stocks, intraDayData }) {

    const data = {
        labels: Object.keys(intraDayData),
        // height: 70,
        datasets: [
            {
                label: "Portfolio Value",
                data: Object.values(intraDayData),
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
            },
        ],
    }
    return (
        <div className="graph-container">
            <Line data={data} height={250} />
        </div>
    )
}

export default LineGraph

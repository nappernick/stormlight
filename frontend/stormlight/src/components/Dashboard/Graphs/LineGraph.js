import React from 'react'
import { Line } from "react-chartjs-2"
import "./Graph.css"

function LineGraph({ stocks, intraDay, intraDayData }) {
    const normalizeData = () => {
        let intraDayObj = {}
        let intraDayDates = Object.keys(intraDayData)
        console.log(intraDayDates.length)
        let dates
        let badDates = [];
        intraDay.forEach(obj => {
            Object.assign(intraDayObj, obj)
        })
        for (let key in intraDayObj) {
            dates = Object.keys(intraDayObj[key])
            intraDayDates.forEach(date => {
                if (!dates.includes(date)) badDates.push(date)
                // debugger

            })
        }
        // let arr1 = _arr1.concat().sort();
        let intraDayDatesCopy = intraDayDates.concat().sort()
        // let arr2 = _arr2.concat().sort();
        let datesCopy = dates ? dates.concat().sort() : null

        let check = true;

        for (let i = 0; i < intraDayDatesCopy.length; i++) {
            if (intraDayDatesCopy[i] !== datesCopy[i]) {
                check = false;
            }
        }
        console.log(true)

    }

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

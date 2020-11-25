import React from 'react'
import styled from 'styled-components'
import { Line } from "react-chartjs-2"
import { useEffect } from 'react'

function ListItem({ ticker, dailyData, toggle, setToggle }) {
    console.log(toggle)
    const TickerDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 180px;
    `
    const ChartDiv = styled.div`
    height: 50px;
    width: 50px;
    `
    //* Build the array of data for chart:
    let data = [];
    let labels = [];
    let recentDate = "2020-01-01 00:00:01";
    let buyPrice = 0
    if (dailyData && Object.keys(dailyData)) for (let key in dailyData) {
        if (key > recentDate) {
            recentDate = key;
            let price
            buyPrice = parseInt(dailyData[key]["4. close"], 10).toFixed(2)
        }
        recentDate = key > recentDate ? key : recentDate

        data.push(dailyData[key]["4. close"])
        labels.push(dailyData[key])
        // setToggle(!toggle)
    }

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                fill: false,
                borderWidth: .5,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)",
                pointRadius: 0,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                display: false,
            }],
            xAxes: [{
                display: false,
            }],
        },
    }

    useEffect(() => {
    }, [])

    return (
        <TickerDiv>
            <h4>{ticker}</h4>
            <ChartDiv>
                <Line data={chartData} options={options} height={250} width={250} />
            </ChartDiv>
            <h4>${buyPrice}</h4>
        </TickerDiv>
    )
}

export default ListItem

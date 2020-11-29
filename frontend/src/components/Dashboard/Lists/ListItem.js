import React from 'react'
import styled from 'styled-components'
import { Line } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import { removeIntraDay } from '../../../store/intraday';

function ListItem({ ticker }) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const intraday = useSelector(state => state.intraday)

    // Sell stock dropdown on hover functions
    function onSelect() {
        dispatch(removeIntraDay(userId, ticker))
    }

    function onVisibleChange(visible) {
        console.log(visible);
    }

    const menuCallback = () => (
        <Menu onSelect={onSelect}>
            <MenuItem style={{ cursor: "pointer" }} key="2">{`Sell ${ticker}?`}</MenuItem>
        </Menu>
    );


    // Styled components
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
    const buyPriceHFour = styled.h4`

    `
    //* Build the array of data for chart:
    let data = [];
    let labels = [];
    let recentDate = "2020-01-01 00:00:01";
    let buyPrice = data.length ? 0 : "Loading..."
    let intradayObject = {};
    if (intraday.length) intraday.flatMap(el => {
        const tickerArr = Object.keys(el)
        if (ticker === tickerArr[0]) Object.assign(intradayObject, { ...Object.values(el)[0] })
        return
    })
    if (intradayObject && Object.keys(intradayObject)) for (let key in intradayObject) {
        if (key > recentDate) {
            recentDate = key;
            buyPrice = parseInt(intradayObject[key]["4. close"], 10).toFixed(2)
        }
        recentDate = key > recentDate ? key : recentDate

        data.push(intradayObject[key]["4. close"])
        labels.push(intradayObject[key])
    }

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                fill: false,
                borderWidth: .5,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "#AFC23F",
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

    return (
        <TickerDiv>
            <h4>{ticker}</h4>
            <ChartDiv>
                <Line data={chartData} options={options} height={250} width={250} />
            </ChartDiv>
            <Dropdown
                trigger={['hover']}
                overlay={menuCallback}
                animation="slide-up"
                onVisibleChange={onVisibleChange}
            >
                <buyPriceHFour>${buyPrice}</buyPriceHFour>
            </Dropdown>
        </TickerDiv>
    )
}

export default ListItem

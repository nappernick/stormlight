import React from 'react'
import styled from 'styled-components'
import { Line } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import { removeIntraDay } from '../../../store/intraday';
import { updateBuyingPowerThunk } from '../../../store/buyingPower';
import { currentPriceApi } from '../../../utils';

function ListItem({ ticker }) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const intraday = useSelector(state => state.intraday)
    const stocks = useSelector(store => store.stock)
    const buyingPower = useSelector(store => store.buyingPower)

    //* Sell stock dropdown on hover functions
    function onSelect() {
        dispatch(removeIntraDay(userId, ticker))
        async function increaseBuyPower() {
            let price = parseFloat(await currentPriceApi(ticker.toUpperCase()))
            let numStock = parseInt(stocks[ticker].numStock)
            let buyPowDollars = parseFloat(buyingPower[userId].dollars)
            let newDollars = buyPowDollars + (price * numStock)
            dispatch(updateBuyingPowerThunk(userId, newDollars))
        }
        increaseBuyPower()
    }

    const menuCallback = () => (
        <Menu onSelect={onSelect}>
            <MenuItem style={{ cursor: "pointer" }} key="2">{`Sell ${ticker}?`}</MenuItem>
        </Menu>
    );


    //* Styled components
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
    const BuyPriceHFour = styled.h4`

    `
    //* Build the array of data for chart:
    let data = [];
    let labels = [];
    let recentDate = "2020-01-01 00:00:01";
    let buyPrice = 0
    let intradayObject = {};
    if (intraday.length) intraday.flatMap(el => {
        const tickerArr = Object.keys(el)
        if (ticker === tickerArr[0]) Object.assign(intradayObject, { ...Object.values(el)[0] })
        return null
    })
    if (intradayObject && Object.keys(intradayObject)) for (let key in intradayObject) {
        if (key > recentDate) {
            recentDate = key;
            buyPrice = parseFloat(intradayObject[key]["4. close"]).toFixed(2)
        }
        recentDate = key > recentDate ? key : recentDate

        data.push(intradayObject[key]["4. close"])
        labels.push(intradayObject[key])
    }

    console.log(data[0])
    console.log(ticker)
    const initialPrice = data ? data[data.length - 1] : 0
    const endPrice = data ? data[0] : 0

    //* Build chart data
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data.reverse(),
                fill: false,
                borderWidth: .5,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: endPrice > initialPrice ? "#AFC23F" : "#e7545f",
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
            >
                <BuyPriceHFour>{data.length ? `$${buyPrice}` : "Loading..."}</BuyPriceHFour>
            </Dropdown>
        </TickerDiv>
    )
}

export default ListItem

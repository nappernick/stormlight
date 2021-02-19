import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Line } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import _ from 'lodash'
import { removeIntraDay } from '../../../store/intraday';
import { updateBuyingPowerThunk } from '../../../store/buyingPower';
import { currentPriceApi, intradayfetchapi } from '../../../utils';
import "./ListItem.css"



//* Styled components
const TickerDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 180px;
    `
const ChartDiv = styled.div`
    height: 30px;
    width: 30px;
    `
const BuyPriceHFour = styled.h4`

    `

function ListItem({ ticker }) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const intraday = useSelector(state => state.intraday)
    const stocks = useSelector(store => store.stock)
    const buyingPower = useSelector(store => store.buyingPower)
    const watchlistItem = !Object.keys(stocks).includes(ticker) ? true : false
    const [watchlistIntraday, setWatchlistIntraday] = useState({})

    //* Sell stock dropdown on hover functions
    function onSelect() {
        dispatch(removeIntraDay(userId, ticker, stocks[ticker]["numStock"], buyingPower[userId]["dollars"]))
        async function increaseBuyPower() {
            let price = parseFloat(await currentPriceApi(ticker.toUpperCase()))
            let numStock = parseInt(stocks[ticker].numStock)
            let buyPowDollars = parseFloat(buyingPower[userId].dollars)
            let newDollars = buyPowDollars + (price * numStock)
            dispatch(updateBuyingPowerThunk(userId, newDollars))
        }
        increaseBuyPower()
    }

    const menuCallback = () => {
        if (!watchlistItem) return <Menu onSelect={onSelect}>
            <MenuItem style={{ cursor: "pointer" }} key="2">{`Sell ${ticker}?`}</MenuItem>
        </Menu>
        else return <></>
    };

    useEffect(() => {
        const watchlistFetchIntraday = async () => {
            let res = await intradayfetchapi(ticker, "15min")
            let stockData = res.data.stock["Time Series (15min)"]
            let obj = {}
            for (let property in stockData) {
                let event = stockData[property]
                obj[property] = event
            }
            setWatchlistIntraday(obj)
        }
        if (watchlistItem && _.isEmpty(watchlistIntraday)) {
            watchlistFetchIntraday()
        }
    }, [watchlistItem])
    //* Build the array of data for chart:
    let data = [];
    let labels = [];
    let recentDate = "2020-01-01 00:00:01";
    let buyPrice = 0
    let intradayObject = {};
    if (!watchlistItem) {
        if (intraday.length) intraday.flatMap(el => {
            const tickerArr = Object.keys(el)
            if (ticker === tickerArr[0]) Object.assign(intradayObject, { ...Object.values(el)[0] })
            return null
        })
        // console.log("INTRADAY", intradayObject)
        if (intradayObject && Object.keys(intradayObject)) for (let key in intradayObject) {
            if (key > recentDate) {
                recentDate = key;
                buyPrice = parseFloat(intradayObject[key]["4. close"]).toFixed(2)
            }
            recentDate = key > recentDate ? key : recentDate

            data.push(intradayObject[key]["4. close"])
            labels.push(intradayObject[key])
        }
        // console.log("NORMAL DATA", data)
    }
    else {
        // console.log("WL INTRADAY", watchlistIntraday)
        if (watchlistIntraday && Object.keys(watchlistIntraday)) for (let key in watchlistIntraday) {
            if (key > recentDate) {
                recentDate = key;
                buyPrice = parseFloat(watchlistIntraday[key]["4. close"]).toFixed(2)
            }
            recentDate = key > recentDate ? key : recentDate

            data.push(watchlistIntraday[key]["4. close"])
            labels.push(watchlistIntraday[key])
        }
        // console.log("NEW DATA", data)
    }

    const initialPrice = data ? data[data.length - 1] : 0
    const endPrice = data ? data[0] : 0

    //* Build chart data
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data.reverse(),
                fill: false,
                borderWidth: 1,
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

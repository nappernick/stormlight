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
import { removeFromWatchlist } from '../../../store/watchlist';
import { useHistory } from 'react-router-dom';

//* Styled components
const Container = styled.div`
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TickerDiv = styled.div`
    width: 180px;
    `
const ChartDiv = styled.div`
    height: 30px;
    width: 30px;
    `
const StockTickerH4 = styled.h4`
    cursor: pointer;
    `

function ListItem({ ticker }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const intraday = useSelector(state => state.intraday)
    const stocks = useSelector(store => store.stock)
    const watchlist = useSelector(store => store.watchlist)
    const buyingPower = useSelector(store => store.buyingPower)
    const [watchlistTickers, setWatchlistTickers] = useState([])
    let watchlistItem = watchlistTickers.length ? watchlistTickers.includes(ticker) ? true : false : null
    const [watchlistIntraday, setWatchlistIntraday] = useState({})

    //* Click on stock name forwards to stock detail page
    const handleStockClick = () => {
        return history.push(`/stock-detail/${ticker}`)
    }

    //* Sell stock dropdown on hover functions
    function onSelectStock() {
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
    //* Remove item from watchlist on hover click
    function onSelectWatchlist() {
        dispatch(removeFromWatchlist(userId, ticker))
        const rmTicker = watchlist.filter(el => el.ticker === ticker)
        setWatchlistTickers(rmTicker)
        watchlistItem = false
    }

    // * Dropdown menu options on stock price hover
    const menuCallback = () => {
        // If owned stock, return "sell" option
        if (!watchlistItem) return <Menu onSelect={onSelectStock}>
            <MenuItem style={{ cursor: "pointer" }} key="2">{`Sell ${ticker}?`}</MenuItem>
        </Menu>
        // If watched stock, return option to remove from watchlist
        else return <Menu onSelect={onSelectWatchlist}>
            <MenuItem style={{ cursor: "pointer" }} key="2">{`Remove ${ticker}?`}</MenuItem>
        </Menu>
    };

    //* Set intraday trading data for specific stock
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

    //* Create component friendly version of watchlist
    useEffect(() => {
        const tickers = watchlist.map(el => el.ticker)
        setWatchlistTickers(tickers)
    }, [])

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
        if (intradayObject && Object.keys(intradayObject)) for (let key in intradayObject) {
            if (key > recentDate) {
                recentDate = key;
                buyPrice = parseFloat(intradayObject[key]["4. close"]).toFixed(2)
            }
            recentDate = key > recentDate ? key : recentDate

            data.push(intradayObject[key]["4. close"])
            labels.push(intradayObject[key])
        }
    }
    else {
        if (watchlistIntraday && Object.keys(watchlistIntraday)) for (let key in watchlistIntraday) {
            if (key > recentDate) {
                recentDate = key;
                buyPrice = parseFloat(watchlistIntraday[key]["4. close"]).toFixed(2)
            }
            recentDate = key > recentDate ? key : recentDate
            data.push(watchlistIntraday[key]["4. close"])
            labels.push(watchlistIntraday[key])
        }
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
        tooltips: { enabled: false },
        hover: { mode: null },
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
            <Container>
                <StockTickerH4
                    onClick={handleStockClick}
                >{ticker}</StockTickerH4>
                <ChartDiv>
                    <Line data={chartData} options={options} height={250} width={250} />
                </ChartDiv>
                <Dropdown
                    trigger={['hover']}
                    overlay={menuCallback}
                    animation="slide-up"
                >
                    <h4>{data.length ? `$${buyPrice}` : "Loading..."}</h4>
                </Dropdown>
            </Container>
        </TickerDiv>
    )
}

export default ListItem

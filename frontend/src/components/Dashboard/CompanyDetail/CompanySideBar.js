import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { removeIntraDay } from '../../../store/intraday'
import { addToWatchlist, removeFromWatchlist } from '../../../store/watchlist'
import { buyStockAggregator, currentPriceApi } from '../../../utils'
import "./CompanyDetail.css"

const SideBarDiv = styled.div``

function CompanySideBar() {
    const dispatch = useDispatch()
    const { stockTicker } = useParams()
    const userId = useSelector(state => state.session.user.id)
    const stocks = useSelector(store => store.stock)
    const buyingPower = useSelector(store => store.buyingPower)
    const watchlist = useSelector(store => store.watchlist)
    const [numShares, setNumShares] = useState(0)
    const [marketPrice, setMarketPrice] = useState(0)
    const [isOwned, setIsOwned] = useState(false)
    const [isWatched, setIsWatched] = useState(false)
    const [errors, setErrors] = useState([])



    const handleSale = async () => {
        dispatch(removeIntraDay(userId, stockTicker, stocks[stockTicker]["numStock"], buyingPower[userId]["dollars"]))
        setIsOwned(false)
    }
    const handleRemoveWL = async () => {
        setIsWatched(false)
        dispatch(removeFromWatchlist(userId, stockTicker))
    }
    const handleAddWL = async () => {
        setIsWatched(true)
        dispatch(addToWatchlist(userId, stockTicker))
    }
    const handlePurchase = async () => {
        setNumShares(0)
        await buyStockAggregator(stockTicker, numShares, parseFloat(marketPrice),
            userId, parseFloat(buyingPower[userId].dollars), stocks, setErrors, dispatch)
    }

    useEffect(() => {
        async function fetchPrice() {
            let price = await currentPriceApi(stockTicker.toUpperCase())
            if (price) setMarketPrice(price.toFixed(2))
        }
        if (marketPrice === 0) fetchPrice()

    }, [stockTicker])

    useEffect(() => {
        if (Object.keys(stocks).includes(stockTicker)) setIsOwned(true)
        if (watchlist && watchlist.length) watchlist.forEach(item => {
            if (item && item.ticker === stockTicker) setIsWatched(true)
        })
    }, [stocks, watchlist])

    // console.log(isOwned)
    return (
        <SideBarDiv>
            <div className="side-bar-container">
                <div className="header">
                    Buy / Sell {stockTicker}
                </div>
                <div className="purchase-details">
                    <div className="shares flex">
                        <div className="shares-title title">
                            Shares
                        </div>
                        <div className="shares-input value">
                            <input
                                type="number"
                                value={numShares}
                                onChange={(e) => setNumShares(parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="market-price flex">
                        <div className="market-price-title title">
                            Market Price
                        </div>
                        <div className="market-price-value value">
                            {marketPrice ? `$${marketPrice}` : "Loading..."}
                        </div>
                    </div>
                    <div className="hr"></div>
                    <div className="estimated-cost flex">
                        <div className="estimated-cost-title title">
                            Estimated Cost
                        </div>
                        <div className="estimated-cost-value value">
                            {numShares ? `$${(numShares * marketPrice).toFixed(2)}` : ""}
                        </div>
                    </div>
                </div>
                <div className="interactions">
                    <div className="purchase">
                        <button
                            className="purchase__btn"
                            onClick={handlePurchase}
                            disabled={numShares ? false : true}
                        >Purchase</button>
                    </div>
                    <div className={isOwned ? "sell-stock" : "invisible"}>
                        <button
                            className="sell__btn"
                            onClick={handleSale}
                        >Sell Stock</button>
                    </div>
                    <div className="buying-power">
                        <div className="buying_power__number">
                            <NumberFormat
                                // style={{ marginLeft: '10px' }}
                                value={buyingPower ? buyingPower[userId].dollars : null}
                                displayType={'text'}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                thousandSeparator={true}
                                prefix={'$'}
                                className="buying_power__number"
                            />
                        </div>
                        <div className="buying_power__text">Buying Power</div>
                    </div>
                    <div className="watch-list">
                        {isWatched ?
                            <button
                                className="remove_watchlist"
                                onClick={handleRemoveWL}
                            >
                                Don't Watch
                            </button>
                            :
                            <button
                                className="add_to_watchlist"
                                onClick={handleAddWL}
                            >
                                Watch
                            </button>
                        }
                    </div>
                </div>
            </div>
        </SideBarDiv>
    )
}

export default CompanySideBar

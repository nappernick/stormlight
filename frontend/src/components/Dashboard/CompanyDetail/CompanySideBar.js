import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { removeIntraDay } from '../../../store/intraday'
import { addToWatchlist, removeFromWatchlist } from '../../../store/watchlist'
import { currentPriceApi } from '../../../utils'

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

    const handleSale = async () => dispatch(removeIntraDay(userId, stockTicker))
    const handleRemoveWL = async () => {
        setIsWatched(false)
        dispatch(removeFromWatchlist(userId, stockTicker))
    }
    const handleAddWL = async () => {
        setIsWatched(true)
        dispatch(addToWatchlist(userId, stockTicker))
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
                    Buy {stockTicker}
                </div>
                <div className="purchase-details">
                    <div className="shares flex">
                        <div className="shares-title">
                            Shares
                        </div>
                        <div className="shares-input">
                            <input
                                type="number"
                                value={numShares}
                                onChange={(e) => setNumShares(parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="market-price flex">
                        <div className="market-price-title">
                            Market Price
                        </div>
                        <div className="market-price-value">
                            {marketPrice ? `$${marketPrice}` : "Loading..."}
                        </div>
                    </div>
                    <div className="estimated-cost flex">
                        <div className="estimated-cost-title">
                            Estimated Cost
                        </div>
                        <div className="estimated-cost-value">
                            {numShares ? `$${(numShares * marketPrice).toFixed(2)}` : ""}
                        </div>
                    </div>
                </div>
                <div className="interactions">
                    <div className="purchase">

                    </div>
                    <div className="sell-stock">
                        {isOwned ? <div
                            className="sell-stock"
                            onClick={handleSale}
                        >Sell Stock</div> : ""}
                    </div>
                    <div className="buying-power">
                        ${parseFloat(buyingPower[userId].dollars).toFixed(2)} Buying Power Available
                    </div>
                    <div className="watch-list">
                        {isWatched ?
                            <div
                                className="remove_watchlist"
                                onClick={handleRemoveWL}
                            >
                                Remove from Watchlist
                            </div>
                            :
                            <div
                                className="add_to_watchlist"
                                onClick={handleAddWL}
                            >
                                Add to Watchlist
                            </div>
                        }
                    </div>
                </div>
            </div>
        </SideBarDiv>
    )
}

export default CompanySideBar

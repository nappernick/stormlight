import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPriceApi, buyStockAggregator } from "../../utils";
import { updateStockNum } from "../../store/stocks"
import "./PurchaseModal.css"
import { updateDataForIntraday } from "../../store/intraday";
import { updateBuyingPowerThunk } from "../../store/buyingPower";

function Purchase({ closeModal }) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const stocks = useSelector(state => state.stock)
    const buyingPower = useSelector(store => store.buyingPower)
    const [ticker, setTicker] = useState('')
    const [buyPrice, setBuyPrice] = useState(0)
    const [numStock, setNumStock] = useState('')
    const [errors, setErrors] = useState([])

    const handleTickerChange = async (e) => {
        setTicker(e.target.value.toUpperCase())
        setErrors([])
        let price
        if (e.target.value.length) {
            try {
                price = await currentPriceApi(e.target.value.toUpperCase())
            } catch (error) {
                setErrors(["You must enter a valid ticker"])
            }
        }
        if (parseFloat(e.target.value)) setErrors(["You must enter a valid ticker"])
        if (price && !errors.length) setBuyPrice(price)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        await buyStockAggregator(ticker, parseInt(numStock, 10), parseFloat(buyPrice), userId, parseFloat(buyingPower[userId].dollars), stocks, setErrors, dispatch)
        if (!errors.length) closeModal()
    }

    const handleNumStockChange = (e) => setNumStock(e.target.value)

    return (
        <div className="modal-interior">
            <div>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </div>
            <h2>Purchase Stock</h2>
            <form
                action="/api/stocks"
                method="post"
                onSubmit={handleSubmit}
            >
                <div className="form-interior">
                    <input
                        placeholder='Stock ticker, i.e. "AAPL"'
                        value={ticker}
                        onChange={handleTickerChange}
                    />
                    <div className="buy-price">Current Buy Price: ${buyPrice.length === 0 || ticker.length === 0 ? 0 : buyPrice.toFixed(2)}</div>
                    <input
                        placeholder='Number of Shares to purchase'
                        value={numStock}
                        onChange={handleNumStockChange}
                    />
                    <button
                        className="modal-button"
                        type="submit"
                    >
                        {numStock && buyPrice ?
                            `$${numStock && buyPrice ? (numStock * buyPrice).toFixed(2) : 0}` :
                            'Purchase'
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Purchase;

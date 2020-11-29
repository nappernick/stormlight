import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPriceApi } from "../../utils";
import { purchaseStock } from "../../store/stocks"
import "./PurchaseModal.css"
import { fetch } from "../../store/csrf";
import { addIntraDay } from "../../store/intraday";

function Purchase({ closeModal }) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const [ticker, setTicker] = useState('')
    const [buyPrice, setBuyPrice] = useState(0)
    const [numStock, setNumStock] = useState('')
    const [errors, setErrors] = useState([])

    const handleTickerChange = async (e) => {
        setTicker(e.target.value)
        let price = await currentPriceApi(e.target.value)
        // ! Setting the buy price to an old state value.. not sure why
        if (price) setBuyPrice(price)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        dispatch(purchaseStock(ticker, parseInt(numStock, 10), buyPrice, userId))
            .then((res) => console.log(res))
            .catch((res) => { if (res.data && res.data.errors) setErrors(res.data.errors) });
        dispatch(addIntraDay(userId, ticker))
            .then((res) => console.log(res))
            .catch((res) => { if (res.data && res.data.errors) setErrors(res.data.errors) });
        if (!errors.length) closeModal()
        // setTimeout(() => {if (!errors.length) closeModal()}, 500)

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
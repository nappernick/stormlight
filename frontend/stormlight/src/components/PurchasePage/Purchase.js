import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { currentPrice } from "../../utils";
function Purchase({ closeModal }) {
    const dispatch = useDispatch()
    const [ticker, setTicker] = useState('')
    const [buyPrice, setBuyPrice] = useState(0)

    const handleChange = async (e) => {
        setTicker(e.target.value)
        let price = await currentPrice(e.target.value)
        // ! Setting the buy price to an old state value.. not sure why
        if (price) setBuyPrice(price.c)
    }


    return (
        <div className="modal-interior">
            <h2>Purchase Stock</h2>
            <form>
                <div className="form-interior">
                    <input
                        placeholder='Stock ticker, i.e. "AAPL"'
                        value={ticker}
                        onChange={handleChange}
                    />
                    <div className="buy-price">${buyPrice}</div>
                    <input />
                    <button className="modal-button" onClick={closeModal}>Purchase</button>
                </div>
            </form>
        </div>
    )
}

export default Purchase;

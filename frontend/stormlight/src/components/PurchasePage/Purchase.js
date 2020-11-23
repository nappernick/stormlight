import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function Purchase({ closeModal }) {
    const dispatch = useDispatch()

    return (
        <div>
            <h2>Purchase Stock</h2>
            <form>
                <input placeholder='Stock ticker, i.e. "AAPL"' />
                <input />
                <input />
                <button onClick={closeModal}>close</button>
            </form>
        </div>
    )
}

export default Purchase;

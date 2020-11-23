import React from 'react';
import { currentPrice } from "../utils"
import { fetch } from "./csrf.js"

const SET_PURCHASE = "purchase/setPurchase"

export const setPurchase = (ticker, numStock, buyPrice, userId) => {
    return {
        type: SET_PURCHASE,
        payload: {
            ticker,
            numStock,
            buyPrice,
            userId,
        }
    }
}

export const purchaseStock = (ticker, numStock) => async (dispatch) => {
    let buyPrice = await currentPrice(ticker)
    // console.log(buyPrice)
    const sessionUserId = React.useSelector(state => state.session.user.id)
    // console.log(sessionUserId)
    const res = await fetch("api/purchase", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            ticker,
            numStock,
            sessionUserId,
            buyPrice,
        })
    })
    if (!res.data.errors) dispatch(setPurchase(ticker, numStock, buyPrice, sessionUserId))
    dispatch(setPurchase(ticker, numStock, buyPrice, sessionUserId))
}

const purchaseReducer = (state = { purchase: {} }, action) => {
    switch (action.type) {
        case SET_PURCHASE:
            return { ...state, purchase: action.payload }
        default:
            return state
    }
}
// purchaseStock("AAPL", 1)

export default purchaseReducer;

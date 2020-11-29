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

export const purchaseStock = (ticker, numStock, buyPrice, userId) => async (dispatch) => {
    const data = JSON.stringify({ ticker, numStock, buyPrice, userId })
    const res = await fetch("/api/stocks", {
        method: "POST",
        body: data
    })

    if (!res.data.errors) dispatch(setPurchase(ticker, numStock, buyPrice, userId))
    return res
}

const purchaseReducer = (state = { purchase: {} }, action) => {
    switch (action.type) {
        case SET_PURCHASE:
            return { ...state, purchase: action.payload }
        default:
            return state
    }
}

export default purchaseReducer;

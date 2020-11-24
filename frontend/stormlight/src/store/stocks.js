import { fetch } from "./csrf.js"

const SET_STOCK = "stocks/setStock"

export const setStock = (ticker, numStock, buyPrice, userId) => {
    return {
        type: SET_STOCK,
        payload: {
            ticker,
            numStock,
            buyPrice,
            userId,
        }
    }
}

export const initializeStock = (userId) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${userId}`)
    console.log(res)
    console.log("here")
    // if (!res.data.errors) dispatch(setStock(ticker, numStock, buyPrice, userId))
    console.log(res.data.errors)
    return res
}

export const purchaseStock = (ticker, numStock, buyPrice, userId) => async (dispatch) => {
    console.log(ticker, numStock, buyPrice, userId)
    const data = JSON.stringify({ ticker, numStock, buyPrice, userId })
    const res = await fetch("/api/stocks", {
        method: "POST",
        body: data
    })

    if (!res.data.errors) dispatch(setStock(ticker, numStock, buyPrice, userId))
    console.log(res.data.errors)
    return res
}

const stockReducer = (state = { purchase: {} }, action) => {
    switch (action.type) {
        case SET_STOCK:
            return { ...state, purchase: action.payload }
        default:
            return state
    }
}

export default stockReducer;

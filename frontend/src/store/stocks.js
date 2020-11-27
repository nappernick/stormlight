import { intraDayFetch } from "../utils.js"
import { fetch } from "./csrf.js"

const SET_STOCK = "stocks/setStock"

export const setStock = (ticker, numStock, userId) => {
    return {
        type: SET_STOCK,
        payload: {
            ticker,
            numStock,
            userId,
        }
    }
}

export const initializeStock = (userId) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${userId}`)
    const stockObj = { ...Object.values(res.data["stock"]) }
    if (!res.data.errors) Object.values(stockObj).forEach(async (stock) => {
        const { ticker, numStock, userId } = stock
        dispatch(setStock(ticker, numStock, userId))
    })
    return res
}

export const purchaseStock = (ticker, numStock, buyPrice, userId) => async (dispatch) => {
    const data = JSON.stringify({ ticker, numStock, buyPrice, userId })
    const res = await fetch("/api/stocks", {
        method: "POST",
        body: data
    })

    if (!res.data.errors) dispatch(setStock(ticker, numStock, userId))
    return res
}

const stockReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_STOCK:
            return {
                ...state,
                [action.payload.ticker]: action.payload, 
            }
            // return Object.assign(state, { [action.payload.ticker]: action.payload })
        // case SET_INTRADAY:
        //     return {
        //         ...state,
        //         intraday: {
        //             ...state.intraday,
        //             action.payload
        //         }
        //     }
        //     return Object.assign(state.intraday, { action.payload })
        default:
            return state
    }
}

export default stockReducer;

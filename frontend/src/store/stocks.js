import { fetch } from "./csrf.js"
import { addIntraDay } from "./intraday.js"
import { omit } from "lodash"

const SET_STOCK = "stocks/setStock"
const UNSET_STOCK = "stocks/unSetStock"
const UPDATE_STOCK = "stocks/updateStock"

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

export const unsetStock = (ticker) => {
    return {
        type: UNSET_STOCK,
        payload: ticker,
    }
}

export const updateStock = (ticker, numStock, userId) => {
    return {
        type: UPDATE_STOCK,
        payload: {
            ticker,
            numStock,
            userId,
        }
    }
}

export const updateStockNum = (ticker, numStock, buyPrice, userId) => async (dispatch) => {
    const data = JSON.stringify({ ticker, numStock, buyPrice, userId })
    const res = await fetch(`/api/stocks/${userId}`, {
        method: "PUT",
        body: data
    })
    dispatch(updateStock(ticker, numStock, userId))
    if (!res.data.errors) return res
    else return res.data.errors
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

    if (!res.data.errors) {
        dispatch(setStock(ticker, numStock, userId))
        dispatch(addIntraDay(userId, ticker))
    }
    return res
}

const stockReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_STOCK:
            return {
                ...state,
                [action.payload.ticker]: action.payload,
            }
        case UNSET_STOCK:
            return omit(state, action.payload)
        case UPDATE_STOCK:
            let { [action.payload.ticker]: { ["numStock"]: numStock } } = state
            return {
                ...state,
                [action.payload.ticker]: {
                    ["ticker"]: action.payload.ticker,
                    ["userid"]: action.payload.userId,
                    ["numStock"]: parseFloat(numStock) + parseFloat(action.payload.numStock)
                },
            }
        default:
            return state
    }
}

export default stockReducer;

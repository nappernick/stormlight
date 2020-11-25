import { intraDayFetch } from "../utils.js"
import { fetch } from "./csrf.js"

const SET_INTRADAY = "stocks/setIntraDay"

export const setIntraDay = (intraDayArray) => {
    return {
        type: SET_INTRADAY,
        payload: intraDayArray,
    }
}

export const initializeIntraDay = (userId, interval) => async (dispatch) => {
    if (!interval) interval = "15min"
    const res = await fetch(`/api/stocks/${userId}`)
    const stockObj = { ...Object.values(res.data["stock"]) }
    if (!res.data.errors) Object.values(stockObj).forEach(async (stock) => {
        const { ticker } = stock
        const intraDay = await intraDayFetch(ticker, interval)
        dispatch(setIntraDay({ [ticker]: intraDay[`Time Series (${interval})`] }))
    })
}

const intradayReducer = (state = [], action) => {
    switch (action.type) {
        case SET_INTRADAY:
            return [...state, action.payload]
        default:
            return state
    }
}

export default intradayReducer;

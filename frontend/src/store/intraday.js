import { intraDayFetch, intradayfetchapi } from "../utils.js"
import { fetch } from "./csrf.js"

const SET_INTRADAY = "stocks/setIntraDay"

export const setIntraDay = (intraDayArray) => {
    return {
        type: SET_INTRADAY,
        payload: intraDayArray,
    }
}

export const addIntraDay = (userId, tickerr, interval) => async (dispatch) => {
    if (!interval) interval = "15min"
    const res = await fetch(`/api/stocks/${userId}`)
    const stockObj = { ...Object.values(res.data["stock"]) }
    if (!res.data.errors) Object.values(stockObj).forEach(async (stock) => {
        const { ticker } = stock
        if (tickerr === ticker) {
            const intraDay = await intradayfetchapi(ticker, interval)
            dispatch(setIntraDay({ [ticker]: intraDay.data.stock[`Time Series (${interval})`] }))
        }
    })
}

export const initializeIntraDay = (userId, interval) => async (dispatch) => {
    if (!interval) interval = "15min"
    const res = await fetch(`/api/stocks/${userId}`)
    const stockObj = { ...Object.values(res.data["stock"]) }
    if (!res.data.errors) Object.values(stockObj).forEach(async (stock) => {
        const { ticker } = stock
        const intraDay = await intradayfetchapi(ticker, interval)
        dispatch(setIntraDay({ [ticker]: intraDay.data.stock[`Time Series (${interval})`] }))
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

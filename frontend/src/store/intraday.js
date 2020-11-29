import { intradayfetchapi } from "../utils.js"
import { fetch } from "./csrf.js"
import { unsetStock } from "./stocks.js"

const SET_INTRADAY = "stocks/setIntraDay"
const UNSET_INTRADAY = "stocks/removeIntraDay"

export const setIntraDay = (intraDayArray) => {
    return {
        type: SET_INTRADAY,
        payload: intraDayArray,
    }
}

export const unsetIntraDay = (ticker) => {
    return {
        type: UNSET_INTRADAY,
        payload: ticker,
    }
}

export const removeIntraDay = (userId, ticker) => async (dispatch) => {
    dispatch(unsetIntraDay(ticker))
    dispatch(unsetStock(ticker))
    await fetch(`api/stocks/${userId}/${ticker}`, {
        method: "DELETE",
    })
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
            let setIndex = state.findIndex(el => Object.keys(el)[0] === Object.keys(action.payload)[0]);
            if (setIndex === -1) {
                return [...state, action.payload];
            }
            return state
        case UNSET_INTRADAY:
            let unsetIndex = state.findIndex(el => Object.keys(el)[0] === action.payload);
            return [
                ...state.slice(0, unsetIndex),
                ...state.slice(unsetIndex + 1)
            ]
        default:
            return state
    }
}

export default intradayReducer;

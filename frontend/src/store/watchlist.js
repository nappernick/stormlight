import { omit } from "lodash"
import { fetch } from "./csrf.js"

const SET_WATCHLIST = "watchlist/setWatchlist"
const ADD_WATCHLIST = "watchlist/addWatchlist"
const REMOVE_WATCHLIST = "watchlist/removeWatchlist"

const setWatchlist = (watchlist) => {
    return {
        type: SET_WATCHLIST,
        payload: {
            watchlist
        }
    }
}

const addWatchlist = (item) => {
    return {
        type: ADD_WATCHLIST,
        payload: {
            item
        }
    }
}

const removeWatchlist = (item) => {
    return {
        type: REMOVE_WATCHLIST,
        payload: {
            item
        }
    }
}


export const initializeWatchlist = (userId) => async (dispatch) => {
    const watchlist = await fetch(`/api/watchlist/user/${userId}`)
    if (!watchlist.data.errors) return dispatch(setWatchlist(watchlist.data.watchList))
    else return watchlist.data.errors
}

export const addToWatchlist = (userId, ticker) => async (dispatch) => {
    const watchlist = await fetch(`/api/watchlist/user/${userId}/ticker/${ticker}`, {
        method: "POST"
    })
    if (!watchlist.data.errors) return dispatch(addWatchlist(watchlist.data["watchList"]))
    else return watchlist.data.errors
}

export const removeFromWatchlist = (userId, ticker) => async (dispatch) => {
    const watchlist = await fetch(`/api/watchlist/user/${userId}/ticker/${ticker}`, {
        method: "DELETE"
    })
    if (!watchlist.data.errors) return dispatch(removeWatchlist(watchlist.data.toDelete))
    else return watchlist.data.errors
}


const watchlistReducer = (state = [], action) => {
    switch (action.type) {
        case SET_WATCHLIST:
            return [...action.payload.watchlist]
        case ADD_WATCHLIST:
            return [...state, action.payload.item]
        case REMOVE_WATCHLIST:
            let unsetIndex = state.findIndex((el, index) => {
                if (el && el.id === action.payload.item["id"]) return index
            });
            return [
                ...state.slice(0, unsetIndex),
                ...state.slice(unsetIndex + 1)
            ]
        default:
            return state
    }
}

export default watchlistReducer;

import { fetch } from "./csrf.js"

const SET_BUYING_POWER = "buyingPower/setBuyingPower"
const UPDATE_BUYING_POWER = "buyingPower/updateBuyingPower"

const setBuyingPower = (buyingPower, userId) => {
    return {
        type: SET_BUYING_POWER,
        payload: {
            userId,
            buyingPower,
        }
    }
}

const updateBuyingPower = (dollars, userId) => {
    return {
        type: UPDATE_BUYING_POWER,
        payload: {
            userId,
            dollars,
        }
    }
}

export const initializeBuyingPower = (userId) => async (dispatch) => {
    const buyPow = await fetch(`/api/buying-power/${userId}`)
    if (!buyPow.data.errors) return dispatch(setBuyingPower(buyPow.data.buyPow, userId))
    else return buyPow.data.errors
}

export const updateBuyingPowerThunk = (userId, newDollars) => async (dispatch) => {
    const res = await fetch(`/api/buying-power/${userId}`, {
        method: "PUT",
        body: JSON.stringify({ dollars: parseFloat(newDollars) })
    })
    // console.log(newDollars)
    if (!res.data.errors) return dispatch(updateBuyingPower(newDollars, userId))
    else return res.data.errors

}


const buyingPowerReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_BUYING_POWER:
            return {
                [action.payload.userId]: {
                    ["dollars"]: parseFloat(action.payload.buyingPower.dollars).toFixed(2)
                }
            }
        case UPDATE_BUYING_POWER:
            return {
                ...state,
                [action.payload.userId]: {
                    ["dollars"]: parseFloat(action.payload.dollars).toFixed(2)
                }
            }
        default:
            return state
    }
}

export default buyingPowerReducer;

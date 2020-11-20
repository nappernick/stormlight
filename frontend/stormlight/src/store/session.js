import { fetch } from "./csrf"

const SET_USER = "session/setUser"
const REMOVE_USER = "session/removeUser"


const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const login = (userr) => async (dispatch) => {
    const { credential, password } = userr;
    let res = await fetch('/api/session', {
        method: "POST",
        body: JSON.stringify({
            credential,
            password,
        })
    })
    const { data: user } = res
    dispatch(setUser(user))
    return res
}

export const signup = (userr) => async (dispatch) => {
    const { email, username, password } = userr;
    let res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ email, username, password })
    })
    const { data: user } = res
    dispatch(setUser(user))
    return res;
}

export const remove = () => async (dispatch) => {
    let res = await fetch('/api/session', {
        method: "DELETE"
    })
    dispatch(removeUser())
    return res;
}

export const restore = () => async (dispatch) => {
    const res = await fetch('/api/session')
    const { data: user } = res
    dispatch(setUser(user))
    return res
}

const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, state, {
                user: action.payload
            })
        case REMOVE_USER:
            let newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state
    }

}

export default sessionReducer;

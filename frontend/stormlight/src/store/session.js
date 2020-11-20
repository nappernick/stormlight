import { fetch } from "./csrf"

const SET_USER = "session/setUser"
const REMOVE_USER = "session/removeUser"


const setUser = (user) => {
    return {
        type: SET_USER,
        user
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
    // const { data: user } = res
    if (res.data.user) dispatch(setUser(res.data.user))
}

export const signup = (userr) => async (dispatch) => {
    const { email, username, password } = userr;
    let res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ email, username, password })
    })
    // const { data: user } = res
    dispatch(setUser(res.data.user))
    return res;
}

export const remove = () => async (dispatch) => {
    let res = await fetch('/api/session', {
        method: "DELETE"
    })
    dispatch(removeUser())
}

export const restore = () => async (dispatch) => {
    const res = await fetch('/api/session')
    const { data: user } = res
    dispatch(setUser(user))
}

const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case REMOVE_USER:
            return { ...state, user: null }
        default:
            return state
    }

}

export default sessionReducer;

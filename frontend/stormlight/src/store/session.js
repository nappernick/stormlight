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
}

const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, state, {
                user: action.payload
            })
        case REMOVE_USER:
            return Object.assign({}, state, {
                user: null,
            })
        default:
            return state
    }

}

export default sessionReducer;

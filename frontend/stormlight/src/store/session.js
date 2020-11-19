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

export const login = (user) => async (dispatch) => {
    const { credentials, password } = user;
    let res = await fetch('/api/session', {
        method: "POST",
        body: {
            credentials,
            password
        }
    })
    const { data: user } = res
    dispatch(setUser(user))
}

const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:

        default:
            return state
    }

}

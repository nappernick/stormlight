const LOADED = "loaded/loaded"

const loaded = () => {
    return {
        type: LOADED
    }
}

export const load = () => (dispatch) => {
    dispatch(loaded())
}
const loadedReducer = (state = { loaded: false }, action) => {
    switch (action.type) {
        case LOADED:
            return { ...state, loaded: true }
        default:
            return state 
    }

}

export default loadedReducer;

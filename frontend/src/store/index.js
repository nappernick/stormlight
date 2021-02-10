import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import sessionReducer from "./session"
import loadedReducer from "./isLoaded"
import stockReducer from "./stocks"
import intradayReducer from "./intraday"
import intradayDataReducer from "./intradayData"
import newsReducer from "./news"

// const USER_LOGOUT = "userLogout"

// export const userLogout = () => {
//     return {
//         type: USER_LOGOUT,
//     }
// }

// const appReducer = combineReducers({
//     session: sessionReducer,
//     loaded: loadedReducer,
//     stock: stockReducer,
//     intraday: intradayReducer,
// })

const rootReducer = combineReducers({
    session: sessionReducer,
    loaded: loadedReducer,
    stock: stockReducer,
    intraday: intradayReducer,
    intradayData: intradayDataReducer,
    news: newsReducer,
})
// const rootReducer = (state, action) => {
//     if (action.type === 'USER_LOGOUT') {
//         state = {
//             session: { user: null },
//             loaded: false,
//             stock: {},
//             intraday: [],
//         }
//     }

//     return appReducer(state, action)
// }

let enhancer;

if (process.env.NODE_ENV === 'production') enhancer = applyMiddleware(thunk)
else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore;

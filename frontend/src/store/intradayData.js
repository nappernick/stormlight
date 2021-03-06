

const SET_INTRADAYDATA = "intradayData/setIntradayDaya"

export const setIntradayData = (intradayDataObj) => {
    return {
        type: SET_INTRADAYDATA,
        payload: intradayDataObj,
    }
}

const normalizeData = (checkObj, closeObj, tickers) => {
    let countTickers = tickers.length
    for (let key in checkObj) {
        // remove data points where we don't have all the necessary data
        if (checkObj[key] !== countTickers) delete closeObj[key]
    }
    return closeObj
}

export const createIntradaData = (intraDay, numOfStocks) => async (dispatch) => {
    let stockArr = intraDay
    // Object with all data to be returned
    let closeObj = {}
    // Object to check for data completeness
    let checkObj = {}
    // Build list of stock tickers to use in traversing intraDay data
    let tickers = []

    stockArr.length && stockArr.forEach(ele => {
        for (let key in ele) {
            let ticker = key
            if (!tickers.includes(ticker)) tickers.push(ticker)
            if (!numOfStocks[ticker]) return
            for (let innerKey in ele[ticker]) {
                let inner = parseFloat(ele[ticker][innerKey]["4. close"])
                let stockPrice = numOfStocks[ticker]
                let stockTotal = (inner * stockPrice).toFixed(2)
                // if the stock exists in the object already, add to the total
                if (closeObj[innerKey]) closeObj[innerKey] = (parseFloat(closeObj[innerKey]) + parseFloat(stockTotal)).toFixed(2)
                else closeObj[innerKey] = stockTotal;
                // Increment the check object's count of stocks at that ticker
                if (checkObj[innerKey]) checkObj[innerKey]++
                else checkObj[innerKey] = 1
            }

        }

    })
    normalizeData(checkObj, closeObj, tickers)
    // If the closeObj has data, dispatch it to Redux store
    if (Object.values(closeObj).length) dispatch(setIntradayData(closeObj))
}


const intradayDataReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_INTRADAYDATA:
            return {
                ...action.payload,
            }
        default:
            return state
    }
}

export default intradayDataReducer;

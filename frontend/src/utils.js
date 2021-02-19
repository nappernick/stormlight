import { updateBuyingPowerThunk } from "./store/buyingPower.js"
import { fetch as apiFetch } from "./store/csrf.js"
import { addIntraDay, updateDataForIntraday } from "./store/intraday.js"
import { purchaseStock, updateStockNum } from "./store/stocks.js"

export const currentPriceApi = async (ticker) => {
    let res = await apiFetch(`/api/stocks/${ticker}`)
    if (!res.data.test) res = await apiFetch(`/api/stocks/${ticker}`)
    let currentPrice = res.data.test ? res.data.test.c : new Error("Could not find that stock. Reload the page & try again.")
    return currentPrice;

}

export const intradayfetchapi = async (ticker, interval) => {
    let res = await apiFetch(`/api/stocks/${interval}/${ticker}`)
    return res
}

export const newsFetch = async () => {
    let res = await apiFetch(`/api/stocks/news/`)
    return res
}

export const formatAMPM = (date) => {
    let hours = date.getHours();
    hours = hours < 6 ? hours + 7 : hours - 5
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export const fetchCoData = async (setCompanyIntraDayData, ticker, interval) => {
    const intraDay = await intradayfetchapi(ticker, interval)
    const data = intraDay.data.stock[`Time Series (${interval})`]
    for (const date in data) {
        data[date] = data[date]["4. close"]
    }
    setCompanyIntraDayData(data)
}

export const buyStockAggregator = async (ticker, numStock, buyPrice, userId, dollars, stocks, setErrors, dispatch) => {
    if (!stocks[ticker]) {
        dispatch(purchaseStock(ticker, numStock, buyPrice, userId))
            .then(() => dispatch(addIntraDay(userId, ticker)))
            .then(() => dispatch(updateBuyingPowerThunk(userId, (dollars - (numStock * buyPrice)))))
            .catch((res) => { if (res.data && res.data.errors) setErrors(res.data.errors) });
        return
    } else {
        dispatch(updateStockNum(ticker, numStock, buyPrice, userId))
            .then(() => dispatch(updateDataForIntraday(ticker, userId)))
            .then(() => dispatch(updateBuyingPowerThunk(userId, (dollars - (numStock * buyPrice)))))
            .catch((res) => { if (res.data && res.data.errors) setErrors(res.data.errors) });
    }
}


// export const dailyCandle = async (ticker) => {
//     let currentTime = Math.round((new Date()).getTime() / 1000)
//     let res = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${currentTime - daySeconds}&to=${currentTime}&token=${api}`)
//     let json = await res.json()
//     if (json.s === "ok") return json
// }

// export const weeklyCandle = async (ticker) => {
//     let currentTime = Math.round((new Date()).getTime() / 1000)
//     let res = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=W&from=${currentTime - (daySeconds * 7)}&to=${currentTime}&token=${api}`)
//     let json = await res.json()
//     if (json.s === "ok") return json
// }

// export const monthlyCandle = async (ticker) => {
//     let currentTime = Math.round((new Date()).getTime() / 1000)
//     let res = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=M&from=${currentTime - (daySeconds * 30)}&to=${currentTime}&token=${api}`)
//     let json = await res.json()
//     if (json.s === "ok") return json
// }

// export const yearlyCandle = async (ticker) => {
//     let currentTime = Math.round((new Date()).getTime() / 1000)
//     let res = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=1&from=${currentTime - (daySeconds * 365)}&to=${currentTime}&token=${api}`)
//     let json = await res.json()
//     if (json.s === "ok") return json
// }

// export const candles = async (ticker, resolution) => {
//     let beginTime;
//     let currentTime = Math.round((new Date()).getTime() / 1000)
//     if (resolution.toUpperCase() === "D") beginTime = currentTime - daySeconds
//     if (resolution.toUpperCase() === "W") beginTime = currentTime - (daySeconds * 7)
//     if (resolution.toUpperCase() === "M") beginTime = currentTime - (daySeconds * 30)
//     if (resolution === 1) beginTime = currentTime - (daySeconds * 365)
//     let res = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=${resolution.toUpperCase()}&from=${beginTime}&to=${currentTime}&token=${api}`)
//     let json = await res.json()
//     if (json.s === "ok") return json
// }

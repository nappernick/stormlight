import { fetch as apiFetch } from "./store/csrf.js"

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

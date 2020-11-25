import fetch from 'cross-fetch';
// require('dotenv').config();
let finnHubApi = process.env.REACT_APP_FINHUB_API_KEY
let alphaApi = process.env.REACT_APP_ALPHA_API_KEY
// const daySeconds = 864000

export const currentPrice = async (ticker) => {
    let res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${finnHubApi}`)
    console.log(res)
    let json = await res.json()
    return json
}

export const intraDayFetch = async (ticker, interval) => {
    let res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}&outputsize=compact&apikey=${alphaApi}`)
    let json = await res.json()
    console.log(json)
    return json
}

export const polygonApi = async (ticker) => {
    const date = new Date().getDate() - 1
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    let res = await fetch(`https://api.polygon.io/v1/open-close/${ticker}/${year + "-" + month + "-" + date}?apiKey=`)
    let json = await res.json()
    console.log(json)
    return json
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

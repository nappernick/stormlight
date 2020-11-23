const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "" // Replace this
const finnhubClient = new finnhub.DefaultApi()

const daySeconds = 864000

export const currentPrice = (ticker) => {
    finnhubClient.quote(ticker, (error, data, response) => {
        return data
    });
}


export const dayCandleFetch = (ticker) => {
    let currentTime = Math.round((new Date()).getTime() / 1000)
    finnhubClient.stockCandles(ticker, "D", (currentTime - daySeconds), currentTime, {}, (error, data, response) => {
        console.log(data)
        return data
    })
};

export const weekCandleFetch = (ticker) => {
    let currentTime = Math.round((new Date()).getTime() / 1000)
    finnhubClient.stockCandles(ticker, "W", (currentTime - (daySeconds * 7)), currentTime, {}, (error, data, response) => {
        console.log(data)
        return data
    })
};

export const monthCandleFetch = (ticker) => {
    let currentTime = Math.round((new Date()).getTime() / 1000)
    finnhubClient.stockCandles(ticker, "M", (currentTime - (daySeconds * 30)), currentTime, {}, (error, data, response) => {
        console.log(data)
        return data
    })
};

currentPrice("TSLA")
// module.exports = { currentPrice, dayCandleFetch, weekCandleFetch, monthCandleFetch }

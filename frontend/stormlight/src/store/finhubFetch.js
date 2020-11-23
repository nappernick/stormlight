// import pkg from "finnhub"
// const { ApiClient, DefaultApi } = pkg
// const api_key = ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "buthc0f48v6qo71c7p50" // Replace this
// const finnhubClient = new DefaultApi()

// const daySeconds = 864000

// export const currentPrice = async (ticker) => {
//     finnhubClient.quote(ticker, (error, data, response) => {
//         console.log(data)
//         console.log(error)
//         return data
//     });
// }

// export const dayCandleFetch = (ticker) => {
//     let currentTime = Math.round((new Date()).getTime() / 1000)
//     finnhubClient.stockCandles(ticker, "D", (currentTime - daySeconds), currentTime, {}, (error, data, response) => {
//         console.log(data)
//         return data
//     })
// };

// export const weekCandleFetch = (ticker) => {
//     let currentTime = Math.round((new Date()).getTime() / 1000)
//     finnhubClient.stockCandles(ticker, "W", (currentTime - (daySeconds * 7)), currentTime, {}, (error, data, response) => {
//         console.log(data)
//         return data
//     })
// };

// export const monthCandleFetch = (ticker) => {
//     let currentTime = Math.round((new Date()).getTime() / 1000)
//     finnhubClient.stockCandles(ticker, "M", (currentTime - (daySeconds * 30)), currentTime, {}, (error, data, response) => {
//         console.log(data)
//         return data
//     })
// };

// // module.exports = { currentPrice, dayCandleFetch, weekCandleFetch, monthCandleFetch }

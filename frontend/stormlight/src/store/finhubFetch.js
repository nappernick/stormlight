const finnhub = require('finnhub');
require('dotenv').config()
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "" // Replace this
const finnhubClient = new finnhub.DefaultApi()
console.log(api_key)


const candleFetch = () => {
    let currentTime = Math.round((new Date()).getTime() / 1000)
    finnhubClient.stockCandles("AAPL", "W", (currentTime - 3369600), currentTime, {}, (error, data, response) => {
        console.log(data)
        return data
        // console.log(response)
        // if (count === 3) clearInterval(interval)
    })
}

let count = 0;
const interval = setInterval(() => {
    count++
    candleFetch()
    if (count === 5) clearInterval(interval)
}, 2000)

const finnhub = require('finnhub');
require('dotenv').config()
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "" // Replace this
const finnhubClient = new finnhub.DefaultApi()
console.log(api_key)

let currentTime = Math.round((new Date()).getTime() / 1000) - 172800
let dayBeforeTime = Math.round((new Date()).getTime() / 1000) - 259200
console.log(currentTime)
finnhubClient.stockCandles("AAPL", "D", currentTime, dayBeforeTime, {}, (error, data, response) => {
    console.log(data)
    // console.log(response)
    // if (count === 3) clearInterval(interval)
});

// let count = 0;
// const interval = setInterval(() => {
//     count++

// }, 2000)

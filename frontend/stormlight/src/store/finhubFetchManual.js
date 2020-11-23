import fetch from 'cross-fetch';
let api = ""

export const currentPrice = async (ticker) => {
    let res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${api}`)
    let json = await res.json()
    return json
}

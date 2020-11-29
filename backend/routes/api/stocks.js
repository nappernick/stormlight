const express = require("express");
const { apiConfig } = require("../../config");
const fetch = require("cross-fetch")
const asyncHandler = require("express-async-handler");
require('dotenv').config();
const { Stock } = require("../../db/models");
const { json } = require("express");

const { finnHubApi, alphaApi } = apiConfig

const router = express.Router()

router.post("/", asyncHandler(async (req, res, next) => {
    const { ticker, buyPrice, numStock, userId } = req.body
    const stock = await Stock.create({
        ticker,
        buyPrice,
        numStock,
        userId
    })
    return res.json({ stock, })
})
)

router.delete('/:id([0-9]+)/:ticker(\\w+)$', asyncHandler(async (req, res) => {
    const { ticker, id } = req.params;
    const toDelete = await Stock.findOne({
        where: {
            userId: id,
            ticker
        }
    })
    await Stock.destroy({
        where: {
            id: toDelete.dataValues.id
        }
    })
}))

router.get('/:id([0-9]+)', asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const stock = await Stock.findAll({ where: { userId: id } })
    return res.json({
        stock,
    })
}))

router.get("/:ticker(\\w+)$", asyncHandler(async (req, res) => {
    const { ticker } = req.params;
    let stocks = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${finnHubApi}`)
    let test = await stocks.json()
    return res.json({
        test,
    })
}))

router.get("/:interval(\\d{0,2})(\\w+)/:ticker(\\w+)$", asyncHandler(async (req, res) => {
    const { interval, ticker } = req.params;
    let rez = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}min&outputsize=compact&apikey=${alphaApi}`)
    let stock = await rez.json()
    return res.json({
        stock,
    })
}))

module.exports = router;

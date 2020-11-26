const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
require('dotenv').config();
const { Stock } = require("../../db/models");


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

router.get('/:id([0-9]+)', asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const stock = await Stock.findAll({ where: { userId: id } })
    return res.json({
        stock,
    })
}))

router.get("/:ticker(w+)", asyncHandler(async (req, res) => {
    let stocks = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${finnHubApi}`)
    console.log(stocks)
    return res.json({
        stocks,
    })
}))

module.exports = router;

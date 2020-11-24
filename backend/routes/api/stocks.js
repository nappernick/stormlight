const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

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

router.get('/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const stock = await Stock.findAll({ where: { userId: id } })
    return res.json({
        stock,
    })
}))

module.exports = router;

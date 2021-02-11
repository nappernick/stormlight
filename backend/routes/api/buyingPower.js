const express = require("express");
const { apiConfig } = require("../../config");
const fetch = require("cross-fetch")
const asyncHandler = require("express-async-handler");
require('dotenv').config();
const { BuyingPower } = require("../../db/models");
const { json } = require("express");

const router = express.Router()

router.put("/:userId([0-9]+", asyncHandler(async (req, res, next) => {
    const { userId } = req.params
    const { dollars } = req.body
    const buyPow = await BuyingPower.findOne({ where: { userId } })
    buyPow.dollars = parseFloat(dollars)
    await buyPow.save()
    return res.json({
        buyPow
    })
}))

router.get("/:userId([0-9]+", asyncHandler(async (req, res, next) => {
    const { userId } = req.params
    const buyPow = await BuyingPower.findOne({ where: { userId } })

}))

module.exports = router;

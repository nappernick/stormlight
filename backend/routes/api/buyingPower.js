const express = require("express");
const { check } = require("express-validator");
const { apiConfig } = require("../../config");
const fetch = require("cross-fetch")
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
require('dotenv').config();
const { BuyingPower } = require("../../db/models");
const { json } = require("express");

const router = express.Router()

const validatePut = [
    check('dollars')
        .exists({ checkFalsy: true })
        .isFloat({ min: 0, max: Infinity })
        .withMessage("You do not have adequate buying power. Sell stock & try again."),
    handleValidationErrors,
];

router.put("/:userId([0-9]+)", asyncHandler(async (req, res, next) => {
    const { userId } = req.params
    const { dollars } = req.body
    const buyPow = await BuyingPower.findOne({ where: { userId } })
    buyPow.dollars = parseFloat(dollars)
    await buyPow.save()
    return res.json({
        buyPow
    })
}))

router.get("/:userId([0-9]+)", asyncHandler(async (req, res, next) => {
    const { userId } = req.params
    const buyPow = await BuyingPower.findOne({ where: { userId } })
    return res.json({ buyPow })
}))

module.exports = router;

const express = require("express");
const { check } = require("express-validator");
const { apiConfig } = require("../../config");
const fetch = require("cross-fetch")
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
require('dotenv').config();
const { Watchlist } = require("../../db/models");
const { json } = require("express");

const router = express.Router()

router.post("/user/:userId([0-9]+)/ticker/:ticker(\\w+)$", asyncHandler(async (req, res, next) => {
    const { userId, ticker } = req.params
    ticker = ticker.toUpperCase()
    const watchList = await Watchlist.create({
        ticker,
        userId
    })
    return res.json({ watchList })
}))

router.delete('/user/:userId([0-9]+)/ticker/:ticker(\\w+)$', asyncHandler(async (req, res, next) => {
    const { userId, ticker } = req.params
    ticker = ticker.toUpperCase()
    const toDelete = await Watchlist.findOne({
        where: {
            userId,
            ticker
        }
    })
    await Watchlist.destroy({
        where: {
            id: toDelete.dataValues.id
        }
    })
    return res.json({ toDelete })
}))

router.get("/user/:userId([0-9]+)", asyncHandler(async (req, res, next) => {
    const { userId } = req.params
    const watchList = await Watchlist.findAll({ where: { userId } })
    console.log(watchList)
    return res.json({
        watchList
    })
}))


module.exports = router;

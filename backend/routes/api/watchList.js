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

router.post("/:userId([0-9]+)")



module.exports = router;

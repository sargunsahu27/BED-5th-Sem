const express = require("express");
const router = express.Router();
const { postPlaceOrder } = require("../Controller/order");

router.post("/", postPlaceOrder);

module.exports = router;
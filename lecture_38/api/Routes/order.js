const express = require("express");
const router = express.Router();
const { postPlaceOrder } = require("../Controller/order");
const auth = require("../middleware/auth");
router.post("/",auth, postPlaceOrder);

module.exports = router;
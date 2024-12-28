const express = require("express");
const {createOrder, capturePayment, getOrders, getOrderDetails } = require("../controllers/orders-controllers");
const router = express.Router();




router.post("/create", createOrder )
router.put("/update/:id", capturePayment )
router.delete("/details/:id", getOrderDetails )
router.get("/get", getOrders )



module.exports = router
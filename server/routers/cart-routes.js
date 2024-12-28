const express = require("express");
const { addToCart, getCartItems, updateCartItems, deleteCartItems } = require("../controllers/cart-controllers");
const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:productId", getCartItems);
router.put("/update/:productId", updateCartItems);
router.delete("/:productId", deleteCartItems);


module.exports = router;
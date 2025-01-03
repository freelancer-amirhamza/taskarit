const express = require("express");
const { 
    addProduct,
    getAllProducts,
    updateProduct,getProductDetails,
    deleteProduct,} = require("../controllers/products-controllers");
const router = express.Router();
router.post("/add", addProduct )
router.put("/update/:id", updateProduct )
router.delete("/delete/:id", deleteProduct )
router.get("/get", getAllProducts )
router.get("/details/:id", getProductDetails )


module.exports = router
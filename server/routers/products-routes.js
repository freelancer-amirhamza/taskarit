const express = require("express");
const {upload} =require("../config/cloudinary")
const { 
    addProduct,
    getAllProducts,
    updateProduct,getProductDetails,
    deleteProduct,handleImageUpload} = require("../controllers/products-controllers");
const router = express.Router();



router.post("/upload-image", upload.single("my_file"), handleImageUpload );
router.post("/add", addProduct )
router.put("/update/:id", updateProduct )
router.delete("/delete/:id", deleteProduct )
router.get("/get", getAllProducts )
router.get("/details/:id", getProductDetails )


module.exports = router
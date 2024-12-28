const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image:String,
    name:String,
    description: String,
    category:String,
    price:Number,
    salePrice: Number,
}, {timestamps:true})

const Product = mongoose.model("products", productSchema);

module.exports = Product;
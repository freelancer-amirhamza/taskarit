const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
    cartId:String,
    cartItems:[
        {
            productId: String,
            name: String,
            image: String, 
            price: String,
            quantity: Number,
        }
    ],
    addressInfo:{
        addressId:String,
        address: String,
        city: String,
        division:String,
        pinCode: String,
        notes: String,
    },
    orderStatus:String,
    paymentMethod: String,
    paymentStatus:String,
    totalAmount: Number,
    orderDate:Date,
    orderUpdate:Date,
})

const Order = mongoose.model("orders", OrderSchema);

module.exports = Order;
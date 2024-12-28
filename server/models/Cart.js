const mongoose = require("mongoose");



const CartSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            }
        }
    ]
}, { timestamps: true });

const Cart = mongoose.model("carts", CartSchema);

module.exports = Cart;
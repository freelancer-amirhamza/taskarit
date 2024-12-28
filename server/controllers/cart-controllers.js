const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");

const addToCart = async (req, res) => {
    try {
        const {productId, quantity } = req.body;

        if ( !productId || quantity <= 0) {
            console.log("first")
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            console.log("product id not found")
            return res.status(404).json({
                success: false,
                message: "The product is not found!",
            });
        }

        let cart = await Cart.findOne({ productId });
        if (!cart) {
            cart = new Cart({items: [] });
        }

        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity;
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!",
        });
    }
};

const getCartItems = async (req, res) => {
    try {
        const cart = await Cart.find().populate({
            path: "items.productId",
            select: "image title price salePrice",
        });
        if (!cart) {
            return res.status(404).json({
                success: false, 
                message: "Cart not found!",
            })
        };

        const validItems = cart.items.filter(
            (productItem) => productItem.productId);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        };

        const populateCartItems = validItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            name: item.productId.name,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!",
        });
    }
};

const updateCartItems = async (req, res) => {
    try {

        const { productId, quantity } = req.body;
        if (!productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "The user id mandatory!",
            })
        };

        const cart = await Cart.findOne({productId});
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!"
            })
        };

        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId);
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Cart items is present!",
            })
        };

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            name: item.productId ? item.productId.name : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));
        res.status(200).json({
            success: true,
            message: "Your carts are updated successfully!",
            data: {
                ...cart._doc,
                items: populateCartItems,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!",
        });
    }
};

const deleteCartItems = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "The data is mandatory!", 
            })
        };

        const cart = await Cart.findOne({productId}).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });
        if (!cart) {
            return res.status(404).json({ 
                success: false,
                message: "Cart not found!"
            })
        };

        cart.items = cart.items.filter(
            (item) => item.productId._id.toString() !== productId);
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice"
        })

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found!",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!",
        });
    }
};

module.exports = { addToCart, getCartItems, updateCartItems, deleteCartItems };
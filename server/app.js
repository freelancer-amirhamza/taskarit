const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./config/database");
const productsRouter = require("./routers/products-routes");
const cartRouter = require("./routers/cart-routes")


 
app.use(cors({
    origin: "http://localhost:5173",
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization', 
        'Catch-Control',
        'Expires',
        'Pragma', 
    ],
    credentials: true,
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.get("/",(req, res)=>{
    res.send("<h1> Welcome to server site</h1> ")
})
app.use("/api/products", productsRouter )
app.use("/api/cart", cartRouter )

module.exports = app      
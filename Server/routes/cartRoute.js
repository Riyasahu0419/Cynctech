const express = require("express");
const { addToCart, getCart , removeCart } = require("../controllers/cartController");

const route = express.Router();

route.post("/add", addToCart);
route.get("/", getCart);
route.post("/remove", removeCart);

module.exports = route;

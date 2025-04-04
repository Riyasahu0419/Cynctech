const express = require("express");
const { getAllProducts } = require("../controllers/productController");

const route = express.Router();

route.get("/", getAllProducts);

module.exports = route;

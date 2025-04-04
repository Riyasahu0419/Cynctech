const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  products: [{ productId: String, quantity: Number }],
});


const CartModel= mongoose.model("Cart", cartSchema);
module.exports =CartModel

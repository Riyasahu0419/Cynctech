const Cart = require("../models/Cart");



// Add product to cart
const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const sessionId = req.headers["session-id"];
  const userId = req.user ? req.user.id : null;

  try {
    if (!productId || (!userId && !sessionId)) {
      return res.status(400).json({ message: "Product ID and either session or user ID required." });
    }

    let cart;

    if (userId) {
      cart = await Cart.findOne({ userId });
    }

    // If not found, try by sessionId
    if (!cart && sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    // If still no cart, create new
    if (!cart) {
      cart = new Cart({
        sessionId: sessionId || null,
        products: [],
      });
    }

    // Check if the product is already in cart
    const existingProduct = cart.products.find(p => p.productId.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json({ message: "Added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getCart = async (req, res) => {
    const sessionId = req.headers["session-id"];

    try {
        const cart = await Cart.findOne({ sessionId }).populate("products.productId");
        res.json(cart || { products: [] });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const removeCart = async (req, res) => {
    const { productId } = req.body;
    const sessionId = req.headers["session-id"];

    try {
        const cart = await Cart.findOne({ sessionId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.products = cart.products.filter((item) => item.productId.toString() !== productId);
        await cart.save();
        res.json({ message: "Removed from cart", cart });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addToCart, getCart, removeCart };
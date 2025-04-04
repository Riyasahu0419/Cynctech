import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cart", {
        headers: { "session-id": localStorage.getItem("session_id") },
      })
      .then((res) => setCart(res.data.products || []));
  }, []);

  const removeCart = async (productId) => {
    await axios.post(
      "http://localhost:5000/api/cart/remove",
      { productId },
      {
        headers: { "session-id": localStorage.getItem("session_id") },
      }
    );
    setCart(cart.filter((item) => item.productId !== productId));
  };

  //Merge duplicate product entries
  const mergedCart = cart.reduce((acc, item) => {
    const existing = acc.find((i) => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">🛒 Shopping Cart</h2>

      {mergedCart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        mergedCart.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 mb-4"
          >
            <div>
              <p className="font-medium">🛍️ Product ID: {item.productId}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <button
              onClick={() => removeCart(item.productId)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
               Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;

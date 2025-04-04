import { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://cynctech.onrender.com/api/products/")
      .then((res) => {
        console.log("Fetched products:", res.data); // ✅ Log API response

        if (Array.isArray(res.data) && res.data.length > 0 && Array.isArray(res.data[0].data)) {
          setProducts(res.data[0].data); // ✅ Extract actual products array
        } else {
          throw new Error("Invalid response format");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Try again later.");
        setLoading(false);
      });
  }, []);

  const addToCart = async (productId) => {
    // Set session ID in local storage
    const sessionId = 'your_session_id_value'; // Replace with actual session ID value
    localStorage.setItem('session_id', sessionId); 

    // Retrieve session ID
    const retrievedSessionId = localStorage.getItem('session_id');
    console.log("Retrieved session ID:", retrievedSessionId);
    
    if (!retrievedSessionId) {
        alert('Session ID is missing. Please log in again.');
        return;
    }

    try {
        const response = await axios.post('https://cynctech.onrender.com/api/cart/add', {
            productId,
            
        }, {
            headers: {
                'session-id': retrievedSessionId 
            }
        });
        alert('Product added to cart:', response.data);
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add product to cart. Please try again.');
    }
};



  if (loading) return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md text-center">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => addToCart(product.id)}
                className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200"
              >
                Add to Cart
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

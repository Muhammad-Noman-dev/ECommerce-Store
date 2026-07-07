import { useEffect, useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { cartAPI, orderAPI } from "../utils/api";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

const [form, setForm] = useState({
  fullName: "",
  phone: "",
  address: "",
});
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await cartAPI.getCart();
      setCart(res.data.cart);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId);
      fetchCart(); // Refresh cart
    } catch (error) {
      alert("Failed to remove item");
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.products) return 0;
    return cart.products.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };
const placeOrder = async () => {
  try {
    const res = await orderAPI.createOrder();
    console.log(res.data);
    alert("Order placed successfully!");
    fetchCart();
  } catch (error) {
  console.log("Full Error:", error);
  console.log("Response:", error.response);
  console.log("Data:", error.response?.data);
  console.log("Message:", error.message);

  alert(error.response?.data?.message || error.message);
}
  
};
  if (loading) return <div className="text-center py-32">Loading cart...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

      {!cart || cart.products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">Your cart is empty</p>
          <button className="mt-6 bg-indigo-600 text-white px-8 py-4 rounded-xl">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.products.map((item) => (
              <div key={item.product._id} className="flex gap-6 bg-white p-6 rounded-2xl mb-6 shadow-sm">
                <img 
                 src={`${import.meta.env.VITE_API_URL}/uploads/${item.product.image}`} 
                  alt={item.product.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{item.product.name}</h3>
                  <p className="text-gray-600">₹{item.product.price}</p>

                  <div className="flex items-center gap-4 mt-4">
                    <button className="p-2 border rounded-lg hover:bg-gray-100">
                      <Minus size={18} />
                    </button>
                    <span className="font-medium text-lg w-8 text-center">
                      {item.quantity}
                    </span>
                    <button className="p-2 border rounded-lg hover:bg-gray-100">
                      <Plus size={18} />
                    </button>

                    <button 
                      onClick={() => removeFromCart(item.product._id)}
                      className="ml-auto text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>

                <div className="text-right font-bold text-xl">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-3xl shadow-sm h-fit">
            <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr />
              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>

            <button 
              className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl text-xl font-semibold transition"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
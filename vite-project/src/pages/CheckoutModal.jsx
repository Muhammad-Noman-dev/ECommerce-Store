import React, { useState } from "react";

const CheckoutModal = ({ isOpen, onClose, cartItems, totalAmount, onOrderSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        products: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        totalAmount,
        shippingAddress: {
          fullName: formData.fullName,
          mobile: formData.mobile,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
        },
        paymentMethod: "COD", // Cash on Delivery
      };

      // Yahan apna orderAPI use karo
      // const res = await orderAPI.createOrder(orderData);

      alert("Order placed successfully! 🎉");
      onOrderSuccess();
      onClose();
    } catch (error) {
      alert("Failed to place order");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                placeholder="03XX-XXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Full Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                placeholder="House no, street, area..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>Total Amount:</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg disabled:bg-gray-400 transition"
              >
                {loading ? "Placing Order..." : "Place Order (Cash on Delivery)"}
              </button>
            </div>
          </form>

          <button
            onClick={onClose}
            className="mt-4 w-full py-3 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
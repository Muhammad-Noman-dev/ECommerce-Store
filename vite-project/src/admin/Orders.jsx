import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null); // for loading state on buttons

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/order/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load orders");

      setOrders(data.orders || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      await api.put(`/order/status/${id}`, { status });
      
      alert(`Order marked as ${status}`);
      fetchOrders(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-600">Loading orders...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-red-500 text-xl mb-4">Error: {error}</p>
          <button
            onClick={fetchOrders}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">All Orders</h1>
          <p className="text-gray-600 mt-1 md:mt-0">Total: <span className="font-semibold">{orders.length}</span></p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <p className="text-gray-500 text-xl">No orders found yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            {/* Desktop + Tablet Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-mono text-sm text-gray-700">{order._id}</td>
                      <td className="px-6 py-4">{order.user?.name || "Unknown"}</td>
                      <td className="px-6 py-4 font-semibold text-lg">₹{order.totalAmount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                          order.status === "delivered" ? "bg-green-100 text-green-700" :
                          order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                          order.status === "confirmed" ? "bg-purple-100 text-purple-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => updateStatus(order._id, "confirmed")}
                            disabled={updatingId === order._id}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm transition"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(order._id, "shipped")}
                            disabled={updatingId === order._id}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm transition"
                          >
                            Ship
                          </button>
                          <button
                            onClick={() => updateStatus(order._id, "delivered")}
                            disabled={updatingId === order._id}
                            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm transition"
                          >
                            Delivered
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white border rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Order ID</p>
                      <p className="font-mono text-sm">{order._id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivered" ? "bg-green-100 text-green-700" : 
                      order.status === "shipped" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div><strong>Customer:</strong> {order.user?.name || "Unknown"}</div>
                    <div><strong>Total:</strong> ₹{order.totalAmount}</div>
                    <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => updateStatus(order._id, "confirmed")}
                      className="flex-1 bg-green-600 text-white py-3 rounded-xl text-sm font-medium"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "shipped")}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-sm font-medium"
                    >
                      Ship
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "delivered")}
                      className="flex-1 bg-purple-600 text-white py-3 rounded-xl text-sm font-medium"
                    >
                      Delivered
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Orders;
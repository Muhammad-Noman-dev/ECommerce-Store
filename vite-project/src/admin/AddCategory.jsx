import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../api/axios";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Category name is required");

    setLoading(true);
    try {
      await api.post("/category/create", { name });
      alert("✅ Category Created Successfully!");
      setName("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-3xl font-bold mb-6">Add New Category</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name (e.g. Mobile, Laptop)"
            className="w-full p-4 border border-gray-300 rounded-xl mb-6"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddCategory;
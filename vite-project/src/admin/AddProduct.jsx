import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../api/axios";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCats, setFetchingCats] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/category");
        setCategories(res.data.categories || res.data);
      } catch (err) {
        console.error("Categories fetch failed:", err);
        alert("Failed to load categories. Make sure categories exist in database.");
      } finally {
        setFetchingCats(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Please select an image!");
    if (!formData.category) return alert("Please select a category!");

    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);
    data.append("image", image);

    try {
      const res = await api.post("/product/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product Added Successfully!");
      
      // Reset Form
      setFormData({ name: "", description: "", price: "", stock: "", category: "" });
      setImage(null);
      e.target.reset();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Add New Product</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
                placeholder="Product description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Price </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={fetchingCats}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl text-lg font-semibold disabled:bg-gray-400 transition"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
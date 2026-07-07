import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productAPI } from "../utils/api";

const EditProduct = () => {

    const { id } = useParams();
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await productAPI.updateProduct(id, formData);

    alert("Product Updated Successfully");

    navigate("/admin/products");

  } catch (err) {
  console.log("Status:", err.response?.status);
  console.log("Data:", err.response?.data);
  console.log("Message:", err.response?.data?.message);

  alert(err.response?.data?.message || "Update Failed");
}
};

const fetchProduct = async () => {
  try {
    const res = await productAPI.getSingle(id);

    setFormData({
      name: res.data.product.name,
      description: res.data.product.description,
      price: res.data.product.price,
      stock: res.data.product.stock,
      category: res.data.product.category,
    });

  }catch (err) {
  console.log("Status:", err.response?.status);
  console.log("Backend Response:", err.response?.data);

  alert(JSON.stringify(err.response?.data));
}
};

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">

        <h2 className="text-3xl font-bold mb-6">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Product Image
            </label>

            <input
              type="file"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Update Product
          </button>

        </form>

      </div>
    </AdminLayout>
  );
};

export default EditProduct;
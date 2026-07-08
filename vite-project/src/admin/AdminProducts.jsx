import { useEffect, useState } from "react";
import { productAPI } from "../utils/api";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productAPI.getAll(page);

      setProducts(res.data.products);
      setPages(res.data.totalPages); // ✅ fixed: backend sends "totalPages", not "pages"
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await productAPI.deleteProduct(id);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // ✅ helper: handles both full URLs (seeded/picsum) and uploaded filenames
  const getImageUrl = (image) => {
    if (!image) return "";
    return image.startsWith("http")
      ? image
      : `${import.meta.env.VITE_API_URL}/uploads/${image}`;
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center text-gray-500">
          No products found
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b text-center hover:bg-gray-100"
                  >
                    <td className="p-3">
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-16 h-16 object-cover mx-auto rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            'https://placehold.co/400x400?text=No+Image'
                        }}
                      />
                    </td>

                    <td>{product.name}</td>
                    <td>{product.category?.name || product.category}</td>
                    <td>Rs. {product.price}</td>
                    <td>{product.stock}</td>

                    <td className="space-x-2 py-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/edit-product/${product._id}`)
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
              >
                Previous
              </button>

              <span className="font-medium">
                Page {page} of {pages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page === pages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
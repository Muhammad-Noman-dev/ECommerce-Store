import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { productAPI, cartAPI } from "../utils/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    console.log("Products State:", products);
  }, [products]);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);

      const res = await productAPI.getAll(1, 8);

      console.log("API Response:", res.data);
      console.log("Products From API:", res.data.products);

      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await cartAPI.addToCart(productId, 1);
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Our Store
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices with fast delivery
          </p>

          <button
            onClick={() =>
              document
                .getElementById("products-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-indigo-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Featured Products */}
      <div
        id="products-section"
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold">Featured Products</h2>

          <a
            href="#"
            className="text-indigo-600 font-medium hover:underline"
          >
            View All Products →
          </a>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xl font-semibold">
            Loading Products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-red-500 text-xl">
            No Products Found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
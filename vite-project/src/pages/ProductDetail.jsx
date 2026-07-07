import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, cartAPI } from '../utils/api';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await productAPI.getSingle(id);
      setProduct(res.data.product);
    } catch (error) {
      console.error(error);
      alert("Product not found");
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      await cartAPI.addToCart(product._id, quantity);
      alert(`${quantity} × ${product.name} added to cart!`);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  if (loading) {
    return <div className="text-center py-32 text-2xl">Loading product...</div>;
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-8"
      >
        <ArrowLeft /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gray-100 rounded-3xl overflow-hidden">
          <img 
        src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
            <p className="text-3xl font-semibold text-indigo-600 mt-4">
              ₹{product.price}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-xl">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q-1))}
                className="px-5 py-3 hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-6 py-3 font-semibold border-x">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q+1)}
                className="px-5 py-3 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={addToCart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl text-xl font-semibold flex items-center justify-center gap-3 transition"
            >
              <ShoppingCart size={26} />
              Add to Cart
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 p-5 rounded-2xl">
            <p className="text-green-700 font-medium">✓ In Stock ({product.stock} available)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
import { ShoppingCart, Eye } from 'lucide-react';
import { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await onAddToCart(product._id);
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-56 bg-gray-100">
        <img
          src={
            product.image.startsWith("http")
              ? product.image
               : `${import.meta.env.VITE_API_URL}/uploads/${product.image}`
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {product.stock > 0 ? (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
            In Stock
          </span>
        ) : (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 min-h-[56px]">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-2xl font-bold text-indigo-600">
              PRICE: {product.price}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white p-3 rounded-xl transition-all"
            >
              <ShoppingCart size={20} />
            </button>

            <button className="border border-gray-300 hover:border-gray-400 p-3 rounded-xl transition-all">
              <Eye size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
// import { useEffect, useState } from 'react';
// import ProductCard from '../components/ProductCard';
// import { productAPI, cartAPI } from '../utils/api';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);

//   const limit = 20; // 20 products per page (aap change kar sakte ho)

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);
//     useEffect(() => {
// fetch("https://dummyjson.com/products?limit=20&skip=20")
//   .then((res) => res.json())
//   .then((data) => console.log(data));})

//   const fetchProducts = async (page) => {
//     try {
//       setLoading(true);
//       const res = await productAPI.getAll(page, limit);
      
//       setProducts(res.data.products);
//       setTotalPages(res.data.totalPages);
//       setTotalProducts(res.data.totalProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addToCart = async (productId) => {
//     try {
//       await cartAPI.addToCart(productId, 1);
//       alert("✅ Product added to cart!");
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to add to cart");
//     }
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <div className="flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-4xl font-bold">All Products</h1>
//           <p className="text-gray-600 mt-2">
//             Showing {products.length} of {totalProducts} products
//           </p>
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center py-32 text-xl">Loading products...</div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map(product => (
//               <ProductCard 
//                 key={product._id} 
//                 product={product} 
//                 onAddToCart={addToCart}
//               />
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center gap-3 mt-12">
//             <button 
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-5 py-3 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
//             >
//               Previous
//             </button>

//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages));
//               return (
//                 <button
//                   key={i}
//                   onClick={() => handlePageChange(pageNum)}
//                   className={`px-5 py-3 rounded-lg border ${currentPage === pageNum 
//                     ? 'bg-indigo-600 text-white' 
//                     : 'hover:bg-gray-100'}`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}

//             <button 
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-5 py-3 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Products;


import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
// import { productAPI, cartAPI } from '../utils/api';   ← abhi ke liye comment kar do

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fake Products (Dummy Data) - Vercel pe kaam karega
  const allProducts = [
    {
      _id: 1,
      name: "Wireless Headphones",
      price: 2999,
      image: "https://via.placeholder.com/300x300?text=Headphones",
      description: "Bluetooth headphones with noise cancellation",
      category: "electronics"
    },
    {
      _id: 2,
      name: "Smart Watch",
      price: 4999,
      image: "https://via.placeholder.com/300x300?text=Smart+Watch",
      description: "Fitness and health tracking watch",
      category: "electronics"
    },
    {
      _id: 3,
      name: "Laptop Backpack",
      price: 1299,
      image: "https://via.placeholder.com/300x300?text=Backpack",
      description: "Waterproof laptop bag",
      category: "fashion"
    },
    {
      _id: 4,
      name: "T-Shirt",
      price: 899,
      image: "https://via.placeholder.com/300x300?text=T-Shirt",
      description: "Cotton comfortable t-shirt",
      category: "fashion"
    },
    // Agar aur products chahiye to yahan add kar sakte ho
  ];

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Abhi ke liye fake data use kar rahe hain
      setProducts(allProducts);
      setTotalProducts(allProducts.length);
      setTotalPages(1);   // abhi single page

      // Agar baad mein real API use karna ho to ye uncomment kar dena
      // const res = await productAPI.getAll(currentPage, 20);
      // setProducts(res.data.products || []);
      // setTotalPages(res.data.totalPages || 1);
      // setTotalProducts(res.data.totalProducts || 0);

    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      // cartAPI abhi kaam nahi kar raha to alert de rahe hain
      alert("✅ Product added to cart! (Backend not connected yet)");
    } catch (error) {
      alert("Failed to add to cart");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">All Products</h1>
          <p className="text-gray-600 mt-2">
            Showing {products.length} of {totalProducts} products
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-32 text-xl">Loading products...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          {/* Pagination (Abhi single page hai) */}
          <div className="flex justify-center gap-3 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-5 py-3 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
            >
              Previous
            </button>
            <button
              className="px-5 py-3 rounded-lg border bg-indigo-600 text-white"
            >
              {currentPage}
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-5 py-3 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
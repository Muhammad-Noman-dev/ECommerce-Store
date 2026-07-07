const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Shopify</h2>
          <p className="text-gray-400">
            Your one-stop shop for quality products at best prices.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Shop</a></li>
            <li><a href="#" className="hover:text-white">Categories</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-white">Return Policy</a></li>
            <li><a href="#" className="hover:text-white">Track Order</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">Subscribe for latest updates</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-gray-800 px-4 py-3 rounded-l-lg focus:outline-none w-full"
            />
            <button className="bg-indigo-600 px-6 rounded-r-lg hover:bg-indigo-700">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-800 pt-6">
        © 2026 Shopify. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
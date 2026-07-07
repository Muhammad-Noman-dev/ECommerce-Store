import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ user, logout, cartCount }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <h1 className="text-3xl font-bold text-indigo-600 tracking-tight">Shopify</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-lg font-medium">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-indigo-600 transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-indigo-600 transition-colors">About</Link>
            <Link to="/services" className="hover:text-indigo-600 transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <User size={24} />
                  <span className="font-medium">{user.name}</span>
                </div>

                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  <LogOut size={24} />
                </button>

                <Link to="/cart" className="relative p-3 hover:bg-gray-100 rounded-full transition-all" onClick={closeMenu}>
                  <ShoppingCart size={26} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full shadow">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-6 py-2.5 font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-xl transition-all" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-sm" onClick={closeMenu}>
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-indigo-600"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-6 px-4 space-y-6">
            <div className="flex flex-col gap-5 text-lg font-medium">
              <Link to="/" onClick={closeMenu}>Home</Link>
              <Link to="/products" onClick={closeMenu}>Shop</Link>
              <Link to="/about" onClick={closeMenu}>About</Link>
              <Link to="/services" onClick={closeMenu}>Services</Link>
              <Link to="/contact" onClick={closeMenu}>Contact</Link>
            </div>

            {/* Mobile Auth & Cart */}
            {user ? (
              <div className="flex flex-col gap-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <User size={24} />
                  <span>{user.name}</span>
                </div>
                <button onClick={() => { logout(); closeMenu(); }} className="flex items-center gap-3 text-red-500">
                  <LogOut size={24} /> Logout
                </button>
                <Link to="/cart" onClick={closeMenu} className="flex items-center gap-3">
                  <ShoppingCart size={26} /> Cart ({cartCount})
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-4 border-t">
                <Link to="/login" className="w-full text-center py-3 rounded-xl hover:bg-gray-100" onClick={closeMenu}>Login</Link>
                <Link to="/register" className="w-full text-center bg-indigo-600 text-white py-3 rounded-xl" onClick={closeMenu}>Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
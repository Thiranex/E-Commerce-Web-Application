import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary tracking-tight">E-Shop</Link>
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="text-gray-600 hover:text-primary transition-colors flex items-center relative">
            <ShoppingCart className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              {user.role === 'Admin' && (
                <Link to="/admin" className="text-gray-600 hover:text-primary transition-colors font-medium">
                  Admin Panel
                </Link>
              )}
              <span className="text-gray-700 font-medium">Hi, {user.name}</span>
              <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center text-gray-600 hover:text-primary transition-colors">
              <User className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

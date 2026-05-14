import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback demo data if backend is not running
        setProducts([
          { _id: '1', name: 'Wireless Headphones', price: 99.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', category: 'Electronics' },
          { _id: '2', name: 'Smart Watch', price: 199.99, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600', category: 'Accessories' },
          { _id: '3', name: 'Mechanical Keyboard', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600', category: 'Electronics' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-20 text-xl font-semibold text-gray-600">Loading products...</div>;

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Welcome to E-Shop</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our premium collection of products designed to elevate your everyday life.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">{product.category}</span>
              <h2 className="text-xl font-bold text-gray-900 mt-2 mb-2 line-clamp-1">{product.name}</h2>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-dark text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

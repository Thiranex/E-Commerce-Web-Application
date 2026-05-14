import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      // Example checkout request
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.qty,
          price: item.price
        })),
        shippingAddress: {
          address: '123 Main St', // Placeholder
          city: 'Anytown',
          postalCode: '12345',
          country: 'USA'
        },
        totalPrice: Number(cartTotal)
      };

      await axios.post('http://localhost:5000/api/orders', orderData, config);
      alert('Order placed successfully!');
      clearCart();
      navigate('/');
    } catch (error) {
      alert('Checkout failed. Make sure backend is running and you are logged in.');
      console.error(error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
      
      <div className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <div key={item._id} className="py-6 flex items-center justify-between">
            <div className="flex items-center">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-6" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-500">Qty: {item.qty}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 mr-6">${(item.price * item.qty).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 font-medium">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-8 flex justify-between items-center">
        <span className="text-2xl font-bold text-gray-900">Total: ${cartTotal}</span>
        <button 
          onClick={handleCheckout}
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

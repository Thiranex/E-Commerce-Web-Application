import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // New product form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'Admin') {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', {
        name, price: Number(price), category, description, imageUrl, stock: 10
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Product added successfully!');
      setName(''); setPrice(''); setCategory(''); setDescription(''); setImageUrl('');
    } catch (error) {
      alert('Failed to add product');
      console.error(error);
    }
  };

  if (loading) return <div className="text-center py-20">Loading admin dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-2xl font-semibold mb-6">Add New Product</h3>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Product Name" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          <input type="number" placeholder="Price" required value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          <input type="text" placeholder="Category" required value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          <input type="text" placeholder="Image URL" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          <textarea placeholder="Description" required value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none md:col-span-2" rows="3"></textarea>
          <button type="submit" className="bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-700 md:col-span-2">Add Product to Catalog</button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-2xl font-semibold mb-6">Recent Orders</h3>
        {orders.length === 0 ? <p className="text-gray-500">No orders yet.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="p-4 border-b">Order ID</th>
                  <th className="p-4 border-b">User</th>
                  <th className="p-4 border-b">Total</th>
                  <th className="p-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-500">{order._id}</td>
                    <td className="p-4 font-medium">{order.user?.name || 'Unknown'}</td>
                    <td className="p-4 font-semibold">${order.totalPrice.toFixed(2)}</td>
                    <td className="p-4"><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../Context/AdminContext';

const AdminOrders = () => {

  const [orders, setOrders] = useState([]); // Initialize as an empty array to avoid issues with mapping
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle any errors during fetch
  const { searchInput } = useContext(AdminContext)

  const getOrders = async () => {
    const Token = localStorage.getItem('accessToken');
    if (!Token) {
      setLoading(false);
      setError("User not authenticated.");
      return;
    }
    try {
      const response = await fetch("https://api.iwemiresearch.org/api/auth/profile/orders/", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
        return;
      }

      const responseJson = await response.json();
      setOrders(responseJson);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(item =>
    item.paper_name.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.status.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.user_name.toLowerCase().includes(searchInput.toLowerCase())
  )
  useEffect(() => {
    getOrders()
  }, [])

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 place-content-center border-4 border-gray-400 border-t-orange-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Admin Orders</h3>
      {filteredOrders.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Order ID</th>
              <th className="py-2 px-4 border-b text-left">Paper Name</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Time Created</th>
              <th className="py-2 px-4 border-b text-left">User Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.paper_name}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(order.time_created).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">{order.user_name || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No orders available.</p>
      )}
    </div>
  );
}

export default AdminOrders;

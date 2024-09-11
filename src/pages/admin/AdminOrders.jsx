import React, { useEffect, useState } from 'react';

const AdminOrders = () => {

  const [orders, setOrders] = useState()
  const [loading, setLoading] = useState(true)

  const getOrders = async () => {
    const Token = localStorage.getItem('accessToken');
    if (!Token) {
      setUser(null);
      setLoggedIn(false);
      return;
    }
    try {
      const response = await fetch("https://api.iwemiresearch.org/api/auth/profile/orders/", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })

      const responseJson = await response.json()
      console.log(responseJson)
      if (!response.ok) {
        setLoading(false)
        throw new Error("error")
        return
      }

      

      setOrders(responseJson)
      setLoading(false)

    } catch (error) {
      console.error(error)
    }
    setLoading(false)

  }
  useEffect(() => {
    getOrders()
  }, [])

  return loading ?
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-content-center border-4 border-gray-400 border-t-orange-800 rounded-full animate-spin">

      </div>
    </div>
    : (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Admin Orders</h3>
        {orders.length > 0 ? (
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
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{order.id}</td>
                  <td className="py-2 px-4 border-b">{order.paper_name}</td>
                  <td className="py-2 px-4 border-b">{order.status}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(order.time_created).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{order.user_name}</td>
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

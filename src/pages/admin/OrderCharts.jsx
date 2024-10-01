import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderCharts = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('daily');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
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
      const sortedOrders = responseJson.sort((a, b) => new Date(b.time_created) - new Date(a.time_created));
      
      // Filter successful orders
      const successfulOrders = sortedOrders.filter(order => order.status === 'Successful');
      setOrderData(successfulOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    const now = new Date();
    let labels, data;

    switch (timeRange) {
      case 'daily':
        labels = Array.from({length: 24}, (_, i) => `${i}:00`);
        data = new Array(24).fill(0);
        orderData.forEach(order => {
          const orderDate = new Date(order.time_created);
          if (now - orderDate < 24 * 60 * 60 * 1000) {
            data[orderDate.getHours()]++;
          }
        });
        break;
      case 'weekly':
        labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        data = new Array(7).fill(0);
        orderData.forEach(order => {
          const orderDate = new Date(order.time_created);
          if (now - orderDate < 7 * 24 * 60 * 60 * 1000) {
            data[orderDate.getDay()]++;
          }
        });
        break;
        case 'monthly':
          labels = Array.from({length: 30}, (_, i) => `Day ${i + 1}`);
          data = new Array(30).fill(0);
          orderData.forEach(order => {
            const orderDate = new Date(order.time_created);
            if (orderDate.getMonth() === selectedMonth && now.getFullYear() === orderDate.getFullYear()) {
              data[29 - Math.floor((now - orderDate) / (24 * 60 * 60 * 1000))]++;
            }
          });
          break;
    }

    return {
      labels,
      datasets: [
        {
          label: 'Successful Orders',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Successful Orders (${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)})`,
        font: {
          size: 18,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  if (loading) {
    return <div>Loading order data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="order-charts">
      <h2>Successful Order Statistics</h2>
      <div className="time-range-buttons">
        <button 
          className={timeRange === 'daily' ? 'active' : ''} 
          onClick={() => setTimeRange('daily')}
        >
          Daily
        </button>
        <button 
          className={timeRange === 'weekly' ? 'active' : ''} 
          onClick={() => setTimeRange('weekly')}
        >
          Weekly
        </button>
        <button 
          className={timeRange === 'monthly' ? 'active' : ''} 
          onClick={() => setTimeRange('monthly')}
        >
          Monthly
        </button>
      </div>
      {timeRange === 'monthly' && (
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
      )}
      <div className="chart-container">
        <Bar data={getChartData()} options={options} />
      </div>
    </div>
  );
};

export default OrderCharts;
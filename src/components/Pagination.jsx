import React from 'react'

const Pagination = ({ ordersPerPage, totalOrders, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="mt-4">
        <ul className="flex justify-center space-x-2">
          {pageNumbers.map(number => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === number
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

export default Pagination
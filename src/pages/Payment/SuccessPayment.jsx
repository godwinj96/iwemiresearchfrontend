import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCurrency } from '../../Context/CurrencyContext';
import { GlobalStateContext } from '../../Context/GlobalState';
import HomeBookCards from '../../components/BookCards/HomeBookCards';
import { format } from 'date-fns';

const SuccessPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading,results, setResults,isSearch,setIsSearch,searchInput } = useContext(GlobalStateContext);
  const { currencyCode, conversionRate } = useCurrency();

  const { total, products, orders } = location.state || {};
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [similarBooks, setSimilarBooks] = useState([])
  const [displayedBooks, setDisplayedBooks] = useState([]);
  console.log(orders)



  const getSimilarBooks = async () => {

    try {
      const response = await fetch("https://api.iwemiresearch.org/api/papers/", {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        },

      })

      if (!response.ok) {
        throw new Error('Failed to fetch journals')
      }

      const bookData = await response.json()
      const booksData = bookData.filter(paper =>
        paper.is_approved === true
      );
      const sortedPapers = booksData.sort(
        (a, b) => new Date(b.date_uploaded) - new Date(a.date_uploaded)
      )

      setSimilarBooks(sortedPapers)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSimilarBooks()
  }, [])

  const getRandomBooks = (books, count) => {
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (similarBooks.length > 0) {
      setDisplayedBooks(getRandomBooks(similarBooks, 5));

      const intervalId = setInterval(() => {
        setDisplayedBooks(getRandomBooks(similarBooks, 5));
      }, 1000000); // Change books every 10 seconds

      return () => clearInterval(intervalId); // Cleanup on component unmount
    }
  }, [similarBooks]);
  //   useEffect(() => {
  //     if (!total || !products) {
  //       navigate('/'); // Redirect to home if total or products are missing
  //     }
  //   }, [total, products, navigate]); // Add dependencies to ensure the effect only runs when necessary

  // Prevent rendering the page if no state is passed
  if (total === undefined || total === null || !products) {
    return (
      <div>hello</div>
    ); // You can return a loading state or something else if you prefer
  }

  const formattedDate = format(new Date(orders[0].time_created), 'MMMM d, yyyy HH:mm:ss');

  return loading ?
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-content-center border-4 border-gray-400 border-t-orange-800 rounded-full animate-spin">

      </div>
    </div>
    : (
      <div>
        { isSearch? (
        <section className="dark:bg-gray-900 features" data-aos="fade-up">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16 features-text">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Search Results for "{searchInput}"</h2>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-12 md:space-y-0">
              {results.length > 0 ? (
                results.map(book => (
                  <HomeBookCards key={book.id} book={book} />
                ))
              ) : (
                <p className="text-gray-500 sm:text-xl dark:text-gray-400">No results found</p>
              )}
            </div>
          </div>
        </section>
      ):(<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-green-500">
              <h1 className="text-3xl font-bold text-white text-center">
                Payment Successful
              </h1>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              {user && <h2 className="text-xl font-semibold text-gray-900 mb-4 hover:text-underline">
                Thank you for your purchase, {user.name} {user.last_name}!
              </h2>}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Total amount paid</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currencyCode} {(total * conversionRate).toFixed(2)}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {orders[0].id}
                    </dd>
                  </div>

                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Order Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {formattedDate}
                  </dd>
                </div>
                </dl>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Purchased Products</h3>
                <ul className="divide-y divide-gray-200">
                  {products.map((product, index) => (
                    <li key={index} className="py-4 flex justify-between">
                      <Link
                        to={`/book/${product.id}`}
                        state={{ book: product }}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition duration-300"
                      >
                        {product.name}
                      </Link>
                      <span className="text-sm text-gray-500">
                        {currencyCode} {(product.price * conversionRate).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {orders[0].download_links && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Download Links</h3>
                <ul className="divide-y divide-gray-200">
                  {orders[0].download_links.map((link, index) => (
                    <li key={index} className="py-2">
                      <a 
                        href={link} 
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition duration-300"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Download File {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            </div>
            <div className="px-4 py-4 sm:px-6 bg-gray-50">
              <button
                onClick={() => navigate('/')}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Return to Home Page
              </button>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">People also bought</h3>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8">
              {displayedBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <HomeBookCards book={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>)}
      </div>
      
    );
};

export default SuccessPayment;
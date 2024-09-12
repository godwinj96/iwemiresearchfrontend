import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import HomeBookCards from '../../components/BookCards/HomeBookCards'
import { useCart } from '../../Context/CartContext'
import { useCurrency } from '../../Context/CurrencyContext'
import { GlobalStateContext } from '../../Context/GlobalState'

const ShoppingCart = () => {

    const { results, setResults, isSearch, setIsSearch } = useContext(GlobalStateContext)
    const location = useLocation()
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [similarBooks, setSimilarBooks] = useState([])
    const navigate = useNavigate()
    const { currencyCode, conversionRate } = useCurrency()
    const { state, dispatch } = useCart()

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

    useEffect(() => {
        // Filtering out books that are already in the cart
        const cartItemIds = state.items.map((item) => item.id); // Assuming each cart item has an id
        const filtered = similarBooks.filter(
            (book) => !cartItemIds.includes(book.id) // Adjust property as per your book object identifier
        );

        setFilteredBooks(filtered);
    }, [similarBooks, state.items]);




    //reset search on route change
    useEffect(() => {
        setIsSearch(false)
        setResults([])
    }, [location, setIsSearch, setResults])
    //const {} = useContext(GlobalStateContext)


    const originalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const total = originalPrice

    const handleRemoveFromCart = (index) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: index });
    };

    const handleDecreaseQuantity = (index) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: index });
    };
    const handleAddToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item })
        // toast.error('Added to Shopping Cart')
        toast.success('Added to Shopping Cart')
    }

    const handleCheckout = () => {
        if (state.items.length === 0) {
            toast.error('Your cart is empty. Please add items before proceeding to checkout.');
            return;
        }
        // Implement your checkout logic here
        dispatch({ type: 'CLEAR_CART' });
        navigate('/payment', { state: { products: state.items, total } })

    };


    return (
        <div>

            {isSearch ? (<section className="dark:bg-gray-900 features" data-aos="fade-up">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="max-w-screen-md mb-8 lg:mb-16 features-text">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Search Results</h2>
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
            </section>)
                :
                (<div className="shopping-cart">
                    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">  Shopping Cart</h2>

                            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                    <div className="space-y-6">

                                        {state.items.map((item, index) =>
                                        (<div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <div>
                                                    <img src={item.cover_page} alt="" className='w-[100px] h-full px-3' />
                                                </div>

                                                <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    {/**increment button */}
                                                    <div className="flex items-center">
                                                        <button onClick={() => handleDecreaseQuantity(index)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                            </svg>
                                                        </button>
                                                        <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={item.quantity} readOnly />
                                                        <button onClick={() => { handleAddToCart(item) }} type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900 dark:text-white">{currencyCode} {(item.price * conversionRate).toFixed(2) || 0}</p>
                                                    </div>
                                                </div>

                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.name}</a>

                                                    <div className="flex items-center gap-4">
                                                        <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500" onClick={() => handleRemoveFromCart(index)}>
                                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>))}
                                    </div>
                                    <div className="hidden lg:block lg:pb-10 lg:pt-[200px] lg:ml-5 xl:mt-8 xl:block">
                                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
                                        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8">
                                            {filteredBooks.slice(0, 3).map((book) => (
                                                <div key={book.id}>
                                                    <HomeBookCards book={book} />
                                                    <hr />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                        <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                                    <dd className="text-base font-medium text-gray-900 dark:text-white">{currencyCode} {(originalPrice * conversionRate).toFixed(2)}</dd>
                                                </dl>


                                            </div>

                                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                                <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                                <dd className="text-base font-bold text-gray-900 dark:text-white">{currencyCode} {(total * conversionRate).toFixed(2)}</dd>
                                            </dl>
                                        </div>

                                        <button href="" onClick={handleCheckout} className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</button>

                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                            <a href=""
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    navigate(-1)
                                                }}
                                                title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                                Continue Shopping
                                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                        <form className="space-y-4">
                                            <div>
                                                <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                                                <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                                            </div>
                                            <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>)}




        </div>
    )
}

export default ShoppingCart
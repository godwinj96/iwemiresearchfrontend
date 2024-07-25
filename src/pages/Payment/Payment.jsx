import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/flutterwave.png'
import { GlobalStateContext } from '../../Context/GlobalState'
import interswitch_img from "../../assets/interswitch.png"
import stripe_img from '../../assets/stripe.png'
import { supabase } from '../../supaBaseClient'
import { toast } from 'react-toastify'
import iwemi_logo from '../../assets/new iwemi.png'
import { useCurrency } from '../../Context/CurrencyContext'
import HomeBookCards from '../../components/BookCards/HomeBookCards'

const Payment = () => {

    const { results, setResults, isSearch, setIsSearch, user, setUser } = useContext(GlobalStateContext)

    //reset search on route change
    useEffect(() => {
        setIsSearch(false)
        setResults([])
    }, [location])
    const { currencyCode } = useCurrency()

    const navigate = useNavigate()

    const [totals, setTotal] = useState('')
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState() //'form', 'interswitch', 'stripe', 'flutterwave
    const [formDisabled, setFormDisabled] = useState(false)

    useEffect(() => {
        const storedProduct = localStorage.getItem('product')
        if (storedProduct) {
            const parsedProduct = JSON.parse(storedProduct)
        }
    }, [])

    const location = useLocation()
    const products = location.state?.products || [];
    const total = location.state?.total || 0

    // Calculate total price
    //const total = products.reduce((sum, product) => sum + product.price, 0);



    const checkoutInterswitch = () => {
        if (user) {
            const merchantCode = 'MX68314';
            const payItemId = 'Default_Payable_MX68314';
            const transRef = randomReference();

            const paymentRequest = {
                merchant_code: merchantCode,
                pay_item_id: payItemId,
                txn_ref: transRef,
                amount: Number(total * 100),
                cust_id: user.email,
                currency: 566,
                site_redirect_url: window.location.origin,
                onComplete: paymentCallback,
                mode: 'LIVE'//change to live for production
            }

            window.webpayCheckout(paymentRequest)//initiates payemnt request

        }
    }

    const randomReference = () => {
        const length = 10;
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    };

    const paymentCallback = (response) => {
        if (response !== null) {
            alert(response.desc); // Handle response as per your application's needs
            handlePaymentSuccess()
        }
    };

    const checkoutStripe = () => {
        // Stripe checkout logic
    };

    const checkoutFlutterwave = () => {
        // Flutterwave checkout logic
        FlutterwaveCheckout({
            public_key: "FLWPUBK-8d47ef6a8ee32b71f792a60461269335-X",
            tx_ref: `txref-${Date.now()}`,
            amount: Number(total),
            currency: `${currencyCode}`,
            payment_options: "card, mobilemoneyghana, ussd",
            meta: {
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a",
            },
            customer: {
                email: `${user.email}`,
                // name: "Rose DeWitt Bukater",
            },
            customizations: {
                title: "Iwemi Research",
                description: "Payment for research material",
                logo: { iwemi_logo },
            },
            callback: function (payment) {
                verifyTransactionOnBackend(payment.id)
            },
            onclose: function (incomplete) {
                if (incomplete) {
                    alert('Payment was not completed')
                }
            },
        });
    };

    const verifyTransactionOnBackend = (transactionId) => {
        setTimeout(function () {
            window.verified = true;

        }, 200)
    }

    const handlePaymentSuccess = async () => {
        const formData = JSON.parse(localStorage.getItem('formData'))

        const { data, error } = await supabase
            .from('api_book')
            .insert([
                {
                    name: formData.title,
                    author: formData.authors,
                    year_published: formData.yearP,
                    date_uploaded: formData.date,
                    category: formData.type,
                    file_url: formData.fileUrl,
                    is_open_access: true,
                }
            ])

        if (error) {
            toast.error('Payment failed')
        } else {
            toast.error('Book uploaded successfully')
            localStorage.removeItem('formData')
            navigate('/')
        }
    }






    return (
        <div>
            <Navbar />
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
                (<section className=" dark:bg-gray-900 dark payment-page">
                    <div className=" max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                        <div className="mr-auto place-self-center lg:col-span-7 flex flex-col gap-16">
                            <div className="mt-4 lg:mt-0 flex flex-col gap-8">
                                <div className='payment-text'>
                                    <h1>How would you like to pay?</h1>
                                    <span>All transactions are secured and encrypted</span>

                                </div>
                                <div className="flex gap-4 flex-col">
                                    <button
                                        type="button"
                                        onClick={checkoutInterswitch}
                                        className={`flex  gap-2 px-4 py-2 rounded-lg font-medium transition-transform duration-300  text-gray-700  hover:scale-105`}
                                    >
                                        <img src={interswitch_img} alt="Interswitch Logo" className="h-6 w-6" />
                                        Interswitch
                                    </button>
                                    <button
                                        type="button"
                                        onClick={checkoutStripe}
                                        className={`flex  gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-700 hover:scale-105`}
                                    >
                                        <img src={stripe_img} alt="Stripe Logo" className="h-6 w-6" />
                                        Stripe
                                    </button>
                                    <button
                                        type="button"
                                        onClick={checkoutFlutterwave}
                                        className={`flex  gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-700 hover:scale-105`}
                                    >
                                        <img src={logo} alt="Flutterwave Logo" className="h-6 w-6" />
                                        Flutterwave
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 grow sm:mt-8 lg:mt-0 product-bar">
                                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="space-y-2">
                                        {products.map((product, index) => (
                                            <dl key={index} className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">{product.quantity}x {product.name}</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">{currencyCode} {product.price}</dd>
                                            </dl>
                                        ))}
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700 ">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white" >Total</dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white" id='total' value={totals} onChange={(e) => { setTotal(e.target.value) }}>{currencyCode} {total.toFixed(2)}</dd>
                                    </dl>
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-8">
                                    <img
                                        src="https://stripe.com/img/v3/home/twitter.png"
                                        alt="Stripe Logo"
                                        className="h-8"
                                    />
                                    <img
                                        src={logo}
                                        alt="Flutterwave Logo"
                                        className="h-8"
                                    />
                                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>)}
            <div className='dark'>
                <Footer />
            </div>

        </div>
    )
}

export default Payment
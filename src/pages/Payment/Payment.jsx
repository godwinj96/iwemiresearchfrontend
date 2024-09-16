/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/flutterwave.png'
import { GlobalStateContext } from '../../Context/GlobalState'


import interswitch_img from "../../assets/interswitch.png"
import stripe_img from '../../assets/stripe.png'

import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { toast } from 'react-toastify'
import iwemi_logo from '../../assets/new iwemi.png'
import HomeBookCards from '../../components/BookCards/HomeBookCards'
import { useCurrency } from '../../Context/CurrencyContext'


const Payment = () => {

    const { setLoggedIn, setUser, results, setResults, isSearch, setIsSearch, user, uploadedFiles, setUploadedFiles, userId, } = useContext(GlobalStateContext)

    const { accessToken: contextAccessToken } = useContext(GlobalStateContext);

    // Retrieve the access token from localStorage if it’s not in the context
    const accessToken = contextAccessToken || localStorage.getItem('accessToken');

    //reset search on route change

    const { currencyCode, conversionRate } = useCurrency()

    const navigate = useNavigate()

    const [totals, setTotal] = useState('')
    const [loading, setLoading] = useState(false)
    let orderIds = []
    const downloadLinks = [];
    //const [orderIds, setOrderIds] = useState([]);


    useEffect(() => {
        const storedProduct = localStorage.getItem('product')
        if (storedProduct) {
            const parsedProduct = JSON.parse(storedProduct)
            setTotal(parsedProduct.price)
            //console.log(storedProduct)
        }
    }, [])

    useEffect(() => {
        // Persist the token in localStorage whenever it's set in the context
        if (contextAccessToken) {
            localStorage.setItem('accessToken', contextAccessToken);
        }
    }, [contextAccessToken]);

    const location = useLocation()
    const products = location.state?.products || [];
    //console.log(products)
    const total = location.state?.total || 0
    const fromUploadPage = location.state?.fromUploadPage || false
    // Calculate total price
    //const total = products.reduce((sum, product) => sum + product.price, 0);

    useEffect(() => {
        setIsSearch(false)
        setResults([])
    }, [location, setIsSearch, setResults])

    const addToOrders = async () => {

        const Token = localStorage.getItem('accessToken');
        if (!Token) {
            setUser(null);
            setLoggedIn(false);
            return;
        }

        let newOrderIds = []; // Temporary array to store order IDs

        try {
            for (const product of products) {
                const formData = new FormData();
                formData.append('paper_id', product.id);
                formData.append('status', 'Pending');

                const response = await fetch("https://api.iwemiresearch.org/api/auth/profile/orders/", {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    },
                    body: formData, // Include formData in the request
                });

                const responseJson = await response.json();

                if (!response.ok) {
                    toast.error("Error adding to orders");
                    break; // Stop further processing if there's an error
                }
                //console.log(responseJson)

                newOrderIds.push(responseJson.id);
                console.log(newOrderIds)
            }
            orderIds = newOrderIds;
            // If all requests succeed
            toast.success("All products added to orders");
        } catch (error) {
            console.error("An error occurred:", error);
            toast.error("An error occurred while adding products to orders");
        }
    }
    const ammendOrder = async (string) => {
        const Token = localStorage.getItem('accessToken');
        if (!Token) {
            setUser(null);
            setLoggedIn(false);
            return;
        }

        try {
            for (const [index, product] of products.entries()) {
                const jsonData = {
                    'paper_id': product.id,
                    'status': string, // Make sure `string` is the actual status value you intend to pass
                    'id': orderIds[index],
                    'download_links': downloadLinks
                };// Use the corresponding orderId

                console.log(orderIds)
                console.log(jsonData)

                const response = await fetch("https://api.iwemiresearch.org/api/auth/profile/orders/", {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Token}`,
                    },
                    body: JSON.stringify(jsonData)
                });

                const responseJson = await response.json();
                if (!response.ok) {
                    toast.error("Error updating order");
                    break; // Stop further processing if there's an error
                }
            }
            // If all requests succeed
            toast.success("All orders updated successfully");
        } catch (error) {
            console.error("An error occurred:", error);
            toast.error("An error occurred while updating orders");
        }
    }
    const randomReference = () => {
        const length = 10;
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        //console.log(result)
        return result;
    };

    const merchantCode = 'MX68314';
    const payItemId = 'Default_Payable_MX68314';
    let tf = null
    let amt = Number((total * conversionRate) * 100)
    const checkoutInterswitch = () => {
        if (amt == 0) {
            toast.info("No need to put in payment details")
            handlePaymentSuccess()
            return
        }
        if (user) {
            const transRef = randomReference();
            tf = transRef
            const paymentRequest = {
                merchant_code: merchantCode,
                pay_item_id: payItemId,
                txn_ref: transRef,
                amount: Number((total * conversionRate) * 100),
                cust_id: user.email,
                currency: 566,
                site_redirect_url: window.location.origin,
                onComplete: paymentCallback,
                mode: 'LIVE'//change to live for production
            }

            window.webpayCheckout(paymentRequest)//initiates payemnt request

        }
    }



    const paymentCallback = async (response) => {

        if (response !== null) {
            toast.info(response.desc); // Handle response as per your application's needs

            try {
                const response = await fetch(`https://qa.interswitchng.com/collections/api/v1/gettransaction.json?merchantcode=MX68314&transactionreference=${tf}&amount=${amt} `, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                // Parse the response JSON
                const data = await response.json();
                console.log('Transaction Data:', data);

                if (data.ResponseCode === '00') {
                    // Success response code

                    console.log('Transaction Approved:', data.ResponseDescription);
                    handlePaymentSuccess()
                    // Perform actions when the transaction is approved
                } else {
                    // Handle other response codes
                    console.error('Transaction Failed:', data.ResponseDescription);
                    // Perform actions when the transaction is not approved
                }

            } catch (error) {
                console.error('Error fetching transaction:', error);
            }


        }
    };



    // const stripePromise = loadStripe('pk_test_51Pl654BtS3lVeLJEYpzqhlEkp4B9qmaX8ch4gJDslvwEm0kTw06sOZJ9Pc9J0VlC2wP2hiFqa0R43nHcXCwLFQWW00QtE9aDAU');
    // const { accessToken } = useContext(GlobalStateContext);


    // localStorage.setItem('access', accessToken)

    const checkoutStripe = async () => {
        try {
            const response = await axios.post('https://api.iwemiresearch.org/api/create-payment-intent/', {
                productname: products.name,
                amount: Number((total * conversionRate) * 100),
                currency: 'ngn',
                success_url: 'http://iwemiresearch.org/payment',
                cancel_url: 'http://iwemiresearch.org/payment',
                order_id: orderIds
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            const sessionId = response.data.id;
            const stripePromise = loadStripe(response.data.publicKey)

            const stripe = await stripePromise; // Load Stripe.js using the public key

            await stripe.redirectToCheckout({ sessionId });
            //toast.success("Payment successful")
            try {
                const Token = localStorage.getItem('accessToken');
                if (!Token) {
                    setUser(null);
                    setLoggedIn(false);
                    return;
                }

                let allOrdersSuccessful = true;

                for (const orderId of orderIds) {
                    const response = await fetch(`https://api.iwemiresearch.org/api/auth/profile/orders/${orderId}/`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${Token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const orderData = await response.json();

                    if (orderData.status !== 'Successful') {
                        allOrdersSuccessful = false;
                        toast.error(`Order ${orderId} payment was not completed`);
                    }
                }

                if (allOrdersSuccessful) {
                    handlePaymentSuccess();
                } else {
                    toast.warning('Some orders were not successfully processed');
                }

            } catch (error) {
                console.error('Error checking order status:', error);
                toast.error('An error occurred while verifying the order status');
            }
           
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };


    const checkoutFlutterwave = () => {


        const paymentAmt = Number(total * conversionRate)
        if (paymentAmt === 0) {
            setLoading(true)
            handlePaymentSuccess()
            setLoading(false)
            //toast.success('No payment needed')
            //toast.success('Check mail for more details')
        } else {
            // Flutterwave checkout logic
            FlutterwaveCheckout({
                public_key: "FLWPUBK-10ac2f201135496dd2199096b7a37fac-X",
                tx_ref: `txref-${Date.now()}`,
                amount: paymentAmt,
                currency: `${currencyCode}`,
                payment_options: "card, ussd, banktransfer, account, internetbanking, nqr, applepay, googlepay, enaira, opay",
                customer: {
                    email: `${user.email}`,

                },
                customizations: {
                    title: "Iwemi Research",
                    description: "Payment for research material",
                    // logo: { iwemi_logo },
                },
                callback: async function (payment) {
                    // await verifyTransactionOnBackend(payment.id);
                    handlePaymentSuccess();
                },
                onclose: function (incomplete) {
                    if (incomplete) {
                        toast.error('Payment was not completed')
                    }
                },
            });
        }

        setLoading(false)

    };

    const verifyTransaction = async (transactionId) => {
        try {
            const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_SECRET_KEY`, // Replace with your actual secret key
                },
            });
    
            const data = await response.json();
    
            if (data.status === "success") {
                console.log("Transaction verified successfully:", data);
                handlePaymentSuccess()

                // Handle successful verification here
            } else {
                console.error("Transaction verification failed:", data);
                // Handle failed verification here
            }
        } catch (error) {
            console.error("Error verifying transaction:", error);
            // Handle error here
        }

        setTimeout(function () {
            window.verified = true;
        }, 200)
    };



    const handlePaymentSuccess = async () => {
        console.log("success payment handle")
        if (fromUploadPage) {
            const formData = JSON.parse(localStorage.getItem('openFormData'))

            const response2 = await fetch("https://api.iwemiresearch.org/api/papers/", {
                method: 'POST',
                body: formData
            })

            if (!response2.ok) {
                toast.error('Payment failed')
            } else {
                toast.success('Book uploaded successfully')
                localStorage.removeItem('openFormData')
                navigate('/')
                toast.success('Payment was successful')
            }

            const newFile = {
                name: formData.title,
                size: (formData.size / 1024).toFixed(2) + 'KB',
                date: new Date().toLocaleString(),
                option: 'Open-Access'
            }

            const updatedUploadedFiles = [...uploadedFiles, newFile]
            setUploadedFiles(updatedUploadedFiles)
            localStorage.setItem(`uploadedFiles_${userId}`, JSON.stringify(updatedUploadedFiles))
            toast.success("Upload Succesfull")


            navigate('/')

        } else {
            /**using editionguard */
            const bookList = products.map(product => ({
                resource_id: product.resource_id,
                quantity: product.quantity
            }))

            //console.log(JSON.stringify(bookList))
            //request body
            const requestBody = new FormData()
            requestBody.append('book_list', JSON.stringify(bookList))
            requestBody.append('email', 'nkemka@gmail.com')
            requestBody.append('full_name', `${user.name} ${user.last_name}`)
            requestBody.append('reply_to', 'support@iwemiresearch.org')
            //requestBody.append('email_template', emailContent)

            const token = '3bc699cc93f50ebadd635e7cb1ed80b733eecc0a'
            try {
                const response = await fetch('https://app.editionguard.com/api/v2/deliver-book-links', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                    body: requestBody
                })

                const responseText = await response.text();
                //console.log('Response Text:', responseText);

                if (!response.ok) {
                    throw new Error('Failed to get the book links');
                }

                const linkRegex = /<a href=(https:\/\/app\.editionguard\.com\/download\/.*?)>/g;

                let match;
                while ((match = linkRegex.exec(responseText)) !== null) {
                    downloadLinks.push(match[1]);
                }

                if (downloadLinks.length === 0) {
                    throw new Error('Download links not found in the response');
                }

                //we are calling it twice to get the downloaded links and being able to use in the email content


                // Arrays you want to generate
                const paper_names = products.map(product => product.name);
                const download_links = downloadLinks; // Assuming downloadLinks array is already populated with the correct download links in order
                const prices = products.map(product => product.price || 0); // Handling cases where price might be undefined

                //console.log('Paper Names:', paper_names);
                //console.log('Download Links:', download_links);
                //console.log('Prices:', prices);

                const emailBody = {
                    'paper_names': paper_names,
                    "download_links": download_links,
                    "prices": prices,
                    "currency_code": currencyCode,
                    "user_email": user.email,
                    "user": {
                        "name": user.name,
                        "last_name": user.last_name
                    }
                }


                const emailResponse = await fetch('https://api.iwemiresearch.org/api/papers/download/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }, body: JSON.stringify(emailBody)
                })
                //console.log(emailBody)

                if (!emailResponse.ok) {
                    toast.error("error sending mail")
                    return
                }

                const data = emailResponse.json()
                //console.log("emaild ata:", data)

                //request body
                /**const requestBody_again = new FormData()
                requestBody_again.append('book_list', JSON.stringify(bookList))
                requestBody_again.append('email', user.email)
                requestBody_again.append('full_name', `${user.name} ${user.last_name}`)
                requestBody_again.append('reply_to', 'support@iwemiresearch.org')
                requestBody_again.append('email_template', emailContent)


                const response_again = await fetch('https://app.editionguard.com/api/v2/deliver-book-links', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                    body: requestBody_again
                })

                const data = await response_again.text()
                console.log('data is ready:', data) */


            } catch (error) {
                console.error('Error getting book links:', error);
                //alert('Failed to get book links. Please try again');
            }
            //toast.success('Payment Successfull!')
            navigate('/')
            toast.success('Payment was successful!', {
                position: window.innerWidth < 768 ? "top-center" : "top-right",
                autoClose: 2000, // Auto close after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })

        }

        await ammendOrder('Successful')


    }









    return loading ?
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-content-center border-4 border-gray-400 border-t-orange-800 rounded-full animate-spin">

            </div>
        </div>
        : (
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
                                            onClick={() => { addToOrders(); checkoutInterswitch(); }}
                                            className={`flex  gap-2 px-4 py-2 rounded-lg font-medium transition-transform duration-300  text-gray-700  hover:scale-105`}
                                        >
                                            <img src={interswitch_img} alt="Interswitch Logo" className="h-6 w-6" />
                                            Interswitch
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { addToOrders(); checkoutStripe(); }}
                                            className={`flex  gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-700 hover:scale-105`}
                                        >
                                            <img src={stripe_img} alt="Stripe Logo" className="h-6 w-6" />
                                            Stripe
                                        </button>
                                        <button
                                            type="button"
                                            onClick={async () => { await addToOrders(); await checkoutFlutterwave(); }}
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
                                                    <dd className="text-base font-medium text-gray-900 dark:text-white">{currencyCode} {(product.price * conversionRate).toFixed(2) || 0}</dd>
                                                </dl>
                                            ))}
                                        </div>

                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700 ">
                                            <dt className="text-base font-bold text-gray-900 dark:text-white" >Total</dt>
                                            <dd className="text-base font-bold text-gray-900 dark:text-white" id='total' value={totals} onChange={(e) => { setTotal(e.target.value) }}>{currencyCode} {(total * conversionRate).toFixed(2)}</dd>
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

                </div>

            </div>
        )
}

export default Payment
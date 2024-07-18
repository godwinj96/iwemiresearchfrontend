import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import { useLocation } from 'react-router-dom'
import logo from '../../assets/flutterwave.png'
import { GlobalStateContext } from '../../Context/GlobalState'
import interswitch_img from "../../assets/interswitch.png"
import stripe_img from '../../assets/stripe.png'

const Payment = () => {

    const { user, setUser, currency } = useContext(GlobalStateContext)

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


    // Calculate total price
    const total = products.reduce((sum, product) => sum + product.price, 0);



    const checkoutInterswitch = () => {
        if (user) {
             const merchantCode = 'YOUR_MERCHANT_CODE';
            const payItemId = 'YOUR_PAY_ITEM_ID';
            const transRef = randomReference();

            const paymentRequest = {
                merchant_code: merchantCode,
                pay_item_id: payItemId,
                txn_ref: transRef,
                amount:1000,
                cust_id: user.email,
                currency: currency,
                site_redirect_url: window.location.origin,
                onComplete: paymentCallback,
                mode: 'TEST'//change to live for production
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
        }
    };

    const checkoutStripe = () => {
        // Stripe checkout logic
    };

    const checkoutFlutterwave = () => {
        // Flutterwave checkout logic
        FlutterwaveCheckout({
            public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
            tx_ref: "titanic-48981487343MDI0NzMx",
            amount: 54600,
            currency: "NGN",
            payment_options: "card, mobilemoneyghana, ussd",
            redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
            meta: {
              consumer_id: 23,
              consumer_mac: "92a3-912ba-1192a",
            },
            customer: {
              email: "rose@unsinkableship.com",
              phone_number: "08102909304",
              name: "Rose DeWitt Bukater",
            },
            customizations: {
              title: "The Titanic Store",
              description: "Payment for an awesome cruise",
              logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
            }
          });
    };




    return (
        <div>
            <Navbar />
            <section class=" dark:bg-gray-900 dark payment-page">
                <div class=" max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div class="mr-auto place-self-center lg:col-span-7 flex flex-col items-center gap-16">
                        <div className="mt-4 lg:mt-0 flex flex-col gap-8">
                            <h1>How would you like to pay?</h1>
                            <div className="flex gap-4 ">
                                <button
                                    type="button"
                                    onClick={checkoutInterswitch}
                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-transform duration-300 bg-gray-200 text-gray-700  hover:scale-105`}
                                >
                                    <img src={interswitch_img} alt="Interswitch Logo" className="h-6 w-6" />
                                    Interswitch
                                </button>
                                <button
                                    type="button"
                                    onClick={checkoutStripe}
                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-gray-200 text-gray-700 hover:scale-105`}
                                >
                                    <img src={stripe_img} alt="Stripe Logo" className="h-6 w-6" />
                                    Stripe
                                </button>
                                <button
                                    type="button"
                                    onClick={checkoutFlutterwave}
                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-gray-200 text-gray-700 hover:scale-105`}
                                >
                                    <img src={logo} alt="Flutterwave Logo" className="h-6 w-6" />
                                    Flutterwave
                                </button>
                            </div>
                        </div>
                        <div class="mt-6 grow sm:mt-8 lg:mt-0">
                            <div class="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                <div class="space-y-2">
                                    {products.map((product, index) => (
                                        <dl key={index} class="flex items-center justify-between gap-4">
                                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">{product.name}</dt>
                                            <dd class="text-base font-medium text-gray-900 dark:text-white">${product.price}</dd>
                                        </dl>
                                    ))}
                                </div>

                                <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt class="text-base font-bold text-gray-900 dark:text-white" >Total</dt>
                                    <dd class="text-base font-bold text-gray-900 dark:text-white" id='total' value={totals} onChange={(e) => { setTotal(e.target.value) }}>${total.toFixed(2)}</dd>
                                </dl>
                            </div>

                            <div class="mt-6 flex items-center justify-center gap-8">
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
                                <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                                <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='dark'>
                <Footer />
            </div>

        </div>
    )
}

export default Payment
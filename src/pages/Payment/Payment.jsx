/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
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

    const { results, setResults, isSearch, setIsSearch, user, uploadedFiles,setUploadedFiles} = useContext(GlobalStateContext)

    //reset search on route change

    const { currencyCode } = useCurrency()

    const navigate = useNavigate()

    const [totals, setTotal] = useState('')
  
    useEffect(() => {
        const storedProduct = localStorage.getItem('product')
        if (storedProduct) {
            const parsedProduct = JSON.parse(storedProduct)
            setTotal(parsedProduct.price)
        }
    }, [])

    const location = useLocation()
    const products = location.state?.products || [];
    const total = location.state?.total || 0
    const fromUploadPage = location.state?.fromUploadPage || false
    // Calculate total price
    //const total = products.reduce((sum, product) => sum + product.price, 0);

    useEffect(() => {
        setIsSearch(false)
        setResults([])
    }, [location, setIsSearch,setResults])

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

        const paymentAmt = Number(total)
        if (paymentAmt === 0) {
            handlePaymentSuccess()
            //toast.success('No payment needed')
            //toast.success('Check mail for more details')
        } else {
            // Flutterwave checkout logic
            FlutterwaveCheckout({
                public_key: "FLWPUBK-8d47ef6a8ee32b71f792a60461269335-X",
                tx_ref: `txref-${Date.now()}`,
                amount: paymentAmt,
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
                    handlePaymentSuccess()
                },
                onclose: function (incomplete) {
                    if (incomplete) {
                        alert('Payment was not completed')
                    }
                },
            });
        }

    };

    const verifyTransactionOnBackend = (transactionId) => {
        setTimeout(function () {
            window.verified = true;
        }, 200)
    }

    const handlePaymentSuccess = async () => {
        if (fromUploadPage) {
            const formData = JSON.parse(localStorage.getItem('openFormData'))

            const { data, error } = await supabase
                .from('api_book')
                .insert([
                    {
                        name: formData.title,
                        author: formData.authors,
                        year_published: formData.yearP,
                        date_uploaded: formData.date,
                        category_id: formData.categoryId,
                        subcategory_id: formData.subcategory_id,
                        discipline_id: formData.discipline_id,
                        file_url: formData.fileUrl,
                        is_open_access: true,
                    }
                ])

            if (error) {
                toast.error('Payment failed')
            } else {
                toast.success('Book uploaded successfully')
                localStorage.removeItem('openFormData')
                navigate('/')
                toast.success('Payment was succeful')
            }

            const newFile = {
                name: formData.title,
                size: (formData.size/1024).toFixed(2) + 'KB',
                date: new Date().toLocaleString(),
                option: 'Open-Access'
            }

            const updatedUploadedFiles = [...uploadedFiles, newFile]
            setUploadedFiles(updatedUploadedFiles)
            localStorage.setItem(`uploadedFiles_${user.id}`,JSON.stringify(updatedUploadedFiles))

            

            navigate('/')
            
        } else {
            /**using editionguard */
            const bookList = products.map(product => ({
                resource_id: product.resource_id,
                quantity: product.quantity
            }))


            //request body
            const requestBody = new FormData()
            requestBody.append('book_list', JSON.stringify(bookList))
            requestBody.append('email', 'nkemka@gmail.com')
            requestBody.append('full_name', `${user.user_metadata.firstName} ${user.user_metadata.lastName}`)
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
                console.log('Response Text:', responseText);

                if (!response.ok) {
                    throw new Error('Failed to get the book links');
                }

                const linkRegex = /<a href=(https:\/\/app\.editionguard\.com\/download\/.*?)>/g;
                const downloadLinks = [];
                let match;
                while ((match = linkRegex.exec(responseText)) !== null) {
                    downloadLinks.push(match[1]);
                }

                if (downloadLinks.length === 0) {
                    throw new Error('Download links not found in the response');
                }

                //we are calling it twice to get the downloaded links and being able to use in the email content
                const emailContent = `<html>
    <head>
        <style>
            .container {
                width: 80%;
                margin: 0 auto;
                text-align: center;
                font-family: Arial, sans-serif;
            }
            .header {
                font-size: 2em;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .content {
                border: 1px solid #ccc;
                border-top: none;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
                margin-bottom: 20px;
            }
            .footer {
                font-size: 0.8em;
                color: #555;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            th, td {
                padding: 10px;
                border-bottom: 1px solid #ccc;
            }
            th {
                background-color: #f2f2f2;
            }
            a {
                color: #1a73e8;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Iwemi Research</div>
            <div class="content">
                <h1>Thank you for your purchase!</h1>
                <p>Dear ${user.user_metadata.firstName} ${user.user_metadata.lastName},</p>
                <p>Thank you for purchasing from our store. Below are the details of your order:</p>
                <table>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Download Link</th>
                    </tr>
                    ${products.map((product, index) => `
                        <tr>
                            <td>${product.name}</td>
                            <td>${product.quantity}</td>
                            <td>${currencyCode} ${product.price}</td>
                            <td><a href="${downloadLinks[index]}" class="download-link">Download your research material here!</a></td>
                        </tr>
                    `).join('')}
                </table>
                <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
                <p>Best regards,</p>
                <p>Iwemi Research</p>
            </div>
            <div class="footer">
                <p>This email was sent to ${user.email} because you made a purchase on our website. If you did not make this purchase, please contact our support team immediately.</p>
            </div>
        </div>
    </body>
</html>`

                //request body
                const requestBody_again = new FormData()
                requestBody_again.append('book_list', JSON.stringify(bookList))
                requestBody_again.append('email', user.email)
                requestBody_again.append('full_name', `${user.user_metadata.firstName} ${user.user_metadata.lastName}`)
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

                const data = await response_again.json()
                console.log('data is ready:', data)
            } catch (error) {
                console.error('Error getting book links:', error);
                //alert('Failed to get book links. Please try again');
            }
            alert('Payment Successfull!')
            navigate('/')
            toast.success('Payment was successful!')

        }


        /*
        *1st trial
        const emailResponse = await fetch('https://moozotwbqobybcbidade.functions.supabase.co/send-payment-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 567d8a3126a302116a96787726b2a2aade446a8b9e7d48994509b30eab7ffa05`
            },
            body: JSON.stringify({
                email: user.email,
                paymentDetails: {
                    amount: total,
                    date: new Date(),
                    //products: products
                }
            })
        })

        const emailData = await emailResponse.json()
        if (emailResponse.ok) {
            console.log('Email sent successfully:', emailData)
            navigate('/')
        } else {
            console.error('failed to send email:', emailData)
        } */

        /**
         * 2nd trial
         * const paymentDetails = {
        amount: 100, // Example amount
        date: new Date().toISOString()
    };

    const service_key = '9154f4a620dde6574de77da68e65fd31fed7932262db8430426028d89edae17a'

    try {
        const response = await fetch('https://moozotwbqobybcbidade.supabase.co/functions/v1/send-payment-email', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${service_key}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                from: 'onboarding@resend.dev',
                to: user.email,
                subject: 'Payment Success',
                html: '<strong>Your payment was successful!</strong>',
              }),
        });

        if (!result.ok) {
            throw new Error('Failed to send email')
        }
        const result = await response.json();
        
        console.log('Email sent succesfully:', result)
        

    } catch (error) {
        console.error('Unexpected error:', error);
    } */

        //api calling to get the links for each drm book
        //links would be in email


    }






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
               
            </div>

        </div>
    )
}

export default Payment
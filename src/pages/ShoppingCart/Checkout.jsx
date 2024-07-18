import React, { useState } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import Currency from '../../components/Currency/Currency'
import logo from '../../assets/flutterwave.png'

const Checkout = () => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [company, setCompany] = useState('')



  const handlePaymentMethodChange = (method)=>{
    setSelectedPaymentMethod(method)
    setFormDisabled(method!=='form')
}
const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('interswitch') //'form', 'interswitch', 'stripe', 'flutterwave


  return (
    <div>
      <Navbar />
      <section class="bg-white dark:bg-gray-900">
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">

          <div class=" lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
          </div>
          <div class="mr-auto place-self-center lg:col-span-7">
            <div className="mt-4 lg:mt-0">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Or pay with:</h3>
              <div className="flex gap-4">
                <button type="button" onClick={() => handlePaymentMethodChange('interswitch')} className={`btn ${selectedPaymentMethod === 'interswitch' ? 'btn-primary' : 'btn-secondary'}`}>Interswitch</button>
                <button type="button" onClick={() => handlePaymentMethodChange('stripe')} className={`btn ${selectedPaymentMethod === 'stripe' ? 'btn-primary' : 'btn-secondary'}`}>Stripe</button>
                <button type="button" onClick={() => handlePaymentMethodChange('flutterwave')} className={`btn ${selectedPaymentMethod === 'flutterwave' ? 'btn-primary' : 'btn-secondary'}`}>Flutterwave</button>
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
                                            <dd class="text-base font-bold text-gray-900 dark:text-white" value={totals} onChange={(e) => { setTotal(e.target.value) }}>${total.toFixed(2)}</dd>
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

export default Checkout
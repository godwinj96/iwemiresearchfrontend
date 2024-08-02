import { useState } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

import logo from '../../assets/iwemi logo.png'
import { supabase } from '../../supaBaseClient'

const ForgotPassword = () => {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')



  const handleResetLink = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    //user
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-Password'
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage("Password reset link sent. Check your email")
    }
  }

  return (
    <div>
      <Navbar />
      <div className="forgot-password-page">
        <section className=" dark">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className=" h-8 mr-2" src={logo} alt="logo" />

            </a>
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleResetLink}>
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter you email" required="" />
                </div>

                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send reset link</button>
              </form>
              {message && <p className='text-white'>{message}</p>}
              {error && <p className='text-white'>{error}</p>}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default ForgotPassword
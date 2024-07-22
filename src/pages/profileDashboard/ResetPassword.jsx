import React, { useState } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import logo from '../../assets/iwemi logo.png'
import { supabase } from '../../supaBaseClient'

const ResetPassword = () => {

    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showconfirmPassword, setShowconfirmPassword] = useState(false)


    const handlePassowrdUpdate = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        if (newPass !== confirmPass) {
            setError('Password do not match')
            return
        }
        const { user, error } = await supabase.auth.updateUser({
            password: newPass
        })

        if (error) {
            setError(error.message)
        } else {
            setMessage('Password updated successfully. You can now log in with your new password')
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const toggleConfirmPasswordVisibility = () => {
        setShowconfirmPassword(!showconfirmPassword)
    }

    return (
        <div>
            <Navbar />
            <div className="reset-page">
                <section className="dark">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className=" h-8 mr-2" src={logo} alt="logo" />

                        </a>
                        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Change Password
                            </h2>
                            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handlePassowrdUpdate}>

                                <div className='relative'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input

                                        value={newPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        name="password" id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 px-3 mt-6 text-white flex items-center text-sm leading-5"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                <div className='relative'>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input
                                        value={confirmPass}

                                        onChange={(e) => setConfirmPass(e.target.value)}
                                        type={showconfirmPassword ? "text" : "password"} name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-0 px-3 mt-6 text-white flex items-center text-sm leading-5"
                                    >
                                        {showconfirmPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>

                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset password</button>
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

export default ResetPassword
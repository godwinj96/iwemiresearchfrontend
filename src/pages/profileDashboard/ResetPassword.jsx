import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../../assets/iwemi logo.png'
import { GlobalStateContext } from '../../Context/GlobalState'
import HomeBookCards from '../../components/BookCards/HomeBookCards'
import AOS from 'aos';
import 'aos/dist/aos.css';

const ResetPassword = () => {

    const { uidb64, token } = useParams();
    const navigate = useNavigate()
    const location = useLocation()
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showconfirmPassword, setShowconfirmPassword] = useState(false)
    const { user, searchInput, isSearch, results, setResults, setIsSearch } = useContext(GlobalStateContext)


    useEffect(() => {
        setIsSearch(false)
        setResults([])
    }, [location, setIsSearch, setResults])
    
    useEffect(() => {
        // Initialize AOS
        AOS.init({
          duration: 1000,
          once: true,
          delay: 100 // Add a small delay
        });
      }, []);

    const handlePassowrdUpdate = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')
        toast.info("password changing...", {
            autoClose: 1000
        })


        if (newPass !== confirmPass) {
            setError('Password do not match')
            return
        }



        try {

            const resetForm = {
                new_password1: newPass,
                new_password2: confirmPass,
                uid: uidb64,
                token: token
            };



            const response = await fetch(`https://api.iwemiresearch.org/api/auth/password/reset/confirm/${uidb64}/${token}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resetForm)
            })
            console.log(resetForm)
            if (!response.ok) {
                toast.error("Try again")
                console.log(await response.json())
            }

            toast.success('Password has been reset successfully')
            navigate('/login')
        } catch (error) {
            console.error(error)
            setMessage('There was an error resetting your password. Please try again')

        }

        /**
         *  const { user, error } = await supabase.auth.updateUser({
            password: newPass
        })
         
       
        const { error } = await supabase.auth.updateUser({
            password: newPass
        })

        if (error) {
            setError(error.message)
        } else {
            setMessage('Password updated successfully. You can now log in with your new password')
        }
            */
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const toggleConfirmPasswordVisibility = () => {
        setShowconfirmPassword(!showconfirmPassword)
    }

    return (
        <div>

            {isSearch ? (<section className="dark:bg-gray-900 features" data-aos="fade-up">
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
            </section>) : (<div className="reset-page">
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
            </div>)}

        </div>
    )
}

export default ResetPassword
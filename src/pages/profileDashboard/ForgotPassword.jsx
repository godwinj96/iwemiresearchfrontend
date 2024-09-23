import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import logo from '../../assets/iwemi logo.png'
import { GlobalStateContext } from '../../Context/GlobalState'
import HomeBookCards from '../../components/BookCards/HomeBookCards'

const ForgotPassword = () => {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { user, loading, results, setResults, isSearch, setIsSearch, searchInput } = useContext(GlobalStateContext);



  const handleResetLink = async (e) => {
    e.preventDefault()
    toast.info("reset link sending...", {
      autoClose: 1000
    })
    setError('')
    setMessage('')
    //user
    try {
      const response = await fetch('https://api.iwemiresearch.org/api/auth/password/reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        //setMessage("Password reset link sent. Check your email")
        toast.success("Check email to reset password")
      } else {
        toast.error("error")
      }

    } catch (error) {
      setMessage('There was an error, please try again')
    }


    /**
     * const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-Password'
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage("Password reset link sent. Check your email")
    }
     */

  }

  return (
    <div>

      {isSearch ? (
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
      ) : (<div className="forgot-password-page">
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
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
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
      </div>)}

    </div>
  )
}

export default ForgotPassword
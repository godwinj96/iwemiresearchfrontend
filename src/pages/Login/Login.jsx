/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/iwemi logo.png';
import HomeBookCards from '../../components/BookCards/HomeBookCards';
import { GlobalStateContext } from '../../Context/GlobalState';



const Login = ({ setToken }) => {
  const { loggedIn, setLoggedIn, user, setUser, results, setResults, isSearch, setIsSearch,handleLogin,loading } = useContext(GlobalStateContext)


  const location = useLocation()
  //reset search on route change
  useEffect(() => {
    setIsSearch(false)
    setResults([])
  }, [location])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')

  const signUp = () => {
    setLoggedIn(false)
    navigate('/signup')
  }

  const ForgotPassword = () => {
    navigate('/password-reset')
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem(`${userId}_email`)
    const storedPassword = localStorage.getItem(`${userId}_password`)
    if (storedEmail && storedPassword) {
      setEmail(storedEmail)
      setPassword(storedPassword)
      setRememberMe(true)
    }
  }, [])

  const handleActualLogin = async (e) => {
    e.preventDefault()
    const loginForm = new FormData()

    console.log("login started")
    
    loginForm.append("email", email)
    loginForm.append("password", password)

    const from = location.state?.from || '/'
    await handleLogin(loginForm,from)
  } 
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return loading ?
  <div className="grid place-items-center min-h-[80vh]">
    <div className="w-16 h-16 place-content-center border-4 border-gray-400 border-t-orange-800 rounded-full animate-spin">

    </div>
  </div>
  : (
    <div className='login-container'>

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
        (<div className='login-page'>
          <section className=" dark:bg-gray-900 login dark">
            <div className="flex flex-col items-center justify-center  mx-auto md:h-screen lg:py-0 login-div">
              <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white logo-link">
                <img className=" h-8 mr-2" src={logo} alt="logo" />
              </a>

              <div className="w-full bg-white rounded-lg shadow dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 login-box">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 login-content">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleActualLogin}>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className='relative'>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 mt-6 text-white flex items-center text-sm leading-5"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                        onClick={(e) => {
                          e.preventDefault();
                          ForgotPassword()
                        }}
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"


                    >
                      Sign in
                    </button>

                    <div>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        New to Iwemi Research?{" "}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent default anchor behavior
                            signUp();
                          }}
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                        >
                          Sign up
                        </a>
                      </p>

                    </div>
                  </form>
                </div>
              </div>



            </div>
          </section>
        </div>)}

      <div className='dark'>

      </div>
    </div>
  );
};


export default Login;


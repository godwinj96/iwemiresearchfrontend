/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GlobalStateContext } from '../../Context/GlobalState';
import logo from '../../assets/iwemi logo.png';
import HomeBookCards from '../../components/BookCards/HomeBookCards';
import Footer from '../../components/Footer/Footer';

const SignUpPublish = () => {

  const [publisherName, setPublisherName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showconfirmPassword, setShowconfirmPassword] = useState(false)


  const { results, setResults, isSearch, setIsSearch, } = useContext(GlobalStateContext)
  const location = useLocation()
  //reset search on route change
  useEffect(() => {
    setIsSearch(false)
    setResults([])
  }, [location])


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const toggleConfirmPasswordVisibility = () => {
    setShowconfirmPassword(!showconfirmPassword)
  }

  const navigate = useNavigate()
  const signIn = () => {
    navigate('/login')
  }


  const terms = () => {
    navigate('/terms-Conditions')
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (password != confirmpassword) {
      alert("Password do not match!")
      return;
    }
    const signUpForm = new FormData()
    signUpForm.append("name", publisherName)
    signUpForm.append("last_name","")
    signUpForm.append("email", email)
    signUpForm.append("password1", password)
    signUpForm.append("password2", confirmpassword)


    try {
      const response = await fetch("http://localhost:8014/api/auth/register/", {
        method: 'POST',
        headers: {
          'accept': 'application/json'
        },
        body: signUpForm
      })

      if (!response.ok) {
        toast.error("Try again")
      } else {
        toast.success("Check your email for verification link")
        console.log("signed up!!!!!!!!")
        navigate('/login')
      }

    } catch (error) {
      alert(error)
    }
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
        (<div className="signup-page">
          <section className=" dark:bg-gray-900 dark">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className=" h-8 mr-2" src={logo} alt="logo" />
              </a>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
                    <div>
                      <label htmlFor="publisherName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Publisher Name</label>
                      <input type="publisherName" value={publisherName}
                        onChange={(e) => setPublisherName(e.target.value)} name="publisherName" id="publisherName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your first name" required="" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required="" />
                    </div>
                    <div className='relative'>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type={showPassword ? "text" : "password"} value={password}
                        onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 mt-6 text-white flex items-center text-sm leading-5"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className='relative'>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type={showconfirmPassword ? "text" : "password"} value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 mt-6 text-white flex items-center text-sm leading-5"
                      >
                        {showconfirmPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href=""
                          onClick={(e) => {
                            e.preventDefault()
                            terms()
                          }}
                        >Terms and Conditions</a></label>
                      </div>
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        onClick={(e) => {
                          e.preventDefault();
                          signIn()
                        }}
                      >Login here</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>)}
      <div className='dark'>
        <Footer />
      </div>

    </div>
  );
};

export default SignUpPublish;

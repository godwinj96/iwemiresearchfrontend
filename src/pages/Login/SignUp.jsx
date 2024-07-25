import React, { useContext, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar/NavBar';
import logo from '../../assets/iwemi logo.png'
import { supabase } from '../../supaBaseClient';
import { GlobalStateContext } from '../../Context/GlobalState';

const SignUp = () => {
  const { setLoggedIn,user } = useContext(GlobalStateContext)

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showconfirmPassword, setShowconfirmPassword] = useState(false)


  const navigate = useNavigate()
  const signIn = () => {
    navigate('/login')
  }
  const contactUs = () => {
    navigate('/contact')
  }

  const terms = () => {
    navigate('/terms&Conditions')
  }


  const handleSignUp = async (e) => {
    e.preventDefault()
    if (password != confirmpassword) {
      alert("Password do not match!")
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            confirmpassword
          },
          emailRedirectTo :'iwemiresearch.org/login'
        }
      });
      alert("Check your email for verification link")
     
      navigate('/login')
      if (error) throw error
    } catch (error) {
      alert(error)
    }



    /**if (error) {
      console.error('Error signing up:', error.message)
    } else {
      console.log('User signed up:', user)
      setLoggedIn(true);
      navigate('/home')//redirect to home page
    } */

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
      <div className="signup-page">
        <section className=" dark:bg-gray-900 dark">
          <div className="flex flex-col items-center justify-center px-6 py-10  mx-auto md:min-h-screen lg:py-2">
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
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your First Name</label>
                    <input type="firstName" value={firstName}
                      onChange={(e) => setFirstName(e.target.value)} name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your first name" required="" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Last Name</label>
                    <input type="lastName" value={lastName}
                      onChange={(e) => setLastName(e.target.value)} name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your last name" required="" />
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
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input 
                    type={showconfirmPassword ? "text" : "password"} 
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    name="confirm-password" 
                    id="confirm-password" 
                    placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
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
                      <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        onClick={(e) => {
                          e.preventDefault();
                          terms()
                        }}
                      >Terms and Conditions</a></label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >Create an account</button>
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
      </div>
      <div className='dark'>
        <Footer />
      </div>

    </div>
  );
};

export default SignUp;

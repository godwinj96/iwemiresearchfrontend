// src/components/Navbar.js
/* eslint-disable */

import React, { useContext, useEffect, useRef, useState } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/new iwemi.png';
import { useCart } from '../../Context/CartContext';
import { GlobalStateContext } from '../../Context/GlobalState';
import RegisterDropdown from '../../pages/Login/RegisterDropdown';
import { SearchBar } from '../SearchBar/components/SearchBar.jsx';


const Navbar = () => {
  const { query, loggedIn, } = useContext(GlobalStateContext)
  const { state } = useCart()


  const [menu, setMenu] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showNoti, setShowNoti] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef(null)

  const [registerDropdown, setRegisterDropdown] = useState(false)
  const menuRef = useRef(null)
  const menuMenuRef = useRef(null)
  const dropdownRef = useRef(null)

  //api
  const handleRegClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setRegisterDropdown(false);
    }
  };

  const handleSearchOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsSearchOpen(false)
    }
  }


  const toggleMenu = () => {
    setMenu(!menu)
  }
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && !menuMenuRef.current.contains(e.target)) {
      setMenu(false);
    }
  }

  useEffect(() => {
    if (menu) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleSearchOutside)
    } else {
      document.removeEventListener('mousedown', handleSearchOutside);
    }

    if (registerDropdown) {
      document.addEventListener('click', handleRegClickOutside);
    } else {
      document.removeEventListener('click', handleRegClickOutside);
    }



    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('click', handleRegClickOutside);
      document.removeEventListener('mousedown', handleSearchOutside);



    };
  }, [menu, isSearchOpen, registerDropdown]);

  const toggleDropdown = (e) => {
    e.preventDefault()
    setRegisterDropdown(!registerDropdown)
  }

  const navigate = useNavigate()
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  //  const lastPath = pathnames[pathnames.length - 1]

  const loginClick = () => {
    navigate('/login')
  }

  const contact = () => {
    navigate('/contact')
  }
  const home = () => {
    navigate('/')
  }
  const cart = () => {
    navigate('/shopping-Cart')
  }

  const profileDashboard = () => {
    navigate('/Profile-dashboard')
  }
  const academic = () => {
    navigate('/academic-Textbooks')
  }
  const thesis = () => {
    navigate('/thesis-Dissertations')
  }

  const conference = () => {
    navigate('/conference-Papers')
  }
  const journals = () => {
    navigate('/journals')
  }






  return (
    <header className='dark'>
      <nav className=" border-gray-200  new-nav ">
        <div className="w-full flex  items-center justify-between mx-auto top-nav pr-8">


          <a href="/" className="flex  space-x-3 rtl:space-x-reverse">
            <img src={logo} className="" alt="Flowbite Logo" width={100} height={130} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
          </a>



          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {loggedIn ?
              <>
                <div className="icons">


                  {/* --------------- Search Bar Component -------------- */}

                  <SearchBar />

                  <div className='0'>
                    <svg className="Icon notification-icon relative" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onMouseEnter={() => { setShowNoti(true) }} onMouseLeave={() => { setShowNoti(false) }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V8a6 6 0 00-12 0v6c0 .265-.105.52-.293.707L4 17h5m6 0a3 3 0 11-6 0h6z"></path>
                    </svg>
                    {/*{showNoti && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">No new notifications</p>
                  </div>
                  )} */}
                  </div>


                  {/* <div className='Icon search-icon'>
                    <a href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setIsSearchOpen(true)
                      }}
                    >
                      <FaSearch size={20} />
                    </a>
                   



                  </div> */}
                  <div className='Icon cart-icon'>
                    <a href=""
                      onClick={(e) => {
                        e.preventDefault();
                        cart()
                      }}
                    >
                      <FiShoppingCart size={22} color='white' />
                    </a>
                    <span className="cartcount">{state.count}</span>
                  </div>



                  <div>
                    <svg className="Icon user-icon relative" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onMouseLeave={() => { setShowProfile(false) }} onMouseEnter={() => { setShowProfile(true) }} onClick={(e) => {
                      e.preventDefault();
                      profileDashboard();
                    }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A10 10 0 0112 15a10 10 0 016.879 2.804M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {/*{showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">Profile</p>
  
                </div>
              )}*/}
                  </div>

                </div>
                {/*              <a href='' className='dasboard-profile text-white' >Profile</a>*/}
              </>
              :
              <div className='flex nav-buttons mr-5 items-center'>

                <SearchBar />


                <div className='nav-right flex'>
                  <a
                    href=""
                    onClick={loginClick}
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ms-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 log-in">
                    Log in
                  </a>
                </div>
                <div className='flex'>
                  <a
                    ref={dropdownRef}
                    href=""
                    onClick={toggleDropdown}
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 get">
                    Get started
                  </a>
                  {registerDropdown && <RegisterDropdown />}
                </div>

              </div>
            }
            <button
              ref={menuRef}

              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100
                            focus:outline-none focus:ring-2 focus:ring-gray-200 
                                dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 main-menu-button"
              aria-expanded={menu}
              onClick={toggleMenu}
            >

              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1
                                1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 
                                1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" ></path></svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={toggleMenu}><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 
                                0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 
                                1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

            </button>
            {menu && (
              <div ref={menuMenuRef} className="dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-20">
                <ul>
                  {[
                    { text: "Home", onClick: home },
                    { text: "Journals", onClick: journals },
                    { text: "Thesis", onClick: thesis },
                    { text: "Conference Papers", onClick: conference },
                    { text: "Academic Textbooks", onClick: academic }
                  ].map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault();
                          item.onClick();
                          setMenu(false); // Close the menu
                        }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>



          <div className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1 nav-bar-list" id="navbar-cta">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
              {[
                { text: "Home", onClick: home },
                { text: "Journals", onClick: journals },
                { text: "Thesis", onClick: thesis },
                { text: "Conference Papers", onClick: conference },
                { text: "Academic Textbooks", onClick: academic }
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="block py-2 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-white whitespace-nowrap"
                    onClick={(e) => {
                      e.preventDefault();
                      item.onClick();
                    }}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/** where i thinnk navbar shld be
          * <div>io</div>*/ }



        </div>
        {/* <div className="sub-navbar flex">
          <div className='breadcrumb'>
            <nav className="flex  dark" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Iwemi Research
                  </a>
                </li>
                <li>



                  {location.pathname === "/" ? (
                    <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">

                    </span>
                  ) : (

                    <div className="flex items-center">
                      <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                      </svg>
                      <Link to={`/${lastPath}`} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                        {lastPath.charAt(0).toUpperCase() + lastPath.slice(1)}
                      </Link>
                    </div>
                  )}


                </li>

              </ol>
            </nav>
          </div>
          
        </div> */}


      </nav>



      <hr className='grey' />
    </header>
  );
};

export default Navbar;

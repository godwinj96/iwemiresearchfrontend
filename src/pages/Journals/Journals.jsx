import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'


const Journals = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  return (
    <div>
            <Navbar />
            <div className="thesis type flex flex-col items-center">
                <div className="thesis-hero flex items-center w-full">
                    <h1>
                        Journals
                    </h1>
                </div>
                <div className="empty w-full">

                </div>
                <div className="thesis-content flex w-full">
                    <div className="sidebar">

                        <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span class="sr-only">Open sidebar</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>

                        <aside id="sidebar-multi-level-sidebar" class=" w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                            <div class="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">
                                <ul class="space-y-2 font-medium">


                                    <li>
                                        <div class="flex items-center  text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group type-sidebar-left">
                                            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                            </svg>
                                            <span class="flex-1 ms-3 whitespace-nowrap">Category</span>

                                        </div>
                                        <ul className='type-category'>
                                            <li>
                                                <a href="">
                                                    Business Administration
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    Business Administration
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    Business Administration
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    Business Administration
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    Business Administration
                                                </a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li>
                                        <div class="flex items-center  text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group type-sidebar-left">
                                            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                            </svg>
                                            <span class="flex-1 ms-3 whitespace-nowrap">Access Type</span>
                                        </div>

                                        <div class="flex items-center mb-4">
                                            <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Open-Access</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non Open-Access</label>
                                        </div>

                                    </li>
                                    {/** <li>
                                        <div class="flex items-center  text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group type-sidebar-left">
                                            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                            </svg>
                                            <span class="flex-1 ms-3 whitespace-nowrap">Language</span>

                                        </div>
                                        <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                <div class="flex items-center ps-3">
                                                    <input id="vue-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="vue-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">English</label>
                                                </div>
                                            </li>
                                            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                <div class="flex items-center ps-3">
                                                    <input id="react-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">French</label>
                                                </div>
                                            </li>
                                            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                <div class="flex items-center ps-3">
                                                    <input id="angular-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="angular-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Espanol</label>
                                                </div>
                                            </li>
                                            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                <div class="flex items-center ps-3">
                                                    <input id="laravel-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="laravel-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Laravel</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>*/}




                                </ul>
                            </div>
                        </aside>



                    </div>
                    <div className="thesis-papers ">

                        <section class="  dark dark:bg-gray-900 p-3 sm:p-5">
                            <div ref={dropdownRef}>
                                <button 
                                onClick={toggleDropdown}
                                id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full dark md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                                    </svg>
                                    Filter
                                    <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </button>

                                {isDropdownOpen && <div id="filterDropdown" class="z-10 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                    <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                        Sort by:
                                    </h6>
                                    <ul class="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                                        <li class="flex items-center">
                                            <input id="apple" type="checkbox" value=""
                                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Name: Z to A
                                            </label>
                                        </li>
                                        <li class="flex items-center">
                                            <input id="apple" type="checkbox" value=""
                                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Name: A to Z
                                            </label>
                                        </li>
                                        <li class="flex items-center">
                                            <input id="fitbit" type="checkbox" value=""
                                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Created On
                                            </label>
                                        </li>
                                        
                                    </ul>
                                </div>}
                            </div>

                            <div className="type-papers flex flex-col">

                                <div className='each flex'>
                                    <div className="papers-left ">
                                        <h3>Thesis Article</h3>
                                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero. </h1>
                                        <text>
                                            <span>Sean Matt</span>{'  '},
                                            <span>Christopher Columbus</span> ,
                                            <span>Reggie Jackson</span>
                                        </text>

                                        <p className="abstract">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam
                                            animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus
                                            blanditiis ab vitae.
                                        </p>
                                    </div>
                                    <div className="papers-right flex flex-col">
                                        <button>Cite</button>
                                        <button>Save</button>
                                        <button className='download'>Download</button>
                                    </div>
                                </div>
                                <div className='each flex'>
                                    <div className="papers-left ">
                                        <h3>Thesis Article</h3>
                                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero. </h1>
                                        <text>
                                            <span>Sean Matt</span>{'  '},
                                            <span>Christopher Columbus</span> ,
                                            <span>Reggie Jackson</span>
                                        </text>

                                        <p className="abstract">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam
                                            animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus
                                            blanditiis ab vitae.
                                        </p>
                                    </div>
                                    <div className="papers-right flex flex-col">
                                        <button>Cite</button>
                                        <button>Save</button>
                                        <button className='download'>Download</button>
                                    </div>
                                </div>
                                
                                <div className='each flex'>
                                    <div className="papers-left ">
                                        <h3>Thesis Article</h3>
                                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero. </h1>
                                        <text>
                                            <span>Sean Matt</span>{'  '},
                                            <span>Christopher Columbus</span> ,
                                            <span>Reggie Jackson</span>
                                        </text>

                                        <p className="abstract">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam
                                            animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus
                                            blanditiis ab vitae.
                                        </p>
                                    </div>
                                    <div className="papers-right flex flex-col">
                                        <button>Cite</button>
                                        <button>Save</button>
                                        <button className='download'>Download</button>
                                    </div>
                                </div>
                                <div className='each flex'>
                                    <div className="papers-left ">
                                        <h3>Thesis Article</h3>
                                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero. </h1>
                                        <text>
                                            <span>Sean Matt</span>{'  '},
                                            <span>Christopher Columbus</span> ,
                                            <span>Reggie Jackson</span>
                                        </text>

                                        <p className="abstract">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam
                                            animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus
                                            blanditiis ab vitae.
                                        </p>
                                    </div>
                                    <div className="papers-right flex flex-col">
                                        <button>Cite</button>
                                        <button>Save</button>
                                        <button className='download'>Download</button>
                                    </div>
                                </div>
                                <div className='each flex'>
                                    <div className="papers-left ">
                                        <h3>Thesis Article</h3>
                                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero. </h1>
                                        <text>
                                            <span>Sean Matt</span>{'  '},
                                            <span>Christopher Columbus</span> ,
                                            <span>Reggie Jackson</span>
                                        </text>

                                        <p className="abstract">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam
                                            animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus
                                            blanditiis ab vitae.
                                        </p>
                                    </div>
                                    <div className="papers-right flex flex-col">
                                        <button>Cite</button>
                                        <button>Save</button>
                                        <button className='download'>Download</button>
                                    </div>
                                </div>



                            </div>
                            <div className="next-button">
                                <a href="">Next {'>'}</a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
  )
}

export default Journals
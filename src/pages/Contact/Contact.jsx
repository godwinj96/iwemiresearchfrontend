/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/NavBar/NavBar'
import { useLocation } from 'react-router-dom'
import { GlobalStateContext } from '../../Context/GlobalState'
import HomeBookCards from '../../components/BookCards/HomeBookCards'

const Contact = () => {

    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const { results, setResults, isSearch, setIsSearch } = useContext(GlobalStateContext)
    const location = useLocation()
    //reset search on route change
    useEffect(() => {
        setIsSearch(false)
        setResults([])
    }, [location])


    return (
        <div className='contact-container'>
            
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
                (<>
                    <div className='contact'>
                        <section className=" dark:bg-gray-900">
                            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                                <form action="#" className="space-y-8">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                        <input type="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter your email" required />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                                        <input type="text" id="subject" value={subject} onChange={(e) => { setSubject(e.target.value) }} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                                        <textarea id="message" rows="6" value={message} onChange={(e) => { setMessage(e.target.value) }} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                                    </div>
                                    <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
                                </form>
                            </div>
                        </section>
                    </div>
                    <hr />

                    {/* <div className='contact-info flex flex-col'>
                <span className='flex  heading'>
                    <h3>Headquarters:</h3> <div>United Kingdom: 71-75,
                        Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom</div>
                </span>
                <span className='flex items-center number'>
                    <h6>Phone: </h6>
                    <a href="tel: +442380970524">
                        +442380970524
                    </a>,
                    <a href="tel:+2348053076968">
                        +2348053076968
                    </a>
                </span>
                <span className='flex items-center email'>
                    <h6>Email:</h6>
                    <a href="mailto:info@iwemiresearch.com">
                        info@iwemiresearch.com
                    </a>
                </span>


            </div>
*/}
                    <dl className=" max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 ms-7 mt-7 mb-7">
                        <div className="flex flex-col pb-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email address</dt>
                            <dd className="text-lg font-semibold">
                                <a href="mailto:info@iwemiresearch.com">
                                    info@iwemiresearch.com
                                </a>
                            </dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Headquarters</dt>
                            <dd className="text-lg font-semibold">United Kingdom: 71-75,
                                Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom</dd>
                        </div>
                        <div className="flex flex-col pt-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone number</dt>
                            <dd className="text-lg font-semibold">
                                <a href="tel: +442380970524">
                                    +442380970524
                                </a>,
                                <a href="tel:+2348053076968">
                                    +2348053076968
                                </a></dd>
                        </div>
                    </dl>

                </>
                )}
           

        </div>

    )
}

export default Contact
/* eslint-disable */
import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import pic1 from '../../assets/research-logo.webp'
import pic2 from '../../assets/research-logo2.jpeg'
import pic3 from '../../assets/research-logo3.jpeg'
import Testimonial from '../../components/Testimonials/Testimonials'
import { useLocation } from 'react-router-dom'
import { GlobalStateContext } from '../../Context/GlobalState'
import HomeBookCards from '../../components/BookCards/HomeBookCards'
import AOS from 'aos'
import 'aos/dist/aos.css';

const About = () => {

    AOS.init({
        duration: 1200, // Animation duration in milliseconds
        once: true, // Whether animation should happen only once
    });

    const { results, setResults, isSearch, setIsSearch } = useContext(GlobalStateContext)
    const location = useLocation()
    //reset search on route change
    useEffect(() => {
        setIsSearch(false)
        setResults([])
    }, [location])

    useEffect(() => {
        AOS.refresh();
    }, []);


    return (
        <div className='about-container flex flex-col'>

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
                (<div className='about flex flex-col items-center justify-center '>

                    {/**<div className='about-heading flex'>
                <h2>About us</h2>
            </div>**/}
                    <div className='about-hero flex' data-aos="fade-up">
                        <div className='flex about-hero-img'>
                            <div className=' flex flex-col items-center about-hero-img-left'>
                                <img src={pic1} alt="" className='a' />
                                <img src={pic2} alt="" className='b' />
                            </div>
                            <div className='about-hero-img-right'>
                                <img src={pic3} alt="" />
                            </div>

                        </div>
                        <div className='about-hero-right'>
                            <span className='about-hero-right-h'>
                                Who we are
                            </span>
                            <h2 className='about-hero-right-sh'>
                                Iwemi Research: Your Gateway to Comprehensive Research Resources
                            </h2>
                            <p className='about-hero-right-t'>
                                Iwemi Research is a leading online learning platform that collaborates with top universities, colleges, and industry experts to offer a wide range of research papers. Our team is comprised of educators, technologists, and lifelong learners dedicated to creating an engaging and effective online research experience.
                            </p>
                            <ul className='about-hero-right-ul'>
                                <li>
                                    Extensive Research Database
                                </li>
                                <li>
                                    Expert Insights
                                </li>
                                <li>
                                    Collaborative Projects
                                </li>
                                <li>
                                    Cutting-Edge Tools
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className='about-section flex flex-col items-center justify-center ' data-aos="fade-up">
                        <div className='about-section-h'>
                            <h2>
                                Free access to thousands of global research papers, academic insights and journals
                            </h2>
                        </div>
                        <div className='about-section-t grid-container'>
                            <div className='each-t flex flex-col'>
                                <div className='num'>
                                    <h1>01</h1>
                                </div>
                                <div className='subh'><h2>Our Vision</h2></div>
                                <div className='para'>
                                    <p>
                                        At Iwemi Research, our mission is to push the boundaries of knowledge
                                        and foster innovation through comprehensive research and collaboration.
                                    </p>
                                </div>
                            </div>
                            <div className='each-t flex flex-col'>
                                <div className='num'>
                                    <h1>02</h1>
                                </div>
                                <div className='subh'><h2>Our Mission</h2></div>
                                <div className='para'>
                                    <p>
                                        We envision a world where access to cutting-edge research and groundbreaking discoveries is available to everyone,
                                        fueling progress and advancement in every field.
                                    </p>
                                </div>
                            </div>
                            <div className='each-t flex flex-col'>
                                <div className='num'>
                                    <h1>03</h1>
                                </div>
                                <div className='subh'><h2>Our Team</h2></div>
                                <div className='para'>
                                    <p>
                                        Our team comprises dedicated researchers, scientists, and educators committed
                                        to making significant contributions to the global knowledge base.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='about-testimonial'>
                        <div className='testimonial-similar'>
                            <section className="bg-white dark:bg-gray-900 dark">
                                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                                    <div className="mx-auto max-w-screen-sm">

                                        <p className="mb-8  text-gray-500 lg:mb-16 sm:text-xl dark:text-black p ">
                                            Discover what our users have to say about their experience with our collection of research papers, journals, and academic publications.
                                        </p>
                                    </div>
                                    <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
                                        <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
                                            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invaluable Resource for Research</h3>
                                                <p className="my-4">"Accessing a vast collection of research papers and academic journals has never been easier. The platform is user-friendly and incredibly efficient."</p>
                                                <p className="my-4">"The ability to find and reference relevant research has streamlined my workflow and enhanced the quality of my academic papers."</p>
                                                <p className="my-4">"This resource is a must-have for any serious researcher or academician."</p>
                                            </blockquote>
                                            <figcaption className="flex justify-center items-center space-x-3">
                                                <div className="space-y-0.5 font-medium dark:text-white text-left">
                                                    <div> Dr. Maria Johnson</div>
                                                    <div className="text-sm font-light text-gray-500 dark:text-gray-400">Proffessor</div>
                                                </div>
                                            </figcaption>
                                        </figure>
                                        <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
                                            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Critical for Academic Success</h3>
                                                <p className="my-4">"This platform provides a comprehensive collection of journals and papers that are critical for my research. It's an invaluable tool for any academician."</p>
                                                <p className="my-4">"The extensive database and easy access to high-quality papers have significantly contributed to my academic success."</p>
                                            </blockquote>
                                            <figcaption className="flex justify-center items-center space-x-3">
                                                <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile" />
                                                <div className="space-y-0.5 font-medium dark:text-white text-left">
                                                    <div>Tobi Oyewole</div>
                                                    <div className="text-sm font-light text-gray-500 dark:text-gray-400">Researcher</div>
                                                </div>
                                            </figcaption>
                                        </figure>
                                        <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 lg:border-b-0 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
                                            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enhances Research Efficiency</h3>
                                                <p className="my-4">"This platform has greatly enhanced my research efficiency. The well-structured and accessible database allows me to find the information I need quickly."</p>
                                                <p className="my-4">"It has become an essential part of my research toolkit, saving me countless hours of work."</p>
                                            </blockquote>
                                            <figcaption className="flex justify-center items-center space-x-3">
                                                <div className="space-y-0.5 font-medium dark:text-white text-left">
                                                    <div>Funmi Odowusi</div>
                                                    <div className="text-sm font-light text-gray-500 dark:text-gray-400">Scientist</div>
                                                </div>
                                            </figcaption>
                                        </figure>
                                        <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
                                            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Comprehensive and Reliable</h3>
                                                <p className="my-4">"This platform offers a comprehensive and reliable collection of academic papers. It's an essential resource for anyone involved in research."</p>
                                                <p className="my-4">"The ease of access to high-quality journals and papers has significantly improved my research process."</p>

                                            </blockquote>
                                            <figcaption className="flex justify-center items-center space-x-3">
                                                <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="profile" />
                                                <div className="space-y-0.5 font-medium dark:text-white text-left">
                                                    <div>Dr. Sarah Williams</div>
                                                    <div className="text-sm font-light text-gray-500 dark:text-gray-400">CTO</div>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </div>

                                </div>
                            </section>
                        </div>
                    </div>
                </div>)}
            <div className='dark'>

            </div>

        </div>
    )
}

export default About
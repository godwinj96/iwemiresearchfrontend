/* eslint-disable */
import React, { useContext } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BookCards from '../../components/BookCards/BookCards';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/NavBar/NavBar';
import Testimonial from '../../components/Testimonials/Testimonials';
import { GlobalStateContext } from '../../Context/GlobalState';
import ClickedBook from './ClickedBook';


const Dashboard = () => {

    const {query, setQuery, setPapers, queryHero, setQueryHero, search,setSearch, bookClicked, setBookClicked, loggedIn,setLoggedIn,fetchPapers} = useContext(GlobalStateContext)

    const navigate = useNavigate()
    
    const handleClear = ()=>{
      setQuery('')
    }


  return (
    <div className='dashboard flex flex-col' >
        <header className='dark'>
        <Navbar />
        </header>
        {
          !search && !bookClicked?
          <div className='dashboard-main'>
          <section className=" dark hero-section dashboard-secton ">
            <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6 dashboard-hero">
              <div className="mt-4 md:mt-0">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Africa's finest research platform</h2>
                <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">You can get the books written by the best authors</p>
                <a href="#" className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 get-started hero-button">
                  <span>Time to Research!!</span>
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
              </div>
              <img className="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard" />
              <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard" />
            </div>
          </section>

      <hr />
          <div className='dashboard-testimonial'>
            <Testimonial />
          </div>
          

          <div className=''>
                  <BookCards />      
          </div>
            </div> :
            search&& !bookClicked?
            <div className='dashboard-main'>
              <div className='flex dashboard-search flex-col'>
                <div className='sub'>
                  <h2>Iwemi Research</h2>
                </div>
                
                
                
                <div className='flex search-Bar'>
                  <FaSearch className=" icon search-icon" onClick={(e)=>{
                    e.preventDefault();
                    fetchPapers();
                    setSearch(true)
                  }}/>
                  <input
                 placeholder='Continue your research'
                 type='text'
                 value={queryHero}
                 onChange={(e)=>{setQueryHero(e.target.value)}}
                 className='search-input'
                 />
                 {queryHero && <FaTimes className="icon clear-icon" onClick={handleClear} />}
                </div>
                
                
              </div>
              <hr className='grey'/>
              <div className=''>
                  <BookCards />      
              </div>
            </div>
            :
            <div>
              <ClickedBook />
            </div>
              
            
        }
        
            

            <div className="dark dashboard-footer">
                <Footer />
            </div>
      
    </div>
  )
}

export default Dashboard
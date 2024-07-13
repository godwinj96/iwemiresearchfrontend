import React, { useEffect } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import content1 from '../../assets/content-1.webp'
import content4 from '../../assets/content-4.webp'
import content2 from '../../assets/content-2.jpg'
import content3 from '../../assets/content-3.jpg'

import Carousel from '../../components/Carousel/Carousel'
import HomeBookCards from '../../components/BookCards/HomeBookCards'


const Home = () => {




  return (
    <div>
      <Navbar />
      <section className="dark:bg-gray-900  dark hero-section dark">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Africa's finest research platform</h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">You can get the books written by the best authors</p>
            <input type="email" placeholder="Enter your e-mail address" className="input-emails" />
            <a href="#" className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 get-started">
              Get started
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </a>
          </div>
          <img className="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard" />
          <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard" />
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 content-section">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl flex flex-col">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 section-info justify-center flex flex-col">
            <h2 className="mb-4  tracking-tight font-extrabold text-gray-900 dark:text-white">Promoting access to African Research</h2>
            <div className="content-section-p font-semibold">
              <p className="mb-4 ">We are strategists, designers and developers.
                Innovators and problem solvers. Small enough to be simple and quick,
                but big enough to deliver the scope you want at the pace you need.
                Small enough to be simple and quick, but big enough to deliver the scope
                you want at the pace you need.</p>
            </div>


          </div>

          <div className="flex flex-col gap-y-4 content-grid">
            <div className="content-grid1">
              <img src={content1}
                alt="office content 1" className="secton-imgs-long" />
              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                alt="office content 2" className="secton-imgs" />
              <img src={content4}
                alt="office content 1" className="secton-imgs" />
            </div>
            <div className="content-grid2">
              <img src={content2}
                alt="office content 2" className="secton-imgs" />
              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                alt="office content 1" className="secton-imgs-long" />
              <img src={content3}
                alt="office content 2" className="secton-imgs" />
            </div>
          </div>

        </div>
      </section>
      <hr />
      {/**carousel */}




      <section class="dark:bg-gray-900 features ">
        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div class="max-w-screen-md mb-8 lg:mb-16 features-text">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Journals</h2>
            <p class="text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          </div>
          <div class="space-y-8 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-12 md:space-y-0">
            
            <HomeBookCards />
            <HomeBookCards />
            <HomeBookCards />
            <HomeBookCards />
          </div>
          <div className="see-more-button">
            <a href="">See more {'>'}</a>
          </div>
        </div>
      </section>
      <hr className="border-t border-gray-300" />
      <section class="dark:bg-gray-900 features ">
        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div class="max-w-screen-md mb-8 lg:mb-16 features-text">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Thesis/Dissertations</h2>
            <p class="text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          </div>
          <div class="space-y-8 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-12 lg:gap-25 md:space-y-0">
           
            <HomeBookCards />
            <HomeBookCards />
            <HomeBookCards />
            <HomeBookCards />
           
         
          </div>
          <div className="see-more-button">
            <a href="">See more {'>'}</a>
          </div>
        </div>
      </section>
      <hr className="border-t border-gray-300" />
      <section class="dark:bg-gray-900 features ">
        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 ">
          <div class="max-w-screen-md mb-8 lg:mb-16 features-text">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Academic Papers</h2>
            <p class="text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          </div>
          <div class="space-y-8 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-12 md:space-y-0">
       
            <HomeBookCards />
            <HomeBookCards />
            <HomeBookCards />
            <HomeBookCards />
          </div>
          <div className="see-more-button">
            <a href="">See more {'>'}</a>
          </div>
        </div>
      </section>


      <hr className="border-t border-gray-300" />


      {/**<section className="bg-white dark:bg-gray-900 store-section w-full">
        <div className="store-div flex ">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 store-text w-full">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white store-section-title">Let's find more that brings<br /> us together</h2>
            <p className="mb-8 store-section-info">Iwemi helps to connect with authors, books and communites </p>
            <div className="flex ">
              <a href="https://play.google.com/store" className="store-button google-play mr-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
              </a>
              <a href="https://www.apple.com/app-store/" className="store-button app-store">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/203px-Download_on_the_App_Store_Badge.svg.png?20170219160111" alt="Download on the App Store" />
              </a>
            </div>

          </div>
          <div className="store-right">
            <img className="w-full rounded-lg store-img" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
          </div>
        </div>
      </section>*/}
      <hr className="border-t border-gray-300" />

      <section className=" dark:bg-gray-900 newsletter">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 flex justify-center">
          <div className="max-w-screen-md w-full">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Sign up for our newsletter</h2>
            <p className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and <br />exclusive dsicounts feel free to sign up with your email</p>
            <div className="flex newsletter-cta">
              <input type="email" id="email" name="email" className="input-email w-full" placeholder="Enter your email" />
              <button className="newsletter-button">Subscribe</button>
            </div>
            <div className="flex justify-center newsletter-link" >
              <span>We care about the protection of your data. Read our <a href="">Privacy Policy</a></span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>

  )
}

export default Home
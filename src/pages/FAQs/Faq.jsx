/* eslint-disable */
import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GlobalStateContext } from '../../Context/GlobalState'
import HomeBookCards from '../../components/BookCards/HomeBookCards'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Faq = () => {
    const { results, setResults, isSearch, setIsSearch,searchInput } = useContext(GlobalStateContext)
    const location = useLocation()
    //reset search on route change
    useEffect(() => {
        setIsSearch(false)
        setResults([])
    }, [location])

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [location]);

      useEffect(() => {
        // Initialize AOS
        AOS.init({
          duration: 1000,
          once: true,
          delay: 100 // Add a small delay
        });
      }, []);

    return (
        <div>

            {isSearch ? (<section className="dark:bg-gray-900 features" data-aos="fade-up">
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
            </section>)
                :
                (<div className="faqs ">
                    <section class=" dark:bg-gray-900 ">
                        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                            <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently asked questions</h2>
                            <div class="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                                <div>
                                    <div class="mb-10">
                                        <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                            <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                            What Is Iwemi Research?
                                        </h3>
                                        <p class="text-gray-500 dark:text-gray-400">Iwemi Research is a premier online platform that provides access to a vast collection of research papers, academic journals, and scholarly articles. We collaborate with top universities, industry experts, and research institutions worldwide to offer high-quality, peer-reviewed content that spans various disciplines. Our mission is to support researchers, students, and professionals by providing the resources they need to stay informed, innovate, and contribute to their fields.
                                        </p>
                                    </div>
                                    <div class="mb-10">
                                        <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                            <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                            How do I search for specific papers or books?
                                        </h3>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            You can easily search for specific papers or books using the search bar located at the top of our website. Simply enter your keywords, and you'll be directed to the relevant results.
                                        </p>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            Alternatively, you can explore our categories and resources by using the links provided in the navbar for a more guided browsing experience.
                                        </p>
                                    </div>
                                    <div class="mb-10">
                                        <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                            <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                            How Can I Contact Iwemi Research?
                                        </h3>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            You can reach out to us through the contact form available on our Contact page. We also provide our contact details there for direct communication.
                                        </p>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            To visit our Contact page, simply scroll down to the footer and click on the 'Contact' link. We'll get back to you as soon as possible to assist with your inquiry.
                                        </p>
                                    </div>
                                    <div class="mb-10">
                                        <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                            <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                            </svg>
                                            Can I upload my own work, and if so, how?
                                        </h3>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            Yes, you can upload your own work to Iwemi Research. To do so:
                                        </p>
                                        <ul class="text-gray-500 dark:text-gray-400 list-disc ml-5">
                                            <li>Go to your profile page by clicking the user icon on the right side of the top navbar (visible only when logged in).</li>
                                            <li>Navigate to the "Upload" tab.</li>
                                            <li>Fill out the necessary fields to submit your work.</li>
                                        </ul>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            There are two options for uploading:
                                        </p>
                                        <ul class="text-gray-500 dark:text-gray-400 list-disc ml-5">
                                            <li><strong>Open Access:</strong> If you choose to make your work open access, there is a $100 upload fee. Your work will then be available for free to other users.</li>
                                            <li><strong>Subscription Based:</strong> If you prefer to keep your work behind a paywall, there is no upload fee. Users will need to pay to download your work. For more details on the subscription-based model, please call the number provided on our <a href="#" class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">Contact</a> page.</li>
                                        </ul>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            For further assistance or if you have any questions about the upload process, feel free to reach out to our support team.
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div class="mb-10">
                                        <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                            <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                            </svg>
                                            Are there any free resources available on Iwemi Research?
                                        </h3>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            Yes, Iwemi Research offers a variety of free resources to our users. These include:
                                        </p>
                                        <ul class="text-gray-500 dark:text-gray-400 list-disc ml-5">
                                            <li><strong>Open Access Papers:</strong> A selection of research papers and journals are available for free to download and read.</li>
                                            <li><strong>Research Summaries and Abstracts:</strong> Access to summaries and abstracts of our research papers can be freely viewed on our website.</li>
                                        </ul>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            For more details on available free resources, please check our <a href="/#resources" class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">Resources</a> section on the homepage of the website.
                                        </p>
                                    </div>
                                    <div class="mb-10">
                                        <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                            <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                            Can I download research papers and journals?
                                        </h3>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            Yes, you can download research papers and journals from our platform. We offer a mix of free and subscription-based access:
                                        </p>
                                        <ul class="text-gray-500 dark:text-gray-400 list-disc ml-5">
                                            <li><strong>Open Access Papers:</strong> These are freely available and can be downloaded without any cost.</li>
                                            <li><strong>Subscription-Based Papers:</strong> These require a purchase to access and download. Details about pricing and access options can be found on the respective paper or journal's page.</li>
                                        </ul>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            To find specific papers, you can use our search feature or browse through the categories available on our site.
                                        </p>
                                    </div>
                                    <div class="mb-10">
                                        <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                            <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                            How can I update my account information?
                                        </h3>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            You can easily update your account information through the profile page. If you are logged in, simply click on the user icon located at the top right of the navbar.
                                        </p>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            Once the dropdown menu appears, select the "Account Details" tab. This will take you to a form where you can edit and update your profile details as needed.
                                        </p>
                                    </div>
                                    <div class="mb-10">
                                        <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                            <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                            Some papers are not loading correctly. What can I do?
                                        </h3>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            If some papers are not loading correctly, try refreshing the page or clearing your browser's cache. This often resolves minor loading issues.
                                        </p>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            If the problem persists, please <a href="/contact" class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">contact our support team</a> through our contact page, and we will assist you in resolving the issue.
                                        </p>
                                        <p class="text-gray-500 dark:text-gray-400">
                                            You can also check your internet connection and ensure that your browser is up to date for the best experience.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>)}


        </div>
    )
}

export default Faq
import React, { useContext, useState } from 'react'
import { GlobalStateContext } from '../../Context/GlobalState'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import HomeBookCards from '../../components/BookCards/HomeBookCards'
import { GiNewspaper } from "react-icons/gi"

const ClickedBook = () => {
  const { search, setSearch } = useContext(GlobalStateContext)
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <div className=" p-4 rounded-lg bg-white dark:bg-gray-800" id='overview' >
              <div className="abstract-heading">
                Abstract
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, nobis cum. Recusandae tempora amet ipsa,
                minus est voluptatem, accusantium corporis ad pariatur earum nihil corrupti voluptatibus rem dolor praesentium ullam?Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Rerum aliquam libero perspiciatis sed? Pariatur aperiam esse accusamus
                quaerat. Aspernatur mollitia sunt laboriosam dicta. Voluptate nemo, ullam enim velit iste numquam?
              </p>

            </div>
            <div className="clicked-similar-products mt-20 mb-20 flex flex-col ">
              <div className='hr flex'>
                Similar Products
              </div>
              <div className='flex flex-col gap-10 similar-products'>
                <hr className='bg-black' />
                <HomeBookCards />
                <hr className='bg-black' />
                <HomeBookCards />
                <hr className='bg-black' />
                <HomeBookCards />
                <hr className='bg-black' />
                <HomeBookCards />

              </div>

            </div>
          </div>

        );
      case 'comments':
        return (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 flex flex-col" id='comments'>
            <div className="abstract-heading">
              Comments (0)
            </div>
            <div className="textarea">

              <form>
                <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label for="comment" class="sr-only">Your comment</label>
                    <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
                  </div>
                  <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                      Post comment
                    </button>
                    <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                      <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                          <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                        </svg>
                        <span class="sr-only">Attach file</span>
                      </button>
                      <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                          <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                        <span class="sr-only">Set location</span>
                      </button>
                      <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                        <span class="sr-only">Upload image</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>

            </div>
          </div>
        );
      case 'references':
        return (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800" id='references'>
            <div className="abstract-heading">
              All References
            </div>
          </div>
        );
      case 'citations':
        return (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800" id='citations'>
            <div className="abstract-heading">
              All Citations
            </div>
            <div className="citation-content flex flex-col justify-content items-center">
              <div className='mb-6'>
                <GiNewspaper size={60} />
              </div>
              <div>
                <h2 className=''> This research paper isn't cited in any other research material</h2>
                <p>Note:This is based on the research resources in our database </p>
              </div>
              
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className='flex flex-col justify-between clicked-container'>
      <Navbar />
      <div className="clicked-book flex flex-col items-center  justify-center">
        <div className='each flex'>
          <div className="papers-left ">
            <div className='flex clicked-book-type'>
              <h3>Journal </h3>
            </div>

            <h1 className='clicked-book-title'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero.
            </h1>
            <span className="published-date">
              June 2024
            </span>
            <br />
            <text className='clicked-authors'>
              <span>Sean Matt</span>.
              <span>Christopher Columbus</span>.
              <span>Reggie Jackson</span>
            </text>


          </div>

        </div>
        <div className="clicked-book-content flex flex-col ">
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'overview' ? 'border-blue-500 text-blue-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                  id="overview-tab"
                  type="button"
                  role="tab"
                  aria-controls="overview"
                  aria-selected={activeTab === 'overview'}
                  onClick={() => handleTabClick('overview')}
                >
                  Overview
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'comments' ? 'border-blue-500 text-blue-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                  id="comments-tab"
                  type="button"
                  role="tab"
                  aria-controls="comments"
                  aria-selected={activeTab === 'comments'}
                  onClick={() => handleTabClick('comments')}
                >
                  Comments
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'references' ? 'border-blue-500 text-blue-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                  id="references-tab"
                  type="button"
                  role="tab"
                  aria-controls="references"
                  aria-selected={activeTab === 'references'}
                  onClick={() => handleTabClick('references')}
                >
                  References
                </button>
              </li>
              <li role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'citations' ? 'border-blue-500 text-blue-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                  id="citations-tab"
                  type="button"
                  role="tab"
                  aria-controls="citations"
                  aria-selected={activeTab === 'citations'}
                  onClick={() => handleTabClick('citations')}
                >
                  Citations
                </button>
              </li>
            </ul>
            <div className="papers-right clicked-book-button flex ">
              <button>Cite</button>
              <button>Save</button>
              <button className='download'>Download</button>
            </div>
          </div>
          <div id="default-tab-content">
            {renderTabContent()}
          </div>

        </div>

      </div>
      <div className='dark'>
        <Footer />
      </div>

    </div>
  )
}

export default ClickedBook
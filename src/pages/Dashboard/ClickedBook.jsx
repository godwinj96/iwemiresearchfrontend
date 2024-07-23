import React, { useContext, useEffect, useState } from 'react'
import { GlobalStateContext } from '../../Context/GlobalState'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import HomeBookCards from '../../components/BookCards/HomeBookCards'
import { GiNewspaper } from "react-icons/gi"
import { useLocation } from 'react-router-dom'
import { supabase } from '../../supaBaseClient'

const ClickedBook = () => {
  const { search, setSearch } = useContext(GlobalStateContext)
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation()

  const { book } = location.state || {}

  const [similarBooks, setSimilarBooks] = useState([])

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      const { data, error } = await supabase
        .from('api_book')
        .select('*')


      if (error) {
        toast.error(error)
        console.log(error)
      } else {
        setSimilarBooks(data)
        console.log(data)
      }
    }

    fetchSimilarBooks()
  }, [])


  const categoryMap = {
    1: 'Journal',
    2: 'Thesis & Dissertation',
    3: 'Academic TextBook',
    4: 'Conference Paper'
    // add more categories as needed
  };

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
                {book.abstract}
              </p>

            </div>
            <div className="clicked-similar-products mt-20 mb-20 flex flex-col ">
              <div className='hr flex'>
                Similar Products
              </div>
              <div className='flex flex-col gap-10 similar-products'>
                {similarBooks.slice(0, 4).map(book => (
                  <HomeBookCards key={book.id} book={book} />
                ))}

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
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                      Post comment
                    </button>
                    <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                      <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                          <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                        </svg>
                        <span className="sr-only">Attach file</span>
                      </button>
                      <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                          <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                        <span className="sr-only">Set location</span>
                      </button>
                      <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                        <span className="sr-only">Upload image</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>

            </div>
          </div>
        );
      case 'references':
        return (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800" id='references'>
            <div className="abstract-heading">
              All References
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
      <div className="clicked-book flex flex-col  ">
        <div className='flex items-center'>
          <div className='each flex'>
            <div className="papers-left ">
              <div className='flex clicked-book-type'>
                <h3>{categoryMap[book.category_id]}</h3>
              </div>

              <h1 className='clicked-book-title'>
                {book.name}
              </h1>
              <span className="published-date">
                Year Published : {book.year_published}
              </span>
              <br />
              <text className='clicked-authors'>
                {book.author}
              </text>


            </div>

          </div>
          <div>
             {book.is_open_access ? (
                <div className="papers-right clicked-book-button flex flex-col">
                    <button>Cite</button>
                    <button>Save</button>
                    <a href={book.file_url} target='_blank' rel='noopener noreferrer'>
                        <button className='download'>Download</button>
                    </a>
                </div>
            ) : (
                <div className="papers-right clicked-book-button flex flex-col ">
                    <button>Cite</button>
                    <button>Save</button>
                    <button className='download' onClick={() => handleAddToCart(paper)}>Add to Cart</button>
                    <button className='download'>Buy Now and Download</button>
                </div>
            )}
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
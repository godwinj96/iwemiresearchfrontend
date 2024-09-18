/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react'
import { GiNewspaper } from "react-icons/gi"
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../../Context/CartContext'
import { useCurrency } from '../../Context/CurrencyContext'
import { GlobalStateContext } from '../../Context/GlobalState'
import HomeBookCards from '../../components/BookCards/HomeBookCards'

const ClickedBook = () => {
  // const { search, setSearch } = useContext(GlobalStateContext)
  const [activeTab, setActiveTab] = useState('overview');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const location = useLocation()
  const { results, setResults, isSearch, setIsSearch,user } = useContext(GlobalStateContext)

  //reset search on route change
  useEffect(() => {
    setIsSearch(false)
    setResults([])
  }, [location])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  const { currencyCode, conversionRate } = useCurrency()

  const { id } = useParams()

  const { book, initialTab,product } = location.state || {}
  const [citationCount, setCitationCount] = useState(book?.citations || 0);


  const [similarBooks, setSimilarBooks] = useState([])
  const [loading, setLoading] = useState(false)

  const getSimilarBooks = async () => {

    try {
      const response = await fetch("https://api.iwemiresearch.org/api/papers/", {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        },

      })

      if (!response.ok) {
        throw new Error('Failed to fetch journals')
      }

      const bookData = await response.json()
      const approvedBooks = bookData.filter(paper => paper.is_approved === true);
      
      // Shuffle the approved books array
      const shuffledBooks = approvedBooks.sort(() => 0.5 - Math.random());
      
      // Select a subset of books (e.g., 10 books)
      const selectedBooks = shuffledBooks.slice(0, 10);
      
      // Sort the selected books by date
      const sortedBooks = selectedBooks.sort(
        (a, b) => new Date(b.date_uploaded) - new Date(a.date_uploaded)
      );

      setSimilarBooks(sortedBooks)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Set initial tab if provided in the state
    if (initialTab) {
      setActiveTab(initialTab);
    }
    getSimilarBooks()
  }, [initialTab, book]);



  const filteredBooks = similarBooks.filter(book => book.id !== location.state?.id)


  const generateCitation = (book, format = 'APA') => {
    switch (format) {
      case 'APA':
        return `${book.author} (${book.year_published}). ${book.name}.`;
      case 'MLA':
        return `${book.author}. "${book.name}". ${book.year_published}.`;
      case 'Chicago':
        return `${book.author}. ${book.name}. ${book.year_published}.`;
      default:
        return '';
    }
  };

  const CitationCount = async () => {
    setLoading(true)
    const form = {
      'citations': book.citations + 1
    }

    const Token = localStorage.getItem('accessToken');
    if (!Token) {
      setUser(null);
      setLoggedIn(false);
      return;
    }

    const citedPapers = JSON.parse(localStorage.getItem('citedPapers')) || [];

    if (citedPapers.includes(book.name)) {
      toast.info("You have already cited this paper.", {
        autoClose: 2000
      });
      setLoading(false)
      return;
    }


    try {
      const response = await fetch(`https://api.iwemiresearch.org/api/papers/paper/${book.name}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${Token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)

      })

      if (!response.ok) {
        console.log(await response.json())
        toast.error("Failed to cite")
        setLoading(false)
        return;
      }

      citedPapers.push(book.name);
      localStorage.setItem('citedPapers', JSON.stringify(citedPapers));

      setCitationCount((prevCount) => prevCount + 1);

      toast.success("Paper Cited")
      setLoading(false)
    } catch (err) {
      console.error(err);

    }

  }

  const postComment = async()=>{
    setLoading(true)

    const form = {
      "comments": [...comments, { text: commentText, date: new Date().toISOString() }]
    };

    const Token = localStorage.getItem('accessToken');
    if (!Token) {
      setUser(null);
      setLoggedIn(false);
      return;
    }


    try {
      const response = await fetch(`https://api.iwemiresearch.org/api/papers/paper/${book.name}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${Token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)

      })

      if (!response.ok) {
        console.log(await response.json());
        toast.error("Failed to post comment");
        return;
      }

      setComments(form.comments);
      toast.success("Comment posted successfully");
     
    } catch (err) {
      console.error(err);

    } finally{
      setLoading(false)
    }

  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      postComment(newComment);
      setNewComment('');
    }
  };


  useEffect(() => {
    // Any effect needed when the citation count changes can be handled here
  }, [citationCount]);




  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const { state, dispatch } = useCart()

  const handleAddToCart = (item) => {
    if(!user){
        toast.warning("Please login to add items to cart")
        return
    }

    dispatch({ type: 'ADD_TO_CART', payload: item })
    // toast.error('Added to Shopping Cart')
    toast.success("Added to Cart", {
      position: window.innerWidth < 768 ? "top-center" : "top-right",
      autoClose: 2000, // Auto close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <div className=" p-4 rounded-lg bg-white dark:bg-gray-800 w-full" id='overview' >
              <div className="abstract-heading">
                Abstract
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-justify w-full">
                {book.abstract}
              </p>

            </div>
            <div className="clicked-similar-products mt-20 mb-20 flex flex-col mr-5 ">
              <div className='hr flex mb-6'>
                Similar Products
              </div>
              <div className="space-y-8 md:grid md:grid-cols-1 lg:grid-cols-1 md:gap-12 md:space-y-0 similar-products">

                {filteredBooks.slice(0, 6).map((book, index) => (
                  <div key={index}>
                    <HomeBookCards key={book.id} book={book} />
                    <hr />
                  </div>

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

              <form onSubmit={handleCommentSubmit}>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea 
                      id="comment" 
                      rows="4" 
                      className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" 
                      placeholder="Write a comment..." 
                      required
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
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
              <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="/privcay-Policy" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>

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
                <h2>This research paper does not have any references listed in our database.</h2>
                <p className='text-sm'>Note: This is based on the research resources available to us. If you believe this paper should be referenced elsewhere, please let us know.</p>
              </div>

            </div>
          </div>
        );
      case 'citations':
        const citationText = generateCitation(book);
        return (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800" id='citations'>
            <div className="abstract-heading">
              All Citations
            </div>
            <div className="citation-content flex flex-col justify-content items-center">
              <div className='mb-6'>
                <GiNewspaper size={60} />
              </div>
              {citationCount > 0 ? (
                <div>
                  This research paper has a Citation Count of {citationCount}
                </div>
              ) : (
                <div>
                  <h2>This research paper isn't cited in any other research material</h2>
                  <p>Note: This is based on the research resources in our database.</p>
                </div>
              )}
              <textarea
                readOnly
                value={citationText}
                className="p-2 mt-4 w-full bg-gray-100 border border-gray-300 rounded-lg"
              />
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
                onClick={() => {
                  navigator.clipboard.writeText(citationText);

                  CitationCount()
                }}
              >
                Copy Citation
              </button>

            </div>
          </div>
        );
      default:
        return null;
    }
  };




  return loading ?
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-content-center border-4 border-gray-400 border-t-orange-800 rounded-full animate-spin">

      </div>
    </div>
    : (
      <div className='flex flex-col justify-between clicked-container'>

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
          (<div className="clicked-book flex flex-col justify-center ">
            <div className='flex flex-col items-center md:flex-row  gap-4'>
              <div className='each flex flex-col md:flex-row items-center md:items-start md:justify-start gap-4 md:gap-6 '>
                <div >
                  <img src={book.cover_page?book.cover_page:null} alt="" className='w-full sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[470px] h-auto sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] px-3' />
                </div>
                <div className="papers-left ">

                  <div className='flex clicked-book-type'>
                    <h3>{book.type}</h3>
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
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {book.is_open_access ? (
                  <div className="papers-right clicked-book-button flex flex-row md:flex-col md:p-0 p-5 gap-4 md:ml-[70px] ">
                    <button onClick={() => setActiveTab("citations")} className='bg-[#FFA500] text-black py-2 px-4 rounded flex items-center  text-center justify-center hover:bg-orange-300 transition-colors cite-button'>
                      Cite
                    </button>
                    {/**<button>Save</button>**/}
                    <a href={book.file_url} target='_blank' rel='noopener noreferrer'>
                      <button className='download'>Download</button>
                    </a>
                  </div>
                ) : (
                  <div className="papers-right clicked-book-button flex flex-row md:flex-col md:p-0 p-5 gap-4 md:ml-[70px]">
                    <button onClick={() => setActiveTab("citations")} className='bg-[#FFA500] text-black py-2 px-4 rounded flex items-center  text-center justify-center hover:bg-orange-300 transition-colors cite-button'>
                      Cite
                    </button>
                    {/**<button>Save</button>**/}
                    <button className='download hover:bg-orange-300 rounded transition-colors' onClick={() => handleAddToCart(book)}>Add to Cart</button>

                    <span className="book-price p-3">{currencyCode} {((book.price) * conversionRate).toFixed(2)}</span>
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

          </div>)}


      </div>
    )
}

export default ClickedBook
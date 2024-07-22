import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supaBaseClient';
import { toast } from 'react-toastify';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [query, setQuery] = useState('')
  const [queryHero, setQueryHero] = useState('')
  const [papers, setPapers] = useState([])
  const [search, setSearch] = useState(false)
  const [bookClicked, setBookClicked] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({})
 
  const [book, setBook] = useState({})
  const [openAccessPapers, setOpenAcessPapers] = useState([])
  const [allPapers,setAllPapers ] = useState([])



  useEffect(()=>{
      //fetching from supabase
      const fetchOpenAccessPapers = async () =>{
        const { data, error } = await supabase
          .from('api_book')
          .select('*')


          if (error) {
            toast.error(error)
          } else{
            const updatedData = data.map(book=>({
              ...book,
              openAccess:true
            }))
            console.log(data)
            console.log(updatedData )
            setOpenAcessPapers(updatedData)
            
          }
      }

     

      fetchOpenAccessPapers()
  },[])


//getting user sesh
  useEffect(() => {
    const checkSession = async () => {
      try {
        //retrieving current session
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          throw error
        }

        console.log(loggedIn)
        if (data) {
          console.log(data)
          console.log('User is logged in:', data.session.user)
          setUser(data.session.user)
          console.log(user)
          setLoggedIn(true)
          //store session in local storage for pesistence
          localStorage.setItem('supabaseSession', JSON.stringify(data))


        } else {
          console.log('No user session found')
          setUser(null)
          setLoggedIn(false)
          localStorage.removeItem('supabaseSession')
        }


      } catch (error) {
        console.error('Error fetching session:', error.message)
      }
    }
    checkSession()

    const storedSession = localStorage.getItem('supabaseSesion')
    if (storedSession) {
      const session = JSON.parse(storedSession)
      setUser(session.session.user)
      console.log(session.session.user)
    }
  }, [])

  useEffect(() => {
    //books from edition guard
    //subscription based books
    const fetchPapers = async () => {
      const url = new URL(`https://app.editionguard.com/api/v2/book`)
      const params = new URLSearchParams(filters)
      const token = '3bc699cc93f50ebadd635e7cb1ed80b733eecc0a'

      try {

        const response = await fetch(`${url}?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status:${response.status}`)
        }

        const data = await response.json()
        const dataObject = Object.values(data)
        const booksArray = dataObject[3]
        const updatedBooksArray = booksArray.map(book=>({
          ...book,
          openAccess: false
        }))
        setPapers(booksArray)//papers
        console.log(data)
        console.log(booksArray)
        console.log(dataObject)
        const bookIds = booksArray.map(book => book.id)
        bookIds.forEach(bookId => {
          fecthBookDetails(bookId)
        })


      } catch (error) {
        console.error('Error fetching the reseacrh papers:', error);
      }
    }

    const fecthBookDetails = async (bookId) => {
      try {
        const token = '3bc699cc93f50ebadd635e7cb1ed80b733eecc0a'
        const detailUrl = `https://app.editionguard.com/api/v2/book/${bookId}`;

        const response = await fetch(detailUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status:${response.status}`)
        }

        const bookDetails = await response.json()
       // console.log(`Details for Book ID ${bookId}`, bookDetails)
        
        setBook((prevDetails) => ({
          ...prevDetails,
          [bookId]: book
        }))
        //console.log(book)
      } catch (error) {
        const detailUrl = `https://app.editionguard.com/api/v2/book/${bookId}`;

        const response = await fetch(detailUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const bookDetails = await response.json()
        console.log(`Detaisl for Book ID ${bookId}`, bookDetails)
      }


    }




    fetchPapers()

  }, [filters])

  useEffect(()=>{
    const mergeAndShufflePapers = ()=>{
     const  demoAllPapers = [...openAccessPapers,...papers]

      for (let i = demoAllPapers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [demoAllPapers[i], demoAllPapers[j]] = [demoAllPapers[j], demoAllPapers[i]];
      }

      console.log(demoAllPapers)
      setAllPapers(demoAllPapers)
      
    }

    if (openAccessPapers.length && papers.length) {
      mergeAndShufflePapers()
    }
  },[openAccessPapers, papers])



  const value = {
    query,
    setQuery,
    papers,
    setPapers,
    queryHero,
    setQueryHero,
    search,
    setSearch,
    bookClicked,
    setBookClicked,
    loggedIn,
    setLoggedIn,
    //fetchPapers,
    user,
    setUser,
    setFilters,
    book,
    setBook
  }

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  )

}
//custome api hook


export default GlobalStateProvider

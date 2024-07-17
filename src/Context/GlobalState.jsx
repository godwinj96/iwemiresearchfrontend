import React, { createContext, useEffect, useState } from 'react'
import { supabase } from '../supaBaseClient';

export const GlobalStateContext = createContext();

const GlobalStateProvider = ({children}) => {
    const[query, setQuery] = useState('')
    const[queryHero, setQueryHero] = useState('')
    const [papers, setPapers] = useState([])
    const [search,setSearch] = useState(false)
    const [bookClicked, setBookClicked] = useState(false)
    const[loggedIn,setLoggedIn] = useState(false)
    const [user, setUser] = useState(null);

   







    const fetchPapers = async()=>{
        
      try{
          const response = await fetch(`/api/graph/v1/paper/search?query=${encodeURIComponent(query)}&fields=title,authors,url,abstract,publicationDate,citations,publicationTypes`)
          
              const data = await response.json()
              //not all papers have citations
              //Promise.all is used to handle multiple asynchronous operations concurrently
              const papersWithCitations = await Promise.all(data.data.map(async(paper)=>{
                  const citationResponse = await fetch(`/api/graph/v1/paper/${paper.paperId}/citations`)
                  //citationsData is an object
                  const citationsData = await citationResponse.json()
                  //citationsData is array
                  return {...paper, citations:citationsData.data}
              }))
              setPapers(papersWithCitations)
         
          
      } catch(error){
          console.error('Error fetching the reseacrh papers:', error);
      } 
  }

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
      fetchPapers,
      user,
      setUser
    }

  return (
    <GlobalStateContext.Provider value={value}>
        {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateProvider
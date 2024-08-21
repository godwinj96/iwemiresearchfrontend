import { useRef, useState, useEffect, useContext } from 'react';
import {
  Container,
  IconMagnifyingGlass,
  IconRightArrow,
  SearchInput,
} from "./styles"
import { GlobalStateContext } from '../../../Context/GlobalState';
import { supabase } from '../../../supaBaseClient';

// function SearchBar() {

//   const targetRef = useRef(null);
//     const [isHovered, setIsHovered] = useState(false);
//     const [isFocused, setIsFocused] = useState(false);
//     const showSearchInput = isHovered  || isFocused; 

//     console.log(isHovered)
//     console.log(isFocused)

//     useEffect(() => {
//       targetRef.current.value = "";
//     },[showSearchInput])

//   return (

//       <Container>
//         <SearchInput ref={targetRef} />
//       </Container>

//   )
// }

// export default SearchBar



// import React from 'react'

export const SearchBar = () => {

  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isHovered || isFocused;
  const [searchInput, setSearchInput] = useState('')
  const { setResults, isSearch, setIsSearch } = useContext(GlobalStateContext)

  // console.log(isSearch)

  const handleSearch = async () => {
    setIsSearch(true)

    if (searchInput.trim() === '') {
      setResults([])
      return;
    }

    try {
      const response = await fetch("https://iweminewbackend.onrender.com/api/papers/", {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        },

      })
      if (!response.ok) {
        throw new Error('Failed to fetch journals')
      } else {
        const books = await response.json()
        
        const filteredBooks = books.filter(book => 
          book.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
          book.category.toLowerCase().includes(searchInput.toLowerCase()) ||
          book.subcategory.toLowerCase().includes(searchInput.toLowerCase())
        );
      
        setResults(filteredBooks)
      }


    } catch (err) {
      console.log(err)
    }

    /**
     *  const { data, error } = await supabase
      .from('api_book')
      .select('*')
      .ilike('name', `%${searchInput}%`)

    if (error) {
      console.error('Error searching:', error)
      setIsSearch(false)
    } else {
      setResults(data)
    }
     */

   
  }

  //console.log(isHovered)
  //console.log(isFocused)
  // console.log(isHovered)
  // console.log(isFocused)

  useEffect(() => {
    targetRef.current.value = "";
  }, [showSearchInput])

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      $hover={showSearchInput}
    >
      <SearchInput className='focus:outline-none' ref={targetRef} $showSearchInput={showSearchInput} placeholder='Search...' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch()
        }
      }} />
      {showSearchInput ?
        <IconRightArrow /> :

        <IconMagnifyingGlass
        />}
    </Container>
  )
}

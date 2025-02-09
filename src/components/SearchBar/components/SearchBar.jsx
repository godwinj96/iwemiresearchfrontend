import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalStateContext } from '../../../Context/GlobalState';
import {
  Container,
  IconMagnifyingGlass,
  IconRightArrow,
  SearchButton,
  SearchInput,
} from "./styles";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const showSearchInput = isHovered || isFocused;

  const { setResults, isSearch, setIsSearch, searchInput, setSearchInput } = useContext(GlobalStateContext)

  // console.log(isSearch)

  const handleSearch = async () => {
    handleOpen()
    setIsSearch(true)

    if (searchInput.trim() === '') {
      setResults([])
      return;
    }

    try {
      const response = await fetch("https://api.iwemiresearch.org/api/papers/", {
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
    // onMouseEnter={() => setIsHovered(true)}
    // onMouseLeave={() => setIsHovered(false)}
    // onFocus={() => setIsFocused(true)}
    // onBlur={() => setIsFocused(false)}
    // $hover={showSearchInput}
    >
      <SearchInput className='focus:outline-none' ref={targetRef} $showSearchInput={showSearchInput} placeholder='Search...' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch()
        }
      }} />
      {showSearchInput ? (
        <>
          <SearchButton onClick={handleSearch}>
            <IconRightArrow />
          </SearchButton>
        </>
      ) : (
        <div onClick={handleOpen} className='cursor-pointer'>
          <IconMagnifyingGlass />
        </div>

      )}
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size='xl'

      >

        <DialogBody>
          <div className="flex items-center w-full  bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              value={searchInput} 
              onChange={(e) => setSearchInput(e.target.value)} 
              type="text"
              placeholder="Search books, journals, or research papers..."
              className="w-full px-4 py-2 text-gray-700 focus:outline-none"
            />
            <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition" onClick={handleSearch}>
              🔍
            </button>
          </div>

        </DialogBody>

      </Dialog>
    </Container>
  )
}

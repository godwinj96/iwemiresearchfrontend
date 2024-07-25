import React, { useRef, useState, useEffect } from 'react';
import {
  Container,
  IconMagnifyingGlass,
  IconRightArrow,
  SearchInput,
} from "./styles"

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
  const showSearchInput = isHovered  || isFocused; 

  console.log(isHovered)
  console.log(isFocused)

  useEffect(() => {
    targetRef.current.value = "";
  }, [showSearchInput])

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      hover = {showSearchInput}
    >
        <SearchInput className='focus:outline-none' ref={targetRef} showSearchInput={showSearchInput}/>
        {showSearchInput ? 
        
          <IconRightArrow  /> : 
          
          <IconMagnifyingGlass 
          />}
    </Container>
  )
}

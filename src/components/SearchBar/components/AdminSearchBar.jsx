import { useRef, useState, useEffect, useContext } from 'react';
import {
  Container,
  IconMagnifyingGlass,
  IconRightArrow,
  SearchInput,
} from "./styles"
import  { AdminContext } from '../../../Context/AdminContext';
import { debounce } from 'lodash';



export const AdminSearchBar = () => {

  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isHovered || isFocused;
  const {searchInput, setSearchInput} = useContext(AdminContext)
  
  // console.log(isSearch)


  const handleSearch = debounce((query) => {

    if (searchInput.trim() === '') {
      return;
    }

    setSearchInput(query)
  }, 300);
  
 

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
      <SearchInput className='focus:outline-none' ref={targetRef} $showSearchInput={showSearchInput} placeholder='Search by any field...' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch(e.target.value)
        }
      }} />
      {showSearchInput ?
        <IconRightArrow /> :

        <IconMagnifyingGlass
        />}
    </Container>
  )
}

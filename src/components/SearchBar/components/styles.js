import styled, {css} from "styled-components"
import {SearchIcon} from "../icons/SearchIcon.jsx"
import {ArrowRight} from "../icons/arrowRight.jsx"

export const Container =styled.div`

  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: 2px solid #393e46;
  padding: 5px;
  // background: #222831;
  transition: all 0.5s;
  // color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border:none;
  outline: none;

  ${({$hover}) =>

    $hover && 
    css`
      width: 200px;
      // -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.74);
      // box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.74);
      border: none;
      outline: none;
    `
  }
`;

export const SearchInput = styled.input`

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 36px;
  line-height: 24px;
  font-size: 1rem;
  border-radius: 20px;
  padding: 0 30px 0 10px;
  margin: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  transition: all 0.5s;


  display: ${(props) => (props.$showSearchInput ? 'block' : 'none')}

`;

/* icons */

export const IconMagnifyingGlass = styled(SearchIcon)`
  // height: 1rem;
  // width: 1rem;
  fill: white;
 
  filter: invert(100%) sepia(0%) saturate(7428%) hue-rotate(161deg) brightness(121%) contrast(116%);
`;
export const IconRightArrow = styled(ArrowRight)`
  height: 1.2rem;
  width: 1.2rem;
  fill: #393e46; // Dark gray color, matching the border color you used before
  
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  transition: all 0.3s;

  &:hover {
    fill: #222831; // Darker shade on hover
  }

`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px; // Adjust as needed
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }
`;
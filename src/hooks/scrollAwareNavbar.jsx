import React, { useState, useEffect } from 'react';

const ScrollAwareNavbar = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setIsVisible(false);
      } else { // if scroll up show the navbar
        setIsVisible(true);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
      console.log(isVisible);
      console.log(lastScrollY);
    }
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div className={`fixed w-full z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {children}
    </div>
  );
};

export default ScrollAwareNavbar;
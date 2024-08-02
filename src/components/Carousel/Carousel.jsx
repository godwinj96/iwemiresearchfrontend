/* eslint-disable */
import React, { useEffect } from 'react'
import 'flowbite'
import carousel1 from '../../assets/carousel-1.jpg'
import carousel2 from '../../assets/carousel-2.jpg'
import carousel3 from '../../assets/carousel-3.jpeg'
import carousel4 from '../../assets/carousel-4.jpg'
import carousel5 from '../../assets/carousel-5.jpeg'

const Carousel = () => {


    useEffect(() => {
        const carouselItems = document.querySelectorAll('[data-carousel-item]');
        let currentItemIndex = 0;
    
        const showItem = (index) => {
          carouselItems.forEach((item, i) => {
            item.classList.toggle('hidden', i !== index);
          });
        };
    
        const prevButton = document.querySelector('[data-carousel-prev]');
        const nextButton = document.querySelector('[data-carousel-next]');
    
        const showNextItem = () => {
            currentItemIndex = (currentItemIndex + 1) % carouselItems.length;
            showItem(currentItemIndex);
          };
      
          prevButton.addEventListener('click', () => {
            currentItemIndex = (currentItemIndex - 1 + carouselItems.length) % carouselItems.length;
            showItem(currentItemIndex);
          });
      
          nextButton.addEventListener('click', () => {
            currentItemIndex = (currentItemIndex + 1) % carouselItems.length;
            showItem(currentItemIndex);
          });
       
        //every 5 seconds-automatically sliding
        const intervalId = setInterval(showNextItem, 5000)
    
        // Initialize the carousel by showing the first item
        showItem(currentItemIndex);
          //cleanup to prevent memeory leaks
        return()=>{
            clearInterval(intervalId)
            prevButton.removeEventListener('click')
            nextButton.removeEventListener('click')
        }
    
      }, []);




    return (
        
            <div id="default-carousel" class="relative dark carousel-container" data-carousel="slide">

                <div class="relative  overflow-hidden rounded-lg md:h-96 carousel">

                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src={carousel1} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>

                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src={carousel2} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>

                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src={carousel3} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>

                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src={carousel4} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>

                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src={carousel5} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>
                </div>
                {/**indicator */}
                <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                </div>
                {/**controls */}
                <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="sr-only">Next</span>
                    </span>
                </button>
            </div>
        
    )
}

export default Carousel
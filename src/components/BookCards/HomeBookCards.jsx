import React from 'react'
import book_image from '../../assets/thesis-test2.jpg'
import axios from 'axios'

const HomeBookCards = () => {
    return (
        <div className='home-bookcards'>
            <div role="status" class="space-y-8  md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div class="flex-shrink-0  h-64 bg-gray-300 rounded overflow-hidden ">
                    <img src={book_image} alt="" className='book-image' />
                </div>
                <div class="flex flex-col right">
                    <h3 className="home-bookcards-heading  text-gray-800"> <a href="">Change and Stability in Thesis and Dissertation Writing</a></h3>
                    <p className="text-sm text-gray-600"><span className="text-gray-800">June 2024</span></p>
                    <p className="text-sm text-gray-600">Author: <span className="text-gray-800">John Doe</span></p>
                    <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus blanditiis ab vitae.</p>
                </div>
                
            </div>
        </div>
    )
}

export default HomeBookCards
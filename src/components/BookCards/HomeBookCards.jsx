/* eslint-disable */
import React from 'react'
import book_image from '../../assets/thesis-test2.jpg'


import { Link } from 'react-router-dom'


const HomeBookCards = ({ book }) => {

    console.log('Book:', book)
    if(!book){
        return null
    }

    return (
        <div className='home-bookcards'>
            <div role="status" className="space-y-8  md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div className="flex-shrink-0  h-64 rounded overflow-hidden items-center flex justify-center">
                    <img src={book_image} alt="" className='book-image' />
                </div>
                <div className="flex flex-col right">
                    <h3 className="home-bookcards-heading  text-gray-800">
                        <Link to={`/book/${book.id}`} state={{ book }}>
                            {book.name}
                        </Link>
                    </h3>
                    <p className="text-sm text-gray-600"><span className="text-gray-800">{book.year_published}</span></p>
                    <p className="text-sm text-gray-600">
                        {book.author}
                    </p>
                    <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed max-h-32 overflow-hidden abstract-text">{book.abstract}</p>
                </div>

            </div>
        </div>
    )
}




export default HomeBookCards
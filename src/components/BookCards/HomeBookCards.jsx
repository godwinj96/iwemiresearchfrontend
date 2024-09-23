/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom'


const HomeBookCards = ({ book }) => {

   // console.log('Book:', book)
    if(!book){
        return null
    }

    return (
        <div className='home-bookcards border border-gray-300 rounded p-4 hover:shadow-lg transition-shadow duration-300'>
            <div role="status" className="space-y-8  md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div className="flex-shrink-0  h-64 rounded overflow-hidden items-center flex justify-center">
                    <img src={book.cover_page || null} alt="Image here" className='book-image hover:scale-105 transition-all duration-300' />
                    
                </div>
                <div className="flex flex-col right px-2">
                    <h3 className="home-bookcards-heading  text-gray-800">
                        <Link to={`/book/${book.id}`} state={{ book }} onClick={() => window.scrollTo(0, 0)}>
                            {book.name}
                        </Link>
                    </h3>
                    <p className="text-sm text-gray-600"><span className="text-gray-800">{book.year_published}</span></p>
                    <p className="text-sm text-gray-600">
                        {book.author}
                    </p>
                    
                </div>

            </div>
        </div>
    )
}




export default HomeBookCards
import React from 'react'
//import book_image from '../../assets/thesis-test2.jpg'
import axios from 'axios'

import { Link } from 'react-router-dom'


const HomeBookCards = ({ book }) => {

   

    console.log('Book:', book)
    if(!book){
        return null
    }

    return (
        <div className='home-bookcards'>
            <div role="status" class="space-y-8  md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div class="flex-shrink-0  h-64 rounded overflow-hidden items-center flex justify-center">
                    <img src={book.image} alt="" className='book-image' />
                </div>
                <div class="flex flex-col right">
                    <h3 className="home-bookcards-heading  text-gray-800">
                        <Link to={`/book/${book.id}`} state={{ book }}>
                            {book.title}
                        </Link>
                    </h3>
                    <p className="text-sm text-gray-600"><span className="text-gray-800">{book.date}</span></p>
                    <p className="text-sm text-gray-600">
                        Authors: {book.authors.map((author, index) => (
                            <span key={index} className="text-gray-800">{author}{index < book.authors.length - 1 ? ', ' : ''}</span>
                        ))}
                    </p>
                    <p className="text-gray-700">{book.description}</p>
                </div>

            </div>
        </div>
    )
}




export default HomeBookCards
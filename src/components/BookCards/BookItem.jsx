import React from 'react'
import { Link } from 'react-router-dom';

const BookItem = ({ book, handleAddToCart }) => {

    const categoryMap = {
        1: 'Journal',
        2: 'Thesis & Dissertation',
        3: 'Academic TextBook',
        4: 'Conference Paper'
        // add more categories as needed
      };

    return (
        <div className='each flex'>
            <div className="papers-left ">
                <h3 className='category-heading'>{categoryMap[book.category_id]}</h3>
                <h1>
                <Link to={`/book/${book.id}`} state={{ book }}>{book.name}</Link>
                </h1>
                <h5>{book.year_published}</h5>
                <text>
                    <span>{book.author}</span>{'  '}
                </text>
                <p className="abstract">
                    {book.abstract}
                </p>
            </div>
            {book.is_open_access ? (
                <div className="papers-right flex flex-col">
                    <button>Cite</button>
                    <button>Save</button>
                    <a href={book.file_url} target='_blank' rel='noopener noreferrer'>
                        <button className='download'>Download</button>
                    </a>
                </div>
            ) : (
                <div className="papers-right flex flex-col">
                    <button>Cite</button>
                    <button>Save</button>
                    <button className='download' onClick={() => handleAddToCart(book)}>Add to Cart</button>
                    <button className='download'>Buy Now and Download</button>
                </div>
            )}
        </div>
    );
};


export default BookItem
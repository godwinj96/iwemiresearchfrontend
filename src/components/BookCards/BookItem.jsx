/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom';

const BookItem = ({ book, handleAddToCart, isExpanded, handleToggleExpand }) => {

    const MAX_WORDS = 20

    const getTruncatedText = (text) => {
        if (typeof text !== 'string') return '';
        const words = text.split(' ');
        if (words.length <= MAX_WORDS) return text;
        return words.slice(0, MAX_WORDS).join(' ') + '...';
    }

    return (
        <div className='each flex'>
            <div className="papers-left ">
                <h3 className='category-heading'>{book.type}</h3>
                <h1>
                    <Link to={`/book/${book.id}`} state={{ book }}>{book.name}</Link>
                </h1>
                <h5>{book.year_published}</h5>
                <text>
                    <span>{book.author}</span>{'  '}
                </text>
                <p className="abstract text-justify">
                    {isExpanded ? book.abstract : getTruncatedText(book.abstract)}
                    <button className={`read-more ${isExpanded ? 'ml-3' : ""} text-orange-500/80`} onClick={() => handleToggleExpand(book.id)}>
                        {isExpanded ? 'Read less' : 'Read more'}
                    </button>
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
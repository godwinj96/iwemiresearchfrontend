/* eslint-disable */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const BookItem = ({ book, handleAddToCart, isExpanded, handleToggleExpand }) => {

    const MAX_WORDS = 20
    const navigate = useNavigate()

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
                <p className="abstract text-justify mr-10">
                    {isExpanded ? book.abstract : getTruncatedText(book.abstract)}
                    <button className={`read-more ${isExpanded ? 'ml-3' : ""} text-orange-500/80`} onClick={() => handleToggleExpand(book.id)}>
                        {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                </p>
            </div>
            {book.is_open_access ? (
                <div className="papers-right flex flex-col">
                    <button>Cite</button>
                    {/**<button>Save</button>**/}
                    <a href={book.file_url} target='_blank' rel='noopener noreferrer'>
                        <button className='download'>Download</button>
                    </a>
                </div>
            ) : (
                <div className="papers-right flex flex-col">
                    <button>
                        <Link
                            to={`/book/${book.id}`}
                            state={{ book, initialTab: 'citations' }} // Pass initialTab as 'citations'
                        >
                            Cite
                        </Link>
                    </button>
                    {/**<button>Save</button>**/}
                    <button className='download ' onClick={() => handleAddToCart(book)}>Buy Now and Download</button>
                </div>
            )}
        </div>
    );
};


export default BookItem
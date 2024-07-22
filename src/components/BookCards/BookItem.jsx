import React from 'react'

const BookItem = ({ paper, handleAddToCart }) => {
    return (
        <div className='each flex'>
            <div className="papers-left ">
                <h3>{paper.type}</h3>
                <h1>
                    <a href="" >{paper.name}</a>
                </h1>
                <h5>{paper.year_published}</h5>
                <text>
                    <span>{paper.author}</span>{'  '}
                </text>
                <p className="abstract">
                    {paper.abstract}
                </p>
            </div>
            {paper.is_open_access ? (
                <div className="papers-right flex flex-col">
                    <button>Cite</button>
                    <button>Save</button>
                    <a href={paper.file_url} target='_blank' rel='noopener noreferrer'>
                        <button className='download'>Download</button>
                    </a>
                </div>
            ) : (
                <div className="papers-right flex flex-col">
                    <button>Cite</button>
                    <button>Save</button>
                    <button className='download' onClick={() => handleAddToCart(paper)}>Add to Cart</button>
                    <button className='download'>Buy Now and Download</button>
                </div>
            )}
        </div>
    );
};


export default BookItem
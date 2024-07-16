import React, { useContext, useEffect, useState } from 'react'
import { GlobalStateContext } from '../../Context/GlobalState'
import axios from 'axios'



const BookCards = () => {

    const { papers, setBookedClicked } = useContext(GlobalStateContext)

    /*useEffect(()=>{
        if(query.trim() !== ''){
            fetchPapers();
        } else{
            setPapers([])
        }
    }, [query])*/

    const truncateText = (text, length) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...'
    }


    return (
        <div className='book-cards'>
            <div className='each flex'>
                <div className="papers-left ">
                    <h3>Journal Articles</h3>
                    <h1> <a href="" >Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero.</a>  </h1>
                    <span className="published-date">
                        June 2024
                    </span>
                    <text>
                        <span>Sean Matt</span>{'  '},
                        <span>Christopher Columbus</span> ,
                        <span>Reggie Jackson</span>
                    </text>

                    <p className="abstract">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam
                        animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus
                        blanditiis ab vitae.
                    </p>
                </div>
                <div className="papers-right flex flex-col">
                    <button>Cite</button>
                    <button>Save</button>
                    <button className='download'>Download</button>
                </div>
            </div>
        </div>
    )
}

export default BookCards
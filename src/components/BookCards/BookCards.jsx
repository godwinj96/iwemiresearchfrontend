import React, { useContext, useEffect, useState } from 'react'
import { GlobalStateContext } from '../../Context/GlobalState'

const BookCards = () => {

    const{ papers,setBookedClicked } = useContext(GlobalStateContext)

    /*useEffect(()=>{
        if(query.trim() !== ''){
            fetchPapers();
        } else{
            setPapers([])
        }
    }, [query])*/

    const truncateText = (text,length)=>{
        if(text.length <=length) return text;
        return text.substring(0,length) +'...'
    }
    

  return (
    <div className='book-cards'>
        
        {papers.map((paper)=>(
            <div className='flex flex-col paper' key={paper.paperId}>
            <div className='book-top flex'>
                <div className='left flex flex-col'>
                    <span className='book-title' onClick={(e)=>{e.preventDefault();setBookedClicked(true)}}>{paper.title}</span>
                    <div className='flex book-publish'>
                        <a href="#">{paper.publicationTypes}</a>
                        <span>{paper.publicationDate}</span>
                    </div>
                    <div>
                        {paper.authors.map((author)=>{<span>{author.name}</span>})}
                        
                    </div>
                    <div className='abstract'>
                        <p>{ truncateText(paper.abstract,150)}</p>
                    </div>
                </div>
                <div className='right'>
                    <img src="" alt="" />
                </div>
            </div>
            <div className='book-bottom flex justify-between'>
                <div className='left'>
                    <button>Download</button>
                </div>
                <div className='right'>
                    <button>Cite this work</button>
                </div>
            </div>
        </div>

        ))} 
        
    </div>
  )
}

export default BookCards
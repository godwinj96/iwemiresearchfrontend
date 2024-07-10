import React, { useState } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

const Catalogue = () => {

  const [selectedOption, setSelectedOption] = useState("")

  const handleChange = (e)=>{
      setSelectedOption(e.target.value)
  }


  return (
    <div>
      <Navbar />
      <div className='filter-category flex flex-col'>
        <form className="">
          <label for="resources" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Which type of reasearch resources you looking for?</label>
          <select id="resources" value={selectedOption} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a category</option>
            <option value="Research-papers">Research Papers</option>
            <option value="Academic-papers">Academic Papers</option>
            <option value="Journals">Journals</option>
          </select>
        </form>
        <p className='font-medium'>
          Selected option is {selectedOption}
        </p>
      </div>
      <div className='catalogue flex flex-col'>
        
      </div>
      <Footer />
    </div>
  )
}

export default Catalogue
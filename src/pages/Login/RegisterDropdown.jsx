/* eslint-disable */

import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterDropdown = () => {

    const navigate = useNavigate()
    const dropdownRef = useRef(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const startedClick = () => {
        navigate('/signup')
    }
    const signup_publisher = () => {
        navigate('/signup-Publisher')
    }

   
   

    return (
        <div className="absolute mt-2 bg-white border rounded shadow-lg w-48">
            <a
                
                href="#user-registration"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={(e)=>{
                    e.preventDefault();
                    
                    startedClick()
                }}
            >
                User Registration
            </a>
            <a
                href="#publisher-registration"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={(e)=>{
                    e.preventDefault()
                    signup_publisher()
                }}
            >
                Institution Registration
            </a>
        </div>
    )
}

export default RegisterDropdown
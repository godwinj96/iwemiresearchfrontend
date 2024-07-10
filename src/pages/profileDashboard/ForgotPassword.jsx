import React from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

    const navigate = useNavigate()

    const ForgotPassword =()=>{
        navigate('/Forgot-Password')
      }


  return (
    <div>
        <Navbar />
        <div className="forgot-password-page">

        </div>
        <Footer />
    </div>
  )
}

export default ForgotPassword
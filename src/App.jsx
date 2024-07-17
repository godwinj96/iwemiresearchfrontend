import './index.css'
import React, { useEffect, useState } from 'react'

import Home from './pages/Home/Home'

import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/Login/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import GlobalStateProvider from './Context/GlobalState'
import Catalogue from './pages/Catalogue/SearchPage'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Faq from './pages/FAQs/Faq'
import ProfileDashboard from './pages/profileDashboard/ProfileDashboard'
import ForgotPassword from './pages/profileDashboard/ForgotPassword'
import SignUpPublish from './pages/Login/SignUpPublish'
import Terms from './pages/Terms/Terms'
import PrivacyPolicy from './pages/Terms/PrivacyPolicy'
import { supabase } from './supaBaseClient'
import ProtectedRoute from './components/ProtectedComponent'
import Journals from './pages/Journals/Journals'
import Thesis from './pages/Thesis/Thesis'
import ConferencePapers from './pages/Conference Papers/ConferencePapers'
import AcademicTextbooks from './pages/Academic Textbooks/AcademicTextbooks'

import ResetPassword from './pages/profileDashboard/ResetPassword'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import Checkout from './pages/ShoppingCart/Checkout'
import SearchPage from './pages/Catalogue/SearchPage'
import ClickedBook from './pages/Dashboard/ClickedBook'
import Payment from './pages/Payment/Payment'



function App() {
  const [user, setUser] = useState(null);

  

  useEffect(()=>{
    const checkSession = async()=>{
      const storedSession = localStorage.getItem('supabase_session')
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession)
        setUser(parsedSession.user)
      } else{
        const {data,error} = await supabase.auth.getSession()
        if (data?.session) {
           setUser(data.session.user)
           localStorage.setItem('supabase_session', JSON.stringify(data.session))
        }
      }
    }

    checkSession()

    const {data:authListener} = supabase.auth.onAuthStateChange((event,session)=>{
      if (session) {
        setUser(session.user)
        localStorage.setItem('supabase_session', JSON.stringify(session))
      } else{
        setUser(null);
        localStorage.removeItem('supabase_session')
      }
    });

    return()=>{
      authListener.subscription.unsubscribe()
    }
  },[])

  return (
    <GlobalStateProvider>
      <Routes>        
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />

          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/Forgot-Password' element={<ForgotPassword/>}/>
          <Route path='/reset-Password' element={<ResetPassword/>}/>
          <Route path='/signup-Publisher' element={<SignUpPublish/>}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/search-page' element={<SearchPage />}/>
          <Route path='book/:id' element={<ClickedBook />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/shopping-Cart' element={<ShoppingCart />}/>
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/FAQs' element={<Faq />}/>
          <Route path='/Profile-dashboard' element={<ProfileDashboard/>} />   
          <Route path='/Forgot-Password' element={<ForgotPassword />}/>   
          <Route path='/terms&Conditions' element={<Terms />}/>   
          <Route path='/privcay-Policy' element={<PrivacyPolicy />}/>   
          <Route path='/journals' element={<Journals />}/>   
          <Route path='/thesis&Dissertations' element={<Thesis />}/>   
          <Route path='/conference-Papers' element={<ConferencePapers />}/>   
          <Route path='/academic-Textbooks' element={<AcademicTextbooks />}/>   

      </Routes>
    </GlobalStateProvider>     
  )
}

export default App

import './index.css'
<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
=======
import React from 'react'
>>>>>>> 96e449d92079fb2689026b1312f808dcd3b7962a

import Home from './pages/Home/Home'

import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/Login/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import GlobalStateProvider from './Context/GlobalState'
import Catalogue from './pages/Catalogue/Catalogue'
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


function App() {


  const [token,setToken] = useState(false)
  if(token){
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(()=>{
    if (sessionStorage.getItem('token')) {
      let user = JSON.parse(sessionStorage.getItem('token'))
      setToken(user)
    }

  }, [])

  return (
    <GlobalStateProvider>
      <Routes>        
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login setToken={setToken}/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signup-Publisher' element={<SignUpPublish/>}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/research-resources' element={<Catalogue />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/about' element={<About />}/>
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

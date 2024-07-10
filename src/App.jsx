import './index.css'
import React from 'react'

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


function App() {


  return (
    <GlobalStateProvider>
      <Routes>        
          <Route path="/home" element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signup-Publisher' element={<SignUpPublish/>}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/research-resources' element={<Catalogue />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/FAQs' element={<Faq />}/>
          <Route path='/Profile-dashboard' element={<ProfileDashboard />}/>   
          <Route path='/Forgot-Password' element={<ForgotPassword />}/>   
          <Route path='/terms&Conditions' element={<Terms />}/>   
          <Route path='/privcay-Policy' element={<PrivacyPolicy />}/>   

      </Routes>
    </GlobalStateProvider>     
  )
}

export default App

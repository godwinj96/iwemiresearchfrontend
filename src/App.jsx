/* eslint-disable */
import './index.css'
import React, { useContext, useEffect } from 'react'

import Home from './pages/Home/Home'

import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/Login/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import GlobalStateProvider, { GlobalStateContext } from './Context/GlobalState'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Faq from './pages/FAQs/Faq'
import ProfileDashboard from './pages/profileDashboard/ProfileDashboard'
import ForgotPassword from './pages/profileDashboard/ForgotPassword'
import SignUpPublish from './pages/Login/SignUpPublish'
import Terms from './pages/Terms/Terms'
import PrivacyPolicy from './pages/Terms/PrivacyPolicy'
import Journals from './pages/Journals/Journals'
import Thesis from './pages/Thesis/Thesis'
import ConferencePapers from './pages/Conference Papers/ConferencePapers'
import AcademicTextbooks from './pages/Academic Textbooks/AcademicTextbooks'
import ResetPassword from './pages/profileDashboard/ResetPassword'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import SearchPage from './pages/Catalogue/SearchPage'
import ClickedBook from './pages/Dashboard/ClickedBook'
import Payment from './pages/Payment/Payment'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { CurrencyProvider } from './Context/CurrencyContext'
import CartProvider from './Context/CartContext'
import Navbar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Admin from './pages/admin/admin'
import ProtectedComponent from './components/ProtectedComponent'
import AdminFooter from './pages/admin/AdminFooter'
import AdminProvider from './Context/AdminContext'
import ScrollToTop from './components/ScrollTop'




function App() {

  const { setResults, setIsSearch } = useContext(GlobalStateContext)
  const location = useLocation()
  //reset search on route change
  useEffect(() => {
    setIsSearch(false)
    setResults([])
  }, [location])

  const hideNavAndFooter = ['/admin'];

  return (
    <CartProvider>
      <CurrencyProvider>
        <GlobalStateProvider>
          <AdminProvider>
            <ToastContainer theme='dark' />
            <ScrollToTop/>
            {!hideNavAndFooter.includes(location.pathname) && <Navbar />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/payment" element={<Payment />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/password-reset' element={<ForgotPassword />} />
              <Route path='/password-reset/confirm/:uidb64/:token' element={<ResetPassword />} />
              <Route path='/signup-Publisher' element={<SignUpPublish />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/search-page' element={<SearchPage />} />
              <Route path='book/:id' element={<ClickedBook />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/about' element={<About />} />
              <Route path='/shopping-Cart' element={<ShoppingCart />} />
              <Route path='/FAQs' element={<Faq />} />
              <Route path='/Profile-dashboard' element={<ProfileDashboard />} />
              <Route path='/terms-Conditions' element={<Terms />} />
              <Route path='/privcay-Policy' element={<PrivacyPolicy />} />
              <Route path='/journals' element={<Journals />} />
              <Route path='/thesis-Dissertations' element={<Thesis />} />
              <Route path='/conference-Papers' element={<ConferencePapers />} />
              <Route path='/academic-Textbooks' element={<AcademicTextbooks />} />
              {/* Wrap the /admin route with the ProtectedComponent */}
              <Route element={<ProtectedComponent />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
            {!hideNavAndFooter.includes(location.pathname) && <Footer />}
            {/*hideNavAndFooter.includes(location.pathname) && <AdminFooter />*/}
          </AdminProvider>

        </GlobalStateProvider>
      </CurrencyProvider>
    </CartProvider>


  )
}

export default App

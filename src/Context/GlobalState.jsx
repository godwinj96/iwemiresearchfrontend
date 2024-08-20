/* eslint-disable */
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../supaBaseClient';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {

  const [query, setQuery] = useState('')
  const [queryHero, setQueryHero] = useState('')
  const [papers, setPapers] = useState([])
  const [results, setResults] = useState([]);
  const [bookClicked, setBookClicked] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({})
  const [isSearch, setIsSearch] = useState(false)

  const [book, setBook] = useState({})
  const [openAccessPapers, setOpenAcessPapers] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  let token


  const navigate = useNavigate()

  const fetchOpenAccessPapers = async () => {
    try {
      const { data, error } = await supabase.from('api_book').select('*');

      if (error) {
        toast.error(`Error fetching open access papers: ${error.message}`);
        console.error('Supabase error:', error);
        return; // Exit function if error occurs
      }

      const updatedData = data.map(book => ({
        ...book,
        openAccess: true
      }));
      setOpenAcessPapers(updatedData);
    } catch (err) {
      console.error('Error fetching open access papers:', err);
      toast.error(`An unexpected error occurred: ${err.message}`);
    }
  }

  const handleLogin = async (loginForm) => {
    try {
      const response = await fetch("https://iweminewbackend.onrender.com/api/auth/login/", {
        method: 'POST',

        body: loginForm
      })

      if (!response.ok) {
        // Check if response is not ok
        toast.error("If Error")
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      console.log("context run")
      const loginData = await response.json()
      console.log(loginData)


      if (!loginData) {
        toast.error('Login failed. Please check your credentials')
        return;
      } else {
        console.log(loginData.access)
        localStorage.setItem('accessToken', loginData.access)
        localStorage.setItem('refreshToken', loginData.refresh)



        setLoggedIn(true)
        //setUser(user)
        console.log(loggedIn)
        navigate('/')
        checkSession()
        console.log(loggedIn)
        //localStorage.setItem('refresh_token', JSON.stringify(loginData.refresh))
      }
    } catch (err) {
      toast.error("Catch:unsuccesful login")
    }

  }

  const userId = localStorage.getItem('userId')



  useEffect(() => {
    localStorage.setItem(`uploadedFiles_${userId}`, JSON.stringify(uploadedFiles));
  }, [uploadedFiles, userId]);

  useEffect(() => {

    const storedFiles = JSON.parse(localStorage.getItem(`uploadedFiles_${userId}`)) || [];
    setUploadedFiles(storedFiles);

    fetchOpenAccessPapers()
  }, [userId])

  const checkSession = async () => {
    try {
      //wait 
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const Token = localStorage.getItem('accessToken');
      if (!Token) {
        console.log("No access token found");
        setUser(null);
        setLoggedIn(false);
        return;
      } else {
        const response = await fetch("https://iweminewbackend.onrender.com/api/auth/profile/", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Token}`
          }
        })

        if (!response.ok) {
          console.log("No session found")
          console.log(response.status)
          setUser(null)
        } else {
          const userData = await response.json()
          console.log('User is logged in', userData)
          setUser(userData)
          setLoggedIn(true)
          localStorage.setItem('session', JSON.stringify(userData))
          localStorage.setItem(`userId`, userData.pk)
        }
      }





      /**
       * retrieving current session
      const { data, error } = await supabase.auth.getSession()
      console.log(data)
      if (error) {
        throw error
      }

      console.log(loggedIn)
      if (data) {
        console.log(data)
        console.log(data.session)
        console.log('User is logged in:', data.session.user)

        setUser(data.session.user)
        setLoggedIn(true)
        //store session in local storage for pesistence
        localStorage.setItem('supabaseSession', JSON.stringify(data))
        localStorage.setItem(`userId`, data.session.user.id)
       

      


      } else {
        console.log('No user session found')
        setUser(null)
        setLoggedIn(false)
        localStorage.removeItem('supabaseSession')
      }
*/

    } catch (error) {
      console.error('Error fetching session:', error.message)
    }
  }




  //getting user sesh
  /**
   *   useEffect(() => {

    

    const storedSession = localStorage.getItem('session')
    if (storedSession) {
      const session = JSON.parse(storedSession)
      setUser(session)
      console.log(session)
      console.log(user)
    }

    checkSession()//check fro session if not found in local storage
  }, [])
   */



  const refreshAccessToken = async () => {

    const refreshToken = localStorage.getItem('refreshToken')
    try {
      const response = await axios.post('https://iweminewbackend.onrender.com/api/auth/token/refresh/', { refresh: refreshToken })
      localStorage.setItem('accessToken', response.data.access)
      console.log('Access token refesh')
    } catch (err) {
      // console.log('Error refreshing', err.response.data)
    }
  }



  const tokenVerify = async () => {
    const tokenForm = new FormData()
    tokenForm.append("token", localStorage.getItem('accessToken'))

    try {
      const response = await fetch("https://iweminewbackend.onrender.com/api/auth/token/verify/", {
        method: 'POST',
        headers: { 'accept': 'application/json' },
        body: tokenForm
      });

      if (!response.ok) {
        console.log("Token verification failed, refreshing token");
        await refreshAccessToken();
      }

      checkSession();
    } catch (error) {
      console.error('Error verifying token:', error.message);
    }
  }

  useEffect(() => {

    if (localStorage.getItem('accessToken') !== null) {
      tokenVerify()
      checkSession();

      token = localStorage.getItem('acessToken')
      console.log(token)
    } else {
      console.log('No access token')
    }

    // console.log(token)
  }, [])





  const value = {
    query,
    setQuery,
    papers,
    setPapers,
    queryHero,
    setQueryHero,
    results,
    setResults,
    bookClicked,
    setBookClicked,
    loggedIn,
    setLoggedIn,
    //fetchPapers,
    user,
    setUser,
    setFilters,
    book,
    setBook,
    isSearch,
    setIsSearch,
    uploadedFiles,
    setUploadedFiles,
    userId,
    handleLogin,

  }

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  )

}
//custome api hook


export default GlobalStateProvider

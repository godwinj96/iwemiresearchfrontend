import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [queryHero, setQueryHero] = useState('');
  const [papers, setPapers] = useState([]);
  const [results, setResults] = useState([]);
  const [bookClicked, setBookClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);
  const [filters, setFilters] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [book, setBook] = useState({});
  const [openAccessPapers, setOpenAcessPapers] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [accessToken, setAccessToken] = useState(null); // New state for access token
  const [loading, setLoading] = useState(false); // Add loading state
  const [orders, setOrders] = useState()
  const navigate = useNavigate();



  const handleLogin = async (loginForm,redirectPath='/') => {
    setLoading(true)
    try {
      const response = await fetch('https://api.iwemiresearch.org/api/auth/login/', {
        method: 'POST',
        body: loginForm,
      });

      if (!response.ok) {
        setLoading(false)
        toast.error('Login failed. Please check your credentials.');
        return;
      }

      const loginData = await response.json();

      if (loginData.access && loginData.refresh) {
        setLoading(false)
        setAccessToken(loginData.access);
        localStorage.setItem('accessToken', loginData.access);
        localStorage.setItem('refreshToken', loginData.refresh);
        setLoggedIn(true);
        checkSession();
        toast.success('Welcome back!');
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login.');
    }
    setLoading(false)
  };

  const checkSession = async () => {
    setLoading(true); // Set loading to true at the start
    try {
      const Token = localStorage.getItem('accessToken');
      if (!Token) {
        setLoggedIn(false);
        return;
      }

      const response = await fetch('https://api.iwemiresearch.org/api/auth/profile/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });

      if (!response.ok) {
        setUser(null);
        setLoggedIn(false);
        setLoading(false)
        return false
      } else {
        const userData = await response.json();
        console.log('Fetched User Data:', userData);
        setUser(userData); // Properly update the user state

        setLoggedIn(true);
        localStorage.setItem('session', JSON.stringify(userData));
        localStorage.setItem('userId', userData.id);
        return true
      }
    } catch (error) {
      console.error('Error fetching session:', error.message);
      return false
    } finally {
      setLoading(false); // Ensure loading is set to false once the fetching is done
    }
  };


  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.post('https://api.iwemiresearch.org/api/auth/token/refresh/', {
        refresh: refreshToken,
      });
      setAccessToken(response.data.access);
      localStorage.setItem('accessToken', response.data.access);
    } catch (err) {
      console.error('Error refreshing access token:', err);
    }
  };

  const tokenVerify = async () => {
    const tokenForm = new FormData();
    tokenForm.append('token', localStorage.getItem('accessToken'));

    try {
      const response = await fetch('https://api.iwemiresearch.org/api/auth/token/verify/', {
        method: 'POST',
        headers: { accept: 'application/json' },
        body: tokenForm,
      });

      if (!response.ok) {
        await refreshAccessToken();
      }

      checkSession();
    } catch (error) {
      console.error('Error verifying token:', error.message);
    }
  };

  const getOrders = async () => {
    setLoading(true)
    const Token = localStorage.getItem('accessToken');
    if (!Token) {
      setUser(null);
      setLoggedIn(false);
      setLoading(false)
      return;
    }
    try {
      const response = await fetch("https://api.iwemiresearch.org/api/auth/profile/orders/", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })

      const responseJson = await response.json()
      //console.log(responseJson)
      if (!response.ok) {
        setLoading(false)
        throw new Error("error")

      }

      const userId = localStorage.getItem('userId'); // Replace with the current user's ID
      const userOrders = responseJson.filter(order => order.user_id === userId);

      const sortedOrders = userOrders.sort((a, b) => new Date(b.time_created) - new Date(a.time_created));

      setOrders(sortedOrders);
      setLoading(false)
    } catch (error) {
      console.error(error)
    } finally{
      setLoading(false)
    }


  }

  useEffect(() => {
    const initializeSession = async () => {
      if (localStorage.getItem('accessToken')) {
        await tokenVerify();
        await checkSession();
      }
      getOrders();
    };
  
    initializeSession();
  }, []);

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
    user,
    setUser,
    setFilters,
    book,
    setBook,
    isSearch,
    setIsSearch,
    uploadedFiles,
    setUploadedFiles,
    handleLogin,
    accessToken,
    loading,
    setLoading,
    getOrders,
    orders,
    checkSession
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;

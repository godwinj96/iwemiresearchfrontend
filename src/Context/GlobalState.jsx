import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../supaBaseClient';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [queryHero, setQueryHero] = useState('');
  const [papers, setPapers] = useState([]);
  const [results, setResults] = useState([]);
  const [bookClicked, setBookClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [book, setBook] = useState({});
  const [openAccessPapers, setOpenAcessPapers] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [accessToken, setAccessToken] = useState(null); // New state for access token
  const [loading, setLoading] = useState(true); // Add loading state
  const [orders, setOrders] = useState()
  const navigate = useNavigate();

 

  const handleLogin = async (loginForm) => {
    try {
      const response = await fetch('https://api.iwemiresearch.org/api/auth/login/', {
        method: 'POST',
        body: loginForm,
      });

      if (!response.ok) {
        toast.error('Login failed. Please check your credentials.');
        return;
      }

      const loginData = await response.json();

      if (loginData.access && loginData.refresh) {
        setAccessToken(loginData.access);
        localStorage.setItem('accessToken', loginData.access);
        localStorage.setItem('refreshToken', loginData.refresh);
        setLoggedIn(true);
        checkSession();
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login.');
    }
  };

  const checkSession = async () => {
    try {
      const Token = localStorage.getItem('accessToken');
      if (!Token) {
        setUser(null);
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
      } else {
        const userData = await response.json();
        console.log(userData)
        setUser(userData);
        setLoggedIn(true);
        localStorage.setItem('session', JSON.stringify(userData));
        localStorage.setItem('userId', userData.id);
      }
    } catch (error) {
      console.error('Error fetching session:', error.message);
    } finally {
      setLoading(false)
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
    const Token = localStorage.getItem('accessToken');
    if (!Token) {
      setUser(null);
      setLoggedIn(false);
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
      console.log(responseJson)
      if (!response.ok) {
        throw new Error("error")
        
      }

      const userId = localStorage.getItem('userId'); // Replace with the current user's ID
      const userOrders = responseJson.filter(order => order.user_id === userId);

      setOrders(userOrders)

    } catch (error) {
      console.error(error)
    }


  }

  useEffect(() => {
    getOrders()
    if (localStorage.getItem('accessToken')) {
      tokenVerify();
      checkSession();
    }
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
    orders
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;

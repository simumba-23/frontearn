import { useContext } from 'react';
import axios from 'axios';
import AuthContext from './context/AuthContext';

const UseAxiosWithAuth = () => {
  const { authTokens } = useContext(AuthContext);
  const accessToken = authTokens?.access;

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Change this to your backend URL
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  return api;
};

export default UseAxiosWithAuth;

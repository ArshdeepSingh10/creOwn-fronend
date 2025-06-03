import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as a from 'jwt-decode';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = a.jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/admin/Login');
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate('/admin/Login');
        }
      } else {
        setIsAuthenticated(false);
        navigate('/admin/Login');
      }
    };

    checkAuth(); // Call checkAuth immediately
  });

  return isAuthenticated;
};

export default useAuth;

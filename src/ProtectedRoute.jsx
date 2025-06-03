import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:3001/check-auth', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        alert("1")
        setIsAuthenticated(true);
      } else {
        alert("3")

        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
        if (error.response.status === 403 && error.response.data.error === 'No company found for this admin') {
        console.log("working");
        
        navigate("/admin/EditPage");
      setIsAuthenticated(true);

        return;
      }

      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/admin/Login");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;

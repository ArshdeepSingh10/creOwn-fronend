// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './Components/Home/Index';
import ProductDetail from './Components/Products/ProductDetail';
import AboutUs from './Components/Home/AboutUs';
import ContactUs from './Components/ContactUs';
import AllAboutProduct from './Components/Products/AllAboutProduct';
import Addproducts from './Components/Admin/Addproducts';
import AllProducts from './Components/Admin/AllProducts';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminRegistration from './Components/Admin/AdminRegistration';
import EditPage from './Components/Admin/EditPage';
import ProtectedRoute from './ProtectedRoute';
import AdminIndex from './Components/Admin/AdminIndex';
import Welcome from './Components/Welcome';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
      <Route path="/admin" element={<AdminIndex />}>
          <Route index element={<ProtectedRoute><Addproducts /></ProtectedRoute>} />
          <Route path="edit-product/:id" element={<ProtectedRoute><Addproducts /></ProtectedRoute>} />
          <Route path="AllProducts" element={<ProtectedRoute><AllProducts /></ProtectedRoute>} />
          <Route path="EditPage" element={<ProtectedRoute><EditPage/></ProtectedRoute>} />
        </Route>
        <Route path="/admin/Login" element={<AdminLogin />} />
        <Route path="/admin/Registration" element={<AdminRegistration />} />

        {/* Other Routes */}
        <Route path="/:uniqueName" element={<App />}>
          <Route index element={<Index />} />
          <Route path="Products" element={<ProductDetail />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="Products/Category/:category" element={<ProductDetail />} />
          {/* <Route path="/ContactUs" element={<ContactUs />} /> */}
          <Route path="Products/Product/:id" element={<AllAboutProduct />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

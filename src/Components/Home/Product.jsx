import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Product = ({ companyInfo }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { uniqueName } = useParams()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://creown-backend.onrender.com/api/productsUser/${uniqueName}`);
        setProducts(response.data.slice(0, 6)); // Take only the top 10 products
      } catch (error) {
        console.error('There was an error fetching the products!', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (category) => {
    navigate(`/${uniqueName}/products/category/${category}`);
  };

  return (
   
      <div className="p-3">
        <div>
          <h1 className="text-3xl text-center p-2 font-bold">Categories</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid-flow-row md:p-4 md:px-11  gap-4">
          {products.map(product => (
            <div 
              className="rounded shadow-lg bg-sky-900  cursor-pointer hover:-translate-y-2" 
              key={product.id}
              onClick={() => handleProductClick(product.category)}
            >
              <div className="h-28 w-full">
                <img
                  className="rounded-sm bg-white p-2 h-full w-full object-scale-down"
                  src={`${product.mainImage}`}
                  alt={product.category}
                />
              </div>
              <div className="my-auto">
                <div className="font-bold text-md mb-2 text-white text-center m-2">{product.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Product;

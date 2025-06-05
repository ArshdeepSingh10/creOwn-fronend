import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Product from "../Home/Product"
const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const { category } = useParams();
  const navigate = useNavigate();
const { uniqueName } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      console.log(uniqueName);
      try {
        const response = await axios.get(`https://creown-backend.onrender.com/api/productsUser/${uniqueName}`);
        console.log(response);
        console.log(category);
        const filteredProducts = category
          ? response.data.filter(product => product.category === category)
          : response.data;
        setProducts(filteredProducts);
      } catch (error) {
        console.error('There was an error fetching the products!', error);
      }
    };

    fetchProducts();
  }, [category]);
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);
  const handleProductClick = (id) => {
    navigate(`/${uniqueName}/products/product/${id}`);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
    <div className="md:container md:mx-auto lg:px-[4.7%] px-[1.7%]">
      <div className="grid grid-cols-1 md:grid-cols-2  grid-flow-row gap-2 pt-10 pb-6">
        {currentProducts.map(item => (
          <div 
            className="bg-sky-900 rounded-md shadow-md p-2 cursor-pointer" 
            key={item._id} 
            onClick={() => handleProductClick(item._id)}
          >
            {console.log(item._id)}
            <h1 className="px-3 font-bold text-white">{item.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2  grid-flow-row gap-2">
              <div className="bg-white m-2 rounded-md">
                <img
                  src={`${item.mainImage}`}
                  className="object-cover h-40 w-auto mx-auto"
                  alt={item.category}
                />
              </div>
              <div>
                <h1 className="font-bold text-white">Product Detail:</h1>
                <table className="table-auto border-collapse w-full max-w-full">
                  <tbody>
                    {/* <tr>
                      <td className="text-white font-bold text-start border-r-2 border-b-2 border-gray-300">Load Capacity</td>
                      <td className="border-b-2 border-gray-300 text-white ps-3">{item.loadCapacity}</td>
                    </tr>
                    <tr>
                      <td className="text-white font-bold text-start border-r-2 border-b-2 border-gray-300">Type</td>
                      <td className="border-b-2 border-gray-300 text-white ps-3">{item.type}</td>
                    </tr>
                    <tr>
                      <td className="text-white font-bold text-start border-r-2 border-b-2 border-gray-300">Material</td>
                      <td className="border-b-2 border-gray-300 text-white ps-3">{item.material}</td>
                    </tr>
                    <tr>
                      <td className="text-white font-bold text-start border-r-2 border-b-2 border-gray-300">Color</td>
                      <td className="border-b-2 border-gray-300 text-white ps-3">{item.color}</td>
                    </tr>
                    <tr>
                      <td className="text-white font-bold text-start border-r-2 border-b-2 border-gray-300">Dimensions</td>
                      <td className="border-b-2 border-gray-300 text-white ps-3">{item.dimensions}</td>
                    </tr> */}
                    <tr>
                      <td className="text-white font-bold text-start border-r-2 border-b-2 border-gray-300">Name</td>
                      <td className="border-b-2 border-gray-300 text-white ps-3">{item.name}</td>
                    </tr>
                    <tr>
                      <td className="text-white font-bold text-start border-r-2 border-b-2 border-gray-300">Category</td>
                      <td className="border-b-2 border-gray-300 text-white ps-3">{item.category}</td>
                    </tr>
                    {item.customFields.map((field, index) => (
                      <tr key={index}>
                      <td className="text-white font-bold text-start border-r-2 border-b-2 border-gray-300">{field.key}</td>
                      <td className="border-b-2 border-gray-300 text-white ps-3">{field.value}</td>
                    </tr>
                       ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between m-4">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" 
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" 
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
        >
          Next
        </button>
      </div>
     
    </div>
     <div className="bg-gray-200">
      
     <Product/>
  
   </div>
   </>
  );
};

export default ProductDetail;

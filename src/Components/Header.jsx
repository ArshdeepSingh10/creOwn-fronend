import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link,useParams, useLocation, useNavigate } from "react-router-dom";

export const Header = ({ companyInfo }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { uniqueName } = useParams();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  const handleContactUsClick = () => {
    console.log('working ')
    navigate("/", { state: { scrollToBottom: true } });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="shadow-lg sticky z-20 top-0 bg-white ">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-2">
          <div className="font-bold text-lg">{companyInfo.brandName}</div>
          <div className="hidden md:flex space-x-6">
            <Link to={`/${uniqueName}`}>
              <li className={`inline px-3 p-1 rounded-xl ${isActive("/") && location.pathname === "/" ? "bg-sky-900 text-white" : "hover:bg-sky-900 hover:text-white"}`}>Home</li>
            </Link>
            <Link to={`/${uniqueName}/AboutUs`}>
              <li className={`inline px-3 p-1 rounded-xl ${isActive("/AboutUs") ? "bg-sky-900 text-white": 'hover:bg-sky-900 hover:text-white'}`}>About Us</li>
            </Link>
            <Link to={`/${uniqueName}/Products`}>
              <li className={`inline px-3 p-1 rounded-xl ${isActive("/products") ? "bg-sky-900 text-white"  : 'hover:bg-sky-900 hover:text-white'}`}>Products</li>
            </Link>
            <li className="inline px-3 p-1 rounded-xl hover:bg-sky-900 hover:text-white cursor-pointer" onClick={handleContactUsClick}>
              Contact Us
            </li>
          </div>
          <div className="text-end md:hidden">
            <button onClick={toggleMenu}>
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col items-center space-y-4 py-2">
              <Link to="/" onClick={toggleMenu}>
                <li className={`inline px-3 p-1 rounded-xl ${isActive("/") && location.pathname === "/" ? "bg-sky-900 text-white" : "hover:bg-sky-900 hover:text-white"}`}>Home</li>
              </Link>
              <Link to="/AboutUs" onClick={toggleMenu}>
                <li className={`inline px-3 p-1 rounded-xl ${isActive("/AboutUs") ? "bg-sky-900 text-white": 'hover:bg-sky-900 hover:text-white'}`}>About Us</li>
              </Link>
              <Link to="/products" onClick={toggleMenu}>
                <li className={`inline px-3 p-1 rounded-xl ${isActive("/products") ? "bg-sky-900 text-white"  : 'hover:bg-sky-900 hover:text-white'}`}>Products</li>
              </Link>
              <li className="inline px-3 p-1 rounded-xl hover:bg-sky-900 hover:text-white cursor-pointer" onClick={() => {handleContactUsClick(); toggleMenu();}}>
                Contact Us
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

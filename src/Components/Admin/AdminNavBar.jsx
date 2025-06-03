import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Example logout logic (clear auth token, redirect, etc.)
    localStorage.removeItem("token"); // or any relevant key
    navigate("/admin/login"); // Redirect to login page
  };

  return (
    <nav className="bg-sky-900 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Admin Dashboard</div>

        <div className="flex items-center space-x-4">
          <Link to="/admin/AllProducts" className="text-white hover:text-white">
            Products
          </Link>
          <Link to="/admin" className="text-white hover:text-white">
            Add Product
          </Link>
          <Link to="/admin/EditPage" className="text-white hover:text-white">
            Edit page
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;

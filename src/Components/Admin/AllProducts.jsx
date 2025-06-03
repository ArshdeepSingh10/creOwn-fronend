import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "./axiosInstance";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/product");
        console.log(response.data.brandName)
      setBrandName(response.data.brandName)
        setProducts(response.data.products);
      } catch (error) {
        console.log("dfsjkfgdj");
        if (
          error.response?.status === 403 &&
          error.response?.data?.error === "No company found for this admin"
        ) {
          console.log("Redirecting to EditPage because no company exists");
          navigate("/admin/EditPage");
        } else {
          console.error("There was an error fetching the products!", error);
        }
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("There was an error deleting the product!", error);
    }
  };
  const columns = [
    {
      name: "Main Image",
      selector: (row) => (
        <img
          src={row.mainImage}
          alt={row.category}
          className="image-thumbnail"
        />
      ),
      sortable: false,
      maxWidth: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      maxWidth: "auto",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      maxWidth: "auto",
    },
    // {
    //   name: 'Load Capacity',
    //   selector: (row) => row.loadCapacity,
    //   sortable: true,
    //   maxWidth: 'auto',
    // },
    // {
    //   name: 'Material',
    //   selector: (row) => row.material,
    //   sortable: true,
    //   maxWidth: 'auto',
    // },
    // {
    //   name: 'Dimensions',
    //   selector: (row) => row.dimensions,
    //   sortable: true,
    //   maxWidth: 'auto',
    // },
    // {
    //   name: 'Type',
    //   selector: (row) => row.type,
    //   sortable: true,
    //   maxWidth: 'auto',
    // },
    // {
    //   name: 'Color',
    //   selector: (row) => row.color,
    //   sortable: true,
    //   maxWidth: 'auto',
    // },
    {
      name: "Custom Fields",
      selector: (row) =>
        Array.isArray(row.customFields) && row.customFields.length > 0 ? (
          <ul className="text-sm">
            {row.customFields.map((field, index) => (
              <li key={index}>
                <strong>{field.key}</strong>: {field.value}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-gray-400 italic">No custom fields</span>
        ),
      sortable: false,
      maxWidth: "250px",
    },

    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      maxWidth: "150px",
    },

    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            onClick={() => handleEdit(row._id)}
            className="bg-sky-900 text-white px-4 py-2 rounded mr-2 text-nowrap"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-600 text-white px-4 py-2 rounded text-nowrap"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredItems = products.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container mx-auto  py-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">All Products</h1>
          <input
            type="text"
            placeholder="Filter by name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
        </div>
       <div>
    <button
      onClick={() => {
        navigator.clipboard.writeText(window.location.origin + `/${brandName}`);
      }}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
    >
      Copy Portfolio Link
    </button>
  </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        highlightOnHover
        selectableRows
      />
    </div>
  );
};

export default AllProducts;

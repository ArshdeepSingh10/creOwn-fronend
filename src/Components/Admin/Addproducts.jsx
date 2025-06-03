import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "kti09qah"); // Replace with your actual upload preset
  formData.append("cloud_name", "dh1bbfjn1"); // Replace with your actual cloud name

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dh1bbfjn1/image/upload",
      formData
    );
    return response.data.url;
  } catch (error) {
    console.error(
      "Error uploading image to Cloudinary",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const AddProducts = ({ initialData = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    loadCapacity: "",
    material: "",
    category: "",
    dimensions: "",
    type: "",
    description: "",
    color: "",
    mainImageFile: null,
    otherImageFiles: [],
  });
  const [categoryList, setCategoryList] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customFields, setCustomFields] = useState([]);
  const [newCustomField, setNewCustomField] = useState({ key: "", value: "" });
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        console.log(response.data);
        setCategoryList(response.data);
      } catch (error) {
        if (error.response?.status === 403 && error.response?.data?.error === 'No company found for this admin') {
          console.log("Redirecting to EditPage because no company exists");
          navigate('/admin/EditPage');
        }
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
    if (initialData) {
      setFormData({
        ...initialData,
        mainImageFile: null,
        otherImageFiles: [],
      });
    } else if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axiosInstance.get(`/products/${id}`);
          setFormData({
            ...response.data,
            mainImageFile: null,
            otherImageFiles: [],
          });
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [initialData, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "mainImageFile") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === "otherImageFiles") {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      let maxid = categoryList.reduce(
        (max, category) => (category.id > max ? category.id : max),
        0
      );
      const newCategoryObj = { id: maxid + 1, name: newCategory.trim() };
      setCategoryList([...categoryList, newCategoryObj]);
      setNewCategory("");

      try {
        await axiosInstance.post("/categories", {
          id: maxid + 1,
          name: newCategory.trim(),
        });
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleDeleteCategory = async (category) => {
    try {
      await axiosInstance.delete("/categories", {
        data: { category },
      });
      setCategoryList(categoryList.filter((cat) => cat.name !== category));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleAddCustomField = () => {
    if (newCustomField.key.trim() && newCustomField.value.trim()) {
      setCustomFields([...customFields, newCustomField]);
      setNewCustomField({ key: "", value: "" });
    }
  };
  
  const handleRemoveCustomField = (index) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mainImageFile) {
      alert("Main product image is required.");
      return;
    }

    if (formData.otherImageFiles.length === 0) {
      alert("At least one other product image is required.");
      return;
    }

    setIsLoading(true);
    try {
      let mainImageUrl = "";
      let otherImageUrls = [];
      if (formData.mainImageFile) {
        mainImageUrl = await uploadImageToCloudinary(formData.mainImageFile);
      }
      if (formData.otherImageFiles.length > 0) {
        for (const file of formData.otherImageFiles) {
          const url = await uploadImageToCloudinary(file);
          otherImageUrls.push(url);
        }
      }

      const productData = {
        name: formData.name,
        loadCapacity: formData.loadCapacity,
        material: formData.material,
        category: formData.category,
        dimensions: formData.dimensions,
        type: formData.type,
        description: formData.description,
        color: formData.color,
        mainImage: mainImageUrl,
        otherImages: otherImageUrls,
        customFields: customFields, // include this
      };

      if (id) {
        await axiosInstance.put(`/products/${id}`, productData);
        toast.success("Product updated successfully!");
      } else {
        await axiosInstance.post("/add-product", productData);
        toast.success("Product added successfully!");
      }
     // navigate("/products");
    } catch (error) {
      toast.error("There was an error adding/updating the product!");
      console.error("There was an error adding/updating the product!", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <ToastContainer />
      <div className="py-1 bg-gray-100">
        <div className="w-full flex gap-5 px-4 mx-auto mt-6">
          <div className="w-1/3 relative pe-5">
            <div className="fixed">
              <div className="flex">
                <input
                  type="text"
                  name="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New Category"
                  className="mt-2 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="mt-2 bg-sky-900 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Add Category
                </button>
              </div>
              <ul className="mt-4 bg-white p-3 rounded-md">
                {categoryList.map((cat) => (
                 
                    <li
                      key={cat.id}
                      className="flex items-center justify-between mb-2 px-3 "
                    >
                      {cat.name}
                      <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.name)}
                    className="text-end hover:text-red-900"
                  > <span className="text-red-500">
                        <FontAwesomeIcon icon={faTrash} />
                      </span></button>
                    </li>
                 
                ))}
              </ul>
            </div>
          </div>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-sky-900 mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-white text-xl font-bold">
                  {id ? "Edit Product" : "Add Product"}
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-white">
              <form onSubmit={handleSubmit}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Product Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                      />
                    </div>
                  </div>
                  {/* <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="loadCapacity"
                      >
                        Load Capacity
                      </label>
                      <input
                        type="text"
                        name="loadCapacity"
                        value={formData.loadCapacity}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        
                      />
                    </div>
                  </div> */}
                  {/* <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="material"
                      >
                        Material
                      </label>
                      <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        
                      />
                    </div>
                  </div> */}
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="category"
                      >
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        
                      >
                        <option value="">Select a category</option>
                        {categoryList.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="dimensions"
                      >
                        Dimensions
                      </label>
                      <input
                        type="text"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        
                      />
                    </div>
                  </div> */}
                  {/* <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="type"
                      >
                        Type
                      </label>
                      <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        
                      />
                    </div>
                  </div> */}
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        rows="4"
                        
                      ></textarea>
                    </div>
                  </div>
                  {/* <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="color"
                      >
                        Color
                      </label>
                      <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        
                      />
                    </div>
                  </div> */}
                  <div className="w-full px-4">
  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
    Custom Fields
  </label>
  <div className="flex mb-2">
    <input
      type="text"
      placeholder="Key"
      value={newCustomField.key}
      onChange={(e) => setNewCustomField({ ...newCustomField, key: e.target.value })}
      className="mr-2 border px-2 py-1 rounded w-1/3"
    />
    <input
      type="text"
      placeholder="Value"
      value={newCustomField.value}
      onChange={(e) => setNewCustomField({ ...newCustomField, value: e.target.value })}
      className="mr-2 border px-2 py-1 rounded w-1/3"
    />
    <button
      type="button"
      onClick={handleAddCustomField}
      className="bg-sky-900 text-white px-3 py-1 rounded hover:bg-sky-800"
    >
      Add
    </button>
  </div>

  <ul className="bg-white rounded p-3 shadow-md">
    {customFields.map((field, index) => (
      <li key={index} className="flex justify-between items-center mb-2">
        <span className="font-medium">{field.key}: </span>
        <span>{field.value}</span>
        <button
          type="button"
          onClick={() => handleRemoveCustomField(index)}
          className="ml-3 text-red-500 hover:text-red-700"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </li>
    ))}
  </ul>
</div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="mainImageFile"
                      >
                        Main Product Image
                      </label>
                      <input
                        type="file"
                        name="mainImageFile"
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="otherImageFiles"
                      >
                        Other Product Images
                      </label>
                      <input
                        type="file"
                        name="otherImageFiles"
                        onChange={handleChange}
                        multiple
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-sky-900 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    id ? "Update Product" : "Add Product"
                  )}
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;

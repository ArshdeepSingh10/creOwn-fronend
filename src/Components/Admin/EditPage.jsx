import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from "./axiosInstance";
import { ToastContainer ,toast } from 'react-toastify';
export default function EditPage() {
  const [formData, setFormData] = useState({
    brandName: '',
    slogan: '',
    brandImage: null,
    productImages: [],
    aboutUs: '',
    aboutUsImage: null,
    mobileNumber: '',
    whatsappNo: '',
    facebookId: '',
    instagramId: '',
    shopAddress: '',
    factoryAddress: '',
    location: ''
  });

  const [existingData, setExistingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // API base URL
  const API_URL = '/company'; // replace with your backend URL

  // Fetch company info on mount
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/info`);
        const company = response.data[0];
        console.log(company)
        if (company) {
          setExistingData(company);
          setFormData({
            brandName: company.brandName || '',
            slogan: company.slogan || '',
            brandImage: company.brandImage || null,
            productImages: company.productImages || [],
            aboutUs: company.aboutUs || '',
            aboutUsImage: company.aboutUsImage || null,
            mobileNumber: company.mobileNumber || '',
            whatsappNo: company.whatsappNo || '',
            facebookId: company.facebookId || '',
            instagramId: company.instagramId || '',
            shopAddress: company.shopAddress || '',
            factoryAddress: company.factoryAddress || '',
            location: company.location || ''
          });
        }
      } catch (error) {
        console.error('Error fetching company info:', error);
      }
    };

    fetchCompanyInfo();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'productImages') {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        productImages: fileArray
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "kti09qah");
    data.append("cloud_name", "dh1bbfjn1");

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dh1bbfjn1/image/upload", data);
      return res.data.url;
    } catch (error) {
      console.error('Error uploading to Cloudinary', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
 const locationPattern = /^<iframe\s+.*src="https:\/\/www\.google\.com\/maps\/embed\?.*<\/iframe>$/;
  if (!locationPattern.test(formData.location.trim())) {
    toast.error('Please enter a valid Google Maps embed iframe code.');
    setIsLoading(false);
    return;
  }
    try {
      let brandImageUrl = existingData?.brandImage || '';
      let aboutUsImageUrl = existingData?.aboutUsImage || '';
      let productImagesUrls = existingData?.productImages || [];

      // Upload new images if selected
      if (formData.brandImage) {
        brandImageUrl = await uploadImageToCloudinary(formData.brandImage);
      }
      if (formData.aboutUsImage) {
        aboutUsImageUrl = await uploadImageToCloudinary(formData.aboutUsImage);
      }
      if (formData.productImages.length > 0) {
        productImagesUrls = [];
        for (const file of formData.productImages) {
          const url = await uploadImageToCloudinary(file);
          productImagesUrls.push(url);
        }
      }

      const finalData = {
        ...formData,
        brandImage: brandImageUrl,
        aboutUsImage: aboutUsImageUrl,
        productImages: productImagesUrls
      };

      if (existingData) {
console.log("existingData");
        console.log(existingData.length)
        // Update company info
        await axiosInstance.put(`${API_URL}/update/${existingData._id}`, finalData);
        toast.success('Company info updated successfully!');
      } else {
        console.log(" new existingData");
        
        // Create new company info
        await axiosInstance.post(`${API_URL}/submit`, finalData);
        toast.success('Company info added successfully!');
      }

    } catch (error) {
      console.error('Error submitting company info:', error);
      toast.error('Failed to submit company info.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl bg-white shadow-2xl rounded-2xl my-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-center mb-8 text-sky-900">
        {existingData ? 'Edit Company Information' : 'Add Company Information'}
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Brand Name */}
        <div>
          <label className="block font-semibold mb-1">Company Name</label>
          <input type="text" name="brandName" value={formData.brandName} onChange={handleChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" />
        </div>

        {/* Slogan */}
        <div>
          <label className="block font-semibold mb-1">Company Slogan</label>
          <input type="text" name="slogan" value={formData.slogan} onChange={handleChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" />
        </div>

        {/* Brand Image */}
        <div>
          <label className="block font-semibold mb-1">Brand Logo Image</label>
          <input type="file" name="brandImage" onChange={handleFileChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" />
          {existingData?.brandImage && (
            <img src={existingData.brandImage} alt="Brand" className="w-32 h-32 object-cover mt-2 rounded-xl" />
          )}
        </div>

        {/* Product Images */}
        <div>
          <label className="block font-semibold mb-1">Product Images</label>
          <input type="file" name="productImages" multiple onChange={handleFileChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" />
          {existingData?.productImages?.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {existingData.productImages.map((img, idx) => (
                <img key={idx} src={img} alt="Product" className="w-24 h-24 object-cover rounded-xl" />
              ))}
            </div>
          )}
        </div>

        {/* About Us */}
        <div>
          <label className="block font-semibold mb-1">About Us</label>
          <textarea name="aboutUs" value={formData.aboutUs} onChange={handleChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" rows="4" />
        </div>

        {/* About Us Image */}
        <div>
          <label className="block font-semibold mb-1">About Us Image</label>
          <input type="file" name="aboutUsImage" onChange={handleFileChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" />
          {existingData?.aboutUsImage && (
            <img src={existingData.aboutUsImage} alt="About Us" className="w-32 h-32 object-cover mt-2 rounded-xl" />
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block font-semibold mb-1">Mobile Number</label>
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block font-semibold mb-1">WhatsApp Number</label>
          <input type="text" name="whatsappNo" value={formData.whatsappNo} onChange={handleChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" />
        </div>

        {/* Facebook ID */}
        <div>
          <label className="block font-semibold mb-1">Facebook ID</label>
          <input type="text" name="facebookId" value={formData.facebookId} onChange={handleChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" />
        </div>

        {/* Instagram ID */}
        <div>
          <label className="block font-semibold mb-1">Instagram ID</label>
          <input type="text" name="instagramId" value={formData.instagramId} onChange={handleChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" />
        </div>

        {/* Shop Address */}
        <div>
          <label className="block font-semibold mb-1">Shop Address</label>
          <input type="text" name="shopAddress" value={formData.shopAddress} onChange={handleChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" />
        </div>

        {/* Factory Address */}
        <div>
          <label className="block font-semibold mb-1">Factory Address</label>
          <input type="text" name="factoryAddress" value={formData.factoryAddress} onChange={handleChange}
            className="form-control border border-gray-300 p-3 rounded-xl w-full" />
        </div>

        {/* Location */}
        {/* Location */}
<div>
  <label className="block font-semibold mb-1">Location (Embed iframe only)</label>
  <input
    type="text"
    name="location"
    value={formData.location}
    onChange={handleChange}
    placeholder='Paste Google Maps embed iframe here'
    className="form-control border border-gray-300 p-3 rounded-xl w-full"
  />
  {formData.location.includes('https://www.google.com/maps/embed') && (
    <div className="mt-4">
      <div dangerouslySetInnerHTML={{ __html: formData.location }} />
    </div>
  )}
</div>


        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-sky-900 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-sky-700 transition duration-300"
          >
            {isLoading ? 'Saving...' : existingData ? 'Update Company Info' : 'Add Company Info'}
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../Admin/axiosInstance"; // adjust your axios instance path
import Banner from "./Banner";
import Carousel from "./Carousel";
import Product from "./Product";
import AboutUs from "./AboutUs";

const Index = () => {
  const { uniqueName } = useParams(); // 👈 get uniqueName from URL
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    document.title = uniqueName ; // Set the browser tab title

    const fetchCompanyInfo = async () => {
      try {
        const response = await axiosInstance.get(`/company/unique/${uniqueName}`);
       console.log(response)
        setCompanyInfo(response.data);
      } catch (error) {
        console.error('Error fetching company info:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uniqueName) {
      fetchCompanyInfo();
    }
  }, [uniqueName]);

  if (loading) return <div>Loading...</div>;
  if (!companyInfo) return <div>Company not found.</div>;

  return (
    <div>
      {/* Pass the companyInfo to each component */}
      <Banner companyInfo={companyInfo} />
      <Carousel companyInfo={companyInfo} />
      <AboutUs companyInfo={companyInfo} />
      <div className="bg-gray-200">
        <div className="container mx-auto px-5 py-3">
          <Product companyInfo={companyInfo} />
        </div>
      </div>
    </div>
  );
};

export default Index;

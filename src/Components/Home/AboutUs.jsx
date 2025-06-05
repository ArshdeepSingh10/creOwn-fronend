import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../Admin/axiosInstance"; // Adjust as needed

const AboutUs = ({ companyInfo: initialCompanyInfo }) => {
  const { company } = useParams();

  const [companyInfo, setCompanyInfo] = useState(initialCompanyInfo || null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shortDescriptionLength, setShortDescriptionLength] = useState(750);
  const [loading, setLoading] = useState(!initialCompanyInfo);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      setShortDescriptionLength(window.innerWidth > 768 ? 750 : 350);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axiosInstance.get(`/company/unique/${company}`);
        console.log(response);
        setCompanyInfo(response.data);
      } catch (error) {
        console.error("Error fetching company info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (company && !initialCompanyInfo) {
      fetchCompanyInfo();
    }
  }, [company, initialCompanyInfo]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!companyInfo) return <div className="text-center p-4">Company not found.</div>;

  const description = companyInfo.aboutUs || "";
  const shortDescription =
    description.length > shortDescriptionLength
      ? description.substring(0, shortDescriptionLength) + "..."
      : description;

  return (
    <div className="container mx-auto px-5">
      <div className="text-center font-extrabold text-3xl pt-3">About Us</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 items-center">
        <div className="h-[400px] flex justify-center items-center">
          <img
            src={companyInfo.aboutUsImage}
            className="rounded h-[90%] w-full object-fill"
            alt="About Us"
          />
        </div>

        <div className="h-max">
          {isExpanded ? description : shortDescription}
          {description.length > shortDescriptionLength && (
            <span
              className="text-blue-500 cursor-pointer ml-2"
              onClick={toggleReadMore}
            >
              {isExpanded ? "Read Less" : "Read More"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

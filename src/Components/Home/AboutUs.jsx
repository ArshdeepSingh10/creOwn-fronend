import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const AboutUs = ({ companyInfo }) => {
   const { company } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [shortDescriptionLength, setShortDescriptionLength] = useState(750);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

   const description = companyInfo.aboutUs;
 

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
useEffect(()=>{
   const fetchCompanyInfo = async () => {
      try {
        const response = await axiosInstance.get(`/company/unique/${company}`);
       console.log(response)
        setCompanyInfo(response.data);
      } catch (error) {
        console.error('Error fetching company info:', error);
      } finally {
        setLoading(false);
      }
    };
   if (company && companyInfo == null) {
      fetchCompanyInfo();
    }
},[company])
  const shortDescription = description.substring(0, shortDescriptionLength) + '...';

  return (
    <div className="container mx-auto px-5">
      {/* Title */}
      <div className="text-center font-extrabold text-3xl pt-3">About Us</div>

      <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 p-2 justify-center items-center">
        {/* About Us Image */}
        <div className="h-[400px] flex justify-center items-center">
          <img src={companyInfo.aboutUsImage} className="rounded h-[90%] w-full object-fill" alt="About Us" />
        </div>

        {/* About Us Description */}
        <div className="h-max">
          {isExpanded ? description : shortDescription}
          <span className="text-blue-500 cursor-pointer ml-2" onClick={toggleReadMore}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

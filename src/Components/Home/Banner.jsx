import React from "react";

const Banner = ({ companyInfo }) => {
   const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(63, 149, 175, 0.5)), url(${companyInfo.brandImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay',
    height:'70vh',
    display: "flex",
    alignItems: 'center'
  };
  return (
     <div className="relative">
      {/* Background Image */}
      <div className="py-24 px-5 pt-12 relative" style={backgroundStyle}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-cyan-700/50 z-0"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-5">
          <div className="lg:p-5 w-full">
            <p className="lg:text-5xl md:text-4xl sm:text-2xl text-md  text-white text-center font-bold"
             style={{ textShadow: '2px 3px black' }}>
              {companyInfo.brandName}
            </p>
            <p className="lg:text-xl md:text-md text-xs font-bold  text-center text-white  m-3 leading-none capitalize"
                         style={{ textShadow: '1px 2px black' }}>
              {companyInfo.slogan}
            </p>
          </div>
          <div className="text-center">
            <a
              href={`tel:${companyInfo.mobileNumber}`}
              className="bg-sky-950 p-2  md:px-8 text-white font-bold md:uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
            >
              Call us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

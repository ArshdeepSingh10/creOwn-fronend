import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../../Styles/Carousel.css";
import { Link } from "react-router-dom";
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black", padding: "10px" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black", padding: "10px" }}
      onClick={onClick}
    />
  );
};
const Carousel = ({ companyInfo }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="p-4">
      <Slider {...settings}>
      {companyInfo?.productImages?.map((imgUrl, index) => (
  <Link to={`/${companyInfo.uniqueName}/Products`} key={index}>
    <div className="p-1">
      <div className="bg-gray-200 rounded-md">
        <img
          src={imgUrl}
          className="w-full object-scale-down h-[150px]"
          alt={`Product ${index + 1}`}
        />
      </div>
    </div>
  </Link>
))}
        {/* <Link to="/products">
        <div className=" p-1">
          <div className="bg-gray-200 rounded-md ">
            <img
              src="productsImg/1.png"
              className=" w-full object-scale-down h-[150px]"
              alt="Image 2"
            />
          </div>
        </div>
        </Link>
        <Link to="/products">
        <div className=" p-1">
          <div className="bg-gray-200 rounded-md ">
            <img
              src="productsImg/2.png"
              className=" w-full object-scale-down h-[150px]"
              alt="Image 3"
            />
          </div>
        </div>
        </Link>
        <Link to="/products">
        <div className=" p-1">
          <div className="bg-gray-200 rounded-md ">
            <img
              src="productsImg/3.png"
              className=" w-full object-scale-down h-[150px]"
              alt="Image 4"
            />
          </div>
        </div>
        </Link>
        <Link to="/products">
        <div className=" p-1">
          <div className="bg-gray-200 rounded-md ">
            <img
              src="productsImg/4.png"
              className=" w-full object-scale-down h-[150px]"
              alt="Image 5"
            />
          </div>
        </div>
        </Link>
        <Link to="/products">
        <div className=" p-1">
          <div className="bg-gray-200 rounded-md ">
            <img
              src="productsImg/3.png"
              className=" w-full object-scale-down h-[150px]"
              alt="Image 4"
            />
          </div>
        </div>
        </Link> */}
      </Slider>
    </div>
  );
};

export default Carousel;

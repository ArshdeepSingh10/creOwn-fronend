import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AllAboutProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [shortDescription, setShortDescription] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(id)
        const response = await axios.get(
          `https://creown-backend.onrender.com/api/products/${id}`
        );
        console.log(response.data);
        setProduct(response.data);
        setMainImage(response.data.mainImage); // Set the initial main image

        // Set short description
        const description = response.data.description;
        if (description.length > 100) {
          setShortDescription(description.substring(0, 100) + "...");
        } else {
          setShortDescription(description);
        }
      } catch (error) {
        console.error("There was an error fetching the product!", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-[4.7]">
      <div className="bg-white shadow-lg rounded-2xl p-2 m-3">
        <div className="grid grid-cols-1 md:grid-cols-2  grid-flow-row gap-3">
          <div className="bg-sky-900 h-max p-2 rounded-md">
            <div className="w-full bg-white shadow p-2 flex justify-center rounded-lg">
              <img
                src={mainImage}
                alt={product.category}
                className="lg:h-80 h-48 object-scale-down m-2 w-auto"
              />
            </div>
            {product.otherImages.length > 0 && (
              <div className="flex w-full me-2 my-auto rounded">
                {[product.mainImage, ...product.otherImages]?.map(
                  (image, index) => (
                    <div
                      className="h-28 w-full bg-white rounded-md border-4 border-zinc-200 shadow shadow-black m-2"
                      key={index}
                      onClick={() => handleImageClick(image)}
                      style={{ cursor: "pointer" }} // Add a pointer cursor to indicate clickable images
                    >
                      <img
                        src={image}
                        className="object-scale-down h-full w-full"
                        alt={product.category}
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div>
            <h1 className="font-bold text-lg text-zinc-500 px-3">
              Product Detail :
            </h1>
            <table className="table-auto border-collapse text-lg w-full max-w-full mt-2">
              <tbody>
                <tr>
                  <td className="text-gray-500 text-start p-3 border-r-2 border-b-2 border-gray-300">
                    Name
                  </td>
                  <td className="border-b-2 border-gray-300 p-3">
                    {product.name}
                  </td>
                </tr>
                <tr>
                  <td className="text-gray-500 text-start p-3 border-r-2 border-b-2 border-gray-300">
                  Category
                  </td>
                  <td className="border-b-2 border-gray-300 p-3">
                    {product.category}
                  </td>
                </tr>                
                {product.customFields.map((field, index) => (
                  <tr key={index}>
                    <td className="text-gray-500 text-start p-3 border-r-2 border-b-2 border-gray-300">
                      {field.key}
                    </td>
                    <td className="border-b-2 border-gray-300 p-3">
                      {field.value}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2}>
                    {product.description && (
                      <div className="p-2 px-4 text-justify bg-sky-900 rounded-md my-3">
                        <h1 className="text-lg font-bold text-white">
                          Description:
                        </h1>
                        <p className="text-white">
                          {isDescriptionExpanded
                            ? product.description
                            : shortDescription}
                          <span
                            className="text-blue-500 cursor-pointer ml-2"
                            onClick={toggleDescription}
                          >
                            {isDescriptionExpanded ? "Read Less" : "Read More"}
                          </span>
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAboutProduct;

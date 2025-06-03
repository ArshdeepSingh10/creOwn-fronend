import React, { forwardRef } from "react";
import "../Styles/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

const ContactUs = forwardRef((props, ref) => {
  const { companyInfo } = props;
  return (
    <footer ref={ref} className="text-white">
      <div className="backgroundImg mb-0">
        <div className="p-6 lg:flex gap-2 justify-evenly">
          <div
  className="w-full lg:w-1/3 px-2 mb-4 md:mb-0"
  style={{ height: '300px', width: '100%', overflow: 'hidden' }}
  dangerouslySetInnerHTML={{ __html: companyInfo.location }}
></div>

          <div className="flex flex-col md:flex-row justify-evenly items-start gap-4">
            <div className="w-full md:w-1/2 text-left">
              <h3 className="font-bold text-2xl">Shop</h3>
              <p className="text-md">{companyInfo.shopAddress}</p>
              {/* <p className="mt-5">+91 98883-30430</p> */}
            </div>
            <div className="w-full md:w-1/2 text-left">
              <h3 className="font-bold text-2xl">Factory</h3>
              <p className="text-md">{companyInfo.factoryAddress}</p>
              {/* <p className="mt-5">646.480.6328</p> */}
            </div>
          </div>
        </div>
        <div className="social-community text-center md:text-left p-4">
          <h3 className="text-xl">Join the Social Community</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${companyInfo.mobileNumber}`} className="social-link">
              <FontAwesomeIcon icon={faPhone} /> Call
            </a>
            <a href={companyInfo.instagramId} target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faInstagram} /> Instagram
            </a>
            <a href={companyInfo.facebookId} target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </a>
            <a href={`https://wa.me/${companyInfo.whatsappNo}`}target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
            </a>
          </div>
        </div>
        <div className="footer text-center md:text-left p-4">
          <p>102 Madison Ave, 2nd Floor | New York, NY 10016 |<a href="https://www.instagram.com/singhmatharoo90/" target="_blank"> Developed By: Arshdeep Singh</a></p>
        </div>
      </div>
    </footer>
  );
});

export default ContactUs;

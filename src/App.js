import React, { useEffect, useRef ,useState} from "react";
import { Outlet, useLocation,useParams } from "react-router-dom";
import './App.css';
import ContactUs from './Components/ContactUs';
import axiosInstance from './Components/Admin/axiosInstance';
import { Header } from './Components/Header';

function App() {
  const location = useLocation();
  const bottomRef = useRef(null);
const { uniqueName } = useParams(); // 👈 get uniqueName from URL
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    if (location.state?.scrollToBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (uniqueName) {
      fetchCompanyInfo();
    }
  }, [uniqueName,location]);
  
  if (loading) return <div>Loading...</div>;
  if (!companyInfo) return <div>Company not found.</div>;
  return (
    <div className="app-container">
      <Header companyInfo={companyInfo}/>
      <div className="content">
        <Outlet />
      </div>
      <ContactUs  companyInfo={companyInfo} ref={bottomRef} />
          </div>
    
  
  );
}

export default App;


import Home from "../pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Van from "../pages/Van";
import Layout from "../components/layout/Layout";
import AdminUse from "../components/adminUse/AdminUse";
import Preview from "../components/preview/Preview";
import Changes from "../components/changes/Change"
import Contact from "../websiteComponents/components/Contact/Contact";
import Inquiry from "../websiteComponents/components/InquiryForm/InqueryForm"
import Dashboard from "../websiteComponents/components/Dashboard/Dashboard";
import PortfolioForm from "../websiteComponents/components/adminPanel/Portfolio/PortfolioForm";
import VanForm from "../websiteComponents/components/adminPanel/Vans/VansForm"
import VansForSale from "../websiteComponents/components/Vansforsale/VansForSale";
import Finishes from "../websiteComponents/components/Finishes/Finishes";


const AppRoutes = () => {


  return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/finishes" element={<Finishes />} />
            <Route path="/vans-for-sale" element={<VansForSale />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/van-form" element={<VanForm />} />
            <Route path="/portfolio-form" element={<PortfolioForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/changes" element={<Changes />} />
            <Route path="/layout" element={<Layout />} />
            <Route path="/van" element={<Van />} />
            <Route path="/admin" element={<AdminUse />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>

  );
};

export default AppRoutes;

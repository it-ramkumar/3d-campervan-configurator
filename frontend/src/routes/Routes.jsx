
import Home from "../pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollFromTop from "../components/ScrollFromTop/ScrollFromTop";
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
import Layouts from "../websiteComponents/components/Layouts/layouthero/Layouts";
import BlogForm from "../websiteComponents/components/adminPanel/Blog/Form";
import Blogs from "../websiteComponents/components/Blogs/Blogs";
import FamilyLayout from "../websiteComponents/components/CampervanLayoutforFamily/FamilyLayoutHero/FamilyLayout";
import Couples from "../websiteComponents/components/CampervanLayoutforCouples/CoupleLayoutHero/CoupleLayout";
import DetailPage from "../detailPage";
import SantaMonica from "../websiteComponents/components/SantaMonica/Santa";
import Signup from "../websiteComponents/components/Auth/Signup";
import Login from "../websiteComponents/components/Auth/Login";
import OurProcess from "../websiteComponents/components/OurProcess/Processhero/OurProcess"
import AboutUs from "../websiteComponents/components/AboutUs/AboutUshero/Aboutus"
import ShowRoom from "../websiteComponents/components/Showroom/Showroomhero/showroom"
import NotFound from "../websiteComponents/components/NotFound/NotFound";

const AppRoutes = () => {


  return (
    <Router>
      <ScrollFromTop />
      <Routes>


        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/showroom" element={<ShowRoom/>}/>
        <Route path="/*" element={<NotFound/>}/>
        <Route path="/our-process" element={<OurProcess />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/santa-monica" element={<SantaMonica />} />
        <Route path="/detail-page" element={<DetailPage />} />
        <Route path="/family-layout" element={<FamilyLayout />} />
        <Route path="/couples-layout" element={<Couples />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog-form" element={<BlogForm />} />
        <Route path="/layouts" element={<Layouts />} />
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

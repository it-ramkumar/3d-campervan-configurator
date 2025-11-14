
import Home from "../pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollFromTop from "../components/ScrollFromTop/ScrollFromTop";
import Van from "../pages/Van";
import Preview from "../components/preview/Preview";
import Contact from "../websiteComponents/components/Contact/Contact";
import Inquiry from "../websiteComponents/components/InquiryForm/InqueryForm"
import Dashboard from "../websiteComponents/components/Dashboard/Dashboard";
import PortfolioForm from "../websiteComponents/components/adminPanel/Portfolio/PortfolioForm";
import VanForm from "../websiteComponents/components/adminPanel/Vans/VansForm"
import VansForSale from "../websiteComponents/components/Vansforsale/VansForSale";
import Layouts from "../websiteComponents/components/Layouts/Layouts";
import BlogForm from "../websiteComponents/components/adminPanel/Blog/Form";
import Blogs from "../websiteComponents/components/Blogs/Blogs";
import FamilyLayout from "../websiteComponents/components/CampervanLayoutforFamily/FamilyLayout";
import Couples from "../websiteComponents/components/CampervanLayoutforCouples/CoupleLayout";
import VanDetail from "../websiteComponents/components/VanDetail/VanDetail";
import Signup from "../websiteComponents/components/Auth/Signup";
import Login from "../websiteComponents/components/Auth/Login";
import OurProcess from "../websiteComponents/components/OurProcess/OurProcess"
import AboutUs from "../websiteComponents/components/AboutUs/Aboutus"
import ShowRoom from "../websiteComponents/components/Showroom/showroom"
import NotFound from "../websiteComponents/components/NotFound/NotFound";
import ConfiguratorForm from "../websiteComponents/components/adminPanel/Configurator/ConfiguratorForm"
import Exteriorpage from "../websiteComponents/components/Exteriorpage/Exterior";
import LayoutDetail from "../websiteComponents/components/LayoutDetail/LayoutDetail";
import BlogDetail from "../websiteComponents/components/BlogDetail/Blogdetail"
import OurClients from "../websiteComponents/components/OurClients/Clienthero/Client"
import ChatWidget from "../websiteComponents/components/ChatMaxima/ChatMaxima";
import BlackFridayLabel from "../websiteComponents/components/BlackFriday/BlackFriday";
import Interiorpage from "../websiteComponents/components/Interior/Interior";
import Cushionpage from "../websiteComponents/components/Cushion/Cushion";
import { PrivateRoute } from "../websiteComponents/components/PrivateComponent/PrivateComponent";
const AppRoutes = () => {

  return (
    <Router>
      <ScrollFromTop />
      <BlackFridayLabel/>
         <ChatWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/configurator-form" element={<ConfiguratorForm />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/showroom" element={<ShowRoom/>}/>
        <Route path="/*" element={<NotFound/>}/>
        <Route path="/our-process" element={<OurProcess />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/van-detail/:slug" element={<VanDetail />} />
        <Route path="/layout-detail/:slug" element={<LayoutDetail />} />
        <Route path="/blog-detail/:id" element={<BlogDetail />} />
        <Route path="/innovation" element={<Exteriorpage />} />
        <Route path="/family-layout" element={<FamilyLayout />} />
        <Route path="/couples-layout" element={<Couples />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog-form" element={<BlogForm />} />
        <Route path="/layouts" element={<Layouts />} />
        <Route path="/vans-for-sale" element={<VansForSale />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/van-form" element={<VanForm />} />
        <Route path="/portfolio-form" element={<PortfolioForm />} />
         <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/test" element={<Van />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/our-clients" element={<OurClients />} />
        <Route path="/interior-choice" element={<Interiorpage />} />
        <Route path="/cushion" element={<Cushionpage />} />




      </Routes>
    </Router>

  );
};

export default AppRoutes;

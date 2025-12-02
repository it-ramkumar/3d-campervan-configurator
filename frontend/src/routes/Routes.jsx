import React, { lazy, Suspense, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollFromTop from "../components/ScrollFromTop/ScrollFromTop";
import ChatWidgetComponent from "../websiteComponents/components/ChatMaxima/ChatMaxima";
import BlackFridayLabelComponent from "../websiteComponents/components/BlackFriday/BlackFriday";
const Home = lazy(() => import("../pages/Home"));
const Van = lazy(() => import("../pages/Van"));
const Preview = lazy(() => import("../components/preview/Preview"));
const Contact = lazy(() => import("../websiteComponents/components/Contact/Contact"));
const Inquiry = lazy(() => import("../websiteComponents/components/InquiryForm/InqueryForm"));
const Dashboard = lazy(() => import("../websiteComponents/components/Dashboard/Dashboard"));
const PortfolioForm = lazy(() => import("../websiteComponents/components/adminPanel/Portfolio/PortfolioForm"));
const VanForm = lazy(() => import("../websiteComponents/components/adminPanel/Vans/VansForm"));
const VansForSale = lazy(() => import("../websiteComponents/components/Vansforsale/VansForSale"));
const Layouts = lazy(() => import("../websiteComponents/components/Layouts/Layouts"));
const BlogForm = lazy(() => import("../websiteComponents/components/adminPanel/Blog/Form"));
const Blogs = lazy(() => import("../websiteComponents/components/Blogs/Blogs"));
const VanDetail = lazy(() => import("../websiteComponents/components/VanDetail/VanDetail"));
const Signup = lazy(() => import("../websiteComponents/components/Auth/Signup"));
const Login = lazy(() => import("../websiteComponents/components/Auth/Login"));
const OurProcess = lazy(() => import("../websiteComponents/components/OurProcess/OurProcess"));
const AboutUs = lazy(() => import("../websiteComponents/components/AboutUs/Aboutus"));
const ShowRoom = lazy(() => import("../websiteComponents/components/Showroom/showroom"));
const NotFound = lazy(() => import("../websiteComponents/components/NotFound/NotFound"));
const ConfiguratorForm = lazy(() => import("../websiteComponents/components/adminPanel/Configurator/ConfiguratorForm"));
const Exteriorpage = lazy(() => import("../websiteComponents/components/Exteriorpage/Exterior"));
const LayoutDetail = lazy(() => import("../websiteComponents/components/LayoutDetail/LayoutDetail"));
const BlogDetail = lazy(() => import("../websiteComponents/components/BlogDetail/Blogdetail"));
const OurClients = lazy(() => import("../websiteComponents/components/OurClients/Clienthero/Client"));
const Interiorpage = lazy(() => import("../websiteComponents/components/Interior/Interior"));
const Cushionpage = lazy(() => import("../websiteComponents/components/Cushion/Cushion"));
const CustomVan = lazy(() => import("../websiteComponents/components/LayoutByCategory/LayoutByCategory"));
const PrivateRoute = lazy(() => import("../websiteComponents/components/PrivateComponent/PrivateComponent").then(mod => ({ default: mod.PrivateRoute })));
const Loader = lazy(() => import("../websiteComponents/components/Loader/Loader"));
const Testing = lazy(() => import("../websiteComponents/components/Layouts/SantaMonica/SantaMonica"));
const Financing = lazy(() => import("../websiteComponents/components/Financing/Financing"))
const SprinterPresentation = lazy(() => import("../websiteComponents/components/SprinterPresentation/SprinterPresentation"))
const Wheelbase = lazy(() => import("../websiteComponents/components/LayoutWheelBase/LayoutWheelBase"))

// Memoized components to avoid unnecessary re-renders
const BlackFridayLabel = React.memo(BlackFridayLabelComponent);
const ChatWidget = React.memo(ChatWidgetComponent);

const AppRoutes = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const showBlackFriday = useMemo(
    () => !pathname.startsWith("/dashboard") && !pathname.startsWith("/login") && !pathname.startsWith("/test"),
    [pathname]
  );

  return (
    <>

      {showBlackFriday && <BlackFridayLabel />}
      {/* {!isOpen && <Marquee/>} */}
      <ChatWidget />
      <ScrollFromTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/zain" element={<Testing />} />

          <Route path="/configurator-form" element={<ConfiguratorForm />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/showroom" element={<ShowRoom />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/our-process" element={<OurProcess />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/van-detail/:slug" element={<VanDetail />} />
          <Route path="/layout-detail/:slug" element={<LayoutDetail />} />
          <Route path="/blog-detail/:id" element={<BlogDetail />} />
          <Route path="/innovation" element={<Exteriorpage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog-form" element={<BlogForm />} />
          <Route path="/layouts" element={<Layouts />} />
          <Route path="/vans-for-sale" element={<VansForSale />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/van-form" element={<VanForm />} />
          <Route path="/portfolio-form" element={<PortfolioForm />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/test" element={<Van />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/our-clients" element={<OurClients />} />
          <Route path="/interior-choice" element={<Interiorpage />} />
          <Route path="/cushion" element={<Cushionpage />} />
          <Route path="/layout-by-category/:category" element={<CustomVan />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/sprinter-guide" element={<SprinterPresentation />} />
          <Route path="/wheel-base/:wheelbase" element={<Wheelbase />} />


        </Routes>
      </Suspense>
    </>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

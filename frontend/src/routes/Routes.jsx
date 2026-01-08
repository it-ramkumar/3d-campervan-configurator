import React, { lazy, Suspense, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollFromTop from "../components/ScrollFromTop/ScrollFromTop";
import { pageView } from "../websiteComponents/CustomHooks/analytics";
  import {initAnalytics } from "../websiteComponents/CustomHooks/analytics";

// Memoized Widgets
import ChatWidgetComponent from "../websiteComponents/components/ChatMaxima/ChatMaxima";
import BlackFridayLabelComponent from "../websiteComponents/components/BlackFriday/BlackFriday";
const ChatWidget = React.memo(ChatWidgetComponent);
const BlackFridayLabel = React.memo(BlackFridayLabelComponent);

// Lazy-loaded Pages & Components
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
const Exteriorpage = lazy(() => import("../websiteComponents/components/ExteriorChoicePageD/ExteriorChoicePage"));
const LayoutDetail = lazy(() => import("../websiteComponents/components/LayoutDetail/LayoutDetail"));
const BlogDetail = lazy(() => import("../websiteComponents/components/BlogDetail/Blogdetail"));
const OurClients = lazy(() => import("../websiteComponents/components/OurClients/Clienthero/Client"));
const Interiorpage = lazy(() => import("../websiteComponents/components/InteriorChoiceD/InteriorChoicePage"));
const Cushionpage = lazy(() => import("../websiteComponents/components/Cushion/Cushion"));
const CustomVan = lazy(() => import("../websiteComponents/components/LayoutByCategory/LayoutByCategory"));
const PrivateRoute = lazy(() => import("../websiteComponents/components/PrivateComponent/PrivateComponent").then(mod => ({ default: mod.PrivateRoute })));
const Loader = lazy(() => import("../websiteComponents/components/Loader/Loader"));
const Financing = lazy(() => import("../websiteComponents/components/Financing/Financing"));
const SprinterPresentation = lazy(() => import("../websiteComponents/components/SprinterPresentation/SprinterPresentation"));
const Wheelbase = lazy(() => import("../websiteComponents/components/LayoutWheelBase/LayoutWheelBase"));
const JobDetail = lazy(() => import("../websiteComponents/components/Jobs/JobDetail"));
const JoAppForm = lazy(() => import("../websiteComponents/components/JobApp/JobApp"));
const Jobs = lazy(() => import("../websiteComponents/components/Jobs/JobsListing"));
const CustomBuild = lazy(() => import("../websiteComponents/components/CustomBuild/CustomBuild"));
const QuickLiks = lazy(() => import("../websiteComponents/components/QuickLinks/QuickLinks"));


const AppRoutes = () => {
  const location = useLocation();

  // GA page view tracking (production only)
  useEffect(() => {
    pageView(location.pathname + location.search);
  }, [location]);

  // Show Black Friday label except on specific pages
  const showBlackFriday = useMemo(
    () =>
      !location.pathname.startsWith("/dashboard") &&
      !location.pathname.startsWith("/login") &&
      !location.pathname.startsWith("/test"),
    [location.pathname]
  );

  return (
    <>
      {/* {showBlackFriday && <BlackFridayLabel />} */}
      <ChatWidget />
      <ScrollFromTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/exterior-choice" element={<Exteriorpage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog-form" element={<BlogForm />} />
          <Route path="/layouts" element={<Layouts />} />
          <Route path="/vans-for-sale" element={<VansForSale />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/van-form" element={<VanForm />} />
          <Route path="/portfolio-form" element={<PortfolioForm />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/configurator" element={<Van />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/our-clients" element={<OurClients />} />
          <Route path="/interior-choice" element={<Interiorpage />} />
          <Route path="/cushion" element={<Cushionpage />} />
          <Route path="/layout-by-category/:category" element={<CustomVan />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/sprinter-guide" element={<SprinterPresentation />} />
          <Route path="/wheel-base/:wheelbase" element={<Wheelbase />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/apply/:id" element={<JoAppForm />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/custom-build" element={<CustomBuild />} />
          <Route path="/quick-links" element={<QuickLiks />} />

        </Routes>
      </Suspense>
    </>
  );
};

export default function AppWrapper() {

  useEffect(() => {
      initAnalytics();

  }, []);
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { pageView, initAnalytics } from '../websiteComponents/CustomHooks/analytics';

// Direct imports (needed immediately, small size)
import Loader from "../websiteComponents/components/Loader/Loader";
import ScrollFromTop from "../components/ScrollFromTop/ScrollFromTop";

// Lazy-loaded Widgets
const ChatWidget = lazy(() => import("../websiteComponents/components/ChatMaxima/ChatMaxima"));

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
const Exteriorpage = lazy(() => import("../websiteComponents/components/Options/Options"));
const LayoutDetail = lazy(() => import("../websiteComponents/components/LayoutDetail/LayoutDetail"));
const BlogDetail = lazy(() => import("../websiteComponents/components/BlogDetail/Blogdetail"));
const OurClients = lazy(() => import("../websiteComponents/components/OurClients/Client"));
const Cushionpage = lazy(() => import("../websiteComponents/components/Cushion/Cushion"));
const CustomVan = lazy(() => import("../websiteComponents/components/LayoutByCategory/LayoutByCategory"));
const PrivateRoute = lazy(() => import("../websiteComponents/components/PrivateComponent/PrivateComponent"));
const Financing = lazy(() => import("../websiteComponents/components/Financing/Financing"));
const SprinterPresentation = lazy(() => import("../websiteComponents/components/SprinterPresentation/SprinterPresentation"));
const Wheelbase = lazy(() => import("../websiteComponents/components/LayoutWheelBase/LayoutWheelBase"));
const JobDetail = lazy(() => import("../websiteComponents/components/Jobs/JobDetail"));
const JoAppForm = lazy(() => import("../websiteComponents/components/JobApp/JobApp"));
const Jobs = lazy(() => import("../websiteComponents/components/Jobs/JobsListing"));
const CustomBuild = lazy(() => import("../websiteComponents/components/CustomBuild/CustomBuild"));
const QuickLiks = lazy(() => import("../websiteComponents/components/QuickLinks/QuickLinks"));
const FAQPage = lazy(() => import("../websiteComponents/components/FAQPage/FAQPage"));
const WhereToCamp = lazy(() => import("../websiteComponents/components/WhereToCamp/WhereToCamp"));
// const SystemOptions = lazy(() => import("../websiteComponents/components/SystemOptions/SystemOptions"));

const AppRoutes = () => {
  const location = useLocation();
  const [showChat, setShowChat] = useState(false);

  // Delay chat widget load
  useEffect(() => {
    const timer = setTimeout(() => setShowChat(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // GA page view tracking
  useEffect(() => {
    pageView(location.pathname + location.search);
  }, [location]);

  // Check if admin route
  const isAdminRoute = location.pathname.startsWith('/dashboard') ||
                       location.pathname.startsWith('/login');

  return (
    <>
      {/* Only show chat on non-admin pages */}
      {!isAdminRoute && showChat && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}

      <ScrollFromTop />

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/showroom" element={<ShowRoom />} />
          <Route path="/our-process" element={<OurProcess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/our-clients" element={<OurClients />} />

          {/* Van Routes */}
          <Route path="/configurator" element={<Van />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/van-detail/:slug" element={<VanDetail />} />
          <Route path="/vans-for-sale" element={<VansForSale />} />
          <Route path="/van-options/:options" element={<Exteriorpage />} />
          <Route path="/cushion" element={<Cushionpage />} />
          <Route path="/custom-build" element={<CustomBuild />} />

          {/* Layout Routes */}
          <Route path="/van-layouts" element={<Layouts />} />
          <Route path="/layout-detail/:slug" element={<LayoutDetail />} />
          <Route path="/layout-by-category/:category" element={<CustomVan />} />
          <Route path="/wheel-base/:wheelbase" element={<Wheelbase />} />

          {/* Blog Routes */}
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog-detail/:slug" element={<BlogDetail />} />
          <Route path="/blog-form" element={<BlogForm />} />

          {/* Career Routes */}
          <Route path="/careers" element={<Jobs />} />
          <Route path="/careers/:id" element={<JobDetail />} />
          <Route path="/apply/:id" element={<JoAppForm />} />

          {/* Info Pages */}
          <Route path="/financing" element={<Financing />} />
          <Route path="/sprinter-guide" element={<SprinterPresentation />} />
          <Route path="/quick-links" element={<QuickLiks />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/where-to-camp" element={<WhereToCamp />} />
          {/* <Route path="/system-options" element={<SystemOptions />} /> */}

          {/* Forms */}
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/configurator-form" element={<ConfiguratorForm />} />

          {/* Auth Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loader />}>
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route path="/van-form" element={<VanForm />} />
          <Route path="/portfolio-form" element={<PortfolioForm />} />

          {/* 404 */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default function AppWrapper() {
  // Initialize analytics only once on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
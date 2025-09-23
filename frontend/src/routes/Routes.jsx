
import Home from "../pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Van from "../pages/Van";
import Layout from "../components/layout/Layout";
import AdminUse from "../components/adminUse/AdminUse";
import Preview from "../components/preview/Preview";
import Changes from "../components/changes/Change"



const AppRoutes = () => {


  return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/changes" element={<Changes />} />
            <Route path="/layout" element={<Layout />} />
            <Route path="/van" element={<Van />} />
            <Route path="/admin" element={<AdminUse />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </Router>

  );
};

export default AppRoutes;

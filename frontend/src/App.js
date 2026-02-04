import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./store/AuthContext";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import "./App.css";
import AboutUsPage from "./components/About/AboutUsPage";
import ContactUsPage from "./components/Contact/ContactUsPage";
import ProjectsPage from "./components/Projects/ProjectsPage";
import CareersPage from "./components/Career/CareersPage";
import Home from "./components/Home/Home";
import CareersApplicationPage from "./components/Career/CareerApplicationPage";
import CTA from "./components/Home/CTA";
import ProjectDetailPage from "./components/Projects/ProjectDetailsPage";
import Error404 from "./components/Error/Error404";
import Error403 from "./components/Error/Error403";
import Error500 from "./components/Error/Error500";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminProjects from "./components/Admin/AdminProjects";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminQueries from "./components/Admin/AdminQueries";
import AdminJobs from "./components/Admin/AdminJobs";
import AdminApplications from "./components/Admin/AdminApplications";
// Ant Design styles
// For Ant Design v4
// import "antd/dist/antd.css";

// OR
import "antd/dist/reset.css"; // For v5
// Protected Route component

function AppWrapper() {
  const location = useLocation();

  // List of routes where we should hide header, footer, and CTA
  const noLayoutRoutes = ["/login", "/403", "/500", "/admin", "/admin/*"];
  const isNoLayoutPage = noLayoutRoutes.some(
    (route) =>
      location.pathname === route ||
      (route.endsWith("/*") &&
        location.pathname.startsWith(route.replace("/*", ""))),
  );

  return (
    <>
      {!isNoLayoutPage && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/career" element={<CareersPage />} />
        <Route path="/careers/apply" element={<CareersApplicationPage />} />
        <Route path="/403" element={<Error403 />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="/*" element={<Error404 />} />
        <Route path="/admin/*" element={<Navigate to="/403" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/queries" element={<AdminQueries />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
      </Routes>
      {!isNoLayoutPage && <CTA />}
      {!isNoLayoutPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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

function AppWrapper() {
  const location = useLocation();

  // List of error routes where we should hide header, footer, and CTA
  const errorRoutes = ["/*", "/403", "/500"];
  const isErrorPage =
    errorRoutes.includes(location.pathname) || location.pathname === "/*"; // fallback for 404 wildcard

  return (
    <>
      {!isErrorPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/career" element={<CareersPage />} />
        <Route path="/careers/apply" element={<CareersApplicationPage />} />
        <Route path="/*" element={<Error404 />} />
        <Route path="/403" element={<Error403 />} />
        <Route path="/500" element={<Error500 />} />
      </Routes>

      {!isErrorPage && <CTA />}
      {!isErrorPage && <Footer />}
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

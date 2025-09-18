import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/career" element={<CareersPage />} />
        <Route path="/careers/apply" element={<CareersApplicationPage />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/403" element={<Error403 />} />
        <Route path="/500" element={<Error500 />} />
      </Routes>
      <CTA />
      <Footer />
    </Router>
  );
}

export default App;

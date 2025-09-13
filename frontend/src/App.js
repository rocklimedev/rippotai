import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import Hero from "./components/Home/Hero";
import WhoWeAre from "./components/Home/WhoWeAre";
import ProjectsShowcase from "./components/Home/ProjectsShowcase";
import CTA from "./components/Home/CTA";
import Footer from "./components/Common/Footer";
import "./App.css";
import AboutUsPage from "./components/About/AboutUsPage";
import ContactUsPage from "./components/Contact/ContactUsPage";
import ProjectsPage from "./components/Projects/ProjectsPage";
import CareersPage from "./components/Career/CareersPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <WhoWeAre />
              <ProjectsShowcase />
              <CTA />
            </>
          }
        />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/career" element={<CareersPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

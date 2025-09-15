import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import "./App.css";
import AboutUsPage from "./components/About/AboutUsPage";
import ContactUsPage from "./components/Contact/ContactUsPage";
import ProjectsPage from "./components/Projects/ProjectsPage";
import CareersPage from "./components/Career/CareersPage";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
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

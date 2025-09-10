import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import Hero from "./components/Home/Hero";
import WhoWeAre from "./components/Home/WhoWeAre";
import ProjectsShowcase from "./components/Home/ProjectsShowcase";
import CTA from "./components/Home/CTA";
import Footer from "./components/Common/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
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
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/projects" element={<div>Projects Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/career" element={<div>Career Page</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

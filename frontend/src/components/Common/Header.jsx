import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
// Hypothetical import
import { useGetProjectsQuery } from "../../api/rippotaiApi";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { data: projects = [], isLoading } = useGetProjectsQuery(); // Fetch projects

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchTerm("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMenuOpen(false);
    setSearchTerm(""); // Reset search term when opening/closing
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`${isScrolled ? "scrolled" : ""} ${
        isHomePage ? "home-page" : ""
      }`}
    >
      <div className="logo">
        <Link to="/" aria-label="Rippotai Architecture Home">
          <img src={logo} alt="Rippotai Architecture Logo" />
        </Link>
      </div>

      <nav className={isMenuOpen ? "open" : ""}>
        <ul>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={() => setIsMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/career" onClick={() => setIsMenuOpen(false)}>
              Careers
            </Link>
          </li>
        </ul>
      </nav>

      <button
        className="search-icon"
        onClick={toggleSearch}
        aria-label="Toggle search"
      >
        <FaSearch size={20} />
      </button>

      {isMobile && (
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      )}

      {isSearchOpen && (
        <div className="search-overlay">
          <div className="search-modal">
            <div className="search-header">
              <input
                type="text"
                placeholder="Search projects by title or category..."
                aria-label="Search projects"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button
                className="search-close-btn"
                onClick={toggleSearch}
                aria-label="Close search"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="search-results">
              {isLoading ? (
                <p>Loading projects...</p>
              ) : searchTerm && filteredProjects.length > 0 ? (
                <ul>
                  {filteredProjects.map((project) => (
                    <li key={project._id}>
                      <Link
                        to={`/project/${project.slug}`}
                        onClick={toggleSearch}
                      >
                        <div className="result-item">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="result-image"
                          />
                          <div className="result-content">
                            <h3>{project.title}</h3>
                            <p>{project.category}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : searchTerm ? (
                <p>No results found for "{searchTerm}"</p>
              ) : (
                <p>Enter a search term to find projects</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

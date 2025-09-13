import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get current route

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  // Determine if on homepage
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`${isScrolled ? "scrolled" : ""} ${
        isHomePage ? "home-page" : ""
      }`}
    >
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
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
              Project
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
          <li>
            <button
              className="search-icon"
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              <FaSearch size={20} />
            </button>
          </li>
        </ul>
      </nav>
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      {isSearchOpen && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            autoFocus
          />
          <button
            className="search-close-btn"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
          >
            <FaTimes size={16} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

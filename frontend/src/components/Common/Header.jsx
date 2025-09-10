import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import search icon
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className={isScrolled ? "scrolled" : ""}>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/projects">Project</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/career">Career</Link>
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
      {isSearchOpen && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            onBlur={() => setIsSearchOpen(false)} // Close on blur for better UX
          />
        </div>
      )}
    </header>
  );
};

export default Header;

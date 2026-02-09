"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

import logo from "../../assets/images/logo.png";

import { useGetPublicProjectsQuery } from "@/app/api/rippotaiApi";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const pathname = usePathname();

  // Use public endpoint — only returns published projects
  const { data: projects = [], isLoading } = useGetPublicProjectsQuery({
    limit: 50, // increase if you want more results searchable
    // page: 1,          // usually not needed for search
    // category: undefined, // optional filter
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleScroll();
    handleResize();

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
    setSearchTerm("");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const isHomePage = pathname === "/";

  return (
    <header
      className={`${isScrolled ? "scrolled" : ""} ${
        isHomePage ? "home-page" : ""
      }`}
    >
      <div className="logo">
        <Link href="/" aria-label="Rippotai Architecture Home">
          <Image
            src={logo}
            alt="Rippotai Architecture Logo"
            width={180}
            height={60}
            priority
            className="logo-img"
          />
        </Link>
      </div>

      <nav className={isMenuOpen ? "open" : ""}>
        <ul>
          <li>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/projects" onClick={() => setIsMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/career" onClick={() => setIsMenuOpen(false)}>
              Careers
            </Link>
          </li>
          <li>
            <Link href="/team" onClick={() => setIsMenuOpen(false)}>
              Team
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
                        href={`/project/${project.slug}`}
                        onClick={toggleSearch}
                      >
                        <div className="result-item">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={80}
                            height={80}
                            className="result-image"
                            unoptimized // Use if images are external URLs
                            // Remove unoptimized and configure remotePatterns in next.config.js if possible
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

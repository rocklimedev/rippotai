import { Link } from "react-router-dom";
import footerLogo from "../../assets/images/footer-logo.png";
import Typewriter from "./TypeWriter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="footer-wrapper">
        <Typewriter showContactUs={true} />
        <footer className="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                {/* Logo Section */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-12 mb-4 mb-md-0">
                  <div className="footer-logo text-center text-md-start">
                    <a
                      href="https://rippotaiarchitecture.com/"
                      aria-label="Rippotai Architecture Homepage"
                    >
                      <img
                        src={footerLogo}
                        className="img-fluid"
                        alt="Rippotai Architecture Logo"
                        width="150"
                        height="50"
                      />
                    </a>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="col-xl-2 col-lg-3 col-md-6 col-6 mb-4 mb-md-0">
                  <div className="footer-link">
                    <h5 className="footer-title">Quick Links</h5>
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/projects">Projects</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link to="/career">Career</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Categories Section */}
                <div className="col-xl-2 col-lg-3 col-md-6 col-6 mb-4 mb-md-0">
                  <div className="footer-categories">
                    <h5 className="footer-title">Categories</h5>
                    <ul className="list-unstyled">
                      <li>
                        <Link to="#">Residential</Link>
                      </li>
                      <li>
                        <Link to="#">Commercial</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-12 mb-4 mb-md-0">
                  <div className="footer-contact">
                    <h5 className="footer-title">Get in Touch</h5>
                    <ul className="list-unstyled">
                      <li>
                        <i className="fas fa-map-marker-alt me-2"></i>
                        <a
                          href="https://maps.app.goo.gl/Mb4VfJuGgdZqBpi78"
                          target="_blank"
                        >
                          487/64 Peeragarhi, National Market, New Delhi, Delhi
                          110087
                        </a>
                      </li>
                      <li>
                        <i className="fas fa-phone-alt me-2"></i>
                        <a href="tel:+918882830560">+918882830560</a>
                      </li>
                      <li>
                        <i className="fas fa-envelope me-2"></i>
                        <a href="mailto:rippotaiarchitecture@gmail.com">
                          rippotaiarchitecture@gmail.com
                        </a>
                      </li>
                    </ul>
                    <div className="footer-social">
                      <h5 className="footer-title">Follow Us</h5>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <a
                            href="https://www.facebook.com/rippotaiarchitecture"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow Rippotai Architecture on Facebook"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            href="https://www.instagram.com/rippotai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow Rippotai Architecture on Instagram"
                          >
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            href="https://www.linkedin.com/company/rippotaiarchitecture/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow Rippotai Architecture on LinkedIn"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p className="text-center mb-0">
                  &copy; {currentYear}. All Rights Reserved | Designed by
                  <a
                    href="https://www.rocklime.com/"
                    className="rocklime-link ms-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Rocklime website"
                  >
                    Rocklime
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

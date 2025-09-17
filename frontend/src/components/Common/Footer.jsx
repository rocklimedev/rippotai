import { Link } from "react-router-dom";
import footerLogo from "../../assets/images/footer-logo.png";
import Typewriter from "./TypeWriter";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <Typewriter showContactUs={true} />
        <div className="footer-top">
          <div className="container">
            <div className="row">
              {/* Logo Section */}
              <div className="col-xl-3 col-lg-3 col-md-3 col-12 mb-5 mb-md-0">
                <div className="footer-logo text-center text-md-start">
                  <a href="https://rippotaiarchitecture.com/">
                    <img
                      src={footerLogo}
                      className="img-fluid"
                      alt="Footer Logo"
                    />
                  </a>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="footer-link">
                  <ul className="list-inline mb-0">
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

              {/* Contact Information */}
              <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="footer-contact">
                  <h5 className="footer-title">Get in Touch</h5>
                  <ul className="list-unstyled">
                    <li>
                      <i className="fas fa-map-marker-alt me-2"></i>
                      123 Design Street, Architecture City, AC 12345
                    </li>
                    <li>
                      <i className="fas fa-phone-alt me-2"></i>
                      <a href="tel:+1234567890">+1 (234) 567-890</a>
                    </li>
                    <li>
                      <i className="fas fa-envelope me-2"></i>
                      <a href="mailto:info@rippotaiarchitecture.com">
                        info@rippotaiarchitecture.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="col-xl-3 col-lg-3 col-md-3 col-12">
                <div className="footer-social">
                  <h6>Follow Us</h6>
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
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
      </footer>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 mx-auto">
              <ul className="list-inline text-center mb-0">
                <li>
                  &copy; {currentYear}. All Rights Reserved{" "}
                  <a
                    href="https://www.rocklime.com/"
                    className="rocklime-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rocklime
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import footerLogo from "../../assets/images/footer-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
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
              <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="footer-link">
                  <ul className="list-inline mb-0">
                    <li>
                      <Link to="/about">About</Link>
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
            </div>
          </div>
        </div>
      </footer>
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
                  </a>
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

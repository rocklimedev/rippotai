import React from "react";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Import slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import teamMember from "../../assets/images/teammember.jpg"; // Placeholder for team member images
import founderImg1 from "../../assets/images/slider_1.JPG"; // First founder image
import founderImg2 from "../../assets/images/slider_2.JPG"; // Second founder image
import founderImg3 from "../../assets/images/slider_3.JPG"; // Third founder image
import companyImg from "../../assets/images/logo.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutUsPage = () => {
  // Slider settings for the founder section
  const sliderSettings = {
    dots: false, // Hide navigation dots
    infinite: true, // Loop the slider
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Auto-play the slider
    autoplaySpeed: 3000, // 3 seconds per slide
    arrows: false, // Hide next/prev arrows
    cssEase: "linear", // Smooth transition
  };

  // Array of founder images
  const founderImages = [
    {
      src: founderImg1,
      alt: "John Rippotai, Founder of Rippotai Architecture",
    },
    { src: founderImg2, alt: "John Rippotai, Founder - Image 2" },
    { src: founderImg3, alt: "John Rippotai, Founder - Image 3" },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero"></section>

      {/* Who We Are Section */}
      <section className="who-we-are">
        {/* Company Section */}
        <div className="who-we-are-block">
          <div className="who-we-are-container">
            <div className="who-we-are-image">
              <img
                src={companyImg}
                alt="Rippotai Architecture - Company Vision"
              />
            </div>
            <div className="who-we-are-text">
              <h3>Rippotai</h3>
              <span>Firm</span>
              <p>
                Rippotai Architecture is dedicated to crafting sustainable,
                human-centric spaces that leave a lasting impact. Our projects
                combine modern aesthetics with deep respect for the environment,
                ensuring that every structure not only serves its purpose but
                also enriches the community around it.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Section with Slider */}
        <div className="who-we-are-block">
          <div className="who-we-are-container">
            <div className="who-we-are-text">
              <h3>AR. Sagar Chhabra</h3>
              <span>Founder</span>
              <p>
                John Rippotai, a visionary architect with over 20 years of
                experience, founded Rippotai Architecture to create spaces that
                inspire and endure. Driven by a passion for sustainable design
                and innovative solutions, John established the organization to
                transform communities through architecture that blends
                creativity, functionality, and environmental responsibility.
              </p>
            </div>
            <div className="who-we-are-image">
              {founderImages.map((image, index) => (
                <div key={index} className="slider-item">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="founder-slider-img"
                    style={{ width: "100%", height: "auto" }} // Ensure images fit the slider
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="about-milestones">
        <div className="custom-container">
          <h2 className="text-center">Crafted Pathway</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>2010</h3>
                <p>
                  Rippotai Architecture founded with a vision to redefine modern
                  design.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>2015</h3>
                <p>
                  Completed our first award-winning residential project, The
                  Cube House.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>2020</h3>
                <p>
                  Expanded into commercial design, delivering innovative office
                  spaces.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>2025</h3>
                <p>
                  Recognized globally for sustainable architecture and
                  innovative furniture design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="custom-container">
          <h2 className="text-center">Pillar of Excellence</h2>
          <div className="custom-row">
            <div className="custom-col-4">
              <div className="value-item">
                <i className="fas fa-leaf"></i>
                <h3>Sustainability</h3>
                <p>
                  We prioritize eco-friendly materials and energy-efficient
                  designs to minimize environmental impact.
                </p>
              </div>
            </div>
            <div className="custom-col-4">
              <div className="value-item">
                <i className="fas fa-lightbulb"></i>
                <h3>Innovation</h3>
                <p>
                  We push boundaries with cutting-edge technology and creative
                  solutions.
                </p>
              </div>
            </div>
            <div className="custom-col-4">
              <div className="value-item">
                <i className="fas fa-users"></i>
                <h3>Client-Centric</h3>
                <p>
                  Your vision is our blueprint—we tailor every project to your
                  unique needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;

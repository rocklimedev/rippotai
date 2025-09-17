import React, { useEffect, useState } from "react";
import teamMember from "../../assets/images/teammember.jpg";
import founderImg1 from "../../assets/images/slider_1.JPG";
import founderImg2 from "../../assets/images/slider_2.JPG";
import founderImg3 from "../../assets/images/slider_3.JPG";
import companyImg from "../../assets/images/logo.png";

const AboutUsPage = () => {
  const founderImages = [
    { src: founderImg1, alt: "John Rippotai, Founder - Image 1" },
    { src: founderImg2, alt: "John Rippotai, Founder - Image 2" },
    { src: founderImg3, alt: "John Rippotai, Founder - Image 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % founderImages.length);
    }, 3000);

    return () => clearInterval(interval); // cleanup
  }, []);

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
                combine modern aesthetics with deep respect for the environment.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Section with Blinking Image Change */}
        <div className="who-we-are-block">
          <div className="who-we-are-container">
            <div className="who-we-are-text">
              <h3>AR. Sagar Chhabra</h3>
              <span>Founder</span>
              <p>
                John Rippotai, a visionary architect with over 20 years of
                experience, founded Rippotai Architecture to create spaces that
                inspire and endure.
              </p>
            </div>
            <div className="who-we-are-image founder-slider">
              <img
                key={currentIndex} // ensures re-render
                src={founderImages[currentIndex].src}
                alt={founderImages[currentIndex].alt}
                className="founder-slider-img blink"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;

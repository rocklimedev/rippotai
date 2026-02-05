"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // ← Add this import

import founderImg1 from "../../assets/images/slider_1.jpg";
import founderImg2 from "../../assets/images/slider_2.jpg";
import founderImg3 from "../../assets/images/slider_3.jpg";
import companyImg from "../../assets/images/logo.png";

const AboutUsPage = () => {
  const founderImages = [
    { src: founderImg1, alt: "Sagar Chhabra, Founder - Image 1" },
    { src: founderImg2, alt: "Sagar Chhabra, Founder - Image 2" },
    { src: founderImg3, alt: "Sagar Chhabra, Founder - Image 3" },
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
              <Image
                src={companyImg}
                alt="Rippotai Architecture - Company Vision"
                // width & height auto-detected from static import
                priority // optional: good for logos / above-the-fold images
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
                founded Rippotai Architecture in June 2023, after gaining
                diverse experience in luxury residential projects, furniture
                design, and interiors. He previously worked at Studio Grey
                Matter, Mangrove Collective, Studio Lotus and 1 Decimal Studio.
                Inspired by Japanese minimalism, his firm focuses on innovative
                designs from concept to delivery.
              </p>
            </div>
            <div className="who-we-are-image founder-slider">
              <Image
                key={currentIndex} // ensures re-render
                src={founderImages[currentIndex].src}
                alt={founderImages[currentIndex].alt}
                className="founder-slider-img blink"
                // width & height auto-detected from static import
                // optional: add sizes if you know the layout behavior
                sizes="(max-width: 768px) 100vw, 50vw"
                // optional: prioritize the first image
                priority={currentIndex === 0}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import founderImg1 from "../../assets/images/slider_1.jpg";
import founderImg2 from "../../assets/images/slider_2.jpg";
import founderImg3 from "../../assets/images/slider_3.jpg";
import companyImg from "../../assets/images/logo.png";

import { useGetPublicProjectsQuery } from "../api/rippotaiApi"; // adjust path if needed
import ThreeDCarousel from "@/components/About/ThreeDCarousel"; // adjust path if needed

const AboutUsPage = () => {
  const founderImages = [
    { src: founderImg1, alt: "Sagar Chhabra, Founder - Image 1" },
    { src: founderImg1, alt: "Sagar Chhabra, Founder - Image 2" },
    { src: founderImg1, alt: "Sagar Chhabra, Founder - Image 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch public projects (you already limited to 8)
  const { data: projects = [] } = useGetPublicProjectsQuery({
    page: 1,
    limit: 8,
  });

  // Optional: auto-rotate founder images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % founderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [founderImages.length]);

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
                priority
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

        {/* Founder Section with image slider */}
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
                key={currentIndex} // forces re-mount for animation
                src={founderImages[currentIndex].src}
                alt={founderImages[currentIndex].alt}
                className="founder-slider-img blink"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={currentIndex === 0}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3D Carousel – now using the fetched projects */}
      {/* {projects.length > 0 && (
        <ThreeDCarousel
          projects={projects}
          rotationSpeed={28}
          zDepth={280}
          cardWidth={320}
          cardHeight={450}
          borderRadius="20px"
          showBackface={false}
          pauseOnHover={true}
        />
      )} */}
    </div>
  );
};

export default AboutUsPage;

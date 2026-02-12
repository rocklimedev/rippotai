"use client";
// src/components/Home/Home.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image"; // ← Add this import
import "swiper/css";

// Desktop banners

// Mobile banners
import banner1Mobile from "../assets/images/banners/mobile/5.png";
import banner2Mobile from "../assets/images/banners/mobile/2.jpg";
import banner3Mobile from "../assets/images/banners/mobile/3.jpg";
import banner4Mobile from "../assets/images/banners/mobile/4.jpg";

import founderImg from "../assets/images/founder.png";

import ProjectsShowcase from "@/components/Home/ProjectsShowcase";
const banner1 =
  "https://static.cmtradingco.com/rippotai_projects/rippotai_images/slider_1.png";
const banner2 =
  "https://static.cmtradingco.com/rippotai_projects/rippotai_images/slider_2.png";
const banner3 =
  "https://static.cmtradingco.com/rippotai_projects/rippotai_images/slider_3.jpeg";
const banner4 =
  "https://static.cmtradingco.com/rippotai_projects/rippotai_images/slider_4.png";
const banner5 =
  "https://static.cmtradingco.com/rippotai_projects/rippotai_images/slider_5.png";
const Home = () => {
  return (
    <>
      {/* Hero Section - responsive banner carousel */}
      <section className="hero">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="swiper-container"
        >
          <SwiperSlide>
            <picture>
              {/* Mobile version */}
              <source srcSet={banner1Mobile} media="(max-width: 768px)" />
              {/* Desktop version with next/image */}
              <div className="hero-image-wrapper">
                <Image
                  src={banner1}
                  alt="Modern interior with elegant wooden elements"
                  fill
                  className="hero-image object-cover"
                  priority // good for first hero image (LCP)
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              </div>
            </picture>
          </SwiperSlide>

          <SwiperSlide>
            <picture>
              <source srcSet={banner2Mobile} media="(max-width: 768px)" />
              <div className="hero-image-wrapper">
                <Image
                  src={banner2}
                  alt="Spacious living area with natural light"
                  fill
                  className="hero-image object-cover"
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              </div>
            </picture>
          </SwiperSlide>

          <SwiperSlide>
            <picture>
              <source srcSet={banner3Mobile} media="(max-width: 768px)" />
              <div className="hero-image-wrapper">
                <Image
                  src={banner3}
                  alt="Contemporary modular kitchen design"
                  fill
                  className="hero-image object-cover"
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              </div>
            </picture>
          </SwiperSlide>

          <SwiperSlide>
            <picture>
              <source srcSet={banner4Mobile} media="(max-width: 768px)" />
              <div className="hero-image-wrapper">
                <Image
                  src={banner4}
                  alt="Luxury residential exterior facade"
                  fill
                  className="hero-image object-cover"
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              </div>
            </picture>
          </SwiperSlide>

          <SwiperSlide>
            <picture>
              {/* Mobile version */}
              <source srcSet={banner1Mobile} media="(max-width: 768px)" />
              {/* Desktop version with next/image */}
              <div className="hero-image-wrapper">
                <Image
                  src={banner5}
                  alt="Modern interior with elegant wooden elements"
                  fill
                  className="hero-image object-cover"
                  priority // good for first hero image (LCP)
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              </div>
            </picture>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Who We Are Section */}
      <section className="who-we-are">
        <div className="who-we-are-block">
          <div className="who-we-are-container">
            <div className="who-we-are-text">
              <h3>Who Are We</h3>
              <p>
                At Rippotai Architecture, we believe architecture is more than
                building spaces—it’s about shaping experiences. Our approach
                blends functionality with timeless design, creating environments
                that inspire, nurture, and elevate everyday living. With a deep
                respect for context, materials, and human connection, we craft
                spaces that are not only visually striking but also purposeful
                and enduring.
              </p>
            </div>

            <div className="who-we-are-image">
              <Image
                src={founderImg}
                alt="John Rippotai, Founder of Rippotai Architecture"
                width={500} // adjust based on your actual image size
                height={600} // adjust to maintain aspect ratio
                className="founder-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <ProjectsShowcase />
    </>
  );
};

export default Home;

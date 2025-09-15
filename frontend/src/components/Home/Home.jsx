import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import banner1 from "../../assets/images/INTERIOR 01.jpg";
import banner2 from "../../assets/images/Living Area02.jpg";
import banner3 from "../../assets/images/Living Area03.jpg";
import banner4 from "../../assets/images/main-banner.jpg";
import founderImg from "../../assets/images/founder.jpg";
import companyImg from "../../assets/images/logo.png";
import ProjectsShowcase from "./ProjectsShowcase";
import CTA from "./CTA";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="swiper-container"
        >
          <SwiperSlide>
            <img src={banner1} alt="Hero Image 1" className="hero-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner2} alt="Hero Image 2" className="hero-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner3} alt="Hero Image 3" className="hero-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner4} alt="Hero Image 4" className="hero-image" />
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Tagline Section */}
      <section className="tagline-section">
        <div className="tagline-container">
          <h2 className="tagline-heading">
            “Designing Spaces That Inspire & Endure.”
          </h2>
          <p className="tagline-subtext">
            At Rippotai Architecture, we blend creativity, sustainability, and
            innovation to build environments that truly make a difference.
          </p>
        </div>
      </section>

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
        {/* Founder Section */}
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
              <img
                src={founderImg}
                alt="John Rippotai, Founder of Rippotai Architecture"
              />
            </div>
          </div>
        </div>
      </section>

      <ProjectsShowcase />
      <CTA />
    </>
  );
};

export default Home;

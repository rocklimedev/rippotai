import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import banner1 from "../../assets/images/banners/INTERIOR 01.jpg";
import banner2 from "../../assets/images/banners/Living Area03.jpg";
import banner3 from "../../assets/images/banners/kitchen_set02.png";
import banner4 from "../../assets/images/banners/main-banner.jpg";
import banner1Mobile from "../../assets/images/banners/mobile/5.png"; // Add mobile images
import banner2Mobile from "../../assets/images/banners/mobile/2.jpg";
import banner3Mobile from "../../assets/images/banners/mobile/3.jpg";
import banner4Mobile from "../../assets/images/banners/mobile/4.jpg";
import founderImg from "../../assets/images/founder.png";
import ProjectsShowcase from "./ProjectsShowcase";
import CTA from "./CTA";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="swiper-container"
        >
          <SwiperSlide>
            <picture>
              <source
                srcSet={banner1Mobile}
                media="(max-width: 768px)"
                alt="Hero Image 1 Mobile"
              />
              <img
                src={banner1}
                alt="Hero Image 1"
                className="hero-image"
                loading="lazy" // Optimize loading
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source
                srcSet={banner2Mobile}
                media="(max-width: 768px)"
                alt="Hero Image 2 Mobile"
              />
              <img
                src={banner2}
                alt="Hero Image 2"
                className="hero-image"
                loading="lazy"
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source
                srcSet={banner3Mobile}
                media="(max-width: 768px)"
                alt="Hero Image 3 Mobile"
              />
              <img
                src={banner3}
                alt="Hero Image 3"
                className="hero-image"
                loading="lazy"
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source
                srcSet={banner4Mobile}
                media="(max-width: 768px)"
                alt="Hero Image 4 Mobile"
              />
              <img
                src={banner4}
                alt="Hero Image 4"
                className="hero-image"
                loading="lazy"
              />
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
              <img
                src={founderImg}
                alt="John Rippotai, Founder of Rippotai Architecture"
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

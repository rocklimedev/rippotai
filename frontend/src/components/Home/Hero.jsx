import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import banner1 from "../../assets/images/INTERIOR 01.jpg";
import banner2 from "../../assets/images/Living Area02.jpg";
import banner3 from "../../assets/images/Living Area03.jpg";
import banner4 from "../../assets/images/main-banner.jpg";

const Hero = () => {
  return (
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
          <img src={banner4} alt="Hero Image 3" className="hero-image" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;

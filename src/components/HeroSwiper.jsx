import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import PIZZA from "../assets/pizza.jpg";
import BURGER from "../assets/burger.jpg";

export default function HeroSwiper() {
  const images = [PIZZA, BURGER ];

  return (
    <div className="px-2" id="hero">

      <div className="hidden md:block">
        <Swiper
          spaceBetween={5}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper bg-white dark:bg-gray-900 rounded-2xl"
          style={{
            height: "300px", // Balandlikni aniq belgilash
            overflow: "hidden" // Scrollni oldini olish
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`banner-${index}`}
                className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl md:rounded-3xl"
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

     
      <div className="block md:hidden">
        <img
          src={PIZZA}
          alt="mobile-banner"
          className="w-full h-[140px] object-cover rounded-xl bg-white dark:bg-gray-900"
        />
      </div>
    </div>
  );
}
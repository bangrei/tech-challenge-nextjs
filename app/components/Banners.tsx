"use client";

import React, { useEffect, useState } from "react";
import { useMainStore } from "@/store/MainStore";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Banners() {
  const [banners] = useMainStore((state) => [state.banners]);
  const [isMobile, setIsMobile] = useState(false);
  const isBrowser = () => typeof window !== "undefined";

  const onResize = () => {
    if (!isBrowser()) return;
    const width = window.innerWidth;
    setIsMobile(width <= 767);
  };
  useEffect(() => {
    onResize();
    if (!isBrowser()) return;
    return window.addEventListener("resize", onResize);
  }, []);
  return (
    <Swiper
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination, Autoplay]}
      centeredSlides={true}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2000 }}
      className="w-full banners"
    >
      {banners.map((item) => {
        return (
          <SwiperSlide
            className="w-full flex flex-col relative"
            key={item.mainBannerId}
          >
            <img
              src={isMobile ? item.mobileImageUrl : item.pcImageUrl}
              alt={item.title}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Banners;

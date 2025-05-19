"use client";
// import 'swiper/css/pagination';
import { Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./card";

export function SwiperSlider({ importanceData }) {
  return (
    <div className="overflow-hidden rounded-xl">
      <Swiper
        // ref={sliderRef}
        centeredSlides
        centeredSlidesBounds
        spaceBetween={10}
        modules={[Mousewheel, Keyboard]}
        keyboard={{
          enabled: true,
        }}
        mousewheel={{
          forceToAxis: true,
        }}
        slidesPerView={1.1}
        breakpoints={{
          600: {
            slidesPerView: 2,
          },
          864: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 3.4,
          },
        }}
      >
        {importanceData.map((cardData, index) => (
          <SwiperSlide key={index} className="!h-auto min-h-[420px]">
            <Card
              imageAlt={cardData.image_alt}
              src={cardData.image_link}
              importanceTitle={cardData.importanceTitle}
              importanceType={cardData.importanceType}
              importanceText={cardData.importanceText}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

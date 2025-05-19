import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import { splitArray, splitArrayInThree } from "@/lib/utils";
import { DonorCard } from "../contributors-section";

const ContributorsCarousel = ({ items, isVisible }) => {
  const firstSwiperRef = useRef(null);
  const secondSwiperRef = useRef(null);
  const thirdSwiperRef = useRef(null);

  useEffect(() => {
    const initializeSwiper = () => {
      if (
        firstSwiperRef.current &&
        secondSwiperRef.current &&
        thirdSwiperRef.current
      ) {
        if (isVisible) {
          firstSwiperRef.current.swiper.autoplay.start();
          secondSwiperRef.current.swiper.autoplay.start();
          thirdSwiperRef.current.swiper.autoplay.start();
        } else {
          firstSwiperRef.current.swiper.autoplay.stop();
          secondSwiperRef.current.swiper.autoplay.stop();
          thirdSwiperRef.current.swiper.autoplay.stop();
        }
      }
    };

    // Initialize immediately if visible
    if (isVisible) {
      initializeSwiper();
    }

    // Cleanup function
    return () => {
      if (firstSwiperRef.current?.swiper) {
        firstSwiperRef.current.swiper.autoplay.stop();
      }
      if (secondSwiperRef.current?.swiper) {
        secondSwiperRef.current.swiper.autoplay.stop();
      }
      if (thirdSwiperRef.current?.swiper) {
        thirdSwiperRef.current.swiper.autoplay.stop();
      }
    };
  }, [isVisible]);

  // Create longer arrays for smoother infinite scroll
  const [firstRowItems, secondRowItems, thirdRowItems] =
    splitArrayInThree(items.slice(0, 21));

  const swiperConfig = {
    modules: [Autoplay, A11y, FreeMode],
    spaceBetween: 10,
    slidesPerView: 1.5,
    speed: 7000, // Slower, consistent speed
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    className: "donor-swiper",
    autoWidth: true,
    breakpoints: {
      375: {slidesPerView: 1.5},
      560: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  };

  return (
    <div className="donor-carousel-container relative overflow-hidden">
      {/* First Row - Left to Right */}
      <div className="">
        <Swiper ref={firstSwiperRef} {...swiperConfig}>
          {firstRowItems.map((item, index) => (
            <SwiperSlide key={`row1-${index}`} className="py-2">
              <DonorCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Second Row - Right to Left */}
      <div>
        <Swiper
          className="mb-6"
          ref={secondSwiperRef}
          {...swiperConfig}
          autoplay={{ ...swiperConfig.autoplay, reverseDirection: true }}
        >
          {secondRowItems.map((item, index) => (
            <SwiperSlide key={`row2-${index}`} className="py-2">
              <DonorCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div>
        <Swiper ref={thirdSwiperRef} {...swiperConfig}>
          {thirdRowItems.map((item, index) => (
            <SwiperSlide key={`row3-${index}`} className="py-2">
              <DonorCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ContributorsCarousel;

"use client";
import { sortCardsByDate } from "@/lib/utils";
import {
  SwiperNextNavigationButton,
  SwiperPrevNavigationButton,
} from "@/components/ui/swiper-buttons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper/modules";
import { useRef } from "react";
import { GenericCard, GenericSliderCard } from "../generic-donation-section";
import { cn } from "@/lib/utils";

export function EkadashiSection({ data }) {
  const sliderRef = useRef();

  let cards = data.sectionCards;

  try {
    cards = sortCardsByDate(cards);
  } catch (err) {
    console.log("Failed to sort cards");
  }

  return (
    <div className="bg-background-dark text-white">
      <section className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h3 className="mb-4 text-3xl md:text-4xl font-bold">Ekadashi</h3>

        <div className="relative">
          <Swiper
            ref={sliderRef}
            className="relative h-max"
            spaceBetween={30}
            mousewheel={{
              forceToAxis: true,
            }}
            keyboard={true}
            modules={[Keyboard, Mousewheel]}
            breakpoints={{
              560: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {cards.map((card, index) => (
              <SwiperSlide
                className={cn("flex items-center justify-center relative")}
                key={index}
              >
                <GenericSliderCard card={card} />
              </SwiperSlide>
            ))}

            <div className="mt-12"></div>
          </Swiper>

          <div className="h-full absolute top-0 -left-3 bg-gradient-to-l from-transparent from-30% to-background_even z-10 flex items-center">
            <SwiperPrevNavigationButton className="relative" ref={sliderRef} />
          </div>

          <div className="h-full absolute top-0 -right-3 bg-gradient-to-r from-transparent from-30% to-background_even z-10 flex items-center">
            <SwiperNextNavigationButton ref={sliderRef} />
          </div>
        </div>
      </section>
    </div>
  );
}

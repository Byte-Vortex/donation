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

export function FestivalDonationSection({ data }) {
  const sliderRef = useRef(null);
  let cards = data.cards;

  try {
    cards = sortCardsByDate(cards);
  } catch (err) {
    console.log("Failed to sort cards");
  }

  return (
    <div>
      <div className="font-Hero">
        <span className="capitalize text-lg font-extralight">
          Festival Donations
        </span>
        <div className="flex gap-10 flex-wrap items-center">
          <h2 className="capitalize max-w-3xl leading-tight font-normal font-[inherit] text-6xl">
            Welcome to
            <br />
            spiritual world
          </h2>

          <p className="max-w-xl mt-auto">
            The Various Festivals Promotes and Encourage Participation of
            Devotees and General Mass in Spiritual Activities throughout the
            year, Nurturing the Soul.
          </p>
        </div>
      </div>

      <section className="w-full mx-auto sm:pt-12 md:pt-16">
        <div className="relative">
          <Swiper
            ref={sliderRef}
            className="h-max"
            spaceBetween={30}
            mousewheel={{
              releaseOnEdges: true,
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
                className={cn(
                  "h-96 flex items-center justify-center relative",
                  index % 2 ? "pt-8" : "pb-8"
                )}
                key={index}
              >
                <GenericSliderCard card={card} />
              </SwiperSlide>
            ))}

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

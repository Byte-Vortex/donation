"use client";

import {
  SwiperNextNavigationButton,
  SwiperPrevNavigationButton,
} from "@/components/ui/swiper-buttons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import { useEffect, useRef } from "react";
import { LuQuote } from "react-icons/lu";
import { FaThumbsUp } from "react-icons/fa6";
import { Image } from "@/components/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function TestimonialsSection({ data }) {
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (sliderRef.current && sliderRef.current.swiper) {
            sliderRef.current.swiper.autoplay.start();
          }
        } else {
          if (sliderRef.current && sliderRef.current.swiper) {
            sliderRef.current.swiper.autoplay.stop();
          }
        }
      },
      {
        threshold: 0.5, // Adjust as needed
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      // Important: Stop autoplay on unmount to prevent memory leaks
      if (sliderRef.current && sliderRef.current.swiper) {
        sliderRef.current.swiper.autoplay.stop();
      }
    };
  }, []);

  return (
    <div className="space-y-6 p-4" ref={sectionRef}>
      <div className="flex items-center gap-2 ml-3">
        <div className="p-2 bg-landing-background text-2xl rounded-full">
          <FaThumbsUp className="text-landing-primary" />
        </div>
        <h3 className="font-bold text-landing-background">
          <span>Testimonials</span>
        </h3>

        <SwiperPrevNavigationButton className="ml-auto" ref={sliderRef} />

        <SwiperNextNavigationButton ref={sliderRef} />
      </div>

      <div className="overflow-hidden rounded-xl">
        <Swiper
          className="py-0.5"
          ref={sliderRef}
          slidesPerView={1.15}
          centeredSlides
          centeredSlidesBounds
          spaceBetween={10}
          modules={[Mousewheel, Keyboard, Autoplay]}
          keyboard={{
            enabled: true,
          }}
          mousewheel={{
            forceToAxis: true,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2.3,
            },
            800: {
              slidesPerView: 2.5,
            },
            1100: {
              slidesPerView: 3.2,
            },
          }}
          loop={true}
          autoplay={{
            delay: 4000,
            waitForTransition: true,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
        >
          {data.map((card, index) => {
            return (
              <SwiperSlide key={index} className="py-0.5 !h-auto">
                <div className="gap-4 flex flex-col w-full bg-landing-background text-landing-foreground !min-h-[420px] p-4 md:p-6 rounded-xl elevation-1 h-full">
                  <div className="max-w-max max-h-max mx-auto relative">
                    <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-landing-primary relative">
                      <Image
                        fill
                        src={BASE_URL + card.image}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="absolute bg-landing-primary h-10 w-10 rounded-full -bottom-2 right-1 flex items-center justify-center">
                      <LuQuote className="text-landing-background text-xl" />
                    </div>
                  </div>

                  <p className="text-center">{card.text}</p>

                  <div className="mt-auto font-semibold">
                    <div className="">{card.name}</div>
                    <div className="text-xs">{card.designation}</div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

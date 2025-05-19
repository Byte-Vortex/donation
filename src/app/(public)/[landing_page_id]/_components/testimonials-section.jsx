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

export default function TestimonialsSection({ testimonialsSection }) {
  const data = testimonialsSection;

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
    <div className="w-full bg-gradient-to-b from-landing-primary via-landing-secondary to-landing-tertiary py-10">
      <div className="max-w-7xl mx-auto px-4 space-y-6 " ref={sectionRef}>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-landing-background text-base md:text-2xl rounded-full">
            <FaThumbsUp className="text-landing-primary" />
          </div>
          <h3 className="font-bold text-landing-background text-3xl md:text-4xl">
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
                slidesPerView: 3.6,
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
                <SwiperSlide key={index} className="!h-auto">
                  <div className="!min-h-[420px] gap-4 flex flex-col w-full bg-landing-background text-landing-foreground p-4 md:p-6 rounded-xl elevation-1 h-full">
                    <div className="max-w-max max-h-max mx-auto relative">
                      <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-landing-primary relative">
                        <Image
                          sizes="128px"
                          alt=""
                          fill
                          src={card.image}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="absolute bg-landing-primary h-12 w-12 rounded-full -bottom-2 right-0 flex items-center justify-center">
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
      </div></div>
  );
}

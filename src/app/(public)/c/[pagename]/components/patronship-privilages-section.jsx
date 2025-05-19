"use client"

import {
  SwiperNextNavigationButton,
  SwiperPrevNavigationButton,
} from "@/components/ui/swiper-buttons"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Mousewheel, Keyboard } from "swiper/modules"
import { useEffect, useRef } from "react"
import { Image } from "@/components/image"
import { ReadMoreTextSection } from "@/components/ui/read-more-text-section"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function PatronshipPrivilagesSection({ data }) {
  const sliderRef = useRef(null)
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
    <div className="space-y-4 max-w-7xl mx-auto px-4" ref={sectionRef}>
      <div className="flex items-center gap-2">
        <h3>
          <span>{data.title}</span>
        </h3>

        <SwiperPrevNavigationButton className="ml-auto" ref={sliderRef} />

        <SwiperNextNavigationButton ref={sliderRef} />
      </div>

      <ReadMoreTextSection innerHtml={data.text} />

      <Swiper
        centeredSlides
        centeredSlidesBounds
        ref={sliderRef}
        spaceBetween={10}
        mousewheel={{
          forceToAxis: true,
        }}
        className="rounded-xl"
        keyboard={true}
        modules={[Keyboard, Mousewheel, Autoplay]}
        slidesPerView={"auto"}
        loop={true}
        autoplay={{
          delay: 4000,
          waitForTransition: true,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
      >
        {data.images.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="rounded-xl overflow-hidden w-64 min-[360px]:w-80 sm:w-96"
            >
              <div className="aspect-w-4 aspect-h-5 z-0 w-full relative">
                <Image
                  fill
                  src={BASE_URL + item.image}
                  className="absolute top-0 w-full h-full object-cover z-0"
                />
                <div className="h-full w-full flex flex-col">
                  <div className="p-4 w-full bg-gradient-to-t from-landing-primary via-landing-primary/70 to-transparent text-landing-background mt-auto z-[1] relative">
                    <h4 className="font-bold text-xl">{item.title}</h4>
                    <div>{item.text}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

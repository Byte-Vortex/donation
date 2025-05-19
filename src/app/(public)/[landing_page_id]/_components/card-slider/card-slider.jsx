"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import { useEffect, useRef } from "react";
import DecorationProp from "@/assets/images/prop-1.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./_components/accordion";

import {
  SwiperNextNavigationButton,
  SwiperPrevNavigationButton,
} from "@/components/ui/swiper-buttons";
import { Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CardSlider({ cardslider }) {
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const cardSliderData = cardslider;  
 
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

  if (!cardSliderData.items.length) return null;


  return (
    <div>
      <div className="max-w-7xl mx-auto py-10 space-y-12 md:space-y-16 px-4">
        <div className="space-y-12 ">
          <div className="space-y-6" ref={sectionRef}>
            <div className="text-center space-y-2 text-landing-background">
              <h3 className="text-3xl md:text-4xl font-bold text-landing-primary">
                {cardSliderData.title}
              </h3>
              <p
                className="max-w-5xl mx-auto text-landing-primary text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: cardSliderData.text }}
              />
            </div>

            <Image className="block mx-auto" src={DecorationProp} alt="" />

            <div className="relative sm:px-3 w-full text-left" ref={sectionRef}>
              <div className="overflow-hidden rounded-xl">
                <Swiper
                  centerInsufficientSlides
                  ref={sliderRef}
                  className=""
                  spaceBetween={10}
                  modules={[Mousewheel, Keyboard, Autoplay]}
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
                      slidesPerView: 4,
                    },
                  }}
                  loop={true}
                  autoplay={{
                    delay: 5000,
                    waitForTransition: true,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                  }}
                >
                  {cardSliderData.items.map((item, index) => (
                    <SwiperSlide key={index} className="!h-auto">
                      {cardSliderData.is_link ? (
                        <>
                          <div className="group max-w-xs rounded-2xl bg-gradient-to-tr from-landing-primary to-landing-secondary text-white p-0 shadow-lg overflow-hidden">
                            <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                              <Image
                                src={item.imagelink}
                                alt="Cow Hospital"
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 ease-in-out group-hover:brightness-75 group-hover:scale-110"
                              />
                            </div>
                            <div className="px-4 py-4 h-44">
                              <div className="font-bold text-lg mb-2">{item.title || "Cow Hospital"}</div>
                              <p className="text-sm">
                                {item.text}                              
                              </p>
                            </div>
                            <div className="px-4 pb-4 flex justify-end">
                              <Link href={item.link || "#form"}>
                                <Button className="bg-landing-background text-landing-primary font-bold py-2 px-4 rounded-xl">
                                  Donate Now
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex group overflow-hidden rounded-xl relative z-[0] shadow-md min-h-[420px] w-full">
                          <div className="relative z-[1] p-2 mt-auto w-full">
                            <Accordion type="multiple" collapsible={"true"}>
                              <AccordionItem
                                className="bg-landing-background rounded-xl text-landing-foreground shadow-md"
                                value="item-1"
                              >
                                <AccordionTrigger className="font-Normal font-semibold px-4">
                                  <span className="text-center w-full">
                                    {item.title}
                                  </span>
                                </AccordionTrigger>
                                <AccordionContent className="px-4">
                                  {item.text}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                          <div className="top-0 absolute w-full h-full z-[0] group-hover:brightness-75 duration-150 group-hover:scale-110">
                            <Image
                              alt={item.image_alt}
                              sizes="512px"
                              fill
                              className="h-full w-full object-cover"
                              src={item.imagelink}
                            />
                          </div>
                        </div>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="h-full absolute top-0 left-0 z-10 flex items-center">
                <SwiperPrevNavigationButton
                  className="relative hidden sm:flex"
                  ref={sliderRef}
                />
              </div>
              <div className="h-full absolute top-0 right-0 z-10 flex items-center">
                <SwiperNextNavigationButton
                  className="hidden sm:flex"
                  ref={sliderRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { forwardRef, useCallback, useState, useEffect } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { cn } from "@/lib/utils";

export const SwiperPrevNavigationButton = forwardRef(
  ({ children, className, ...rest }, ref) => {
    const sliderRef = ref;
    const handlePrev = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slidePrev();
    }, [sliderRef.current]);

    const [hidden, setHidden] = useState();

    useEffect(() => {
      if (!sliderRef.current) return;

      const swiper = sliderRef.current.swiper;

      if (!swiper.params.loop) {
        setHidden(swiper.isBeginning);
        swiper.on("activeIndexChange", (swiper) => {
          setHidden(swiper.isBeginning);
        });
      }
    }, [sliderRef.current?.swiper]);

    return (
      <div
        className={cn(
          "rounded-full duration-200 bg-background h-8 w-8 active:brightness-50 active:scale-95 hover:brightness-75 flex items-center justify-center text-lg text-foreground",
          className,
          hidden && "opacity-0"
        )}
        onClick={handlePrev}
        {...rest}
      >
        {children ? children : <IoChevronBack className="mr-0.5" />}
      </div>
    );
  }
);

SwiperPrevNavigationButton.displayName = "SwiperPrevNavigationButton";

export const SwiperNextNavigationButton = forwardRef(
  ({ children, className, ...rest }, ref) => {
    const sliderRef = ref;

    const handleNext = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slideNext();
    }, []);

    const [hidden, setHidden] = useState(false);

    useEffect(() => {
      if (!sliderRef.current) return;

      const swiper = sliderRef.current.swiper;
      if (!swiper.params.loop) {
        setHidden(swiper.isEnd);
        swiper.on("activeIndexChange", (swiper) => {
          setHidden(swiper.isEnd);
        });
      }
    }, [sliderRef.current?.swiper]);

    return (
      <div
        className={cn(
          "rounded-full duration-200 bg-background h-8 w-8 active:brightness-50 active:scale-95 hover:brightness-75 flex items-center justify-center text-lg text-foreground",
          className,
          hidden && "opacity-0"
        )}
        onClick={handleNext}
        {...rest}
      >
        {children ? children : <IoChevronForward className="ml-0.5" />}
      </div>
    );
  }
);

SwiperNextNavigationButton.displayName = "SwiperNextNavigationButton";

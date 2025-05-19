"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel } from "swiper/modules";
import Link from "next/link";
import { Image } from "@/components/image";
import "swiper/css/effect-fade";
import { useState } from "react";
import { getImageProps } from "next/image";
import clsx from "clsx";

export function HeroSection({ data }) {
  return (
    <section
      id="home"
      className="aspect-h-1 overflow-hidden aspect-w-[0.59] min-[767px]:aspect-w-[2.63] bg-background-dark z-0"
    >
      <Swiper
        className="w-full h-full rounded-b-3xl"
        spaceBetween={0}
        keyboard={true}
        mousewheel={{
          forceToAxis: true,
        }}
        modules={[Autoplay, Keyboard, Mousewheel]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          waitForTransition: true,
          pauseOnMouseEnter: true,
          disableOnInteraction: true,
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="h-full w-full">
            <Slide item={item} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function Slide({ item, index }) {
  const [isImageLoaded, setImageLoaded] = useState(index === 0);
  const phoneImageProps = getImageProps({
      alt: "",
      src: item.phoneBackground,
      sizes: "100vw",
      fill: true,
    }).props;
    const desktopImageProps = getImageProps({
        alt: "",
        src: item.desktopBackground,
        sizes: "100vw",
        fill: true,
    }).props;

  return (
    <Link
      href={item.link}
      className={clsx(
        "h-full w-full block relative duration-300",
        !isImageLoaded && "opacity-0"
      )}
    >
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet={phoneImageProps.srcSet}
          sizes={phoneImageProps.sizes}
        />
        <source
          srcSet={desktopImageProps.srcSet}
          sizes={desktopImageProps.sizes}
        />

        <Image
          onLoad={() => setImageLoaded(true)}
          fill
          priority
          className="w-full h-full object-cover"
          src={item.desktopBackground}
        />
      </picture>
    </Link>
  );
}

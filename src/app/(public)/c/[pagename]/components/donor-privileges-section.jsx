"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { DonateButton } from "../../_components/donate-button";

import DecorationProp from "@/assets/images/prop-2.svg";
import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function DonorPrivilegesSection({ data }) {
  return (
    <div className="space-y-12">
      <Image className="block mx-auto" src={DecorationProp} alt="" />

      <div className="grid md:grid-cols-2 min-h-full h-full gap-6 max-w-7xl mx-auto px-4">
        <div className="aspect-h-9 aspect-w-16 max-h-max my-auto rounded-xl w-full overflow-hidden mx-auto">
          <Slider slides={data.images} />
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-3xl font-bold">{data.title}</h3>
          <ProseInnerHtmlContainer html={data.text} />

          <DonateButton />
        </div>
      </div>

      <Image className="block mx-auto rotate-180" src={DecorationProp} alt="" />
    </div>
  );
}

function Slider({ slides }) {
  if (!Array.isArray(slides)) return null;
  return (
    <Swiper
      className="w-full h-full swiper-bullet-active:!bg-primary swiper-bullet:opacity-100 swiper-bullet:bg-white swiper-bullet:w-4 swiper-bullet-active:!w-8 swiper-bullet:!rounded-md"
      spaceBetween={0}
      keyboard={true}
      mousewheel={{
        forceToAxis: true,
      }}
      pagination={{
        enabled: true,
        clickable: true,
      }}
      modules={[Keyboard, Mousewheel, Pagination, Autoplay]}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        waitForTransition: true,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="min-h-full h-full w-full">
          <div className="w-full h-full relative">
            <Image
              fill
              className="w-full h-full object-cover"
              src={BASE_URL + slide}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

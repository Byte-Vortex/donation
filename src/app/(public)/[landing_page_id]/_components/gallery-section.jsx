"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Keyboard, Mousewheel, Pagination } from "swiper/modules"
import "swiper/css/pagination"
import { Image } from "@/components/image"

export default function GallerySection({ gallerySection }) {
  let data = gallerySection
  return (
    <div
      style={{
        backgroundImage: `url('${data.bg_image}')`,
      }}
      className="py-10 bg-cover"
    >
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <h3 className="text-4xl md:text-5xl text-center font-bold text-white">
          {data.title}
        </h3>
        <Slider slides={data.images} />
      </div>
    </div>

  )
}

function Slider({ slides }) {
  return (
    <div className="rounded-xl w-full overflow-hidden elevation-2">
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
        {slides?.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-h-9 aspect-w-16">
              <Image
                alt={slide.image_alt || "Gallery image"}
                fill
                className="w-full h-full object-cover"
                src={slide.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";

export default function BannerClient({ slides }: { slides: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
    if (swiperInstance) swiperInstance.slideToLoop(index);
  };

  return (
    <section className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[70vh]">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Desktop Buttons */}
      <div className="hidden md:grid grid-cols-5 gap-4 mt-6 max-w-[1480px] pl-14 relative -top-20 z-10">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => handleButtonClick(index)}
            className={`cursor-pointer rounded-2xl transition-all duration-300
        ${
          activeIndex === index
            ? "bg-white text-black shadow-lg col-span-2 p-6"
            : "bg-[#A4D68E] text-white opacity-90 hover:opacity-100 col-span-1 p-4"
        }`}
          >
            <h3
              className={`font-semibold leading-snug mb-3 ${
                activeIndex === index ? "text-lg" : "text-sm line-clamp-2"
              }`}
            >
              {slide.title}
            </h3>

            {activeIndex === index ? (
              <div className="flex flex-col gap-4">
                <div className="text-sm leading-snug">{slide.desc}</div>
                <button className="bg-[#6BCB3D] text-white font-semibold rounded-md py-2 px-4 w-full hover:bg-green-600 transition">
                  {slide.activeBtn}
                </button>
              </div>
            ) : (
              slide.inActiveBtn
            )}
          </div>
        ))}
      </div>

      {/* Mobile Active Button */}
      <div className="block md:hidden mt-6 px-4 relative z-10">
        <div className="bg-white text-black shadow-lg rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-3">
            {slides[activeIndex].title}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="text-sm leading-snug">
              {slides[activeIndex].desc}
            </div>
            <button className="bg-[#6BCB3D] text-white font-semibold rounded-md py-2 px-4 w-full hover:bg-green-600 transition">
              {slides[activeIndex].activeBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

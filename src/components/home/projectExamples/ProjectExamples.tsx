"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projectImages = [
  "/assets/projectExamplesImage1.png",
  "/assets/projectExamplesImage2.png",
  "/assets/projectExamplesImage3.png",
  "/assets/projectExamplesImage4.png",
  "/assets/projectExamplesImage5.png",
];

export default function ProjectExamples() {
  return (
    <section className="bg-[#e9f2f4] py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Примеры наших работ
      </h2>

      <div className="relative w-full">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          className="w-full"
        >
          {projectImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[300px] md:h-[600px]">
                <Image
                  src={img}
                  alt={`Project example ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#8bd338] text-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:opacity-80 transition">
          ←
        </button>
        <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#8bd338] text-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:opacity-80 transition">
          →
        </button>

        {/* Pagination Dots */}
        <div className="custom-pagination flex justify-center mt-4"></div>
      </div>
    </section>
  );
}

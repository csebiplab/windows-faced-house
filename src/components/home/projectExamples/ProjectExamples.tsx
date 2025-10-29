"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
// @ts-ignore: allow importing global CSS without explicit type declarations
import "swiper/css";
// @ts-ignore: allow importing global CSS without explicit type declarations
import "swiper/css/effect-fade";
// @ts-ignore: allow importing global CSS without explicit type declarations
import "swiper/css/navigation";
// @ts-ignore: allow importing global CSS without explicit type declarations
import "swiper/css/pagination";

interface ProjectExamplesProps {
  title: string;
  projectImages: { id: number; src: string }[];
}

export default function ProjectExamples({
  title,
  projectImages,
}: ProjectExamplesProps) {
  if (!projectImages.length) return null;

  return (
    <section className="bg-[#e9f2f4] py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        {title}
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
          {projectImages.map((img) => (
            <SwiperSlide key={img.id}>
              <div className="relative w-full h-[300px] md:h-[600px]">
                <Image
                  src={img.src}
                  alt={`Project example ${img.id}`}
                  fill
                  className="object-cover"
                  priority={img.id === 1}
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

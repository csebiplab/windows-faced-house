"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";

interface Accessory {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface AccessoriesProps {
  title: string;
  articles: Accessory[];
}

export default function Accessories({ title, articles }: AccessoriesProps) {
  return (
    <section className="bg-[#e9f2f4] py-12 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        {title}
      </h2>

      <div className="max-w-[1640px] mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          spaceBetween={20}
          loop
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {articles.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col h-[380px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Image */}
                <div className="relative w-full h-48 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-5">
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination */}
        <div className="custom-pagination flex justify-center mt-6"></div>
      </div>
    </section>
  );
}

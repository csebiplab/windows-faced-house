"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
import Image from "next/image";
// import { Download } from "lucide-react";

interface Article {
  id: string;
  title: string;
  image: string;
  link: string;
  slugLabel?: string;
}

interface UsefulArticlesCarouselProps {
  title: string;
  articles: Article[];
}

export default function UsefulArticlesCarousel({
  title,
  articles,
}: UsefulArticlesCarouselProps) {
  return (
    <div className="bg-[#e9f4f7] py-14 px-4 overflow-x-visible">
      <div className="max-w-[1740px] mx-auto">
        {/* Section Title */}
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-[#0d1c2e] mb-10">
          {title}
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1.2}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-6 overflow-visible"
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id} className="h-full">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:scale-105 transition flex flex-col h-full relative">
                {/* Image */}
                <div className="relative w-full aspect-[4/3] flex-shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <h3 className="text-[#0d1c2e] font-semibold leading-snug mb-4 line-clamp-3">
                    {article.title}
                  </h3>
                  <a
                    href={article.link}
                    className="text-sm text-[#0d1c2e] underline hover:text-[#67b32e] transition"
                  >
                    {article.slugLabel || "Подробнее…"}
                  </a>
                </div>

                {/* Download button */}
                {/* <a
                  href={article.link}
                  className="absolute bottom-4 right-4 bg-[#67b32e] text-white p-2 rounded-full shadow hover:bg-[#55912b] transition flex items-center justify-center"
                >
                  <Download className="w-4 h-4" />
                </a> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

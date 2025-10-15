"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Certificates() {
  const certificates = [
    { id: 1, img: "/assets/certificatesImage1.png" },
    { id: 2, img: "/assets/certificatesImage2.png" },
    { id: 3, img: "/assets/certificatesImage3.png" },
    { id: 4, img: "/assets/certificatesImage1.png" },
    { id: 5, img: "/assets/certificatesImage2.png" },
    { id: 6, img: "/assets/certificatesImage3.png" },
  ];

  return (
    <section className="w-full bg-[#ECF5F8] py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2239] mb-10">
          Сертификаты
        </h2>

        {/* Slider Container */}
        <div className="relative bg-white rounded-2xl shadow-sm py-10 px-4 sm:px-8">
          {/* Swiper */}
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            centeredSlides={false}
            slidesPerView={1.5}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-8"
          >
            {certificates.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex justify-center">
                  <div className="relative w-[180px] h-[260px] sm:w-[200px] sm:h-[280px]">
                    <Image
                      src={item.img}
                      alt={`Certificate ${item.id}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-start mt-6 gap-3">
          <button
            className="prev-btn bg-white border shadow-sm w-9 h-9 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            className="next-btn bg-white border shadow-sm w-9 h-9 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
            aria-label="Next"
          >
            <ArrowRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}

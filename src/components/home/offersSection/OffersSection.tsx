"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// @ts-ignore: allow importing global CSS without explicit type declarations
import "swiper/css";
// @ts-ignore: allow importing global CSS without explicit type declarations
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Offer = {
  id: string;
  title: string;
  description: string;
  image: string;
};

interface OffersSectionProps {
  offers: Offer[];
  title?: string;
}

export default function OffersSection({
  offers,
  title = "Наши акции",
}: OffersSectionProps) {
  return (
    <section className="py-12 bg-[#f1f9fb] relative">
      <div className="max-w-[1540px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#062f3c]">
          {title}
        </h2>

        {/* Navigation buttons */}
        <div className="absolute inset-y-1/2 left-4 z-10 flex items-center">
          <button
            className="swiper-button-prev bg-white shadow-md hover:bg-lime-100 p-3 rounded-full transition"
            aria-label="Previous"
          >
            <ArrowLeft className="text-lime-600" size={20} />
          </button>
        </div>

        <div className="absolute inset-y-1/2 right-4 z-10 flex items-center">
          <button
            className="swiper-button-next bg-white shadow-md hover:bg-lime-100 p-3 rounded-full transition"
            aria-label="Next"
          >
            <ArrowRight className="text-lime-600" size={20} />
          </button>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-[520px]">
                <div className="relative w-full h-56">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[18px] mb-2 leading-snug text-[#062f3c]">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-5">
                      {offer.description}
                    </p>
                  </div>
                  <button className="mt-4 bg-lime-500 text-white font-medium py-2 rounded-md hover:bg-lime-600 transition">
                    Заказать расчет
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

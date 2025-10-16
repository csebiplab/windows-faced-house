"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

type Review = {
  id: number;
  name: string;
  city: string;
  videoThumbnail: string;
  videoUrl: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Наталья",
    city: "г. Москва",
    videoThumbnail: "/assets/review1.jpg",
    videoUrl: "/assets/review1.mp4",
  },
  {
    id: 2,
    name: "Дмитрий",
    city: "д. Гребнево",
    videoThumbnail: "/assets/review2.jpg",
    videoUrl: "/assets/review2.mp4",
  },
  {
    id: 3,
    name: "Сергей Васильевич",
    city: "г. Москва",
    videoThumbnail: "/assets/review3.jpg",
    videoUrl: "/assets/review3.mp4",
  },
  {
    id: 4,
    name: "Сергей",
    city: "г. Москва",
    videoThumbnail: "/assets/review4.jpg",
    videoUrl: "/assets/review4.mp4",
  },
  {
    id: 5,
    name: "Наталья Леонтьевна",
    city: "г. Москва",
    videoThumbnail: "/assets/review5.jpg",
    videoUrl: "/assets/review5.mp4",
  },
];

export default function VideoReviewCarousel() {
  return (
    <section className="bg-[#f1f7f9] py-10 px-4">
      <div className="max-w-[1740px] mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4.5 },
          }}
          className="pb-8"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="flex flex-col">
                {/* Card with image */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition w-full">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={review.videoThumbnail}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-black/60 hover:bg-black/70 transition rounded-full p-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          viewBox="0 0 24 24"
                          className="w-6 h-6"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Text below card */}
                <div className="mt-3 text-left">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Отзыв от {review.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

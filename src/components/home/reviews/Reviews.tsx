"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
// @ts-ignore
import "swiper/css";

interface Review {
  _id: string;
  name: string;
  rating: number;
  text: string;
  date?: string;
}

interface ReviewsProps {
  title?: string;
  reviews: Review[];
}

export default function Reviews({ title, reviews }: ReviewsProps) {
  return (
    <section className="w-full bg-[#ECF5F8] py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2239] mb-10">
          {title || "Отзывы наших клиентов"}
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="bg-white rounded-2xl shadow-sm p-6 text-left flex flex-col justify-between hover:shadow-md transition h-[240px]">
                {/* Stars */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex text-green-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-green-500 text-green-500"
                      />
                    ))}
                  </div>
                  {review.date && (
                    <p className="text-xs text-gray-500">{review.date}</p>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#0B2239] mb-2">
                  {review.name}
                </h3>

                <p className="text-sm text-gray-700 mb-4 leading-relaxed flex-grow">
                  {review.text}
                </p>

                <a
                  href="#"
                  className="text-green-500 text-sm font-medium hover:underline mt-auto"
                >
                  Подробнее
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-6">
          <button className="bg-[#7ED321] text-[#0B2239] font-semibold px-6 py-3 rounded-md hover:bg-[#6cc11d] transition">
            Все отзывы
          </button>
        </div>
      </div>
    </section>
  );
}

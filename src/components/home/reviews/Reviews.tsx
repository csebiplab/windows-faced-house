"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Владислав",
      date: "02.08.2025",
      text: "Большое спасибо компании «Пластика Окон» в целом и мастерам Максиму и Володе отдельно. Все сделано очень качественно и аккуратно.",
    },
    {
      id: 2,
      name: "Ирина",
      date: "03.06.2025",
      text: "Спасибо большое за окно! Очень все понравилось: от коммуникации, замера, доставки до установки. Большое спасибо за качественный монтаж Кучеренко Александру за...",
    },
    {
      id: 3,
      name: "Юлия",
      date: "25.04.2025",
      text: "Приятное впечатление с первой секунды оставила сотрудница фирмы, когда позвонили чтобы вызвать замерщика на остекление балкона. Грамотно и профессионально.",
    },
    {
      id: 4,
      name: "Сергей",
      date: "10.02.2025",
      text: "Хорошая компания, качественная установка окон и внимательные мастера. Всё сделали быстро и аккуратно. Рекомендую.",
    },
    {
      id: 5,
      name: "Марина",
      date: "18.01.2025",
      text: "Отличная работа от замера до монтажа! Осталась очень довольна, буду обращаться снова. Спасибо всей команде!",
    },
    {
      id: 6,
      name: "Дмитрий",
      date: "05.01.2025",
      text: "Работа выполнена идеально, сотрудники вежливые и пунктуальные. Приятно иметь дело с профессионалами своего дела.",
    },
  ];

  return (
    <section className="w-full bg-[#ECF5F8] py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2239] mb-10">
          Отзывы наших клиентов
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white rounded-2xl shadow-sm p-6 text-left flex flex-col justify-between hover:shadow-md transition h-[240px]">
                {/* Stars + Date */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex text-green-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-green-500 text-green-500"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-[#0B2239] mb-2">
                  {review.name}
                </h3>

                {/* Review Text */}
                <p className="text-sm text-gray-700 mb-4 leading-relaxed flex-grow">
                  {review.text}
                </p>

                {/* Read More */}
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

        {/* Button */}
        <div className="mt-6">
          <button className="bg-[#7ED321] text-[#0B2239] font-semibold px-6 py-3 rounded-md hover:bg-[#6cc11d] transition">
            Все отзывы
          </button>
        </div>
      </div>
    </section>
  );
}

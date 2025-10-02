"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";

const slides = [
  {
    id: 0,
    img: "/assets/bannerImage1.webp",
    title: "Компания «Пластика Окон» отмечает свой 23-й день рождения!",
    desc: (
      <p className="text-xs leading-snug">
        Мы работаем для вас, дорогие клиенты! В честь праздника закажите два или
        более окон и получите подарок на выбор: <br />- москитную сетку;
        <br />- бесплатную доставку;
        <br />- мультифункциональное стекло;
        <br />- скрытые петли.
      </p>
    ),
    activeBtn: "Заказать с подарком",
    inActiveBtn: (
      <p className="line-clamp-2 text-xs">
        <strong>
          Компания «Пластика Окон» отмечает свой 23-й день рождения!
        </strong>{" "}
        Получите подарок при заказе от двух окон.
      </p>
    ),
  },
  {
    id: 1,
    img: "/assets/bannerImage2.webp",
    title: "Оконные системы со скидкой 50%",
    desc: "Закажите с выгодой 50% премиальную оконную систему с самыми современными технологиями.",
    activeBtn: "Подробнее",
    inActiveBtn: (
      <p className="line-clamp-2 text-xs">
        <strong>Скидка 50%</strong> на премиальные оконные системы. Только до
        конца месяца!
      </p>
    ),
  },
  {
    id: 2,
    img: "/assets/bannerImage3.webp",
    title: "Лучшая оконная система в линейке",
    desc: "Приобретайте инновационную систему CENTUM с эксклюзивными условиями по сниженной цене.",
    activeBtn: "Получить скидку",
    inActiveBtn: (
      <p className="line-clamp-2 text-xs">
        <strong>Инновационная система CENTUM</strong> теперь со скидкой и
        выгодными условиями.
      </p>
    ),
  },
  {
    id: 3,
    img: "/assets/bannerImage4.webp",
    title: "Остекляйте квартиру с новинкой года",
    desc: "Закажите со скидкой 50% инновационную премиальную систему SMART ULTRA 65.",
    activeBtn: "Заказать сейчас",
    inActiveBtn: (
      <p className="line-clamp-2 text-xs">
        <strong>SMART ULTRA 65</strong> — новинка года! Современные окна со
        скидкой 50%.
      </p>
    ),
  },
];

export default function PromoSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
    if (swiperInstance) swiperInstance.slideToLoop(index);
  };

  return (
    <section className="w-full">
      {/* Main Swiper */}
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
            <div className="relative w-full aspect-video">
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

      {/* Mobile Active Button Only */}
      <div className="block md:hidden mt-6 px-4 relative z-10">
        <div className="bg-white text-black shadow-lg rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-3">
            {slides[activeIndex].title}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="text-sm leading-snug">{slides[activeIndex].desc}</div>
            <button className="bg-[#6BCB3D] text-white font-semibold rounded-md py-2 px-4 w-full hover:bg-green-600 transition">
              {slides[activeIndex].activeBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

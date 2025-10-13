"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

type Project = {
  id: number;
  title: string;
  desc: string;
  area: string;
  developer: string;
  start: string;
  end: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "ЖК «Пехра»",
    desc: "Современный и стильный жилой комплекс комфорт-класса, расположенный в г. Балашиха. Контракт: остекление объектов из профиля Melke Lite'60 (белый).",
    area: "40000 м²",
    developer: "ООО «Сфера»",
    start: "01.11.2021",
    end: "01.12.2024",
    image: "/assets/ourWorksCard1Image1.png",
  },
  {
    id: 2,
    title: "ЖК «Альфа»",
    desc: "Жилой комплекс бизнес-класса в Подмосковье. Остекление и монтаж фасадных конструкций.",
    area: "52000 м²",
    developer: "ООО «СтройГрупп»",
    start: "01.06.2022",
    end: "15.08.2024",
    image: "/assets/ourWorksCard1Image1.png",
  },
  {
    id: 3,
    title: "ЖК «Солнечный»",
    desc: "Современные жилые здания с улучшенной планировкой и энергоэффективными окнами.",
    area: "30000 м²",
    developer: "ООО «Горстрой»",
    start: "01.03.2023",
    end: "01.12.2025",
    image: "/assets/ourWorksCard1Image1.png",
  },
  {
    id: 4,
    title: "ЖК «Восток»",
    desc: "Многоэтажный жилой дом в восточной части города. Проект остекления и монтаж конструкций.",
    area: "25000 м²",
    developer: "ООО «Монолит»",
    start: "01.02.2022",
    end: "20.10.2024",
    image: "/assets/ourWorksCard1Image1.png",
  },
];

export default function OurWorks() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-[#edf4f6] py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#0f1e2e] mb-10">
          Наши работы
        </h2>

        {/* Main Swiper for Cards */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, Thumbs]}
            navigation={{
              nextEl: ".main-next-btn",
              prevEl: ".main-prev-btn",
            }}
            thumbs={{ swiper: thumbsSwiper }}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="relative"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm relative">
                  {/* Navigation buttons (moved to top-right corner) */}
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <button className="main-prev-btn bg-[#64b000] text-white p-2 rounded-md hover:bg-[#4f8a00] transition-all">
                      <ArrowLeft size={18} />
                    </button>
                    <button className="main-next-btn bg-[#64b000] text-white p-2 rounded-md hover:bg-[#4f8a00] transition-all">
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Image and Tracker */}
                    <div className="w-full">
                      {/* Main Image */}
                      <div className="w-full mb-4">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="w-full h-[400px] object-cover rounded-xl"
                        />
                      </div>
                      
                      {/* Thumbnail Tracker - Positioned exactly below the main image */}
                      <div className="w-full">
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          modules={[Thumbs]}
                          spaceBetween={8}
                          slidesPerView={4}
                          watchSlidesProgress={true}
                          className="thumbnail-swiper"
                        >
                          {projects.map((project, index) => (
                            <SwiperSlide key={project.id}>
                              <div 
                                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:border-[#64b000] ${
                                  activeIndex === index 
                                    ? "border-[#64b000] opacity-100 scale-105" 
                                    : "border-transparent opacity-70"
                                }`}
                              >
                                <Image
                                  src={project.image}
                                  alt={`${project.title} thumbnail`}
                                  width={120}
                                  height={80}
                                  className="w-full h-16 object-cover"
                                />
                                <div className={`absolute inset-0 flex items-center justify-center transition-all ${
                                  activeIndex === index ? "bg-[#64b000] bg-opacity-80" : "bg-black bg-opacity-40"
                                }`}>
                                  <span className="text-white text-xs font-medium">
                                    {index + 1}
                                  </span>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>

                    {/* Right Info */}
                    <div className="flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          {project.desc}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                        <div>
                          <p className="text-green-600 font-semibold">
                            Площадь работ
                          </p>
                          <p>{project.area}</p>
                        </div>
                        <div>
                          <p className="text-green-600 font-semibold">
                            Девелопер
                          </p>
                          <p>{project.developer}</p>
                        </div>
                        <div>
                          <p className="text-green-600 font-semibold">
                            Начало работ
                          </p>
                          <p>{project.start}</p>
                        </div>
                        <div>
                          <p className="text-green-600 font-semibold">
                            Завершение работ
                          </p>
                          <p>{project.end}</p>
                        </div>
                      </div>

                      <button className="bg-[#64b000] text-white px-6 py-2 rounded-md w-fit hover:bg-[#4f8a00] transition-all">
                        Оставить заявку
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom Button */}
        <div className="text-center mt-14">
          <button className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100 transition-all">
            Смотреть все работы
          </button>
        </div>
      </div>
    </section>
  );
}
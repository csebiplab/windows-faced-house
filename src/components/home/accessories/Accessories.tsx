"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const accessories = [
  {
    title: "Подоконники Melke",
    description:
      "Стиль и экологичность, уникальный дизайн и высокое качество, надежность и долговечность – отличительные характеристики подоконников MELKE.",
    image: "/images/sill.jpg",
  },
  {
    title: "Москитные сетки",
    description:
      "Бывают нескольких видов, отличаются по типу каркаса, виду полотна и способу открывания, защищают помещение от насекомых.",
    image: "/images/net.jpg",
  },
  {
    title: "Художественные витражи",
    description:
      "Украшение окон витражами – особый вид искусства. Наши мастера создадут уникальные произведения по вашему вкусу.",
    image: "/images/stainedglass.jpg",
  },
  {
    title: "Декоративная раскладка",
    description:
      "Декоративная раскладка добавит изюминки вашим окнам и придаст дому утончённый шарм.",
    image: "/images/decorative.jpg",
  },
  {
    title: "Жалюзи и рулонные шторы",
    description:
      "Практичные и стильные решения для регулировки света и создания уюта в доме.",
    image: "/images/blinds.jpg",
  },
  {
    title: "Отливы и водоотливы",
    description:
      "Надёжная защита оконных конструкций от влаги и осадков, долговечные и эстетичные решения.",
    image: "/images/dripcap.jpg",
  },
  {
    title: "Детские замки безопасности",
    description:
      "Позаботьтесь о безопасности детей с помощью специальных оконных замков с надёжным механизмом.",
    image: "/images/childlock.jpg",
  },
];

export default function Accessories() {
  return (
    <section className="bg-[#e9f2f4] py-12 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Аксессуары
      </h2>

      <div className="max-w-[1640px] mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          spaceBetween={20}
          loop
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {accessories.map((item, index) => (
            <SwiperSlide key={index}>
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

        {/* Custom pagination under the swiper */}
        <div className="custom-pagination flex justify-center mt-6"></div>
      </div>
    </section>
  );
}

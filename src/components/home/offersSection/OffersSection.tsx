"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const offers = [
  {
    id: 1,
    image: "/assets/offersSectionImage1.png",
    title: "Melke Kids — для детской безопасности",
    desc: "Обеспечьте безопасность для ваших детей. Заказывайте окна Melke со скидкой 50% с безопасной фурнитурой. До 30 сентября 2025 года.",
  },
  {
    id: 2,
    image: "/assets/offersSectionImage2.png",
    title: "Окна Melke — официальный спонсор ФК «Спартак-Москва»",
    desc: "Получите дополнительную скидку 50% при заказе окон Melke до конца сентября!",
  },
  {
    id: 3,
    image: "/assets/offersSectionImage3.png",
    title: "Остекление коттеджа — теперь еще выгоднее с новой оконной системой Melke Wide!",
    desc: "Световой проем стал больше на 11мм с каждой стороны, а теплоизоляция остается на уровне премиальных оконных систем. Успейте заказать с выгодой до 50%.",
  },
  {
    id: 4,
    image: "/assets/offersSectionImage4.png",
    title: "Скидка на балконы и лоджии 50%",
    desc: "Короткие сроки изготовления напрямую от производителя!",
  },
  {
    id: 5,
    image: "/assets/offersSectionImage1.png",
    title: "Melke Energy — экономия энергии до 30%",
    desc: "Окна Melke Energy сохраняют тепло и снижают расходы на отопление до 30%. Закажите до конца месяца и получите дополнительную скидку.",
  },
  {
    id: 6,
    image: "/assets/offersSectionImage2.png",
    title: "Скидка на установку 40%",
    desc: "Сделайте заказ до конца недели и получите скидку 40% на установку окон любой модели.",
  },
  {
    id: 7,
    image: "/assets/offersSectionImage3.png",
    title: "Melke Premium — эксклюзивная серия окон",
    desc: "Современный дизайн, лучшие материалы и шумоизоляция. Специальное предложение только в этом месяце.",
  },
  {
    id: 8,
    image: "/assets/offersSectionImage4.png",
    title: "Сезонное остекление террас и веранд",
    desc: "Создайте уютное пространство с окнами Melke. Закажите остекление террасы со скидкой 25% до конца сезона.",
  },
];

export default function OffersSection() {
  return (
    <section className="py-12 bg-[#f1f9fb] relative">
      <div className="max-w-[1540px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#062f3c]">
          Наши акции
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
                      {offer.desc}
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

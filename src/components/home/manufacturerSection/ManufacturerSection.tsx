"use client";

import Image from "next/image";
import { Play } from "lucide-react";

const ManufacturerSection = () => {
  return (
    <section className="bg-[#f2f9fa] px-4 sm:px-6 lg:px-12 py-10">
      {/* Top Banner */}
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src="/assets/manufacturerSectionImage.png" // replace with your actual image
            alt="Factory"
            width={1200}
            height={500}
            className="w-full h-[220px] sm:h-[350px] md:h-[420px] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">
              Крупнейший производитель в России
            </h2>
            <p className="text-sm sm:text-base mb-4">
              Качество продукции и ответственность перед Клиентами
            </p>

            {/* Play button */}
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black transition-all">
              <Play className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-[#0a1a24]">
        {/* Left Column */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">
            Полный спектр услуг для вашего удобства
          </h3>
          <p className="text-sm sm:text-base leading-relaxed">
            Мы сопровождаем клиентов на всех этапах: от первичного замера до установки стеклопакетов.
          </p>
          <ul className="list-disc list-inside mt-3 text-sm sm:text-base leading-relaxed space-y-1">
            <li>Индивидуальные расчеты и проектирование</li>
            <li>Производство окон по заданным параметрам</li>
            <li>Своевременную доставку и монтаж опытными специалистами</li>
            <li>Долгосрочное сервисное обслуживание</li>
          </ul>
          <p className="mt-3 text-sm sm:text-base leading-relaxed">
            Мы уверены в качестве нашей продукции, предлагаем гарантию до 5 лет на монтаж и до 25 лет на окна. Тысячи довольных клиентов подтверждают нашу репутацию — ознакомьтесь с отзывами и убедитесь сами!
          </p>
        </div>

        {/* Right Column */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">
            Индивидуальные решения для каждого клиента
          </h3>
          <p className="text-sm sm:text-base leading-relaxed">
            Наши окна удовлетворяют запросы разных категорий заказчиков:
          </p>
          <ul className="list-disc list-inside mt-3 text-sm sm:text-base leading-relaxed space-y-1">
            <li>Молодых семей, ищущих оптимальное соотношение цены и качества</li>
            <li>Новоселов, мечтающих сделать свое жилье уникальным</li>
            <li>Любителей комфорта, желающих создать домашний уют</li>
            <li>Собственников загородных домов: от небольших построек до элитных коттеджей</li>
            <li>Бизнес-партнеров и застройщиков, которым нужны решения для торговых центров, офисов или жилых комплексов</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ManufacturerSection;

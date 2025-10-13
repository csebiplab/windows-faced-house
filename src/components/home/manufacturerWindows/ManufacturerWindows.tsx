"use client";

import Image from "next/image";
import React from "react";

const videos = [
  {
    image: "/assets/manufacturerWindowsImage1.png",
    title: "Краш-тест Lamborghini Urus vs подоконник Melke",
  },
  {
    image: "/assets/manufacturerWindowsImage2.png",
    title: "Зимний монтаж",
  },
  {
    image: "/assets/manufacturerWindowsImage3.png",
    title: "Современное автоматизированное производство окон какое оно?",
  },
  {
    image: "/assets/manufacturerWindowsImage4.png",
    title: "Онлайн экскурсия на производство",
  },
  {
    image: "/assets/manufacturerWindowsImage5.png",
    title: "Онлайн экскурсия в цех ламинации “Пластика Окон”",
  },
  {
    image: "/assets/manufacturerWindowsImage6.png",
    title: "Как выбрать окна. Основные сравнительные характеристики и что они означают.",
  },
];

const ManufacturerWindows = () => {
  return (
    <section className="bg-[#f2fafc] py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-5xl font-bold mb-10">
          Окна от производителя
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((item, index) => (
            <div key={index} className="text-left">
              <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-lg font-bold leading-snug text-gray-800">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManufacturerWindows;

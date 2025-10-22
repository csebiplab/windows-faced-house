"use client";

import React, { useState } from "react";
import Image from "next/image";

const tabs = [
  { label: "Бюджетные", value: "budget" },
  { label: "Комфорт", value: "comfort" },
  { label: "Премиум", value: "premium" },
];

const windowData = [
  {
    title: "Meike Centrum",
    price: "от 15 490 ₽/м²",
    chambers: "6/7 шт.",
    width: "80/100 мм",
    insulation: "1,23",
    label: "Самый тёплый",
    image: "/assets/windowSelectionImage1.png",
  },
  {
    title: "Meike Wide",
    price: "от 14 090 ₽/м²",
    chambers: "5/6 шт.",
    width: "80/95 мм",
    insulation: "1,12",
    label: "Больше света",
    image: "/assets/windowSelectionImage2.png",
  },
  {
    title: "Meike Evolution",
    price: "от 10 390 ₽/м²",
    chambers: "5/5 шт.",
    width: "70/70 мм",
    insulation: "1,06",
    label: "Хит продаж",
    image: "/assets/windowSelectionImage3.png",
  },
  {
    title: "Meike Smart Ultra",
    price: "от 9 790 ₽/м²",
    chambers: "4/4 шт.",
    width: "65/65 мм",
    insulation: "0,92",
    label: "Новинка",
    image: "/assets/windowSelectionImage4.png",
  },
  {
    title: "Meike Lite 70",
    price: "от 10 090 ₽/м²",
    chambers: "4/4 шт.",
    width: "70/70 мм",
    insulation: "0,76",
    image: "/assets/windowSelectionImage5.png",
  },
  {
    title: "Meike Lite 60",
    price: "от 9 490 ₽/м²",
    chambers: "3/4 шт.",
    width: "60/60 мм",
    insulation: "0,73",
    label: "Лучшая цена",
    image: "/assets/windowSelectionImage6.png",
  },
];

export default function WindowSelection() {
  const [activeValue, setActiveValue] = useState("Бюджетные");

  return (
    <section className="bg-[#e9f0f3] py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
          Выберите окна по цене, подходящей для вас
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-md overflow-hidden shadow-sm">
            {tabs.map(({ label, value }, idx) => (
              <button
                key={idx}
                onClick={() => setActiveValue(value)}
                className={`px-5 py-2 text-sm md:text-base font-medium transition-all ${
                  activeValue === value
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {windowData.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {item.label && (
                  <span className="absolute top-3 left-3 bg-[#1c274c] text-white text-xs font-semibold px-3 py-1 rounded-md">
                    {item.label}
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-[#7dd21f] text-white text-xs font-bold px-2 py-1 rounded-md">
                  ЭКО
                </span>
              </div>

              {/* Content */}
              <div className="p-4 text-left">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-900 font-bold mb-2">{item.price}</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>Воздушные камеры — {item.chambers}</li>
                  <li>Ширина рам/створа — {item.width}</li>
                  <li>Теплозащита — {item.insulation}</li>
                </ul>
                <button className="w-full bg-[#7dd21f] text-white font-medium py-2 rounded-md hover:bg-[#6ac31c] transition">
                  Заказать расчёт
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

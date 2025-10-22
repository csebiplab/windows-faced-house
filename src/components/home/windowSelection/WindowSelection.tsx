"use client";

import React, { useState } from "react";
import Image from "next/image";

type WindowItem = {
  id: string;
  title: string;
  price?: string;
  chambers?: string;
  width?: string;
  insulation?: string;
  label?: string;
  image?: string;
  category?: string;
  buttonText?: string;
};

type WindowSelectionProps = {
  items: WindowItem[];
  title?: string;
};

const tabs = [
  { label: "Бюджетные", value: "budget" },
  { label: "Комфорт", value: "comfort" },
  { label: "Премиум", value: "premium" },
];

export default function WindowSelection({
  items,
  title,
}: WindowSelectionProps) {
  const [activeValue, setActiveValue] = useState("budget");

  const filteredItems = items.filter(
    (item) => item.category?.toLowerCase() === activeValue.toLowerCase()
  );

  return (
    <section className="bg-[#e9f0f3] py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
          {title || "Выберите окна по цене, подходящей для вас"}
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-md overflow-hidden shadow-sm">
            {tabs.map(({ label, value }) => (
              <button
                key={value}
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
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-100">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}
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
                  {item.price && (
                    <p className="text-gray-900 font-bold mb-2">{item.price}</p>
                  )}
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    {item.chambers && (
                      <li>Воздушные камеры — {item.chambers}</li>
                    )}
                    {item.width && <li>Ширина рам/створа — {item.width}</li>}
                    {item.insulation && (
                      <li>Теплозащита — {item.insulation}</li>
                    )}
                  </ul>
                  <button className="w-full bg-[#7dd21f] text-white font-medium py-2 rounded-md hover:bg-[#6ac31c] transition">
                    {item.buttonText || "Заказать расчёт"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-600 text-center">
              Нет доступных товаров для этой категории.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CiCircleInfo } from "react-icons/ci";

const WindowsManufacturer = () => {
  const [selectedTab, setSelectedTab] = useState("Одностворчатое окно");
  const [coolColours, setCoolColours] = useState(true);
  const [doubleSash, setDoubleSash] = useState(false);
  const [profileHigher, setProfileHigher] = useState(false);

  const tabs = [
    "Одностворчатое окно",
    "Двухстворчатое окно",
    "Трехстворчатое окно",
    "Балконный блок",
  ];

  const colorOptions = [
    { name: "Оникс", color: "#B6A18E" },
    { name: "Графит", color: "#888888" },
    { name: "Табак", color: "#A28875" },
    { name: "Сатин", color: "#D9C2C2" },
    { name: "Off White", color: "#F4F4F4" },
  ];

  return (
    <div className="bg-[#e9f3f6]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Окна от производителя:
          <br />
          <span className="text-gray-900 font-extrabold">
            надежность, инновации и комфорт
          </span>
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Компания «Пластика Окон» свыше 20 лет изготавливает высококачественные
          окна и дверные системы из ПВХ и алюминия. Мы предлагаем комплексный
          подход от разработки индивидуальных решений до профессионального
          монтажа.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                selectedTab === tab
                  ? "bg-lime-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-md flex flex-col md:flex-row overflow-hidden">
          {/* Image Section - 40% width on desktop */}
          <div className="w-full md:w-[40%] flex justify-center items-center p-4 md:p-8 bg-white">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Discount Tag */}
              <div className="absolute top-10 left-0 bg-lime-600 text-white text-sm md:text-lg lg:text-2xl font-bold px-3 py-1 rounded z-10">
                -50%
              </div>

              {/* ECO Icon */}
              <div className="absolute top-5 right-2 z-10">
                <Image
                  src="/assets/windowsManufacturerImageIcon.png"
                  alt="Эко Профиль"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>

              <Image
                src="/assets/windowsManufacturerImage.png"
                alt="Окно"
                width={600}
                height={700}
                className="rounded-xl w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Details Section - 60% width on desktop */}
          <div className="w-full md:w-[60%] p-6 space-y-4 flex flex-col justify-center">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Product Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold">Melke Evolution</h3>
                <p className="text-gray-600">
                  Одностворчатое окно 600 x 900 мм
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  11 390 ₽
                  <span className="block text-xs font-normal text-gray-500 mt-1">
                    *Точная цена будет известна после замера
                  </span>
                </p>

                <button className="mt-4 bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-md">
                  Заказать расчет
                </button>
              </div>

              {/* Dropdowns */}
              <div className="flex flex-col gap-4 md:w-[280px]">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Профиль Melke
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Evolution</option>
                    <option>Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип стеклопакета
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Одинарный</option>
                    <option>Двойной</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cool Colours Toggle */}
            <div className="flex items-center gap-4 mt-4">
              <label
                htmlFor="switch-component-1"
                className="font-bold text-[#00171F] flex items-center gap-1 cursor-pointer"
              >
                Покрытие Cool Colours
                <CiCircleInfo className="bg-[#6ABE09] rounded-full" />
              </label>

              {/* Toggle */}
              <div className="relative inline-block w-11 h-5">
                <input
                  id="switch-component-1"
                  type="checkbox"
                  checked={coolColours}
                  onChange={() => setCoolColours(!coolColours)}
                  className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                />
                <label
                  htmlFor="switch-component-1"
                  className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                ></label>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-6 mt-4 text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={doubleSash}
                  onChange={() => setDoubleSash(!doubleSash)}
                  className="w-4 h-4 accent-lime-600"
                />
                Двухстворное
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileHigher}
                  onChange={() => setProfileHigher(!profileHigher)}
                  className="w-4 h-4 accent-lime-600"
                />
                Профиль-выше
              </label>
            </div>

            {/* Color Options */}
            {coolColours && (
              <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
                {/* Dynamic Color Boxes */}
                <div className="flex gap-3 md:gap-14 flex-wrap">
                  {colorOptions.map(({ name, color }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center gap-1 cursor-pointer group"
                    >
                      <div
                        className="w-12 h-12 rounded-md border hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-gray-700 group-hover:text-lime-700">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Profile Icon */}
                <Image
                  src="/assets/windowsManufacturerIcon.png"
                  alt="Profile"
                  width={100}
                  height={100}
                  className="w-auto h-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowsManufacturer;

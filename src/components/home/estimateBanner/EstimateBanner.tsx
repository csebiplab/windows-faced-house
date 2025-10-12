"use client";

import React from "react";
import Image from "next/image";

const EstimateBanner = () => {
  return (
    <section className="w-full flex justify-center items-center bg-[#e9f3f6] py-6 md:py-10">
      <div className="relative w-[92%] md:w-[80%] max-w-7xl rounded-xl flex flex-col md:flex-row items-center md:items-center justify-start md:justify-end p-6 md:p-10 shadow-lg overflow-hidden min-h-[380px] md:min-h-[330px]">
        {/* Background Image for Small Screens */}
        <Image
          src="/assets/estimateBannerImageSmall.png"
          alt="Estimate Banner Background Small Screens"
          fill
          className="object-cover object-center pointer-events-none md:hidden"
          priority
        />

        {/* Background Image for Desktop */}
        <Image
          src="/assets/estimateBannerImage.png"
          alt="Estimate Banner Background"
          fill
          className="object-cover object-center pointer-events-none hidden md:block"
          priority
        />

        {/* Content */}
        <div className="relative z-10 text-center md:text-left md:w-1/2 text-white mt-6 md:mt-0 w-full max-w-[280px] md:max-w-none">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-[42px] mb-2 leading-tight">
            Пересчитаем смету
          </h2>
          <p className="text-base sm:text-lg md:text-3xl font-bold mb-4 sm:mb-5 leading-snug">
            конкурентов со скидкой
          </p>
          <button className="bg-[#6fd943] hover:bg-[#57b837] transition text-white text-sm sm:text-base md:text-lg font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md shadow-md">
            Прикрепить смету конкурентов
          </button>
        </div>
      </div>
    </section>
  );
};

export default EstimateBanner;

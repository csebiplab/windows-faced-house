"use client";

import Image from "next/image";
import React from "react";

const guarantees = [
  { value: 25, label1: "лет", label2: "на окна" },
  { value: 5, label1: "лет", label2: "на монтаж" },
  { value: 3, label1: "года", label2: "на фурнитуру" },
];

const GuaranteeSection = () => {
  return (
    <section className="w-full flex justify-center items-center bg-[#edf4f6] py-10">
      <div className="w-[92%] md:w-[80%] max-w-4xl bg-white rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-[55%_45%]">
        {/* Left Section */}
        <div className="flex flex-col justify-center px-6 md:px-10 py-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8">
            Наши гарантии
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {guarantees.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl font-semibold text-gray-900">
                  {item.value}
                </p>
                <div className="h-[1px] w-10 bg-gray-400 mx-auto my-2"></div>
                <p className="text-lg text-gray-500 leading-tight">
                  {item.label1} <br /> {item.label2}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full h-64 md:h-auto">
          <Image
            src="/assets/guaranteeSectionImage.png" // 🔹 Replace with your image
            alt="Guarantee image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
